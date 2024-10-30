# Use a specific Node version instead of 'latest' for better build consistency
FROM node:18

# Create and set the app directory
WORKDIR /app

# Copy only package.json and package-lock.json (if available) to cache dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Start the application
CMD ["npm", "run" , "dev"]
