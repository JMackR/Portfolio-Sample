FROM node:18-bullseye

WORKDIR /usr/src/app

COPY package.json .

RUN yarn install 

COPY . .

CMD [ "node", "index.js" ]
