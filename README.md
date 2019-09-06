[![Build Status](https://travis-ci.org/uvasomrc/rc-website.svg?branch=master)](https://travis-ci.org/uvasomrc/rc-website)

# UVA Research Computing Website

**Staging URL:**
https://staging.rc.virginia.edu/

**Production URL:**
https://www.rc.virginia.edu/

## Developing

### Using Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/uvasomrc/rc-website/tree/staging)

This will bring up a ready-to-code environment on the `staging` branch, and download and start [hugo](https://gohugo.io) in server mode.

- - -

### Local Install

* [Install](https://gohugo.io/overview/installing/) the HUGO binary on your local computer. For more information, see the Hugo GitHub repo: https://github.com/spf13/hugo
* Clone this website repository: `git clone git@github.com:uva-som-rc/rc-website.git`.

- - -

## Creating New Content

The `TL;DR` version:

1. Make your changes to the `staging` branch and be sure to preview locally before you push back to GitHub.
2. All website pages are stored within `/content/`
3. You can use Markdown or HTML (or a mix of both) within pages.

Content of this website is contained in a series of markdown files within the `content/` subdirectory. The site hierarchy consists of 7 subsections:

* `about` - Mission statement and staff directory.
* `education` - Workshops, links to CADRE Ed platform, etc.
* `form` - All user forms for support tickets, consultations, allocation requests, etc.
* `post` - General posts like features, announcements.
* `project` - The series of recent projects featured in tiles.
* `service` - Services offered by our staff.
* `userinfo` - Systems and information we support: Rivanna, Ivy, Skyline, etc., and detailed user information.

### Two methods for creating content:

1. Copy an existing page and modify it.
2. Create a new page using the `hugo new` command declaring a path to the .md object you want to create:
  * `hugo new post/here-is-my-post.md`
  * `hugo new top-level-page.md`
  
### Helpful notes about creating content:

  * The "content type" of a page is usually determined by what folder it is in. Different content types are displayed in slightly different ways, i.e. the sidebar or layout.
  * Reference: [markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
  * Store images in `static/images/`. For example, the published URL of `static/images/uva-logo.jpg` will be https://www.rc.virginia.edu/images/uva-logo.jpg
  * Follow guidelines from https://gohugo.io/content/organization/.

### About front matter

Metadata for each web page is contained in TOML format at the top of each markdown page. The only required fields are usually TITLE and DATE. Categories and Tags can be as numerous as you find useful.

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

### Shortcodes

You can do fancy things within regular markdown pages by using "shortcodes". A few examples:

Lead text (larger at the top of a post):

    {{< lead >}}
      This text will be larger and more visible.
    {{< /lead >}}

Embed a YouTube video:

    {{< youtube w7Ft2ymGmfc >}}
    
A gist in GitHub:

    {{< gist spf13 7896402 >}}

A simple highlight:

    {{< highlight >}}
      This text is going to get some fancy highlighting!
    {{< /highlight >}}

A specific tweet:

    {{< tweet 877500564405444608 >}}

A CADRE Education Track tile:

    {{< education-track 279 >}}


### Featured Content
To "feature" a post on the home page (which displays 2 most recent feature posts), simply add a CATEGORY with the value `feature`.

    categories = ["feature","another-category","yet-another-category"]

### Preview content locally
`hugo server` will bring up the local hugo server and give you a preview URL `http://localhost:1313/`. If making many changes, open another terminal to keep the `hugo server` running as you edit.

### Publish content
Simply push `staging` back to GitHub. TravisCI will handle it from there. Pushing your content to the production website requires a PULL REQUEST.

> Remember that after pushing your changes back to the `staging` branch, the https://staging.rc.virginia.edu/ website will be updated within 1-2 minutes. Hold down the SHIFT key when reloading your browser to refresh your local cache.

### Delete content
* Delete the .md object(s) you no longer want in the site, then commit and push.
* To temporarily remove content, set the `draft` status of any .md object to `true`.
* Republishing deletes remote files in S3/CloudFront.

### Events Data

The "Training" widget and workshops page are both fed from a JSON API connected to the education.cadre.virginia.edu portal. They are updated when the site is published (by hand) or every 24 hours by a Travis-CI cron job.

## Search

Site search is provided by Google CSE. Publishing in hugo generates a `/sitemap.xml` file that is bound to Google's crawlers. If you would like to omit a page from search, include `private = true` in the front matter of your page. The crawler generally refreshes every 3-7 days.
