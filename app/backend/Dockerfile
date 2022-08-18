FROM node:16.14-alpine

WORKDIR /app-backend

COPY package* ./

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3001

CMD [ "npm", "start" ]