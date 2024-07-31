+++
categories = ["userinfo"]
type = "rivanna"
date = "2024-01-02T00:00:00-05:00"
tags = [
  "rivanna", "software", "docker", "containers", "singularity"
]
draft = false
title = "Software Containers"
description = "Software Containers"
author = "RC Staff"

+++

{{< highlight >}}
[Deprecated] On Dec 18, 2023 Singularity has been upgraded to Apptainer, a continuation of the Singularity project.
{{< /highlight >}}

# Overview

<img src="/images/rivanna/singularity-logo.png" alt="Singularity HPC Containers" class="project-inset" style="float:right;max-width:30%;" />

Singularity is a container application targeted to multi-user, high-performance computing systems. It interoperates well with Slurm and with the Lmod modules system. Singularity can be used to create and run its own containers, or it can import Docker containers.

# Creating Singularity Containers
To create your own image from scratch, you must have root privileges on some computer running Linux (any version).  Follow the instructions at the Singularity site.  If you have only Mac or Windows, you can use the Vagrant environment.  Vagrant is a pre-packed system that runs under several virtual-machine environments, including the free Virtualbox environment.  Singularity provides instructions for installing on Mac or installing on Windows.  Once you have installed Vitrualbox, you install Singularity's Vagrant image, which contains the prerequisites to author images.  You can then follow the instructions for Linux to author your image.

## How to use a Docker image on the HPC System?
You will need to convert the Docker image into Singularity. Please visit our [how-to page](/userinfo/howtos/rivanna/docker-images-on-rivanna) for instructions.

If you do not have the ability to create your own image for the HPC system or to use a Docker image, contact us for assistance.


# Singularity on the HPC system
Singularity is available as a [module](/userinfo/hpc/software/modules). The RC staff has also curated a library of pre-prepared Singularity container images for popular applications as part of the shared software stack.  Descriptions for these shared containers can be found via the `module avail` and `module spider` commands.

```
module load singularity
module avail
```

Loading any of these container modules produces an on-screen message with instructions on how to copy the container image file to your directory and how to run the container.

# What is Inside the Container?

Use the `shell` command to start up a shell prompt and navigate (more later).

For containers built with Singularity, you can use the `run-help` command to learn more about the applications and libraries:

```
singularity run-help /path/to/sif
```

For containers built with Docker, use the `inspect --runscript` command to find the default execution command. Using the TensorFlow module as an example:

```bash
$ module load singularity tensorflow/2.10.0
$ singularity inspect --runscript $CONTAINERDIR/tensorflow-2.10.0.sif
#!/bin/sh
OCI_ENTRYPOINT='"python"'
...
```

This shows that `python` will be executed when you `run` (more later) the container.

# Running non-GPU Images
If your container does not require a GPU, all that is necessary is to load the singularity module and provide it with a path to the image.

```
module load singularity
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
module load singularity
singularity <CMD> --nv <IMAGE_FILE> <ARGS>
```

**Example:**

```
module load tensorflow/2.10.0.sif
singularity run --nv $CONTAINERDIR/tensorflow-2.10.0.sif myscript.py
```

In the container build script, `python` was defined as the default command to be executed and singularity passes the argument(s) after the image name, i.e. `myscript.py`, to the Python interpreter. So the above singularity command is equivalent to

```
singularity exec --nv $CONTAINERDIR/tensorflow-2.10.0.sif python myscript.py
```

This image was built to include CUDA and cuDNN libraries that are required by TensorFlow.  Since these libraries are provided by the container, we do not need to load the CUDA/cuDNN libraries available on the host.

# Running Images Interactively

Start an `ijob`:

```
ijob  -A mygroup -p gpu --gres=gpu -c 1
salloc: Pending job allocation 12345
salloc: job 12345 queued and waiting for resources
salloc: job 12345 has been allocated resources
salloc: Granted job allocation 12345
```

If your image starts a graphical user interface or otherwise needs a display, you should use the Open OnDemand [Desktop](/userinfo/hpc/ood/desktop) rather than a command-line ijob.  Once the Desktop is launched, start a terminal window and type the commands as in any other shell.

```
module purge
module load singularity
singularity shell --nv /path/to/sif
```

# Running Image Non-Interactively as Slurm jobs

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
module load singularity tensorflow/2.10.0

singularity run --nv $CONTAINERDIR/tensorflow-2.10.0.sif tensorflowtest.py
```

# Interaction with the Host File System

Each container provides its own file system.  In addition, directories of the host file system can be overlayed onto the container file system so that host files can be accessed from within the container.  These overlayed directories are referred to as bind paths or bind points.  The following system directories of the host are exposed inside a container:

* `/tmp`
* `/proc`
* `/sys`
* `/dev`

In addition, the following user directories are overlayed onto each container by default on the HPC system:

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
