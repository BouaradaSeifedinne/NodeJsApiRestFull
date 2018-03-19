FROM node:8

WORKDIR /api

ADD . /api

RUN npm install --save

EXPOSE 3000

CMD ["node", "app.js"]
