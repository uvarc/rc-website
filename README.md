[![Build Status](https://travis-ci.org/uvasomrc/rc-website.svg?branch=master)](https://travis-ci.org/uvasomrc/rc-website)

[![wercker status](https://app.wercker.com/status/87051bd73f34e20177c0b334d5c060c8/m/master "wercker status")](https://app.wercker.com/project/byKey/87051bd73f34e20177c0b334d5c060c8)

# SOM Research Computing Website

**Production URL:**
https://somrc.virginia.edu/

## Install

* [Install](https://gohugo.io/overview/installing/) the HUGO GoLang framework on your local computer. For more information, see the Hugo GitHub repo: https://github.com/spf13/hugo
* Clone this website repository 
  * `git clone git@github.com:uva-som-rc/rc-website.git` or
  * `git clone https://github.com/uva-som-rc/rc-website.git`
* (Optional) Install the AWSCLI `pip install awscli` (or `sudo pip install awscli`)
* (Optional) Configure the AWSCLI with your IAM key/secret: `aws configure` and follow the prompts. Set for region `us-east-1`.

## Create new content

Follow guidelines from https://gohugo.io/content/organization/. But essentially you use the `hugo new` command declaring the path to the .md object you want to create.
  * `hugo new post/here-is-my-post.md`
  * `hugo new top-level-page.md`
  * Reference: [markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
  * Store images in `static/images/`. For example, the published URL of `static/images/uva-som.jpg` will be https://somrc.virginia.edu/images/uva-som.jpg

**About front matter metadata (at the head of each object):**

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

## Featured Content
To "feature" a post on the home page (which displays 2 most recent feature posts), simply add a TAG with the value "feature".

## Preview your content locally
`hugo server` will bring up the local Node.js server and give you a preview URL `http://localhost:1313/`

## Publish your content
* `cd` to the root level of the site tree
* Publish by executing the bash script `./publish.sh`
* Publishing generates all HTML/css/js into a /public/ directory, and then syncs that dir to the s3://somrc-website/ bucket in AWS.

## Delete content
* Delete the .md object(s) you no longer want in the site + republish.
* Republishing deletes remote files in S3.

## Flush the CloudFront Cache

To remove a cached object so you can see it immediately, configure the AWSCLI (steps above) and run the local `./publish.sh` script.

Or execute this from your command-line:

    aws cloudfront create-invalidation --distribution-id "E1JZBKRR78QE2T" --paths "/*"

## Modify the theme:

* HUGO themes can be [browsed here](http://themes.gohugo.io/).
* Themes for HUGO are written using the TwiMG syntax. This can be found within various files/folders of the `themes/xxxxx` dir.
* Themes are (usually) standalone repositories themselves, unless customized, as in this case. You can try out a new theme by cloning its repo into the /themes/ dir, and then changing config.toml to identify the theme you wish to use before you build again.

## Events Data

The "Training / Upcoming Events" grid is populated by the `events.csv` file. Hugo renders the CSV into HTML when the site is compiled.
