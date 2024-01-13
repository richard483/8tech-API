ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache nmap && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge https://dl-cdn.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
    chromium \
    harfbuzz \
    "freetype>2.8" \
    ttf-freefont \
    nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

COPY . /usr/src/app

RUN npm ci

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/src/main" ]