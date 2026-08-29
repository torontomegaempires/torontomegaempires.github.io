# Toronto Mega Empires - Automated Game Setup

## Quick start (2026+): generate the announcement email

The fastest path is the data-driven generator. It reads the schedule
(`docs/_data/games-list.yml`), fills the current email template, and prints the
send command plus the Discord/Apollo field values:

```bash
ruby generate-game-email.rb              # next upcoming HOME game
ruby generate-game-email.rb 2026-11-28   # a specific game date
```

It writes `docs/emails/<today>-email.html` and requires the game to have a
`game_number` in `games-list.yml` (home games are numbered sequentially; the UoT
series and conventions are NOT part of that sequence — give them no number).

The **Discord event** can't be scripted: Apollo replaced its old pasteable
`/event create ...` command with an interactive guided flow. Run `/event` in
#event-announcements, pick "Create a new Apollo event", and answer the DM prompts
with the values the generator printed (single "Accepted" option, capacity 9,
start 10:00 AM Eastern, end "12 hours", repeat Never). After it's created, point
the active `signup.torontomegaempires.com` redirect in `netlify.toml` at the new
event URL, then commit & push.

The interactive `setup-new-game.sh` below still works but predates the generator.

---


This repository contains an automated bash script for setting up new Mega Empires games, including Discord event creation, email announcements, and website redirects.

## Overview

The automation handles the complete game setup process through an interactive bash script:

1. **Information Gathering** - Interactive prompts for game details with smart defaults
2. **Discord Integration** - Generates Apollo commands for manual event creation
3. **Website Updates** - Automatically updates netlify.toml redirects
4. **Email Generation** - Creates personalized announcements from templates
5. **Email Distribution** - Sends announcements to subscribers

## Components

### 1. Main Automation Script (`setup-new-game.sh`)

**Location:** Root directory

**Purpose:** Orchestrates the complete game setup workflow through an interactive bash script.

**Features:**
- Interactive prompts with smart defaults and validation
- Automatic game numbering based on existing posts
- Date validation and formatting (YYYY-MM-DD)
- Colorized output with emojis for better user experience
- Error handling and backup creation
- Confirmation steps before making changes

### 2. Email Template System

**Template:** `docs/emails/templates/email-game-announcement.html`
**Output:** `docs/emails/YYYY-MM-DD-email.html`

**Dynamic Replacements:**
- Game name and number
- Game date (formatted for display)
- Next game date (optional)
- Event details and logistics

### 3. Email Distribution (`send-mail.sh`)

**Location:** Root directory

**Purpose:** Handles the actual email sending to subscribers.

**Requirements:** Must be configured with appropriate email credentials and recipient list.

## Prerequisites

1. **Bash Shell** - macOS/Linux environment with bash
2. **Email System** - `send-mail.sh` script configured with email credentials
3. **Discord Access** - Ability to execute Apollo commands in the Discord server
4. **File Permissions** - Write access to netlify.toml and docs/emails directory

## Usage

### Running the Automation

```bash
./setup-new-game.sh
```

### Interactive Workflow

The script guides you through a 6-step process:

#### Step 1: Information Gathering
- **Game name**: Defaults to "Mega Empires: The West - Game X" with auto-incremented number
- **Game date**: YYYY-MM-DD format with validation
- **Next game date**: Optional, also validated if provided
- **Confirmation**: Review details before proceeding

#### Step 2: Apollo Command Generation
- Generates a properly formatted Discord `/event create` command
- Includes all event details (title, start/end times, max attendees, description)
- Command includes venue address, transit info, contact details, and cost

#### Step 3: Manual Discord Event Creation
- Copy the generated Apollo command
- Execute it in your Discord server
- Provide the resulting Discord event URL back to the script

#### Step 4: Website Redirect Update
- Automatically backs up current `netlify.toml`
- Updates the signup redirect to point to the new Discord event
- Redirect URL: `https://signup.torontomegaempires.com`

#### Step 5: Email Generation
- Creates a new email file: `docs/emails/YYYY-MM-DD-email.html`
- Uses the template and replaces placeholders with actual game details
- Formats dates for human-readable display

#### Step 6: Email Distribution
- Executes `./send-mail.sh` with the game name and email file
- Sends announcement to all subscribers

### Example Session

```bash
$ ./setup-new-game.sh

🎲 Toronto Mega Empires - Game Setup Automation

ℹ️  Step 1: Gathering game information...
Game name [Mega Empires: The West - Game 16]: 
Game date (YYYY-MM-DD): 2025-09-20
Next game date (YYYY-MM-DD, optional): 2025-11-15

ℹ️  Game Setup Summary:
  📋 Game: Mega Empires: The West - Game 16
  📅 Date: Friday, September 20, 2025
  🗓️  Next: Friday, November 15, 2025

Proceed with setup? (y/N): y

ℹ️  Step 2: Generating Apollo command for Discord...
📋 Apollo Command (copy and execute in Discord):

/event create title:"Mega Empires: The West - Game 16" start:"2025-09-20 10:00" end:"2025-09-20 22:00" max_attendees:9 description:"**Address**: 64 Leuty Ave, Toronto, ON M4E 2R4
Google Maps https://maps.app.goo.gl/zz68pg38L65L42wC7

**TTC**: Take subway to Main St Station, then 64 Main Southbound to Queen. Do not try taking 501 Queen Streetcar across, it's too slow.

**Parking**: There is on street parking and a Green P at the top of the street.

**My Mobile**: 416-829-7626
**WhatsApp**: https://chat.whatsapp.com/Ja3TvLbI6640ycHTObHoRX

**Cost**: $20 to help pay for lunch and dinner, which will be sandwiches and salad. Please let me know if you have dietary requirements; I'm happy to accommodate."

ℹ️  Step 3: Waiting for Discord event creation...

⚠️  Please execute the Apollo command in Discord and then provide the event URL.
Discord event URL: https://discord.com/channels/1199457108257669231/1219112401287516161/1234567890123456789

ℹ️  Step 4: Updating netlify.toml redirect...
✅ netlify.toml updated successfully

ℹ️  Step 5: Generating email announcement...
✅ Email generated: docs/emails/2025-08-30-email.html

ℹ️  Step 6: Sending email announcement...
ℹ️  Executing: ./send-mail.sh "Mega Empires: The West - Game 16" "docs/emails/2025-08-30-email.html"
✅ Email sent successfully!

🎉 Game Setup Complete!

✅ Summary of actions completed:
  📋 Game: Mega Empires: The West - Game 16
  📅 Date: Friday, September 20, 2025
  🔗 Discord Event: https://discord.com/channels/1199457108257669231/1219112401287516161/1234567890123456789
  📧 Email: docs/emails/2025-08-30-email.html
  🌐 Netlify redirect updated

ℹ️  Next steps:
  1. Verify the Discord event was created correctly
  2. Check that the email was received by subscribers
  3. Test the signup redirect: https://signup.torontomegaempires.com
```

## Setup Instructions

### Prerequisites Setup

1. **Make script executable:**
   ```bash
   chmod +x setup-new-game.sh
   ```

2. **Configure email system:**
   - Ensure `send-mail.sh` is executable and properly configured
   - Test email sending functionality before running game setup

3. **Verify Discord access:**
   - Ensure you have permissions to create events in the Discord server
   - Test Apollo commands work in your Discord environment

### File Structure

The script expects this file structure:
```
/
├── setup-new-game.sh              # Main automation script
├── send-mail.sh                   # Email sending script
├── netlify.toml                   # Website configuration (will be updated)
└── docs/
    ├── emails/
    │   ├── templates/
    │   │   └── email-game-announcement.html  # Email template
    │   └── YYYY-MM-DD-email.html            # Generated emails
    └── _posts/
        └── *Game-*.markdown                  # Existing game posts (for numbering)
```

## Troubleshooting

### Common Issues

1. **Date validation errors**: Ensure dates are in YYYY-MM-DD format
2. **Email sending failures**: Check `send-mail.sh` configuration and permissions
3. **File permission errors**: Ensure write access to netlify.toml and docs/emails/
4. **Discord URL format**: Ensure the Discord event URL starts with `https://discord.com/channels/`

### Recovery

- **netlify.toml backup**: The script creates `netlify.toml.backup` before making changes
- **Email files**: Generated emails are preserved in `docs/emails/` for reference
- **Script interruption**: Safe to re-run the script; it will prompt for all information again

## Features

### Smart Defaults
- **Game numbering**: Automatically detects the next game number from existing posts
- **Date formatting**: Converts YYYY-MM-DD to human-readable format for display
- **Template processing**: Intelligently replaces placeholders in email templates

### Error Handling
- **Input validation**: Validates date formats and required fields
- **Backup creation**: Creates backups before modifying files
- **Confirmation steps**: Asks for confirmation before making changes
- **Graceful failure**: Provides clear error messages and recovery options

### User Experience
- **Colorized output**: Uses colors and emojis for better readability
- **Progress tracking**: Clear step-by-step progress indication
- **Detailed summaries**: Shows what was accomplished at each step
- **Next steps guidance**: Provides clear instructions for post-setup verification
