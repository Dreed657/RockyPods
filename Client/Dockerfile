FROM node:16-alpine

WORKDIR /client

COPY package*.json ./

# Installing packages
RUN yarn --silent

COPY . .

RUN yarn build
RUN npm install -g http-server

COPY .env ./build
ENV REACT_APP_BackEndUrl=http://localhost:4000

# Start server
CMD [ "http-server", "./build" ]