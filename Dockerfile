FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
EXPOSE 3000
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]