FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npx", "nodemon", "--legacy-watch", "--watch", "src", "--ext", "js,json", "src/server.js"]

