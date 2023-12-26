# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# TypeScript compiler
RUN npm run build

# Make port 80 available to the outside of the Docker container
EXPOSE 80

# Run the application when the Docker container launches
CMD ["node", "dist/script.js"]