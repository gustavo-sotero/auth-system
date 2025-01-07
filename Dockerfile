# Imagem base
FROM node:22-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar resto dos arquivos
COPY . .

# Gerar prisma client
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Expor porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["sh", "-c", '"npx prisma migrate dev && npm start"']
