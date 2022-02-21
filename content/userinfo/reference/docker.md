+++
author = "RC Staff"
description = ""
title = "Docker Containers"
draft = true
date = "2017-03-01T15:28:51-05:00"
tags = ["docker","containers"]
categories = ["reference"]
images = [""]
type = "reference"
project = "Docker"
projecturl = "https://www.docker.com/"
+++

{{< define "Docker" "Docker is a popular version of LXC (Linux Containers). Docker containers wrap up a piece of software in a complete filesystem that contains everything it needs to run: code, runtime, system tools, system libraries – anything you can install on a server. This guarantees that it will always run the same, regardless of the environment it is running in." >}}

# What is Docker?

{{< youtube PfTKwblbkpE >}}

- - -

# Install Docker

Docker is available for Windows, Mac, and Linux. Download the appropriate Docker Edition for your platform directly from Docker. We suggest the CE "Community Edition."

[<button class="btn btn-success">Download Docker</button>](https://www.docker.com/)

- - -

# Finding Containers

There are thousands of pre-built containers already available for common use cases. If you need a web server, a database instance, or portions of a genomics 
pipeline, there is probably a container ready for you to use. 

Here are some good places to search for containers:

* [Docker Hub](https://hub.docker.com/)
* [BioContainer](http://biocontainers.pro/registry/#/)
* [GitHub](https://github.com/)

- - -

# Running Containers

If you have found a container you would like to try, download it (using the `nginx` web server as an example):

    docker pull nginx

View a list of all container images you have pulled:

    docker images

    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    somrc-whalesay      latest              188e03692c84        25 hours ago        277 MB
    rocker/rstudio      latest              919e13c956b8        2 weeks ago         990 MB
    nginx               latest              6b914bbcb89e        3 weeks ago         182 MB
    hello-world         latest              48b5124b2768        2 months ago        1.84 kB
    docker/whalesay     latest              6b362a9f73eb        22 months ago       247 MB

Run a container image:

    docker run -d nginx

This runs the container as a daemon (service). But you may want to expose the container to a specific port locally, so that you can interact with it.
For example, if you wanted to expose `nginx` locally over port 80, enter this:

    docker run -d -p 8080:80 nginx

The `-p 8080:80` flag publishes your local computer's port 8080 with the container's port 80.

Another useful flag for runtime is a volume mapping, so that your running container can read or write to portions of your local computer's filesystem.
So, extending the earlier command:

    docker run -d -p 8080:80 -v /User/local/dir:/var/www/html nginx

View all running containers:

    docker ps -a

    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                    PORTS                    NAMES
    1d17f542be53        rocker/rstudio      "/init"                  18 hours ago        Up 18 hours               0.0.0.0:8787->8787/tcp   elegant_banach

You can also run containers interactively (i.e. logging in) instead of running as a service. This allows you to explore the structure, features, or
configuration of a container, or modify how it works:

    docker run -it nginx /bin/bash

This runs the container interactively (`-i`) in a pseudo-TTY (`-t`), and instantiates a shell for your session to use. Once you are done, simply exit the shell and you will leave the
container and return to your local computer's shell. If you have made any changes to the container, be sure to save it.

[![asciicast](https://asciinema.org/a/108394.png)](https://asciinema.org/a/108394)

- - -

# Building Containers

If you cannot find just the right container, you can always build your own. There are two ways to do this:

1. Download a container image, run it and log into it, and customize as if it were your own custom virtual machine. Then, save the container for later deployment. Instructions for interactively logging into a container can be found above.
2. Alternatively, you can write a custom `Dockerfile` and build the container from scratch, using `docker build`. More on Docker files and builds can be found at https://docs.docker.com/engine/getstarted/step_four/

- - -

# Tutorials

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-block">
        <h3 class="card-title" style="padding-top:0px;margin-top:0px;">Docker Training</h3>
        <p class="card-text">Docker documents this process in great detail, and provides a step-by-step overview of their container system.</p>
        <a href="https://docs.docker.com/engine/getstarted/" class="btn btn-primary" style="color:white;">Launch</a>
      </div>
      <div class="card-block">
        <h3 class="card-title">Katacoda Interactive Labs</h3>
        <p class="card-text">Katacoda offers a free series of interactive trainings that build sequentially. The tutorials require you to
          engage with the Docker command-line as you progress.</p>
        <a href="https://www.katacoda.com/courses/docker" class="btn btn-primary" style="color:white;">Launch</a>
      </div>
    </div>
  </div>
</div>

{{< space >}}
{{< space >}}
