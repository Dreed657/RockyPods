FROM node:16-alpine

WORKDIR /server

COPY package*.json ./

# Installing packages
RUN yarn --silent

COPY . .

RUN yarn build

ENV PORT=5000
EXPOSE 5000

# Run server
CMD [ "yarn", "start" ]