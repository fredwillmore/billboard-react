# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a simple server to serve the build
RUN npm install -g serve

# Expose the port on which your app will run
ENV PORT=3003
EXPOSE 3003

# Command to run your application
CMD ["serve", "-s", "build"]
