# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app

# Copia pacotes e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código e compila
COPY . .
RUN npm run build

# Etapa final (produção)
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

RUN npm install -g @nestjs/cli

EXPOSE 3000

CMD ["/bin/sh", "-c", "if [ \"$NODE_ENV\" = 'development' ]; then nest start --watch; else node dist/main.js; fi"]
