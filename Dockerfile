# FROM node:latest
# WORKDIR /usr/bin/app
# ENV PORT=3000
# COPY . .
# RUN npm install
# EXPOSE $PORT
# CMD ["npm", "start"]

FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "app.js" ]