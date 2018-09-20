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

echo ""
read -p "   Do you want to manually publish? [Y/n]: " proceed
case $proceed in
    [Yy]* ) proceedx="1";;
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
  hugo -v --ignoreCache    # try without cache
  echo "--- Hugo content generated"
  aws s3 sync --delete --cache-control max-age=604800 public/ s3://somrc-website/
  # aws s3 sync --delete public/ s3://somrc-website-uswest2/
  echo "--- Public dir published to AWS"
fi

aws cloudfront create-invalidation --distribution-id "E1D17U7SPHRTOU" --paths "/*"
