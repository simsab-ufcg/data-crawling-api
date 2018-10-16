FROM node:8.11.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN cd /usr/src/app/

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run dev
