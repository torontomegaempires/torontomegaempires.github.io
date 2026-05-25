(function () {
  // ---- Expand / Collapse ----
  document.querySelectorAll('.game-summary-row').forEach(function (row) {
    function toggle() {
      var card   = row.closest('.game-card-with-photos');
      var detail = card.querySelector('.game-detail');
      var open   = card.classList.toggle('is-open');
      row.setAttribute('aria-expanded', open);
      detail.style.display = open ? 'block' : 'none';
    }
    row.addEventListener('click', toggle);
    row.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  // ---- Year Filter ----
  document.querySelectorAll('.year-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.year-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var year = btn.getAttribute('data-year');
      document.querySelectorAll('.game-card-with-photos').forEach(function (card) {
        var show = year === 'all' || card.getAttribute('data-year') === year;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  // ---- Lightbox ----
  if (document.getElementById('photo-lightbox')) return;

  var overlay = document.createElement('div');
  overlay.id = 'photo-lightbox';
  overlay.innerHTML =
    '<div class="lb-backdrop"></div>' +
    '<div class="lb-frame">' +
      '<img class="lb-img" src="" alt="">' +
      '<button class="lb-close" aria-label="Close">&#x2715;</button>' +
      '<button class="lb-prev" aria-label="Previous">&#x2039;</button>' +
      '<button class="lb-next" aria-label="Next">&#x203a;</button>' +
    '</div>';
  document.body.appendChild(overlay);

  var links   = Array.from(document.querySelectorAll('a.glightbox'));
  var current = 0;
  var lbImg   = overlay.querySelector('.lb-img');

  function show(i) {
    current   = (i + links.length) % links.length;
    lbImg.src = links[current].href;
    var img   = links[current].querySelector('img');
    lbImg.alt = img ? img.alt : '';
    overlay.classList.add('active');
  }
  function hide() {
    overlay.classList.remove('active');
    lbImg.src = '';
  }

  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) { e.preventDefault(); show(i); });
  });
  overlay.querySelector('.lb-backdrop').addEventListener('click', hide);
  overlay.querySelector('.lb-close').addEventListener('click', hide);
  overlay.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
  overlay.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')     { hide(); }
    if (e.key === 'ArrowLeft')  { show(current - 1); }
    if (e.key === 'ArrowRight') { show(current + 1); }
  });
}());
