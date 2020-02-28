+++
type = "rivanna"
date = "2020-02-28T08:37:46-05:00"
tags = [
  "rivanna", "software, machine learning"
]
draft = false
title = "PyTorch on Rivanna"
description = "TensorFlow on Rivanna"
author = "RC Staff"
+++

# Description
[PyTorch](https://pytorch.org/) is an open source Python package to create deep learning networks.  The latest PyTorch versions are now provided as prebuilt [Singularity](https://www.sylabs.io/singularity/) containers on Rivanna.  The basic concept of running Singularity containers on Rivanna is described [here](/userinfo/rivanna/software/containers).

Similar to other popular deep learning frameworks like TensorFlow, Theano and CNTK, computations supported by the PyTorch package can be accelerated on general purpose graphics processing units (GPUs).  All PyTorch container images provided on Rivanna require access to a GPU node.  Access to GPU nodes is detailed in the sections below.

# PyTorch on Rivanna
The PyTorch Singularity module is available on Rivanna:

```
module load singularity/3.5.2
module load pytorch/1.4.0-py37
```

Follow the on-screen instructions to copy the container to your directory.

To learn more about a container, use `run-help`:
```
singularity run-help pytorch-1.4.0-py37.sif
```

The output will look like this:
```
This container is backed by Anaconda version 2019.10 and provides the Python 3.7 bindings for:
    * PyTorch 1.4.0
    * TorchVision 0.5.0
    * Pandas 1.0.1
    * CUDA 10.1.243
    * CuDNN 7.6.5.32
```

# PyTorch Jupyter Notebooks
Jupyter Notebooks can be used for interactive code development and execution of Python scripts and several other codes. We provide a Jupyter kernel for the aforementioned PyTorch container.

## Accessing the JupyterLab Portal

1. Open a web browser and go to:  [https://rivanna-portal.hpc.virginia.edu](https://rivanna-portal.hpc.virginia.edu).
2. Use your “Netbadge” credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on `Interactive Apps`.
4. In the drop-down box, click on `JupyterLab`.

## Requesting access to a GPU node

To start a JupyterLab session, fill out the resource request webform.  To request access to a GPU, verify the correct selection for the following parameters:

1. Under Rivanna Partition, choose "GPU".
2. Under Optional GPU Type, choose "K80", "P100", "V100" or leave it as "default".
Click `Launch` to start the session.

## Editing and Running the Notebook

Once the JupyterLab instance has started, you can edit and run your notebook as described [here](/userinfo/rivanna/software/jupyterlab).

# PyTorch SLURM jobs
Singularity can make use of the local NVIDIA drivers installed on a host equipped with a GPU device.  The SLURM script needs to include the `#SBATCH -p gpu`and `#SBATCH --gres=gpu` directives in order to request access to a GPU node and its GPU device.  Please visit the [Jobs Using a GPU](/userinfo/rivanna/slurm/#jobs-using-a-gpu) section for details.

To run commands in an GPU-enabled container image, load the singularity module and add the `--nv` flag when executing the singularity run or singularity exec commands.  Before running the following commands it is assumed that the container image has been copied to your home directory.

**For example:**
```
module load singularity/3.5.2
singularity run --nv ~/pytorch-1.4.0-py37.sif pytorch_example.py
```
In the container build script, `python` was defined as the default command to be executed and singularity passes the argument(s) after the image name, i.e. `pytorch_example.py`, to the python interpreter. So the above singularity command is equivalent to
```
singularity exec --nv ~/pytorch-1.4.0-py37.sif python pytorch_example.py
```
The PyTorch container images were built to include CUDA and cuDNN libraries that are required by PyTorch.  Since these libraries are provided within each container, we do not need to load the CUDA/cuDNN libraries available on the host.

Example SLURM Batch Script
```
#!/usr/bin/env bash
#SBATCH -J pytorchtest
#SBATCH -o pytorchtest-%A.out
#SBATCH -e pytorchtest-%A.err
#SBATCH -p gpu
#SBATCH --gres=gpu:1
#SBATCH -c 1
#SBATCH -t 00:01:00
#SBATCH -A mygroup

module purge
module load singularity/3.5.2

# Assuming that the container has been copied to the user's home directory
singularity run --nv ~/pytorch-1.4.0-py37.simg pytorch_example.py
```

# PyTorch Interactive Jobs (ijob)
Just as described for SLURM jobs, it is recommended to copy the PyTorch container to your home directory before starting an ijob.

Start an [ijob](/userinfo/rivanna/slurm/#submitting-an-interactive-job).  Note the addition of `-p gpu` and `--gres=gpu` to request access to a GPU node and its GPU device.

```
ijob  -A mygroup -p gpu --gres=gpu -c 1
```
```
module purge
module load singularity/3.5.2
singularity run --nv ~/pytorch-1.4.0-py37.sif pytorch_example.py
```

# Interaction with the Host File System
The following user directories are overlayed onto each container by default on Rivanna:

+ /home
+ /scratch
+ /nv
+ /project

Due to the overlay, these directories are by default the same inside and outside the container with the same read, write, and execute permissions. **This means that file modifications in these directories (e.g. in /home) via processes running inside the container are persistent even after the container instance exits.** The `/nv` and `/project` directories refer to leased storage locations that may not be available to all users.
