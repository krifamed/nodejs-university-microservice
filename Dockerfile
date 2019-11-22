FROM node:latest
WORKDIR /usr/bin/app
ENV PORT=3000
COPY . .
RUN npm install
## THE LIFE SAVER
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
# RUN chmod +x /wait
EXPOSE $PORT
CMD ["npm", "start"]