FROM node:18-alpine3.15

#Copy the source folder
COPY ./src /app/src

WORKDIR /app/src

EXPOSE 3000

RUN yarn install

CMD ["yarn","build"]


