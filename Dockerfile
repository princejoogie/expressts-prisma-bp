FROM node:14-alpine
WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install && yarn cache clean

COPY . /app
EXPOSE 3000

RUN npx prisma generate && yarn build

CMD ["yarn", "start"]

