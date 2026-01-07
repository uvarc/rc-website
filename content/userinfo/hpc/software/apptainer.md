+++
categories = ["userinfo"]
type = "rivanna"
date = "2025-09-05T00:00:00-05:00"
tags = [
  "rivanna", "software", "containers", "apptainer"
]
draft = false
title = "Apptainer and UVA HPC"
description = "Apptainer and UVA HPC"
author = "RC Staff"

+++

# Introduction

Apptainer is a continuation of the Singularity project (see [here](https://apptainer.org/news/community-announcement-20211130/)). On December 18, 2023 we migrated from Singularity to Apptainer.

Containers created by Singularity and Apptainer are mutually compatible as of this writing, although divergence is to be expected.

One advantage of Apptainer is that users can now build container images natively on the UVA HPC system.

# Apptainer and UVA HPC (after 12/18/2023)
Apptainer is available as a [module](/userinfo/hpc/software/modules). The RC staff has also curated a library of pre-prepared Apptainer container images for popular applications as part of the shared software stack.  Descriptions for these shared containers can be found via the `module avail` and `module spider` commands.

```
module load apptainer
module avail
```

Loading any of these container modules produces an on-screen message with instructions on how to copy the container image file to your directory and how to run the container.

Our framework for container modules is described in the paper:
R. Sun and K. Siller, HPC Container Management at the University of Virginia, PEARC '24: Practice and Experience in Advanced Research Computing 2024: Human Powered Computing 73, 1 (2024). [doi:10.1145/3626203.3670568](https://doi.org/10.1145/3626203.3670568)

# Building Apptainer Containers
To build your own image from scratch, create an Apptainer definition file (say `myimage.def`) and run:

```
module load apptainer
apptainer build myimage.sif myimage.def
```

For containers larger than several GBs we recommend that you perform the build on a compute node in the `largemem` partition, either through a batch job or an interactive job. Building such containers on the frontend will likely fail silently due to insufficient memory.

Details on how to write a definition file will be provided in [this forthcoming workshop](https://cal.lib.virginia.edu/event/11891417).

# What is Inside the Container?

Use the `shell` command to start up a shell prompt and navigate (more later).

For containers built with Apptainer, you can use the `run-help` command to learn more about the applications and libraries:

```
apptainer run-help /path/to/sif
```

You can also use the `inspect --runscript` command to find the default execution command. Using the TensorFlow module as an example:

```bash
$ module load apptainer tensorflow/2.10.0
$ apptainer inspect --runscript $CONTAINERDIR/tensorflow-2.10.0.sif
#!/bin/sh
OCI_ENTRYPOINT='"python"'
...
```

This shows that `python` will be executed when you `run` (more later) the container.

# Running non-GPU Images
If your container does not require a GPU, all that is necessary is to load the apptainer module and provide it with a path to the image.

```
module load apptainer
apptainer <CMD> <OPTIONS> <IMAGEFILE> <ARGS>
```

`CMD` defines how the container is used. There are three main commands:

- `run`: Executes a default command inside the container. The default command is defined at container build time.
- `exec`: Executes a specific application/command inside the container as specified with ARGS. This provides more flexibility than the run command.
- `shell`: Starts a new interactive command line shell inside the container.

`OPTIONS` define how the apptainer command is executed.  These can be omitted in most cases.
`IMAGEFILE` refers to the single Apptainer container image file, typically with a `.sif` or `.simg` extension.
`ARGS` define additional arguments passed inside the container.  In combination with the `exec` command they define what command to execute inside the container.

## `apptainer run`

```
apptainer run myimage.sif
```

This executes a default application or set of commands inside the container.  The default application or set of commands to execute is defined in the image build script and cannot be changed after the container is built.  After execution of the default command, the container is closed.

## `apptainer exec`

```
apptainer exec myimage.sif python myscript.py
```

This is similar to apptainer run but more versatile by allowing the specification of the particular application or command to execute inside the container.  In this example it launches the python interpreter and executes the myscript.py script, assuming that Python was installed into the container image.  After execution of the command, the container is closed.

## `apptainer shell`

```
apptainer shell myimage.sif
```

This opens a new shell inside the container, notice the change of the prompt:

```
Apptainer>
```

Now you can execute any command or application defined in the container, for example `ls` to list all files in the current directory:

```
Apptainer> ls
```

You can navigate the container file system and run any application that is installed inside the container. To leave the interactive container shell, type `exit`:

```
Apptainer> exit
```

# Running GPU Images

Apptainer can make use of the local NVIDIA drivers installed on the host.  To use a GPU image, load the apptainer module and add the `--nv` flag when executing the `apptainer shell`, `apptainer exec`, or `apptainer run` commands.

```
module load apptainer
apptainer <CMD> --nv <IMAGE_FILE> <ARGS>
```

**Example:**

```
module load tensorflow/2.10.0.sif
apptainer run --nv $CONTAINERDIR/tensorflow-2.10.0.sif myscript.py
```

In the container build script, `python` was defined as the default command to be executed and apptainer passes the argument(s) after the image name, i.e. `myscript.py`, to the Python interpreter. So the above apptainer command is equivalent to

```
apptainer exec --nv $CONTAINERDIR/tensorflow-2.10.0.sif python myscript.py
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
module load apptainer
apptainer shell --nv /path/to/sif
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
module load apptainer tensorflow/2.10.0

apptainer run --nv $CONTAINERDIR/tensorflow-2.10.0.sif tensorflowtest.py
```

# Interaction with the Host File System

Each container provides its own file system.  In addition, directories of the host file system can be overlayed onto the container file system so that host files can be accessed from within the container.  These overlayed directories are referred to as bind paths or bind points.  The following system directories of the host are exposed inside a container:

* `/tmp`
* `/proc`
* `/sys`
* `/dev`

In addition, the following user directories are mounted into each container by default on the HPC system:

* `/home`
* `/scratch`
* `/standard`
* `/project`

These directories are by default the same inside and outside the container with the same read, write, and execute permissions.  This means that file modifications in these directories (e.g. in `/home`) via processes running inside the container are persistent even after the container instance exits.  The `/standard` and `/project` directories refer to leased storage locations that may not be available to all users.

## Disabling the Default Bind Paths

Under some circumstances this default mounting of the host file systems is undesirable. Users can disable the default mounts by adding the `-c` flag when executing the `apptainer shell`, `apptainer exec`, or `apptainer run` commands.

For example,

```
apptainer run -c myimage.sif
```

## Adding Custom Bind Paths

Users can define custom bind paths for host directories via the `-B`/`--bind` option, which can be used in combination with the `-c` flag.

For example, the following command adds the `/scratch/$USER` directory as an overlay without overlaying any other user directories provided by the host:

```
apptainer run -c -B /scratch/$USER myimage.sif
```

To add the `/home` directory on the host as `/rivanna/home` inside the container:

```
apptainer run -c -B /home:/rivanna/home myimage.sif
```
