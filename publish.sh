#!/bin/bash

set -e
clear

echo ""
echo "  ------------------------------------------------------- "
echo "  --- Publishing with this method has been deprecated --- "
echo "  --- Use this method only in break-glass situations  --- "
echo "  ------------------------------------------------------- "
echo "  Simply commit your changes and 'git push origin BRANCH' "
echo "  to deploy your code. The deployment pipeline will take  "
echo "  it from there.                                          "
echo ""
echo "**********************************************************"

echo ""
read -p "   Which branch do you want to publish: main, staging, or preview? [m/s/p]: " proceed
case $proceed in
    [m]* ) proceedx="1";;
    [s]* ) proceedx="2";;
    [p]* ) proceedx="3";;
    * ) echo "Please answer [m/s/p]";;
esac

if [ $proceedx -eq 3 ]
then
  git checkout vpr
  echo "You are publishing the VPR branch"
  echo "--- Clear the /public/ dir of all content"
  rm -Rf public/
  mkdir public
  echo "--- Content cleared"
  hugo -v --ignoreCache    # try without cache
  echo "--- Hugo content generated"
  yuicompressor --type js static/js/scripts.js > static/js/scripts.min.js
  yuicompressor --type css static/css/style.css > static/css/style.min.css
  yuicompressor --type js static/js/user-session.js > static/js/user-session.min.js
  html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype public/index.html -o public/index.html;
  html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype public/project/index.html -o public/project/index.html;
  aws s3 sync --delete --cache-control max-age=86400 public/ s3://uvarc-website-preview/
  echo "--- Public dir published to AWS"
  echo "Preview URL: http://uvarc-website-preview.s3-website-us-east-1.amazonaws.com/"
  exit 0
elif [ $proceedx -eq 2 ]
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
fi
