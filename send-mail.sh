#! /bin/bash

# Send email out

# Simple example
# curl --url 'smtps://mailout.easymail.ca:465' \
#  --ssl-reqd \
#  --mail-from 'rob@robmcarthur.com' \
#  --mail-rcpt 'rob@robmcarthur.com' \
#  --user 'rob@robmcarthur.com:${PASSWORD}' \
#  -T <(echo -e 'From: rob@robmcarthur.com\nTo: rob@robmcarthur.com\nSubject: Curl Test\n\nHello')

# taken from https://stackoverflow.com/questions/44728855/curl-send-html-email-with-embedded-image-and-attachment

subject=${1}
message_file=${2}

# Read Password
echo "password:\c"
read -s mail_pwd

rtmp_url="smtps://mailout.easymail.ca:465"
rtmp_from="rob@robmcarthur.com"
rtmp_to="torontomegaempires@gaggle.email"
rtmp_credentials="rob@robmcarthur.com:${mail_pwd}"

file_upload="data.txt"

# # html message to send
# echo "<html>
# <body>
#     <div>
#         <p>Hello, </p>
#         <p>Please see the log file attached</p>
#         <p>Admin Team</p>
#         <img src=\"cid:admin.png\" width=\"150\" height=\"50\">
#     </div>
# </body>
# </html>" > message.html

# # log.txt file to attached to the mail
# echo "some log in a txt file to attach to the mail" > log.txt

mail_from="Rob McArthur <$rtmp_from>"
mail_to="Toronto Mega Empires <$rtmp_to>"
# "Mega Empires: The West - Saturday, September 20, 2025"
mail_subject="${subject}"
mail_reply_to="Rob McArthur <$rtmp_from>"
mail_cc=""

# add an image to data.txt : 
# $1 : type (ex : image/png)
# $2 : image content id filename (match the cid:filename.png in html document)
# $3 : image content base64 encoded
# $4 : filename for the attached file if content id filename empty
function add_file {
    echo "--MULTIPART-MIXED-BOUNDARY
Content-Type: $1
Content-Transfer-Encoding: base64" >> "$file_upload"

    if [ ! -z "$2" ]; then
        echo "Content-Disposition: inline
Content-Id: <$2>" >> "$file_upload"
    else
        echo "Content-Disposition: attachment; filename=$4" >> "$file_upload"
    fi
    echo "$3

" >> "$file_upload"
}

message_base64=$(cat ${message_file} | base64)

echo "From: $mail_from
To: $mail_to
Subject: $mail_subject
Reply-To: $mail_reply_to
Cc: $mail_cc
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=\"MULTIPART-MIXED-BOUNDARY\"

--MULTIPART-MIXED-BOUNDARY
Content-Type: multipart/alternative; boundary=\"MULTIPART-ALTERNATIVE-BOUNDARY\"

--MULTIPART-ALTERNATIVE-BOUNDARY
Content-Type: text/html; charset=utf-8
Content-Transfer-Encoding: base64
Content-Disposition: inline

$message_base64
--MULTIPART-ALTERNATIVE-BOUNDARY--" > "$file_upload"

# # add an image with corresponding content-id (here admin.png)
# image_base64=$(curl -s "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_116x41dp.png" | base64)
# add_file "image/png" "admin.png" "$image_base64"

# # add the log file
# log_file=$(cat log.txt | base64)
# add_file "text/plain" "" "$log_file" "log.txt"

# add another image 
#image_base64=$(curl -s "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_116x41dp.png" | base64)
#add_file "image/png" "something.png" "$image_base64"

# end of uploaded file
echo "--MULTIPART-MIXED-BOUNDARY--" >> "$file_upload"

# send email
echo "sending ...."
curl -s "$rtmp_url" \
     --mail-from "$rtmp_from" \
     --mail-rcpt "$rtmp_to" \
     --ssl-reqd \
     -u "$rtmp_credentials" \
     -T "$file_upload"
res=$?
if test "$res" != "0"; then
   echo "sending failed with: $res"
else
    echo "OK"
fi