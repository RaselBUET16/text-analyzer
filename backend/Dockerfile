# Use Node.js 18.20.5 as base image
FROM node:18-alpine

# Install PM2 globally
RUN npm install -g pm2

# Set working directory
WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Create logs directory
RUN mkdir -p /app/logs

# Expose the port
EXPOSE 5000

CMD ["sh", "-c", "pm2 start ./server.js --name text_analyzer_express && pm2 save && pm2 logs"]
