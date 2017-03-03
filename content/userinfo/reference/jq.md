+++
author = "SOMRC Staff"
description = ""
title = "JQ (Shell)"
draft = false
date = "2017-02-08T15:28:51-05:00"
tags = ["json","shell"]
categories = ["reference"]
images = [""]
type = "reference"
project = "jq Project"
projecturl = "https://stedolan.github.io/jq/"

+++

<div class="bd-callout bd-callout-warning">
<h4>jq</h4>
<code>jq</code> is like <code>sed</code> for JSON data - you can use it to slice and filter and map and transform structured data with 
the same ease that <code>sed</code>, <code>awk</code>, <code>grep</code> and friends let you play with text.
</div>

# Installation

Follow the instructions available on https://stedolan.github.io/jq/ for installing the latest version for your platform. 

- - -

# Basic Usage

`jq` is used to parse JSON, which helps with programmatic interaction with many APIs. For example, you can retrieve data from an open API like GitHub:

    curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5'

And then pipe that output to `jq` to begin to parse the results. You can filter down to just the first record `[0]`:

    curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5' \
        | jq '.[0]'

And then begin to drill down to specific elements of the response hierarchy, building into a new structure:

    curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5' \
        | jq '.[0] | {message: .commit.message, name: .commit.committer.name}'

which results in this response:

    {
      "message": "Merge pull request #162 from stedolan. Closes #161",
      "name": "Stephen Dolan"
    }

`jq` is extremely useful alongside the [AWS command-line tools](https://somrc.virginia.edu/userinfo/reference/aws-cli/).

- - -

Or, if you wanted to grab a series of values from all entries you retrieved, you could filter into an array. Here are the sha values for 5 recent commits by the user `stedolan`:

    curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5' | jq -r .[].sha

which results in this output:

    dc679081fa770c260ca9a569a8a4fdbb10bcdc20
    597c1f6667746058e88a9f6fb0415f80fe114b18
    125071cf005e687d4beba9d5822b1c6a72d7d14c
    2fb099e4cfe5a9fedd55a1ace44ae2c5ee02cb12
    6f9646a44ff0046126f5a2c3010e92a974da7c48

- - -

# Real-world examples

Here are some `bash` snippets for various tasks that combine the AWS CLI with `jq`:

{{< gist nmagee d13a67b82859fcef53acff568ecb114d >}}

- - -

# Online Testing

The authors of `jq` also provide https://jqplay.org/ as a space where you can interactively build and test your `jq` parsing.
