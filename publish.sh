#!/bin/bash

set -e
clear

echo ""
echo "  ------------------------------------------------------- "
echo "  --- Publishing with this method has been deprecated --- "
echo "  --- Use this method only in break-glass situations  --- "
echo "  --- Or for publishing preview deployments           --- "
echo "  ------------------------------------------------------- "
echo "  Simply commit your changes and 'git push origin BRANCH' "
echo "  to deploy your code. The deployment pipeline will take  "
echo "  it from there.                                          "
echo ""
echo "**********************************************************"

echo ""
read -p "   Which branch do you want to publish, main/staging/feature? [m/s/f]: " proceed
case $proceed in
    [m]* ) proceedx="1";;
    [s]* ) proceedx="2";;
    [f]* ) proceedx="3";;
    * ) echo "Please answer m/s/f";;
esac

if [ $proceedx -eq 2 ]
then
  git checkout staging
  echo "You are publishing the STAGING branch"
  echo "--- Clear the /public/ dir of all content"
  rm -Rf public/
  mkdir public
  echo "--- Content cleared"
  hugo -v --ignoreCache    # try without cache
  echo "--- Hugo content generated"
  aws s3 sync --delete --cache-control max-age=86400 public/ s3://uvarc-website-staging/
  echo "--- Public dir published to AWS"
  aws cloudfront create-invalidation --distribution-id "E2QEVT4CQZYUPG" --paths "/*"
  exit 0
elif [ $proceedx -eq 1 ]
then
  git checkout main
  echo "You are publishing the MAIN branch"
  echo "--- Clear the /public/ dir of all content"
  rm -Rf public/
  mkdir public
  echo "--- Content cleared"
  hugo -v --ignoreCache    # try without cache
  echo "--- Hugo content generated"
  aws s3 sync --delete --cache-control max-age=86400 public/ s3://uvarc-website/
  echo "--- Public dir published to AWS"
  aws cloudfront create-invalidation --distribution-id "EAQ13XDB9RM7R" --paths "/*"
  exit 0
elif [ $proceedx -eq 3 ]
then
  git checkout feature
  echo "You are publishing the FEATURE branch"
  echo "--- Clear the /public/ dir of all content"
  rm -Rf public/
  mkdir public
  echo "--- Content cleared"
  hugo -v --ignoreCache    # try without cache
  echo "--- Hugo content generated"
  aws s3 sync --acl public-read --delete --cache-control max-age=86400 public/ s3://uvarc-website-feature/
  echo "--- Public dir published to AWS"
  aws cloudfront create-invalidation --distribution-id "E30AOR0D11NS3I" --paths "/*"
  exit 0
fi
