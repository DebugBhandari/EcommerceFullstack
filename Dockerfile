FROM node:15.14.0-alpine3.10

# Create app directory
WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY package-lock.json ./
RUN npm install -g npm@7.8.0
RUN npm rebuild node-sass 
RUN npm install
COPY . ./
CMD ["npm", "start"] 
