#!/bin/bash -e

# Frontend

echo '{"apiUrl":"http://'$HOSTNAME':'$PORT'/"}' > /dist/assets/app-config.json

echo "Starting frontend"
/usr/sbin/nginx -g "daemon off;"
echo "Started frontend"

