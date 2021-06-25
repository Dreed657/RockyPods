FROM node:16-alpine

WORKDIR /server

COPY package*.json ./

# Installing packages
RUN yarn

COPY . .

ENV PORT=5000
EXPOSE 5000

# Cleans previus build from ./dist 
# Checks with tslint 
# Run tsc to create new build in ./dist
RUN yarn build

# Start builded project in ./dist
CMD [ "yarn", "start" ]