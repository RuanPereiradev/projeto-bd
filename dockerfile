FROM node:18-alpine

WORKDIR /app

# Instala dependências do sistema necessárias para MySQL
RUN apk add --no-cache openssl

# Copia arquivos de configuração primeiro (para cache de camadas)
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências Node.js
RUN npm install

# Copia o restante do código
COPY . .

# Cria um usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app
USER nodejs

# Expõe a porta da aplicação
EXPOSE 3000

# Comando padrão (será sobrescrito pelo docker-compose)
CMD ["npm", "run", "dev"]