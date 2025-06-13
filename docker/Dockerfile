# Use rocky Linux 8.9
FROM rockylinux:8.9

# Install dependencies
RUN yum -y update && \
    yum -y install epel-release && \
    yum -y install wget tar git && \
    yum clean all

# Install Hugo
ENV HUGO_VERSION 0.117.0
RUN wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    tar -zxvf hugo_${HUGO_VERSION}_Linux-64bit.tar.gz && \
    mv hugo /usr/local/bin/hugo && \
    rm hugo_${HUGO_VERSION}_Linux-64bit.tar.gz

# working directory
WORKDIR /site

# Copy the website files into the container
COPY . /site

# Expose port 1313
EXPOSE 1313

# Run Hugo server
CMD ["hugo", "server", "--bind", "0.0.0.0"]