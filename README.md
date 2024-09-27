![Hugo Build CI](https://github.com/uvarc/rc-website/workflows/Hugo%20Build%20CI/badge.svg)

# UVA Research Computing Website test -

| Staging URL   | Production URL |
| ------------- | ------------- |
| https://staging.rc.virginia.edu/ | https://www.rc.virginia.edu/  |

  * [Developing](#developing)
     * [Using Web IDEs](#using-web-ides)
     * [Local Install](#local-install)
  * [Creating New Content](#creating-new-content)
     * [Methods for creating content](#methods-for-creating-content)
     * [Suggestions for creating content](#helpful-notes-about-creating-content)
     * [Front matter](#front-matter)
     * [Future Posts](#future-posts)
     * [Shortcodes](#shortcodes)
     * [Featured Content](#featured-content)
     * [Preview content locally](#preview-content-locally)
     * [Publish content](#publish-content)
     * [Delete content](#delete-content)
     * [Events Data](#events-data)
     * [Automated Builds](#automated-builds)
     * [Pushing to Production](#pushing-to-production)
  * [Forms & User Authentication](#forms-and-user-authentication)
  * [Search](#search)
  * [Status API](#status-api)

## Developing

### Using Web IDEs

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/uvarc/rc-website/tree/staging)

This will bring up a ready-to-code environment on the `staging` branch, and download and start [hugo](https://gohugo.io) in server mode.

[![Open in Github Editor](https://staging.rc.virginia.edu/images/logos/github-editor-160w.png)](https://github.dev/uvarc/rc-website/tree/staging)

This opens a full web-based IDE for updating content on the `staging` branch, ready for commits, PRs, etc. Saving your changes essentially pushes back to the branch. Does not provide a live preview.

- - -

### Local Install

* [Install](https://gohugo.io/overview/installing/) the HUGO binary on your local computer. Download the latest extended version https://github.com/gohugoio/hugo/releases.
* Clone this website repository: `git clone --branch staging git@github.com:uvarc/rc-website.git`.

- - -

## Creating New Content

The `TL;DR` version:

1. Make your changes to the `staging` branch and be sure to preview locally before you push back to GitHub. You cannot push local changes to the main branch directly, it is protected (see **Pushing to Production** below). 
2. All website pages are stored within `/content/`
3. You can use Markdown or HTML (or a mix of both) within pages.

Content of this website is contained in a series of markdown files within the `content/` subdirectory. The site hierarchy consists of 7 subsections:

* `about` - Mission statement and staff directory.
* `education` - Workshops, links to CADRE Ed platform, etc.
* `form` - All user forms for support tickets, consultations, allocation requests, etc.
* `post` - General posts like features, announcements.
* `project` - The series of recent projects featured in tiles.
* `service` - Services offered by our staff.
* `userinfo` - Systems and information we support: Rivanna, Afton, Ivy, Skyline, etc., and detailed user information.

### Methods for creating content:

1. Copy an existing page and modify it. Or,
2. Create a new page using the `hugo new` command declaring a path to the .md object you want to create:
  * `hugo new post/here-is-my-post.md`
  * `hugo new top-level-page.md`
  
### Suggestions for creating content:

  * The "content type" of a page is usually determined by what folder it is in. Different content types are displayed in slightly different ways, i.e. the sidebar or layout.
  * Reference: [markdown cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
  * Store images in `static/images/`. For example, the published URL of `static/images/uva-logo.jpg` will be https://www.rc.virginia.edu/images/uva-logo.jpg
  * Follow guidelines from https://gohugo.io/content/organization/.

### Front matter

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

### Future Posts

Using the `date` metadata smartly, you can forward date any post or article. [Automated builds](#automated-builds) happen each morning and your page will be published when that datetime has passed.

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


Shortcodes using `{{< >}}` simply render the text or HTML within the shortcode. Shortcodes using `{{% %}}` will also render any markdown within the shortcode.

### Featured Content
To "feature" a post on the home page (which displays 3 most recent feature posts), simply add a CATEGORY with the value `feature`.

    categories = ["another-category","yet-another-category","feature"]

### Preview content locally
`hugo server` will bring up the local hugo server and give you a preview URL `http://localhost:1313/`. If making many changes, open another terminal to keep the `hugo server` running as you edit.

### Publish content
Simply push `staging` back to GitHub. GitHub Actions will handle it from there - you can check the 
build status by clicking the "Hugo Build CI" status badge at the top of this page. Pushing your content to 
the production website requires a PULL REQUEST.

> Remember that after pushing your changes back to the `staging` branch, the https://staging.rc.virginia.edu/ website will be updated within 1-2 minutes. Hold down the SHIFT key when reloading your browser to refresh your local cache.

### Delete content
* Delete the .md object(s) you no longer want in the site, then commit and push.
* To temporarily remove content, set the `draft` status of any .md object to `true`.
* Republishing deletes remote files in S3/CloudFront.

### Events Data

The "Training" widget and workshops page are both fed from the `/static/data/events.csv file`. Add new events at the bottom of the file. **Please do not remove past events**. Only upcoming events will be displayed on the website.

### Automated Builds

GitHub Actions is a CI/CD tool that automates builds and deployments of the website code. Take note 
of the contents of `.github/workflows/main.yml` and you will see instructions for how Actions builds the site:
* Upon a push to `staging` or `master` it launches a customized container `uvarc/hugo-build:v2`.
* That container runs a script that clones that branch of the repository and runs `hugo -v --ignoreCache` to build the site.
* Actions then synchronizes the published HTML, JS, CSS, images and files to Amazon S3.
* Finally, the build invalidates the CloudFront cache that serves out the actual website.

Build+deployment generally takes approximately 80 seconds and can be monitored using the [GitHub Actions 
dashboard](https://github.com/uvarc/rc-website/actions) for this repository.

### Pushing to Production

To merge your changes to the production website, please submit a pull request. Here's how to do that:

1. Switch to the [staging branch](https://github.com/uvarc/rc-website/tree/staging)
2. Click on the "Pull Request" link in the header area of the repository.
![Create a PR in GitHub](https://staging.rc.virginia.edu/images/github-pull-request.png)
3. Make sure that the STAGING branch will be merging into the MASTER branch (note the arrow between branch selectors). GitHub will indicate whether branches can automatically merge.
![Open a PR in GitHub](https://staging.rc.virginia.edu/images/github-merge-request.png)
4. Add an appropriate Title for your PR, such as "Merging Staging into Master". Add details if they seem helpful.
5. Click the green "Create Pull Request" button.
6. Repo admins will be notified of the PR and will approve it or get back to you if there is an issue.

## Forms and User Authentication

All request forms employ JS checks for the presence of user session cookies that define `name`, `uid`, and `eppn` (email). When these user session cookies are absent the browser is redirected to https://auth.rc.virginia.edu/ to re-establish a session.

Some additional fields can then be populated by URL queryString, such as the `category`, `request_title` and `description` fields in this URL:

    https://staging.rc.virginia.edu/form/support-request/?category=Rivanna&request_title=Intro%20to%20Rivanna%20Training%20Session&description=I%20am%20interested%20in%20signing%20up%20for%20a%20Rivanna%20training%20session.

## Search

Site search is provided by Google CSE. Publishing in hugo generates a `/sitemap.xml` file that is bound to Google's crawlers. If you would like to omit a page from search, include `private = true` in the front matter of your page. The crawler generally refreshes every 3-7 days.

## Audio

Some project pages have been called out to include an embedded audio version of the post. Building this feature is manual, per-page, and requires a few simple steps:

1. In the TOML head matter for the post, add `audio = true` to enable the audio player display. This generates an automated link to the audio file.
2. Grab the related `index.aud` file from the website for the page you want to enable with audio. This file is generated by the `hugo` build process and is available
by adding `/index.aud` to the end of the URL for the page. 
3. Create the audio file for the page by running the `audio.sh` script in the root of this repository. That script is expecting AWS credentials to generate MP3
audio files using AWS Polly. That file will be named `audio.mp3`.
4. Finally, upload the `audio.mp3` file to the `uvarc-media` S3 bucket with the same path as the slug of the post. This command line is at the bottom of the `audio.sh` script.

## Status API

The status API displayed on the home page of www.rc.virginia.edu and elsewhere is driven by an API Gateway with methods and endpoints derived from an AWS Lambda function.
Those exist outside of this code, but are consumed by JQuery display divs.

See the [**status-api**](https://github.com/uvarc/status-api) repository for details.

## Acknowledgments

* [Bootstrap4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [Google CSE](https://cse.google.com/)
* [Odometer JS](https://github.hubspot.com/odometer/)
