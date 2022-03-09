FROM node:16.14

RUN mkdir -p /usr/src/app

RUN npm install -g pm2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["pm2-dev", "server.js"] 
