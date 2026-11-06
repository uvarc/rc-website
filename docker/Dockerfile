
FROM ghcr.io/uvarc/hugo-build:prod-0.133.0 AS base

WORKDIR /site

COPY . /site

FROM base AS app

# Install NGINX
USER root

RUN apk add --no-cache nginx \
    && mkdir -p /run/nginx

# Copy NGINX configuration to the correct directory
COPY nginx.conf /etc/nginx/conf.d/rc-website.conf

# Hugo: 1314
# NGINX: 1313
EXPOSE 1313

# Start Hugo and NGINX
CMD ["sh", "-c", "hugo server --bind 127.0.0.1 --port 1314 --baseURL forms.rc.virginia.edu --appendPort=false & exec nginx -g 'daemon off;'"]
