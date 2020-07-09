FROM node:8-alpine as base

FROM base as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci && \
    npm install --only=production

FROM base

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY . .

EXPOSE 9090

ENTRYPOINT [ "node", "./bin/www" ]