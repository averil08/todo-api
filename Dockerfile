FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN rm -rf /app/src/generated

RUN npx prisma generate
RUN npm run build
RUN cp -r /app/src/generated /app/dist/src/generated

ENV PORT=3000
EXPOSE 3000
CMD ["node", "./dist/src/server.js"]