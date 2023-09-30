FROM node:18.12.1-alpine3.17

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .

EXPOSE 3000

CMD ["npm", "start"]