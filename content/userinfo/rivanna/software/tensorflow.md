+++
type = "rivanna"
date = "2019-04-23T08:37:46-05:00"
tags = [
  "rivanna", "software, machine learning"
]
draft = false
title = "TensorFlow on Rivanna"
description = "TensorFlow on Rivanna"
author = "RC Staff"

+++
# Overview
TensorFlow is an open source software library for high performance numerical computation.  It has become a very popular tool for machine learning and in particular for the creation of deep neural networks.  The latest TensorFlow versions are now provided as prebuilt Singularity containers on Rivanna.  The basic concept of running Singularity containers on Rivanna is described here.

TensorFlow code is provided in two flavors, either with or without support of general purpose graphics processing units (GPUs).  All TensorFlow container images provided on Rivanna require access to a GPU node.  Access to GPU nodes is detailed in the sections below.

# TensorFlow and Keras
Keras is a high-level neural networks application programming interface (API), written in Python and capable of running on top of TensorFlow, CNTK, or Theano.  Since version 1.12.0, TensorFlow contains its own Keras API implementation as described on the TensorFlow website.

# What is inside the TensorFlow containers?
Most containers provide documentation regarding the main applications that have been installed inside. This information can be queried with the `singularity run-help` command.
```
module load singularity
module load tensorflow/2.1.0-py37
singularity run-help $CONTAINERDIR/tensorflow-2.1.0-py37.sif
```
Example Output:
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

# Local Copy of Container Image
The TensorFlow container images contain all the libraries and software packages required to run TensorFlow.  In order to run SLURM or interactive jobs (ijobs), it is best practice to create a local copy of the container image in your own /home or /scratch directory. The container images can be copied like any other file on Rivanna.

A library of prepared TensorFlow containers prepared to run on Rivanna's GPU nodes can be accessed through these commands:
```
module load singularity
module avail tensorflow
```
Loading of any of these container modules produces an on-screen message with instructions on how to copy the TensorFlow container image file, which resides in `$CONTAINERDIR`.

# TensorFlow Jupyter Notebooks
Jupyter Notebooks can be used for interactive code development and execution of Python scripts and several other codes. A few TensorFlow kernels are available:

- 1.12.0 with Python 2.7
- 1.12.0 with Python 3.6
- 2.1.0 with Python 3.7

## Accessing the JupyterLab Portal

1. Open a web browser and go to URL:  https://rivanna-portal.hpc.virginia.edu
2. Use your `Netbadge` credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on “Interactive Apps”.
4. In the drop-down box, click on `JupyterLab`.

## Requesting access to a GPU node

To start a JupyterLab session, fill out the resource request webform.  To request access to a GPU, verify the correct selection for the following parameters:

1. Under Rivanna Partition, choose "GPU".
2. Under Optional GPU Type, choose "NVIDIA K80", "NVIDIA P100", "NVIDIA V100", "NVIDIA RTX20280", or leave it as "default".
3. Click `Launch` to start the session.

Review our [Jupyer Lab documentation](/userinfo/rivanna/software/jupyterlab) for more details..

## Editing and Running the Notebook

Once the JupyterLab instance has started, you can edit and run your notebook as described here.

# TensorFlow SLURM jobs
Singularity can make use of the local NVIDIA drivers installed on a host equipped with a GPU device.  The SLURM script needs to include the `#SBATCH -p gpu` and `#SBATCH --gres=gpu` directives in order to request access to a GPU node and its GPU device.  Please visit the Jobs Using a GPU section for details.

To run commands in an GPU-enabled container image, load the singularity module and add the `--nv` flag when executing the singularity run or singularity exec commands.  Before running the following commands it is assumed that a TensorFlow container image (e.g. `tensorflow-2.1.0-py37.sif`) has been copied to your personal /scratch directory.

For example:
```
module load singularity
singularity run --nv /scratch/$USER/tensorflow-2.1.0-py37.sif tf_example.py
```
In the container build script, `python` is defined as the default command to be excuted and singularity passes the argument(s) after the image name, i.e. `tf_example.py`, to the Python interpreter. So the above singularity command is equivalent to
```
singularity exec --nv /scratch/$USER/tensorflow-2.1.0-py37.sif python tf_example.py
```
The TensorFlow container images were built to include CUDA and cuDNN libraries that are required by TensorFlow.  Since these libraries are provided within each container, we do not need to load the CUDA/cuDNN libraries available on the host.

**Example SLURM Script:**
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
module load singularity

# Assuming that the container has been copied to the user's /scratch directory
containerdir=/scratch/$USER
singularity run --nv $containerdir/tensorflow-2.1.0-py37.sif tf_example.py
```

# TensorFlow Interactive Jobs (ijob)
Just as described for SLURM jobs, it is recommended to copy a TensorFlow container image (e.g. tensorflow-2.1.0-py37.sif) to your personal /scratch directory before starting an ijob.

Start an ijob.  Note the addition of `-p gpu --gres=gpu` to request access to a GPU node and its GPU device.
```
ijob  -A mygroup -p gpu --gres=gpu -c 1
```
**Console output"**
```
salloc: Pending job allocation 12345
salloc: job 12345 queued and waiting for resources
salloc: job 12345 has been allocated resources
salloc: Granted job allocation 12345
```
Now you can load the `singularity` module and execute commands provided by the container. For example:
```
module purge
module load singularity
singularity run --nv /scratch/$USER/tensorflow-2.1.0-py37.sif tf_example.py
```

# Interaction with the Host File System
The following user directories are overlayed onto each container by default on Rivanna:

* /home
* /scratch
* /nv
* /project

Due to the overlay, these directories are by default the same inside and outside the container with the same read, write, and execute permissions.  **This means that file modifications in these directories (e.g. in `/home`) via processes running inside the container are persistent even after the container instance exits.**  The `/nv` and `/project` directories refer to leased storage locations that may not be available to all users.

# TensorBoard

Request a Desktop session under Interactive Apps via [Open OnDemand](https://rivanna-portal.hpc.virginia.edu/pun/sys/dashboard). Fill out the form to submit the SLURM job. Launch the session and open a terminal in the desktop. Enter these commands (using `tensorflow/2.1.0-py37` as an example):

```
$ module load singularity tensorflow/2.1.0-py37
$ singularity shell --nv $CONTAINERDIR/tensorflow-2.1.0-py37.sif
Singularity> python -m tensorboard.main --logdir=logdir
```

Open the resulting URL (of the form `http://localhost:xxxx/`) in Firefox.

# Can I install my own TensorFlow (that works on a GPU)?

Yes, but the TF/Python/CUDA versions have to be very specific. We recommend creating a conda environment. Using TensorFlow 1.14 as an example:

1. For your target TF version, look up the supported Python and CUDA versions [here](https://www.tensorflow.org/install/source#gpu). In this example, we find that it is supported by:

    - Python 2.7, 3.3-3.7
    - CUDA 10.0
    - cuDNN 7.4

1. Check that the CUDA version is supported on Rivanna:
    - Find the corresponding NVIDIA driver version [here](https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html).
    - Start an ijob on a GPU node and run `nvidia-smi`. Look for the first line in the table. As of July 2021, our GPU nodes support up to CUDA 11.0.3.
        ```
        NVIDIA-SMI 450.51.06    Driver Version: 450.51.06    CUDA Version: 11.0
        ```
    - In this example 10.0 is less than 11.0.3, so the target version is supported.

1. Check cuDNN availability on https://anaconda.org. The closest match is 7.3 in the `anaconda` channel.

1. Load the Anaconda module and create the environment with specific versions.

    ```
    module load anaconda
    conda create -n tf1.14 tensorflow-gpu=1.14 cudatoolkit=10.0 cudnn=7.3 python=3.7 -c anaconda -c conda-forge
    ```

If the versions are incompatible, either the installation will fail or TF will not be able to detect the GPU at runtime.
