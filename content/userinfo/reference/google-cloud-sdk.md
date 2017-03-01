+++
author = "SOMRC Staff"
description = ""
title = "Google Cloud SDK (Shell)"
draft = false
date = "2017-02-08T15:28:51-05:00"
tags = ["json","shell","google"]
categories = ["reference"]
images = [""]
type = "reference"

+++


<div class="bd-callout bd-callout-warning">
<h4>Google Cloud SDK</h4>
The Cloud SDK is a set of tools for Cloud Platform. It contains gcloud, gsutil, and bq, which you can use to access Google Compute Engine, Google Cloud Storage, Google BigQuery, and other products and services from the command-line. You can run these tools interactively or in your automated scripts.
</div>

- - -

# Download, Install, and Setup

* Python 2.7 is required to install and use the Google Cloud SDK.
* Visit https://cloud.google.com/sdk/ and download the installer for your OS platform.
* For Mac/Linux users, move the decompressed `google-cloud-sdk` folder to an appropriate place, then run the `./install.sh` script. Windows users have an .exe wizard that will complete the installation process.
* To set up after installation, run `gcloud init` and you will authenticate (using a web browser) into your Google account. Follow the prompts to create a project, etc.
* Services that incur charges will have to be associated with billing information (storage, compute, etc.)

- - -

# Basic Usage

To get help:

    gcloud help

To see information about your installation:

    gcloud info

Included with the package is the `gsutil` tool for Google cloud storage

    gsutil mb gs://my-bucket            # Make a bucket
    gsutil ls gs://my-bucket/folder/    # List contents of a bucket sub-folder
    gsutil cp *.txt gs://my-bucket      # Copies all text files up into bucket


- - -

# Real-world Examples

A backup script to run nightly and keep two weeks of archives:

{{< gist nmagee fe999280428f15ebed98ca88942fc29f >}}


A snippet to create an expiring, signed URL of an object within a bucket:

    gsutil signurl -d 10m <private-key-file> gs://<bucket>/<object>


A snippet to monitor a bucket for changes and send alerts to a web endpoint. This
would trigger a notification every time a new object is added or deleted, or if metadata is
updated:

    gsutil notification watchbucket https://example.com/notify \
      gs://example-bucket
