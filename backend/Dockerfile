FROM node:18-alpine3.17
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
# This will install node modules in the container
RUN npm install
# Copy every file from here to the container
COPY . .
RUN npm run build
CMD [ "npm", "run", "start" ]