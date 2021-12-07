FROM node:16-alpine

WORKDIR /dashboard

COPY package*.json ./

# Installing packages
RUN yarn --silent

COPY . .

EXPOSE 3000

# Start development server
CMD [ "yarn", "start" ]