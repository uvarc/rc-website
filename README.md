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

** About HEAD matter metadata:**
    +++
    categories = [
      "category1",
      "category2",
    ]
    tags = [
      "hpc",
      "cluster",
      "ivy",
    ]
    draft = false
    date = "2016-12-20T09:07:38-05:00"
    title = "Another Post Title Goes Here"
    images = [
      "/2016/10/image-for-previews.jpg",
    ]
    description = "This is where a brief page description could go."
    +++


**To delete content:**
* Delete the .md file(s) you no longer want in the site
  
**To publish your content:**
* `cd` to the root level of the site tree
* Publish by executing the bash script `./publish.sh`
* Publishing will generate all HTML into a new /public/ directory, and then sync that dir to the s3://somrc-website/ bucket in AWS.

**To modify the theme:**
* Themes for HUGO are written using the TWIG syntax. This can be found within various files/folders of the `themes/xxxxx` dir.
* Themes are (usually) standalone repositories themselves, unless customized, as in this case. You can try out a new theme by cloning its repo into the /themes/ dir, and then changing config.toml to identify the theme you wish to use before you build again.
