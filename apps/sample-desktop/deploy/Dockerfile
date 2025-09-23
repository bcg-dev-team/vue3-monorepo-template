# Simple nginx serving for pre-built assets
FROM nginx:alpine

# Copy built files from sample-desktop (built by GitHub Actions)
COPY apps/sample-desktop/dist /usr/share/nginx/html

# Copy nginx configuration
COPY apps/sample-desktop/deploy/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
