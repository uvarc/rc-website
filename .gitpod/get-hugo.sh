#!/bin/bash -e

HUGO_VERSION="0.40.3"
HUGO_BINARY="https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_Linux-64bit.tar.gz"

curl -L "$HUGO_BINARY" | (cd /workspace; tar xzvf - hugo)

ln -s /workspace/hugo /home/gitpod/go/bin/hugo
