FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

USER node

CMD ["npm", "start"]
