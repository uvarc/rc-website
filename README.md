[![Build Status](https://travis-ci.org/uvasomrc/rc-website.svg?branch=master)](https://travis-ci.org/uvasomrc/rc-website)

# SOM Research Computing Website

**Production URL:**
https://somrc.virginia.edu/

## Developing

### Using Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/uvasomrc/rc-website/tree/staging)

This will bring up a ready-to-code environment on the `staging` branch, and download and start [hugo](https://gohugo.io) in server mode.

### Local Install

* [Install](https://gohugo.io/overview/installing/) the HUGO binary on your local computer. For more information, see the Hugo GitHub repo: https://github.com/spf13/hugo
* Clone this website repository: `git clone git@github.com:uva-som-rc/rc-website.git`.

## Create new content.

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
To "feature" a post on the home page (which displays 2 most recent feature posts), simply add a TAG with the value `feature`.

    tags = ["feature","another-tag","yet-another-tag"]

## Preview your content locally
`hugo server` will bring up the local Node.js server and give you a preview URL `http://localhost:1313/`

## Publish your content
Simply push `master` or `staging` back to GitHub. Travis will handle it from there.

## Delete content
* Delete the .md object(s) you no longer want in the site, then commit and push.
* To temporarily remove content, set the `draft` status of any .md object to `true`.
* Republishing deletes remote files in S3.

## Modify the theme:

* HUGO themes can be [browsed here](http://themes.gohugo.io/).
* Themes for HUGO are written using the TwiMG syntax. This can be found within various files/folders of the `themes/xxxxx` dir.
* Themes are (usually) standalone repositories themselves, unless customized, as in this case. You can try out a new theme by cloning its repo into the /themes/ dir, and then changing config.toml to identify the theme you wish to use before you build again.
* Changes to /static/css/style.css and /static/js/scripts.js are automatically minified using `yuicompressor`.

## Events Data

The "Training" widget and workshops page are both fed from a JSON API connected to the education.cadre.virginia.edu portal. They are updated when the site is published (by hand) or every 24 hours by a Travis-CI cron job.
