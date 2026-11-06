
FROM ghcr.io/uvarc/hugo-build:prod-0.133.0 AS base

WORKDIR /site

COPY . /site

FROM base AS app

# Install NGINX
USER root

RUN apk add --no-cache nginx

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Hugo listens on 1314 internally
# NGINX listens on 1313 externally
EXPOSE 1313

# Start Hugo and NGINX
CMD ["sh", "-c", "hugo server --bind 127.0.0.1 --port 1314 --appendPort=false & nginx -g 'daemon off;'"]
