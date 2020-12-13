FROM node:12.19.0

# Create Directory for the Container
WORKDIR /usr/src/app

# Only copy the package.json file to work directory
COPY package.json .

# Install all Packages
RUN npm install

# Copy all other source code to work directory
ADD . /usr/src/app

# TypeScript Compile
RUN npm run compile

CMD ["docker", "system", "prune"]

# Start
CMD [ "npm", "start" ]