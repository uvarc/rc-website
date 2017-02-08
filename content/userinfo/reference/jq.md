+++
author = "SOMRC Staff"
description = ""
title = "jq (bash)"
draft = false
date = "2017-02-08T15:28:51-05:00"
tags = ["json","bash"]
categories = ["reference"]
images = [""]
type = "reference"

+++

From their website:

>`jq` is like `sed` for JSON data - you can use it to slice and filter and map and transform structured data with the same ease that `sed`, `awk`, `grep` and friends let you play with text.

- - -

# Download & Install `jq`

Follow the instructions available on https://stedolan.github.io/jq/ for installing the latest version for your platform. 

- - -

# Basic Usage of `jq`

`jq` is used to parse JSON, which helps with programmatic interaction with many APIs. For example, you can retrieve data from an open API like GitHub:

    curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=3'

And then pipe that output to `jq` to begin to parse the results. Here you can filter down to only the first record `[0]`:

    curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5' \
        | jq '.[0]'

And then begin to drill down to specific elements of the response hierarchy:

    curl 'https://api.github.com/repos/stedolan/jq/commits?per_page=5' \
        | jq '.[0] | {message: .commit.message, name: .commit.committer.name}'

would result in this filtered response:

    {
      "message": "Merge pull request #162 from stedolan/utf8-fixes\n\nUtf8 fixes. Closes #161",
      "name": "Stephen Dolan"
    }

- - -

# Real-world examples

Here are some `bash` snippets for various tasks that combine the AWS CLI with `jq`:

{{< gist nmagee d13a67b82859fcef53acff568ecb114d >}}

- - -

# Online Testing

The authors of `jq` also provide https://jqplay.org/ as a space where you can interactively build and test your `jq` parsing.
