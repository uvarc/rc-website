+++
categories = ["userinfo"]
type = "rivanna"
date = "2023-05-08T00:00:00-05:00"
tags = [
  "rivanna", "software", "docker", "containers", "singularity"
]
draft = false
title = "Software Containers"
description = "Software Containers"
author = "RC Staff"

+++

# Overview

Containers bundle an application, the libraries and other executables it may need, and even the data used with the application into portable, self-contained files called images. Containers simplify installation and management of software with complex dependencies and can also be used to package workflows. 

Please refer to the following pages for further information.

- [Singularity](/userinfo/hpc/software/singularity) (before Dec 18, 2023)
- [Apptainer](/userinfo/hpc/software/apptainer) (after Dec 18, 2023)
- [Short course: Software Containers for HPC](https://learning.rc.virginia.edu/courses/containers-for-hpc/)

# Container Registries for UVA Research Computing

Images built by Research Computing are hosted on Docker Hub (and previously Singularity Library).

## Singularity Library

Due to storage limits we can no longer add Singularity images to [Singularity Library](https://cloud.sylabs.io/library/uvarc). There will be no more updates to this registry.

## Docker Hub

In the summer of 2020, we switched to [Docker Hub](https://hub.docker.com/). A complete list of images along with their Dockerfiles can be found in our [rivanna-docker GitHub repository](https://github.com/uvarc/rivanna-docker). These images may or may not be installed as modules on Rivanna.

We do not use the `latest` tag. Specify the exact version when pulling an image. For example:
```
module load apptainer
apptainer pull docker://uvarc/pytorch:1.5.1
```

Images that contain `ipykernel` can be added to your list of Jupyter kernels. To verify:
```
apptainer exec <container_name>.sif python -m pip list | grep ipykernel
```
If this returns `ipykernel    <version>`, proceed [here](/userinfo/howtos/rivanna/custom-jupyter-kernels).

You are welcome to use/modify our Dockerfiles. Some form of acknowledgment/reference is appreciated.
