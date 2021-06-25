FROM node:16-alpine

WORKDIR /client

COPY package*.json ./

# Installing packages
RUN yarn --silent

COPY . .

EXPOSE 3000

# Start development server
CMD [ "yarn", "start" ]