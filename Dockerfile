FROM node:14.18.0-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN npm install
    
ENV MONGODB_URI=mongodb+srv://deepak:deepak@cluster0.e5jfp.mongodb.net/IntegrifyFull?retryWrites=true&w=majority
ENV JWT_SECRET=ashdfjhasdlkjfhalksdjhflak
ENV GOOGLE_CLIENT_ID = 701388926312-pd0te09anv6p15h6q8soj9uk9h7tb1e0.apps.googleusercontent.com

ENV PORT=3001
ENV NODE_ENV='production'
EXPOSE 3001
CMD ["npm", "run", "docker-build-webapp"] 
