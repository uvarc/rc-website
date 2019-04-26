#!/bin/bash -e

cd /workspace/rc-website
/workspace/hugo server -b https://1313-${GITPOD_WORKSPACE_URL#https://} --appendPort=false $@
cat <<EOF


"$ ./.gitpod/start-hugo.sh" to re-start hugo
- or -
"$ ./.gitpod/start-hugo.sh <options>" to start with additional options

EOF