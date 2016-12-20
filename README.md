# Research Computing - Website

**Development Site URL:**
http://somrc-website.s3-website-us-east-1.amazonaws.com/

**To install:**
* [Install](https://gohugo.io/overview/installing/) the HUGO GoLang framework on your local computer. For more information, see the Hugo GitHub repo: https://github.com/spf13/hugo
* Install the AWSCLI `pip install awscli` (or `sudo pip install awscli`)
* Configure the AWSCLI with your IAM key/secret: `aws configure` and follow the prompts.
  * If asked for a region: `us-east-1`
  * If asked for a format: `text` | `json` | `table` (select one)
* Clone this website repository 
  * `git clone git@github.com:uva-som-rc/rc-website.git` or
  * `git clone https://github.com/uva-som-rc/rc-website.git`

**To create new content:**
* Follow guidelines from https://gohugo.io/content/organization/. But essentially you use the `hugo new` command declaring the path to the .md object you want to create.
  * `hugo new content/post/here-is-my-post.md`
  * `hugo new content/top-level-page.md`
  * Reference: [markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
  * Store images in `content/images/`. For example, the published URL of `content/images/uva-som.jpg will be `http://somrc-website.s3-website-us-east-1.amazonaws.com/images/uva-som.jpg`

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

**To publish your content:**
* `cd` to the root level of the site tree
* Publish by executing the bash script `./publish.sh`
* Publishing generates all HTML/css/js into a /public/ directory, and then syncs that dir to the s3://somrc-website/ bucket in AWS.

**To delete content:**
* Delete the .md object(s) you no longer want in the site + republish.
* Republishing deletes remote files in S3.

**To modify the theme:**
* HUGO themes can be [browsed here](http://themes.gohugo.io/).
* Themes for HUGO are written using the TWIG syntax. This can be found within various files/folders of the `themes/xxxxx` dir.
* Themes are (usually) standalone repositories themselves, unless customized, as in this case. You can try out a new theme by cloning its repo into the /themes/ dir, and then changing config.toml to identify the theme you wish to use before you build again.
