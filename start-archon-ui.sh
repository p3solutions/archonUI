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

echo '{"apiUrl":"http://'$ARCHON_SERVER_HOST':'$PORT'/"}' > /dist/assets/app-config.json

echo "Starting frontend"
/usr/sbin/nginx -g "daemon off;"
echo "Started frontend"
