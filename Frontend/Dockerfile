# Use an official Node runtime as a parent image
FROM node:18-alpine

RUN yarn global add serve

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN yarn build

ENTRYPOINT ["serve", "-s", "build"]