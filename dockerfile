FROM node:20-alpine as builder


WORKDIR /app

COPY package*.json ./


RUN npm config set fetch-retry-maxtimeout 60000


RUN npm config set registry https://registry.npmjs.org/


RUN npm install


COPY . .


ENV NODE_ENV development
ENV API_URL=${API_URL}


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


# Set the correct permission for prerender cache
RUN mkdir .next

RUN chown nextjs:nodejs .next
USER nextjs


EXPOSE 3000


CMD ["npm", "run","dev"]
