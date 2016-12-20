#!/bin/bash

hugo

aws s3 sync --delete public/ s3://somrc-website/
