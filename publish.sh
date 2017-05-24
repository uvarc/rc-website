#!/bin/bash

set -e
clear

echo ""
echo "  ------------------------------------------------------- "
echo "  --- Publishing with this method has been deprecated --- "
echo "  ------------------------------------------------------- "
echo "  Simply commit your changes and 'git push origin master' "
echo "  to deploy your code. The deployment pipeline will take  "
echo "  it from there.                                          "
echo ""
echo "**********************************************************"

# Ship the events CSV file
# aws s3 cp --acl public-read events.csv s3://somrc-data/events/

echo ""
read -p "   Do you still want to manually publish? [Y/n]: " proceed
case $proceed in
    [Yy]* ) proceedx="1"; break;;
    [Nn]* ) proceedx="2";;
    * ) echo "Please answer Y or N";;
esac

if [ $proceedx -eq 2 ]
then
  echo ""
  echo "Exiting..."
  echo ""
  exit
else
  echo "--- Clear the /public/ dir of all content"
  cd public/
  rm -R *
  cd ../
  echo "--- Content cleared"
  hugo --disableRSS --disable404 -v --ignoreCache
  echo "--- Hugo content generated"
  cp -R storage public/storage
  echo "--- Copied mockup of storage decision tree"
  cp google091118a6c00d06c0.html public/
  echo "--- Google domain verification copied"
  cp robots.txt public/
  echo "--- Robots file copied"
  cp 404.html public/
  echo "--- 404 error page copied"
  aws s3 sync --delete public/ s3://somrc-website/
  echo "--- Public dir published to AWS"
fi
