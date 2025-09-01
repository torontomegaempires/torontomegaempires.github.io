# Setup a new Mega Empires Game

## Objective

Setup a new game by asking questions about the announcement, creating the event in discord and then send an announcement using email.

1. Ask the user for information about the game.

What is the name of the game being announced?
What date is the game being played?

2. Use the apollo plugin in discord to create an event.

Title: the name of the game being announced.

Description: 
**Address**: 64 Leuty Ave, Toronto, ON M4E 2R4
Google Maps https://maps.app.goo.gl/zz68pg38L65L42wC7

**TTC**: Take subway to Main St Station, then 64 Main Southbound to Queen. Do not try taking 501 Queen Streetcar across, it's too slow.

**Parking**: There is on street parking and a Green P at the top of the street.

**My Mobile**: 416-829-7626
**WhatsApp**: https://chat.whatsapp.com/Ja3TvLbI6640ycHTObHoRX

**Cost**: $20 to help pay for lunch and dinner, which will be sandwiches and salad. Please let me know if you have dietary requirements; I'm happy to accommodate.

Defaults for responses
Set 9 attendees
Start date and time: the date the game is being played starting at 10 am. For example September 20, 10 am ET
End date and time: the date the game is being played ending at 10 pm. For example September 20, 10 pm ET

3. Copy the link for the scheduled event
4. Update the netlify.toml file so the [[redirects]] with `from = "https://signup.torontomegaempires.com"` has a `to = ` with the discord link.
Like this:
```
# Redirect to latest game sign-up
[[redirects]]
  from = "https://signup.torontomegaempires.com"
  to = "https://discord.com/channels/1199457108257669231/1219112401287516161/1411428380305526886"
  status = 302
  force = true
```
4. Create an announcement email from the email template in docs/emails/templates/email-game-announcement.html. Store the announcement email in docs/emails with the format yyyy-mm-dd-email.html where yyyy-mm-dd is today's date. For example if today is August 30, 2025, then the email will be 2025-08-30-email.html.

5. Send the email using the script ./send-mail.sh "name of the game being announced" docs/emails/announcement-email.html
