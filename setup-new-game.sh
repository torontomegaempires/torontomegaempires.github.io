#!/bin/bash

# Toronto Mega Empires - Game Setup Automation
# This script automates the complete game setup workflow

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_header() {
    echo -e "${PURPLE}🎲 $1${NC}"
}

# Function to validate date format
validate_date() {
    local date_string="$1"
    if [[ ! "$date_string" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]]; then
        return 1
    fi
    
    # Check if date is valid using date command
    if ! date -j -f "%Y-%m-%d" "$date_string" >/dev/null 2>&1; then
        return 1
    fi
    
    return 0
}

# Function to format date for display
format_date_display() {
    local date_string="$1"
    date -j -f "%Y-%m-%d" "$date_string" "+%A, %B %d, %Y" 2>/dev/null || echo "$date_string"
}

# Function to get next game number
get_next_game_number() {
    # Look for existing game posts to determine next number
    local latest_game=$(find docs/_posts -name "*Game-*.markdown" | grep -o "Game-[0-9]*" | grep -o "[0-9]*" | sort -n | tail -1)
    if [[ -n "$latest_game" ]]; then
        echo $((latest_game + 1))
    else
        echo "16"  # Default starting number
    fi
}

# Main script
main() {
    print_header "Toronto Mega Empires - Game Setup Automation"
    echo
    
    # Step 1: Gather Information
    print_info "Step 1: Gathering game information..."
    
    # Get next game number
    NEXT_GAME_NUM=$(get_next_game_number)
    
    # Game name with default
    echo -n "Game name [Mega Empires: The West - Game $NEXT_GAME_NUM]: "
    read GAME_NAME
    if [[ -z "$GAME_NAME" ]]; then
        GAME_NAME="Mega Empires: The West - Game $NEXT_GAME_NUM"
    fi
    
    # Game date with validation
    while true; do
        echo -n "Game date (YYYY-MM-DD): "
        read GAME_DATE
        if validate_date "$GAME_DATE"; then
            break
        else
            print_error "Invalid date format. Please use YYYY-MM-DD format."
        fi
    done
    
    # Next game date (optional)
    echo -n "Next game date (YYYY-MM-DD, optional): "
    read NEXT_GAME_DATE
    if [[ -n "$NEXT_GAME_DATE" ]] && ! validate_date "$NEXT_GAME_DATE"; then
        print_warning "Invalid next game date format. Continuing without it."
        NEXT_GAME_DATE=""
    fi
    
    # Display formatted information
    echo
    print_info "Game Setup Summary:"
    echo "  📋 Game: $GAME_NAME"
    echo "  📅 Date: $(format_date_display "$GAME_DATE")"
    if [[ -n "$NEXT_GAME_DATE" ]]; then
        echo "  🗓️  Next: $(format_date_display "$NEXT_GAME_DATE")"
    fi
    echo
    
    # Confirm before proceeding
    echo -n "Proceed with setup? (y/N): "
    read CONFIRM
    if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
        print_info "Setup cancelled."
        exit 0
    fi
    
    # Step 2: Generate Apollo Command
    print_info "Step 2: Generating Apollo command for Discord..."
    
    # Convert date to proper format for Discord (YYYY-MM-DD HH:MM format)
    START_TIME="${GAME_DATE} 10:00"
    END_TIME="${GAME_DATE} 22:00"

    # Generate the Apollo command
    APOLLO_COMMAND="/event create title:\"${GAME_NAME}\" start:\"${START_TIME}\" end:\"${END_TIME}\" max_attendees:9 description:\"**Address**: 64 Leuty Ave, Toronto, ON M4E 2R4
    Google Maps https://maps.app.goo.gl/zz68pg38L65L42wC7

    **TTC**: Take subway to Main St Station, then 64 Main Southbound to Queen. Do not try taking 501 Queen Streetcar across, it's too slow.

    **Parking**: There is on street parking and a Green P at the top of the street.

    **My Mobile**: 416-829-7626
    **WhatsApp**: https://chat.whatsapp.com/Ja3TvLbI6640ycHTObHoRX

    **Cost**: \$20 to help pay for lunch and dinner, which will be sandwiches and salad. Please let me know if you have dietary requirements; I'm happy to accommodate.\""

    # Display the command in a nice format
    print_info "📋 Apollo Command (copy and execute in Discord):"
    echo
    echo ${APOLLO_COMMAND}
    
    # Step 3: Wait for Discord Event URL
    print_info "Step 3: Waiting for Discord event creation..."
    echo
    print_warning "Please execute the Apollo command in Discord and then provide the event URL."
    echo -n "Discord event URL: "
    read DISCORD_EVENT_URL
    
    if [[ -z "$DISCORD_EVENT_URL" ]]; then
        print_error "Discord event URL is required to continue."
        exit 1
    fi
    
    # Validate URL format
    if [[ ! "$DISCORD_EVENT_URL" =~ ^https://discord\.com/channels/ ]]; then
        print_warning "URL doesn't look like a Discord event URL. Continuing anyway..."
    fi
    
    # Step 4: Update netlify.toml
    print_info "Step 4: Updating netlify.toml redirect..."
    
    # Backup current netlify.toml
    cp netlify.toml netlify.toml.backup
    
    # Update the signup redirect
    sed -i '' "s|to = \"https://discord.com/channels/[^\"]*\"|to = \"$DISCORD_EVENT_URL\"|" netlify.toml
    
    print_status "netlify.toml updated successfully"
    
    # Step 5: Generate Email
    print_info "Step 5: Generating email announcement..."
    
    # Get today's date for email filename
    TODAY=$(date "+%Y-%m-%d")
    EMAIL_FILE="docs/emails/$TODAY-email.html"
    
    # Read email template
    if [[ ! -f "docs/emails/templates/email-game-announcement.html" ]]; then
        print_error "Email template not found!"
        exit 1
    fi
    
    # Copy template and replace placeholders
    cp "docs/emails/templates/email-game-announcement.html" "$EMAIL_FILE"
    
    # Replace game name and date in the email
    # This is a simplified replacement - in a real implementation, we'd parse the HTML more carefully
    DISPLAY_DATE=$(format_date_display "$GAME_DATE")
    
    # Replace the hardcoded content with our game details
    sed -i '' "s/Saturday, May 24, 2025/$DISPLAY_DATE/g" "$EMAIL_FILE"
    sed -i '' "s/Mega Empires: The West - Game 14/$GAME_NAME/g" "$EMAIL_FILE"
    
    # Update next game date if provided
    if [[ -n "$NEXT_GAME_DATE" ]]; then
        NEXT_DISPLAY_DATE=$(format_date_display "$NEXT_GAME_DATE")
        sed -i '' "s/November 27th/$NEXT_DISPLAY_DATE/g" "$EMAIL_FILE"
    fi
    
    print_status "Email generated: $EMAIL_FILE"
    
    # Step 6: Send Email
    print_info "Step 6: Sending email announcement..."
    
    if [[ ! -f "./send-mail.sh" ]]; then
        print_error "send-mail.sh script not found!"
        exit 1
    fi
    
    # Make sure send-mail.sh is executable
    chmod +x ./send-mail.sh
    
    # Send the email
    print_info "Executing: ./send-mail.sh \"$GAME_NAME\" \"$EMAIL_FILE\""
    if ./send-mail.sh "$GAME_NAME" "$EMAIL_FILE"; then
        print_status "Email sent successfully!"
    else
        print_error "Failed to send email. Check send-mail.sh output above."
        exit 1
    fi
    
    # Final Summary
    echo
    print_header "🎉 Game Setup Complete!"
    echo
    print_status "Summary of actions completed:"
    echo "  📋 Game: $GAME_NAME"
    echo "  📅 Date: $DISPLAY_DATE"
    echo "  🔗 Discord Event: $DISCORD_EVENT_URL"
    echo "  📧 Email: $EMAIL_FILE"
    echo "  🌐 Netlify redirect updated"
    echo
    print_info "Next steps:"
    echo "  1. Verify the Discord event was created correctly"
    echo "  2. Check that the email was received by subscribers"
    echo "  3. Test the signup redirect: https://signup.torontomegaempires.com"
    echo
}

# Run main function
main "$@"
