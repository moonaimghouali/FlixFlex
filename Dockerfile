FROM node:16

# Working dir
WORKDIR /usr/src/app

# Copy files from Build
COPY package*.json ./

# Install Files
RUN npm install 

# Copy SRC
COPY . .

# Set environment variables for your PostgreSQL database connection
ENV DATABASE_URL postgresql://postgres:mnmthetopdawg@host.docker.internal:5432/$flixdb?schema=public

# Initialise prisma client
RUN npx prisma migrate deploy

# Initialise prisma client
RUN npx prisma generate

# Open Port
EXPOSE 3000

# Docker Command to Start Service
CMD [ "node", "./src/server.js" ]