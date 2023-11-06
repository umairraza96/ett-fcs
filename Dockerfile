FROM node:18.12.1

WORKDIR /app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm i 

COPY . .

RUN npx prisma generate

EXPOSE 3030

CMD ["pnpm", "start:dev"]

