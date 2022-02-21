+++
author = "RC Staff"
description = ""
title = "RStudio Server (Docker)"
draft = true
date = "2017-03-01T15:28:51-05:00"
tags = ["r","docker"]
categories = ["reference"]
images = [""]
type = "reference"
project = "RStudio Server (Docker)"
projecturl = "https://hub.docker.com/r/rocker/rstudio/"
+++

{{< define "RStudio Server" "RStudio Server enables you to provide a browser based interface to a version of R running on a remote Linux server, bringing the power and productivity of the RStudio IDE to server-based deployments of R. The instructions below will launch your RStudio environment locally within a Docker container." >}}

# What is Docker?
{{< youtube aLipr7tTuA4 >}}

# Install Docker

Click the button below and download the appropriate Docker Edition for your platform. We suggest the CE "Community Edition."

[<button class="btn btn-success">Download Docker</button>](https://www.docker.com/)

- - -

# Run RStudio Locally

Run these two commands for a web-based deployment of RStudio Server on your local workstation:

```
docker pull rocker/rstudio
docker run -d -p 8787:8787 rocker/rstudio
```

# More Information

* [Using the RStudio container](https://github.com/rocker-org/rocker/wiki/Using-the-RStudio-image)
* [Other related images](https://github.com/rocker-org/rocker/wiki)
* [Sharing Files between your Computer and the Container](https://github.com/rocker-org/rocker/wiki/Sharing-files-with-host-machine)
