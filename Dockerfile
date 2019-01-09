FROM node:10-alpine

ARG REPOSITORY_MIRROR=http://dl-cdn.alpinelinux.org

RUN echo $REPOSITORY_MIRROR/alpine/v3.8/community > /etc/apk/repositories && \
    echo $REPOSITORY_MIRROR/alpine/v3.8/main >> /etc/apk/repositories

RUN apk update && apk upgrade && \
    echo @edge $REPOSITORY_MIRROR/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge $REPOSITORY_MIRROR/alpine/edge/main >> /etc/apk/repositories && \
    echo @edge $REPOSITORY_MIRROR/alpine/edge/testing >> /etc/apk/repositories && \
    apk add --no-cache chromium-chromedriver chromium nss python alpine-sdk

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/

WORKDIR /archon-ui
COPY ./ .

RUN npm run test -- --no-watch --no-progress --browsers=ChromeHeadlessCI