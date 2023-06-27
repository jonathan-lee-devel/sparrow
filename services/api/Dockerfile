FROM --platform=linux/x86_64 node:18.16.1-alpine3.18

WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

RUN chown -R node:node /usr/src/app

USER node

EXPOSE 3000

CMD [ "node", "--es-module-specifier-resolution=node", "dist/main/bin/www.js" ]
