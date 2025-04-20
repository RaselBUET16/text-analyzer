# 1 - build
FROM node:18-alpine AS vite-builder

WORKDIR /app

COPY package*.json ./
COPY . .

ARG VITE_API_URL

ENV VITE_API_URL=${VITE_API_URL}

RUN npm install && \
    npm run build


# 2 - Serve
FROM node:18-alpine AS final

WORKDIR /app

COPY --from=vite-builder /app/dist/ /app/dist

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "/app/dist/", "-p", "3000"]