FROM --platform=linux/x86_64 node:18-alpine3.17

WORKDIR /usr/src/app

COPY ./services/api/package*.json /usr/src/app

RUN npm install

COPY ./services/api /usr/src/app

RUN npm run build

EXPOSE 3000

CMD [ "node", "--es-module-specifier-resolution=node", "dist/main/bin/www.js" ]
