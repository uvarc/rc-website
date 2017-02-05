#!/bin/bash

# Ship the events CSV file
aws s3 cp --acl public-read events.csv s3://somrc-data/events/

echo "--- Clear the /public/ dir of all content"
cd public/
rm -R *
cd ../
echo "--- Content cleared"

hugo --disableRSS --disable404 -v --ignoreCache
echo "--- Hugo content generated"

mkdir public/data
cp events.csv public/data/
echo "--- Events data copied"
cp google091118a6c00d06c0.html public/
echo "--- Google domain verification copied"
cp robots.txt public/
echo "--- Robots file copied"
cp 404.html public/
echo "--- 404 error page copied"

aws s3 sync --delete public/ s3://somrc-website/
echo "--- Public dir published to AWS"
