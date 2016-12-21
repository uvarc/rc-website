#!/bin/bash

echo "--- Clear the /public/ dir of all content"
cd public/
rm -R *
cd ../
echo "--- Content cleared"

hugo
echo "--- Hugo content generated"

aws s3 sync --delete public/ s3://somrc-website/
echo "--- Public dir published to AWS"
