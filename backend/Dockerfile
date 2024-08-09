FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm
RUN npm install -g typescript

COPY package.json /app/package.json

RUN pnpm install

COPY . /app

EXPOSE 3000
CMD ["pnpm", "start"]