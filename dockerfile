FROM node:20-alpine as builder


WORKDIR /app

COPY package*.json ./


RUN npm config set fetch-retry-maxtimeout 60000


RUN npm config set registry https://registry.npmjs.org/


RUN npm install -g npm@latest


RUN npm install


COPY . .



ENV API_URL=${API_URL}


EXPOSE 3000


CMD ["npm", "dev"]
