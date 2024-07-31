+++
type = "howto"
date = "2020-03-09T00:00:00-05:00" 
tags = [ "software", "containers", "howtos" ] 
categories = ["howto"]
draft = false 
title = "Docker - The Basics" 
description = "Docker - The Basics" 
author = "RC Staff"
+++

{{% callout %}}
Note that Docker requires `sudo` privilege and therefore it is not supported on the HPC system. To use a Docker image you will need to convert it into Apptainer. More information can be found [here](https://www.rc.virginia.edu/userinfo/howtos/rivanna/docker-images-on-rivanna/) on our website.
{{% /callout %}}

# What Is Docker?

"Docker is a set of platform-as-a-service (PaaS) products that use OS-level virtualization to deliver software in packages called containers. Containers are isolated from one another and bundle their own software, libraries and configuration files; they can communicate with each other through well-defined channels. All containers are run by a single operating-system kernel and are thus more lightweight than virtual machines. The service has both free and premium tiers. The software that hosts..."
[Continue reading on Wikipedia](https://en.wikipedia.org/wiki/Docker_(software))

Click to watch on YouTube:

[![What is Docker?](https://img.youtube.com/vi/PfTKwblbkpE/0.jpg)](https://youtu.be/PfTKwblbkpE)

# Install Docker

Docker is available for Windows, Mac, and Linux. [Download](https://www.docker.com/) the appropriate Docker Edition for your platform directly from Docker. We suggest the CE “Community Edition.”

# Finding Containers

There are thousands of pre-built containers already available for common use cases. If you need a web server, a database instance, or portions of a genomics pipeline, there is probably a container ready for you to use.

Here are some good places to search for container images or docker files.

- [Docker Hub](https://hub.docker.com/)
- [BioContainer](http://biocontainers.pro/registry/)
- [GitHub](https://github.com/search?utf8=%E2%9C%93&q=docker&type=)

# Running Containers

If you have found a container you would like to try, download it (using the `nginx` web server as an example):

```
docker pull nginx
```

View a list of all container images you have pulled:

```
docker images

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
whalesay            latest              188e03692c84        25 hours ago        277 MB
rocker/rstudio      latest              919e13c956b8        2 weeks ago         990 MB
nginx               latest              6b914bbcb89e        3 weeks ago         182 MB
hello-world         latest              48b5124b2768        2 months ago        1.84 kB
docker/whalesay     latest              6b362a9f73eb        22 months ago       247 MB
```

Run a container image:

```
docker run -d nginx
```

This runs the container as a daemon (service). But you may want to expose the container to a specific port locally, so that you can interact with it. For example, if you wanted to expose `nginx` locally over port 80, enter this:

```
docker run -d -p 8080:80 nginx
```

The `-p 8080:80` flag publishes your local computer’s port 8080 with the container’s port 80.

Another useful flag for runtime is a volume mapping, so that your running container can read or write to portions of your local computer’s filesystem. So, extending the earlier command:

```
docker run -d -p 8080:80 -v /User/local/dir:/var/www/html nginx
```

View all running containers:

```
docker ps -a

CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                    PORTS                    NAMES
1d17f542be53        rocker/rstudio      "/init"                  18 hours ago        Up 18 hours               0.0.0.0:8787->8787/tcp   elegant_banach
```

You can also run containers interactively (i.e. logging in) instead of running as a service. This allows you to explore the structure, features, or configuration of a container, or modify how it works:

```
docker run -it nginx /bin/bash
```

This runs the container interactively (`-i`) in a pseudo-TTY (`-t`), and instantiates a shell for your session to use. Once you are done, simply exit the shell and you will leave the container and return to your local computer’s shell. If you have made any changes to the container, be sure to save it using `docker commit` (see [here](https://docs.docker.com/engine/reference/commandline/commit/) for more info).

[https://asciinema.org/a/108394](https://asciinema.org/a/108394)

# Creating Containers

If you cannot find just the right container, you can always build your own. There are two ways to do this:

1. **Pull Images and Customize** - Download a container image, run it and log into it, and customize as if it were your own custom virtual machine. Then, save the container for later deployment. Instructions for interactively logging into a container can be found above.

    - Pull a base container you want to start with, such as Ubuntu, CentOS, Amazon Linux, Yocto, etc.

    - Run the container interactively so that you can install packages and code, and customize the image from within.

    - Finally, when you exit the container and stop it, save it using the `docker commit` command. At this point your updated container is versioned (much like a git repository) and can be pushed to Docker Hub if you want to share or store it.

2. **Write your own Dockerfile** - Alternatively, you can write a custom Dockerfile and build the container from scratch, using `docker build`. More on Docker files and builds can be found at [https://docs.docker.com/engine/getstarted/step_four/](https://docs.docker.com/engine/getstarted/step_four/). This allows Dockerfiles to be shared as snippets of code rather than as full container images, comparable to a bootstrapping script you might use when instantiating a virtual server instance.

    - **Step 1** - Create a text file called `Dockerfile` with contents such as:

```
# Use an official Python runtime as a base image
FROM python:3.7-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN pip install -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
```

    - **Step 2** - Then build your container based on your Dockerfile:

```
docker build -t mycontainer .
```

---

# Tutorials

[Play with Docker Classroom](https://training.play-with-docker.com/) - Hands-on labs

[Docker for Beginners](https://github.com/docker/labs/blob/master/beginner/readme.md) - Covers the basics of container management, execution, modification, etc.

[Docker Training](https://docs.docker.com/engine/getstarted/) - Docker documents this process in great detail, and provides a step-by-step overview of their container system.

<!-- Service is officially closed -->
<!-- [Katacoda Interactive Labs](https://www.katacoda.com/courses/docker) - Katacoda offers a free series of interactive trainings that build sequentially. The tutorials require you to engage with the Docker command-line as you progress. -->

# Next Steps

- Learn about [Docker Swarms](https://docs.docker.com/get-started/part4/) for deploying containers in high availability.
- Design [Docker Stacks](https://docs.docker.com/get-started/part5/) for complex solutions of services.
- Learn how to [convert Docker images into Apptainer](/userinfo/howtos/rivanna/docker-images-on-rivanna) to run on the HPC system.
