FROM ghcr.io/uvarc/hugo-build:v3

# working directory
WORKDIR /site

# Copy the website files into the container
COPY . /site

# Expose port 1313
EXPOSE 1313

# Run Hugo server
ENTRYPOINT ["hugo-0.133.0-ext", "server", "--bind", "0.0.0.0"]
