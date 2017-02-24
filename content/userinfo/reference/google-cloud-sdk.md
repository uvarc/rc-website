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

<p class="lead">From their website:</p>

<p class="lead">The Cloud SDK is a set of tools for Cloud Platform. It contains gcloud, gsutil, and bq, which you can use to access Google Compute Engine, Google Cloud Storage, Google BigQuery, and other products and services from the command-line. You can run these tools interactively or in your automated scripts.</p>

- - -

# Download, Install, and Setup

* Python 2.7 is required to install and use the Google Cloud SDK.
* Visit https://cloud.google.com/sdk/ and download the installer for your OS platform.
* For Mac/Linux users, run the `./install.sh` script. Windows users have an .exe wizard that will complete the installation process.
* To set up after installation, run `gcloud init` and you will authenticate (using a web browser) into your Google account. Follow the prompts to create a project, etc.

- - -

# Basic Usage

To get help:

    gcloud help

To see information about your installation:

    gcloud info

Included with the package is the `gsutil` tool for Google cloud storage

    gsutil

- - -

# Real-world examples

- - -
