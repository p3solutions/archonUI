FROM nginx:alpine
COPY ./dist/ /dist/
COPY start-archon-ui.sh nginx.conf /tmp/
RUN apk update \
    && apk add nginx openrc\
    && adduser -D -g 'www' www \
    && mkdir /www \
    && chown -R www:www /var/lib/nginx \
    && chown -R www:www /www \
    && mv /tmp/nginx.conf /etc/nginx/nginx.conf \
    && apk add --no-cache bash \
    && chmod a+x /tmp/*.sh \
    && mv /tmp/start-archon-ui.sh /usr/bin
ENTRYPOINT [ "start-archon-ui.sh"]