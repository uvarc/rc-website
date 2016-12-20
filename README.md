# Research Computing - Website

**To install:**
* Install the HUGO platform on your workstation - https://github.com/spf13/hugo
* Install the AWSCLI `pip install awscli`
* Configure the AWSCLI with your IAM key/secret: `aws configure`
* Clone this repository

**To create new content:**
* Follow guidelines from https://gohugo.io/content/organization/
  * `hugo new content/post/here-is-my-post.md`
  * `hugo new content/top-level-page.md`

**To delete content:**
* Delete the .md file(s) you no longer want in the site
  
**To publish your content:**
* `cd` to the root level of the site tree
* Publish by executing the bash script `./publish.sh`
* Publishing will generate all HTML into a new /public/ directory, and then sync that dir to the s3://somrc-website/ bucket in AWS.

**To modify the theme:**
Themes for HUGO are written using the TWIG syntax. This can be found within various files/folders of the `themes/xxxxx` dir.
