+++
type = "howto"
date = "2020-02-21T15:12:46-05:00" 
tags = [ "rivanna", "software", "containers" ] 
categories = ["howto"]
draft = false 
title = "Docker Images on the HPC System" 
description = "How to use Docker images on the HPC System" 
author = "RC Staff"
+++

Docker requires `sudo` privilege and therefore it is not supported on the HPC system. To use a Docker image you will need to convert it into Apptainer.

# Convert a Docker image

There are several ways to convert a Docker image:

- Download a remote image from Docker Hub
- Build from a local image cached in Docker daemon
- Build from a definition file (advanced)

Instructions are provided in each of the following sections.

## Docker Hub

Docker images hosted on Docker Hub can be downloaded and converted in one step via the `apptainer pull` command:

```
module load apptainer
apptainer pull docker://account/image
```

Use the exact same command as you would for `docker pull`.

## Docker daemon

(Taken from Apptainer 3.5 User Guide)

You can convert local Docker images into Apptainer (e.g. on your personal computer).
Suppose you have the `godlovedc/lolcow:latest` image cached by Docker:

```
$ sudo docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
godlovedc/lolcow    latest              577c1fe8e6d8        16 months ago       241MB
```

You can build an Apptainer image from it via:
```
$ apptainer build lolcow_from_docker_cache.sif docker-daemon://godlovedc/lolcow:latest
INFO:    Starting build...
Getting image source signatures
Copying blob sha256:a2022691bf950a72f9d2d84d557183cb9eee07c065a76485f1695784855c5193
 119.83 MiB / 119.83 MiB [==================================================] 6s
Copying blob sha256:ae620432889d2553535199dbdd8ba5a264ce85fcdcd5a430974d81fc27c02b45
 15.50 KiB / 15.50 KiB [====================================================] 0s
Copying blob sha256:c561538251751e3685c7c6e7479d488745455ad7f84e842019dcb452c7b6fecc
 14.50 KiB / 14.50 KiB [====================================================] 0s
Copying blob sha256:f96e6b25195f1b36ad02598b5d4381e41997c93ce6170cab1b81d9c68c514db0
 5.50 KiB / 5.50 KiB [======================================================] 0s
Copying blob sha256:7f7a065d245a6501a782bf674f4d7e9d0a62fa6bd212edbf1f17bad0d5cd0bfc
 3.00 KiB / 3.00 KiB [======================================================] 0s
Copying blob sha256:70ca7d49f8e9c44705431e3dade0636a2156300ae646ff4f09c904c138728839
 116.56 MiB / 116.56 MiB [==================================================] 6s
Copying config sha256:73d5b1025fbfa138f2cacf45bbf3f61f7de891559fa25b28ab365c7d9c3cbd82
 3.33 KiB / 3.33 KiB [======================================================] 0s
Writing manifest to image destination
Storing signatures
INFO:    Creating SIF file...
INFO:    Build complete: lolcow_from_docker_cache.sif
```

Note that this requires `sudo` privilege. You can then transfer the image to the HPC system.

## Definition file

If you are building from a definition file, you can bootstrap from a Docker base container.

```
Bootstrap: docker
From: account/image:version
...
```

# Use a Docker image

After you have obtained the converted `*.sif` Apptainer image, you can use it by:

```
module load apptainer
apptainer run|exec|shell image.sif
```

Please visit [this page](/userinfo/hpc/software/containers) for more information on `run`, `shell`, and `exec`.
