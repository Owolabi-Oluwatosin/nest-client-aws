# Stage 1
FROM node:16-alpine as builder

# Set working directory
WORKDIR /app

# Copying packages
COPY package.json .
COPY yarn.lock .

# Installing packages
RUN yarn install

# Copy the rest of the code
COPY . .

# Build the project
RUN yarn build


# Stage 2 for Nginx setup
FROM nginx:alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=builder /app/build .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"] 

