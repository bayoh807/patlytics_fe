FROM node:20-alpine as builder

RUN addgroup -S node && adduser -S node -G node

WORKDIR /app

COPY package*.json ./

RUN npm config set fetch-retry-maxtimeout 60000
RUN npm config set registry https://registry.npmjs.org/

# 安裝依賴
RUN npm install

COPY . .

ENV API_URL=${API_URL}

RUN mkdir -p /app/.next && chown -R node:node /app/.next

RUN chown -R node:node /app

USER node

EXPOSE 3000

# 啟動 Next.js 應用
CMD ["npm", "run", "dev"]
