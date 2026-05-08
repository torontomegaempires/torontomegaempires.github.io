#!/usr/bin/env bash
# Resizes and compresses game photos that are too large for web delivery.
# Run this after dropping new photos into docs/assets/images/games/YYYY-MM-DD/.
#
# Usage:
#   ./optimize-images.sh              # dry run — shows what would change
#   ./optimize-images.sh --apply      # actually modifies files in-place

set -euo pipefail

IMAGES_DIR="$(cd "$(dirname "$0")" && pwd)/docs/assets/images/games"
MAX_LONG_SIDE=2000   # px — longest edge capped here
JPEG_QUALITY=82      # 0–100; 82 is visually lossless for gallery viewing
SIZE_THRESHOLD_KB=600  # files under this are left alone even if slightly large

APPLY=false
if [[ "${1:-}" == "--apply" ]]; then
  APPLY=true
fi

if ! command -v sips &>/dev/null; then
  echo "Error: 'sips' not found. This script requires macOS." >&2
  exit 1
fi

total=0
needs_work=0
saved_kb=0

echo ""
if $APPLY; then
  echo "  Optimizing images in: $IMAGES_DIR"
else
  echo "  DRY RUN — no files will be changed. Pass --apply to optimize."
  echo "  Scanning: $IMAGES_DIR"
fi
echo ""

while IFS= read -r -d '' file; do
  basename=$(basename "$file")
  ext="${file##*.}"
  ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')

  # Skip suppressed images
  if [[ "$basename" == suppress-* ]]; then
    continue
  fi

  size_kb=$(( $(wc -c < "$file") / 1024 ))
  (( total++ )) || true

  # Read pixel dimensions
  width=$(sips -g pixelWidth "$file" 2>/dev/null | awk '/pixelWidth/{print $2}')
  height=$(sips -g pixelHeight "$file" 2>/dev/null | awk '/pixelHeight/{print $2}')

  if [[ -z "$width" || -z "$height" ]]; then
    echo "  SKIP (unreadable): $file"
    continue
  fi

  long_side=$(( width > height ? width : height ))
  too_big=$(( long_side > MAX_LONG_SIDE || size_kb > SIZE_THRESHOLD_KB ? 1 : 0 ))

  if (( too_big == 0 )); then
    continue
  fi

  (( needs_work++ )) || true
  rel_path="${file#$IMAGES_DIR/}"

  if ! $APPLY; then
    new_dim=$(( long_side > MAX_LONG_SIDE ? MAX_LONG_SIDE : long_side ))
    echo "  $(printf '%6d' $size_kb)KB  ${width}×${height}px  →  would resize/compress:  $rel_path"
    continue
  fi

  # Apply: resize (caps longest side) + set quality for JPEG
  tmp="${file}.optimizing.tmp"
  if [[ "$ext_lower" == "jpg" || "$ext_lower" == "jpeg" ]]; then
    sips -Z "$MAX_LONG_SIDE" -s formatOptions "$JPEG_QUALITY" "$file" --out "$tmp" &>/dev/null
  else
    # PNG: resize only (quality flag doesn't apply)
    sips -Z "$MAX_LONG_SIDE" "$file" --out "$tmp" &>/dev/null
  fi

  new_size_kb=$(( $(wc -c < "$tmp") / 1024 ))

  if (( new_size_kb >= size_kb )); then
    # Result is no smaller — keep original
    rm "$tmp"
    echo "  $(printf '%6d' $size_kb)KB  (skipped — already optimal)  $rel_path"
    (( needs_work-- )) || true
    continue
  fi

  mv "$tmp" "$file"
  delta=$(( size_kb - new_size_kb ))
  (( saved_kb += delta )) || true

  new_width=$(sips -g pixelWidth "$file" 2>/dev/null | awk '/pixelWidth/{print $2}')
  new_height=$(sips -g pixelHeight "$file" 2>/dev/null | awk '/pixelHeight/{print $2}')

  echo "  $(printf '%6d' $size_kb)KB → $(printf '%5d' $new_size_kb)KB  (${width}×${height} → ${new_width}×${new_height})  $rel_path"

done < <(find "$IMAGES_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -print0 | sort -z)

echo ""
if $APPLY; then
  if (( needs_work == 0 )); then
    echo "  All $total images are already within limits. Nothing to do."
  else
    saved_mb=$(echo "scale=1; $saved_kb / 1024" | bc)
    echo "  Optimized $needs_work of $total images, saved ~${saved_mb}MB."
  fi
else
  if (( needs_work == 0 )); then
    echo "  All $total images are within limits. Nothing to optimize."
  else
    echo "  $needs_work of $total images need optimization."
    echo "  Run with --apply to fix them."
  fi
fi
echo ""
