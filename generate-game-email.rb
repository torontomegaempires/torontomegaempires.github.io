#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Generate the announcement email for the next (or a specified) Toronto Mega
# Empires HOME game, and print the send + Discord-event instructions.
#
# Usage:
#   ruby generate-game-email.rb              # next upcoming home game
#   ruby generate-game-email.rb 2026-11-28   # a specific game date (YYYY-MM-DD)
#
# It fills docs/emails/templates/game-announcement.html and writes
# docs/emails/<today>-email.html. Home games are numbered by the explicit
# `game_number` field in docs/_data/games-list.yml (sequential home games;
# conventions and the separate UoT series are not part of that sequence).

require 'yaml'
require 'date'

ROOT     = File.expand_path(__dir__)
SCHEDULE = File.join(ROOT, 'docs/_data/games-list.yml')
TEMPLATE = File.join(ROOT, 'docs/emails/templates/game-announcement.html')
VARIANT_NAMES = { 'the east' => 'The East', 'the west' => 'The West' }.freeze

def die(msg)
  warn "ERROR: #{msg}"
  exit 1
end

data  = YAML.load_file(SCHEDULE)
games = data['games'] || []
home  = games.select { |g| g['type'] == 'home' }

target = ARGV[0]
game =
  if target
    home.find { |g| g['date'] == target } || die("No home game dated #{target} in games-list.yml")
  else
    today = Date.today
    home.select { |g| Date.parse(g['date']) >= today }
        .min_by { |g| g['date'] } || die('No upcoming home game found in games-list.yml')
  end

num = game['game_number'] ||
      die("Game on #{game['date']} has no game_number in games-list.yml — add one " \
          '(home games are numbered sequentially; the UoT series and conventions are not).')
variant = VARIANT_NAMES[(game['variant'] || '').downcase] ||
          die("Unknown variant #{game['variant'].inspect} on #{game['date']}")

date_long = Date.parse(game['date']).strftime('%A, %B %-d, %Y')

html = File.read(TEMPLATE)
           .gsub('{{VARIANT}}', variant)
           .gsub('{{GAME_NUMBER}}', num.to_s)
           .gsub('{{DATE_LONG}}', date_long)
die('Template still has unfilled {{PLACEHOLDER}} tokens') if html =~ /\{\{[A-Z_]+\}\}/

out_rel = "docs/emails/#{Date.today}-email.html"
out_abs = File.join(ROOT, out_rel)
existed = File.exist?(out_abs)
File.write(out_abs, html)

subject = "Mega Empires: #{variant} - #{date_long}"
desc = <<~DESC
  **Address**: 64 Leuty Ave, Toronto, ON M4E 2R4
  Google Maps https://maps.app.goo.gl/zz68pg38L65L42wC7

  **TTC**: Take subway to Main St Station, then 64 Main Southbound to Queen. Do not try taking 501 Queen Streetcar across, it's too slow.

  **Parking**: There is on street parking and a Green P at the top of the street.

  **My Mobile**: 416-829-7626
  **WhatsApp**: https://chat.whatsapp.com/Ja3TvLbI6640ycHTObHoRX

  **Cost**: $20 to help pay for lunch and dinner, which will be sandwiches and salad. Please let me know if you have dietary requirements; I'm happy to accommodate.
DESC

line = '=' * 66
puts line
puts "Mega Empires: #{variant} - Game #{num}"
puts "Date:  #{date_long}, 10am-10pm"
puts "Email: #{out_rel} #{existed ? '(overwritten)' : '(created)'}"
puts line
puts
puts '1) SEND THE EMAIL (prompts for your easymail password):'
puts %(   ./send-mail.sh "#{subject}" "#{out_rel}")
puts
puts '2) CREATE THE DISCORD EVENT — Apollo guided /event flow in #event-announcements:'
puts "   Title:    Mega Empires: #{variant} - Game #{num}"
puts "   Start:    #{game['date']} 10:00 AM   (Eastern)"
puts '   End:      12 hours'
puts '   Capacity: 9  (single "Accepted" option → auto-waitlists alternates)'
puts '   Repeat:   Never'
puts '   Description (paste; use Shift+Enter between lines, not the send key):'
puts '   ' + ('-' * 44)
desc.each_line { |l| puts "   #{l.chomp}" }
puts '   ' + ('-' * 44)
puts
puts '3) After the event exists, point the ACTIVE signup redirect in netlify.toml'
puts '   (from = https://signup.torontomegaempires.com) at the new Discord event'
puts '   URL, then commit & push (GitHub Pages deploys main).'
