FROM node:14.18.0-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp

ENV PORT=5000
ENV NODE_ENV='production'
EXPOSE 5000
CMD ["npm", "run", "docker-build-webapp"] 
