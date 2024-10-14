# Stage 1: Development Environment
FROM node:18-alpine AS development

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including devDependencies)
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 3000

# Define the default command to run the application in development mode
CMD ["pnpm", "run", "start:dev", "reservations"]
