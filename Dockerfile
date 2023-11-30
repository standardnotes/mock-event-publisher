FROM node:20.6.1-alpine

RUN apk add --update \
  curl \
  && rm -rf /var/cache/apk/*

ENV NODE_ENV production

RUN corepack enable

COPY ./ /workspace

WORKDIR /workspace

RUN yarn build

ENTRYPOINT [ "docker/entrypoint.sh" ]

CMD [ "start-web" ]
