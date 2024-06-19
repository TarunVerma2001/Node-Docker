# Use the official Node.js image.
FROM node:20

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and install dependencies.
COPY package*.json ./

RUN npm install


# Copy the rest of the application code.
COPY . .

RUN npx prisma generate

RUN npx prisma migrate deploy
RUN npm run build

# Expose port 5000.
EXPOSE 4000

# Start the server.
CMD ["node", "dist/index.js"]
