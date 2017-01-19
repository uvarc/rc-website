#!/bin/bash

echo "--- Clear the /public/ dir of all content"
cd public/
rm -R *
cd ../
echo "--- Content cleared"

hugo
echo "--- Hugo content generated"

cp google091118a6c00d06c0.html public/
echo "--- Google domain verification copied"
cp robots.txt public/
echo "--- Robots file copied"

aws s3 sync --delete public/ s3://somrc-website/
echo "--- Public dir published to AWS"
