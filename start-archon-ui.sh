#!/bin/bash -e

# Frontend

# Mandatory fields check
if [[ -z "$ARCHON_SERVER_HOST" ]] || [[ -z "$PORT" ]]; then
    echo "ERROR: HOSTNAME and PORT are mandatory environment variables"
    exit 1
fi

# Validating Archon Connectivity
timer=0
while ! nc -z $ARCHON_SERVER_HOST $PORT; do
    if [[ $timer -le 120 ]]; then
        echo "Validating Archon Backend Connectivity"
        sleep 3
        timer=$(( timer+3 ))
    else
        echo "Archon Backend connection could not be validated. Please Check the availability of Archon Backend"
        exit 1
    fi
done	
echo "Archon Backend connection validated"

SSL_FIRST_LINE="listen [::]:443 ssl ipv6only=on;"
SSL_SECOND_LINE="listen 443 ssl;"
SSL_THIRD_LINE="ssl_certificate $SSL_CERTIFICATE_PATH/$SSL_CERTIFICATE_PEM_FILE;"
SSL_FOURTH_LINE="ssl_certificate_key $SSL_CERTIFICATE_PATH/$SSL_KEY_PEM_FILE;"

sed -i "s~^	server {.*~	server { $SSL_FIRST_LINE $SSL_SECOND_LINE $SSL_THIRD_LINE $SSL_FOURTH_LINE~" "/etc/nginx/nginx.conf"

echo '{"apiUrl":"http://'$ARCHON_SERVER_HOST':'$PORT'/"}' > /dist/assets/app-config.json

echo "Starting frontend"
/usr/sbin/nginx -g "daemon off;"
echo "Started frontend"
