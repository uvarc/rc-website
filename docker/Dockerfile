FROM ghcr.io/uvarc/hugo-build:prod-0.133.0 AS base

# working directory
WORKDIR /site

# Copy the website files into the container
COPY . /site

FROM base AS app

# Expose port 1313
EXPOSE 1313

# Run Hugo server
ENTRYPOINT ["hugo", "server", "--bind", "0.0.0.0"]
