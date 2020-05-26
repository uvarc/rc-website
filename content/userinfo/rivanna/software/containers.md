+++
categories = ["userinfo"]
type = "rivanna"
date = "2020-03-15T08:37:46-05:00"
tags = [
  "rivanna", "software", "docker", "containers", "singularity"
]
draft = false
title = "Software Containers"
description = "Software Containers"
author = "RC Staff"

+++

# Overview

<img src="/images/rivanna/singularity-logo.png" alt="Singularity HPC Containers" class="project-inset" style="float:right;max-width:30%;" />

Containers bundle an application, the libraries and other executables it may need, and even the data used with the application into portable, self-contained files called images. Containers simplify installation and management of software with complex dependencies and can also be used to package workflows. Singularity is a container application targeted to multi-user, high-performance computing systems. It interoperates well with SLURM and with the Lmod modules system. Singularity can be used to create and run its own containers, or it can import Docker containers.

# Creating Singularity Containers
To create your own image from scratch, you must have root privileges on some computer running Linux (any version).  Follow the instructions at the Singularity site.  If you have only Mac or Windows, you can use the Vagrant environment.  Vagrant is a pre-packed system that runs under several virtual-machine environments, including the free Virtualbox environment.  Singularity provides instructions for installing on Mac or installing on Windows.  Once you have installed Vitrualbox, you install Singularity's Vagrant image, which contains the prerequisites to author images.  You can then follow the instructions for Linux to author your image.

## How to use a Docker image on Rivanna?
You will need to convert the Docker image into Singularity. Please visit our [how-to page](/userinfo/howtos/rivanna/docker-images-on-rivanna) for instructions.

If you do not have the ability to create your own image for Rivanna or to use a Docker image, contact us for assistance.


# Singularity on Rivanna
Singularity is available as a [module](/userinfo/rivanna/software/modules). The RC staff has also curated a library of pre-prepared Singularity container images for popular applications as part of the shared software stack.  Descriptions for these shared containers can be found via the `module avail` and `module spider` commands.

```
module load singularity/3.5.2
module avail

------------------------------- /apps/modulefiles/standard/container/singularity/3.5.2 --------------------------------
   caffe2/0.8.0              danpos/2.2.2       pytorch/1.4.0-py37     (L)    tensorflow/2.1.0-py37 (D)
   cellprofiler/2.2.0        hydrator/0.0.2     tensorflow/1.12.0-py27
   cellprofiler/3.1.8 (D)    inkscape/0.92.3    tensorflow/1.12.0-py36
   cp-analyst/2.2.1          patric/1.026       tensorflow/2.0.0-py36
```

Loading any of these container modules produces an on-screen message with instructions on how to copy the container image file to your directory and how to run the container.

# What is Inside the Container?
To learn more about the applications and libraries installed in a container you can use the `run-help` command:
```
module load singularity/3.5.2
module load tensorflow/2.1.0-py37
singularity run-help $CONTAINERDIR/tensorflow-2.1.0-py37.sif
```

**Output:**
```
This container provides the Python 3.7.5 bindings for:
    * Tensorflow 2.1.0 with Keras implementation
    * Keras Visualization Toolkit 0.4
    # tflearn 0.3.2
    * scikit-learn 0.22.1
    * Pandas 1.0.0
    * OpenCV 4.2.0.32
    * CUDA 10.1.243
    * CuDNN 7.6.4.38
```

# Running non-GPU Images
If your container does not require a GPU, all that is necessary is to load the singularity module and provide it with a path to the image.

```
module load singularity/3.5.2
singularity <CMD> <OPTIONS> <IMAGEFILE> <ARGS>
```

`CMD` defines how the container is used. There are three main commands:

- `run`: Executes a default command inside the container. The default command is defined at container build time.
- `exec`: Executes a specific application/command inside the container as specified with ARGS. This provides more flexibility than the run command.
- `shell`: Starts a new interactive command line shell inside the container.

`OPTIONS` define how the singularity command is executed.  These can be omitted in most cases.
`IMAGEFILE` refers to the single Singularity container image file, typically with a `.sif` or `.simg` extension.
`ARGS` define additional arguments passed inside the container.  In combination with the `exec` command they define what command to execute inside the container.

## `singularity run`

```
containerdir = ~mst3k
singularity run $containerdir/myimage.sif
```

This executes a default application or set of commands inside the container.  The default application or set of commands to execute is defined in the image build script and cannot be changed after the container is built.  After execution of the default command, the container is closed.

## `singularity exec`

```
singularity exec $containerdir/myimage.sif python myscript.py
```

This is similar to singularity run but more versatile by allowing the specification of the particular application or command to execute inside the container.  In this example it launches the python interpreter and executes the myscript.py script, assuming that Python was installed into the container image.  After execution of the command, the container is closed.

## `singularity shell`

```
singularity shell $containerdir/myimage.sif
```

This opens a new shell inside the container, notice the change of the prompt:

```
Singularity>
```

Now you can execute any command or application defined in the container, for example `ls` to list all files in the current directory:

```
Singularity> ls
```

You can navigate the container file system, including `/scratch` and `/nv`, and run any application that is installed inside the container. To leave the interactive container shell, type `exit`:

```
Singularity> exit
```

# Running GPU Images

Singularity can make use of the local NVIDIA drivers installed on the host.  To use a GPU image, load the singularity module and add the `--nv` flag when executing the `singularity shell`, `singularity exec`, or `singularity run` commands.

```
module load singularity/3.5.2
singularity <CMD> --nv <IMAGE_FILE> <ARGS>
```

**Example:**

```
containerdir = ~/
singularity run --nv $containerdir/tensorflow-2.1.0-py37.sif myscript.py
```

In the container build script, `python` was defined as the default command to be excuted and singularity passes the argument(s) after the image name, i.e. `myscript.py`, to the Python interpreter. So the above singularity command is equivalent to

```
singularity exec --nv $containerdir/tensorflow-2.1.0-py37.sif python myscript.py
```

The `tensorflow-2.1.0-py37.sif` image was built to include CUDA and cuDNN libraries that are required by TensorFlow.  Since these libraries are provided by the container, we do not need to load the CUDA/cuDNN libraries available on the host.

# Running Images Interactively

Start an `ijob`:

```
ijob  -A mygroup -p gpu --gres=gpu -c 1
salloc: Pending job allocation 12345
salloc: job 12345 queued and waiting for resources
salloc: job 12345 has been allocated resources
salloc: Granted job allocation 12345
```

```
module purge
module load singularity/3.5.2
containerdir=~
singularity shell --nv $containerdir/tensorflow-2.1.0-py37.sif
```

# Running Image Non-Interactively as SLURM jobs

**Example script:**

```
#!/usr/bin/env bash
#SBATCH -J tftest
#SBATCH -o tftest-%A.out
#SBATCH -e tftest-%A.err
#SBATCH -p gpu
#SBATCH --gres=gpu:1
#SBATCH -c 1
#SBATCH -t 00:01:00
#SBATCH -A mygroup

module purge
module load singularity/3.5.2

containerdir=~
singularity run --nv $containerdir/tensorflow-2.1.0-py37.sif tensorflowtest.py
```

# Interaction with the Host File System

Each container provides its own file system.  In addition, directories of the host file system can be overlayed onto the container file system so that host files can be accessed from within the container.  These overlayed directories are referred to as bind paths or bind points.  The following system directories of the host are exposed inside a container:

* `/tmp`
* `/proc`
* `/sys`
* `/dev`

In addition, the following user directories are overlayed onto each container by default on Rivanna:

* `/home`
* `/scratch`
* `/nv`
* `/project`

Due to the overlay these directories are by default the same inside and outside the container with the same read, write, and execute permissions.  This means that file modifications in these directories (e.g. in `/home`) via processes running inside the container are persistent even after the container instance exits.  The `/nv` and `/project` directories refer to leased storage locations that may not be available to all users.

## Disabling the Default Bind Paths

Under some circumstances this default overlay of the host file systems is undesirable.  Users can disable the overlay of `/home`, `/scratch`, `/nv`, `/project` by adding the `-c` flag when executing the `singularity shell`, `singularity exec`, or `singularity run` commands.

For example,

```
containerdir=~mst3k
singularity run -c $containerdir/myimage.sif
```

## Adding Custom Bind Paths

Users can define custom bind paths for host directories via the `-B`/`--bind` option, which can be used in combination with the `-c` flag.

For example, the following command adds the `/scratch/$USER` directory as an overlay without overlaying any other user directories provided by the host:

```
singularity run -c -B /scratch/$USER $containerdir/myimage.sif
```

To add the `/home` directory on the host as `/rivanna/home` inside the container:

```
singularity run -c -B /home:/rivanna/home $containerdir/myimage.sif
```

# Singularity Library

We host all our Singularity images on [Singularity Library](https://cloud.sylabs.io/library/uvarc). To pull an image:

```
singularity pull library://uvarc/default/name:version
```

Deprecated images on Rivanna will be archived here in case any user needs to use them.

Currently we do not use the `latest` tag, so please specify the exact version.
