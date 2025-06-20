FROM ghcr.io/uvarc/hugo-build:v3

# working directory
WORKDIR /site

# Copy the website files into the container
COPY . /site

# Expose port 1313
EXPOSE 1313

# Run Hugo server
ENV HUGO_VERSION=0.133.0-ext
ENTRYPOINT ["hugo", "server", "--bind", "0.0.0.0"]
