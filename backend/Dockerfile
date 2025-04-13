FROM node:18-alpine

# Install Python and build dependencies
RUN apk add --no-cache python3 make g++ gcc

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"] 