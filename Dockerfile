FROM node:20.6.1-alpine3.15

ARG UID=1001
ARG GID=1001

RUN addgroup -S mockevent -g $GID && adduser -D -S mockevent -G mockevent -u $UID

RUN apk add --update --no-cache \
    curl \
    alpine-sdk \
    python3

WORKDIR /var/www

RUN chown -R $UID:$GID .

USER mockevent

COPY --chown=$UID:$GID package.json yarn.lock /var/www/

RUN yarn install --immutable

COPY --chown=$UID:$GID . /var/www

RUN yarn build

ENTRYPOINT [ "docker/entrypoint.sh" ]

CMD [ "start-web" ]
