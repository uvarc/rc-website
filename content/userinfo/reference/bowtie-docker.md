+++
author = "RC Staff"
description = ""
title = "Bowtie (Docker)"
draft = true
date = "2017-03-01T15:28:51-05:00"
tags = ["bioinformatics","bowtie","docker"]
categories = ["reference"]
images = [""]
type = "reference"
project = "Bowtie (Docker)"
projecturl = "https://hub.docker.com/r/biocontainers/bowtie/"
+++

{{< define "Bowtie" "Bowtie is an ultrafast, memory-efficient short read aligner. It aligns short DNA sequences (reads) to the human genome at a rate of over 25 million 35-bp reads per hour. Bowtie indexes the genome with a Burrows-Wheeler index to keep its memory footprint small: typically about 2.2 GB for the human genome (2.9 GB for paired-end). The instructions below will launch your Bowtie environment locally within a Docker container." >}}

# What is Docker?
{{< youtube aLipr7tTuA4 >}}

# Install Docker

Click the button below and download the appropriate Docker Edition for your platform. We suggest the CE "Community Edition."

[<button class="btn btn-success">Download Docker</button>](https://www.docker.com/)

- - -

# Run Bowtie Locally

Run these two commands for a web-based deployment of Bowtie on your local workstation:

```
docker pull biocontainers/bowtie
docker run -d biocontainers/bowtie
```

# More Information

* [About the BioContainers Project](https://biocontainers.pro/)
* [BioContainers on GitHub](https://github.com/BioContainers/containers)
* [BioContainers Registry](http://biocontainers.pro/registry/#/)
