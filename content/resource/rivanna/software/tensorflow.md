+++
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
[TensorFlow™]({{< module-homepage >}}) is an open source software library for high performance numerical computation.  It has become a very popular tool for machine learning and in particular for the creation of deep neural networks.  The latest TensorFlow versions are now provided as prebuilt Singularity containers on Rivanna.  The basic concept of running Singularity containers on Rivanna is described here.

TensorFlow code is provided in two flavors, either with or without support of general purpose graphics processing units (GPUs).  All TensorFlow container images provided on Rivanna require access to a GPU node.  Access to GPU nodes is detailed in the sections below.

# TensorFlow and Keras
Keras is a high-level neural networks application programming interface (API), written in Python and capable of running on top of TensorFlow, CNTK, or Theano.  Since version 1.12.0, TensorFlow contains its own Keras API implementation as described on the TensorFlow website.

# What is inside the TensorFlow containers?
Most containers provide documentation regarding the main applications that have been installed inside. This information can be queried with the `singularity help` command.
```
module load singularity
module load tensorflow/1.12.0-py36
singularity help $CONTAINERDIR/tensorflow-1.12.0-py36.simg
```
Example Output:
```
This container is backed by Anaconda version 5.2.0 and provides the Python 3.6 bindings for:
    * Tensorflow 1.12.0 with Keras implementation
    * PyTorch 1.0
    * XGBoost
    * LightGBM
    * CUDA 9.0
    * CuDNN 7.4.1.5
```

# Local Copy of Container Image
The TensorFlow container images contain all the libraries and software packages required to run TensorFlow.  In order to run SLURM or interactive jobs (ijobs), it is best practice to create a local copy of the container image in your own /home or /scratch directory. The container images can be copied like any other file on Rivanna.

A library of prepared TensorFlow containers prepared to run on Rivanna's GPU nodes can be accessed through these commands:
```
module load singularity
module avail tensorflow
```
In this example, the available TensorFlow containers are listed under `/apps/modulefiles/standard/container/singularity/2.6.1`.
```
---------------------- /apps/modulefiles/standard/container/singularity/2.6.1 -----------------------
   cellprofiler/2.2.0        danpos/2.2.2    (D)    tensorflow/1.6.0-py27     tensorflow/1.12.0-py36 (D)
   cellprofiler/3.0.0 (D)    hydrator/0.0.2         tensorflow/1.6.0-py36
   cp-analyst/2.2.1          inkscape/0.92.3        tensorflow/1.12.0-py27
```
Loading of any of these container modules produces an on-screen message with instructions on how to copy the TensorFlow container image file to the personal /scratch directory.  

# TensorFlow Jupyter Notebooks
Jupyter Notebooks can be used for interactive code development and execution of Python scripts and several other codes.  A prebuilt TensorFlow container backed by an Anaconda distribution and Python 3.6 is accessible as a Jupyer Notebook kernel.  This container also contains a Keras implementation.

## Accessing the JupyterLab Portal

1. Open a web browser and go to URL:  https://rivanna-portal.hpc.virginia.edu
2. Use your `Netbadge` credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on “Interactive Apps”.
4. In the drop-down box, click on `JupyterLab`.

## Requesting access to a GPU node

To start a JupyterLab session, fill out the resource request webform.  To request access to a GPU, verify the correct selection for the following parameters:

1. Under Rivanna Partition, choose "GPU".
2. Under Optional GPU Type, choose "K80", "P100", or leave it as "default".
3. Click `Launch` to start the session.

Review our [Jupyer Lab documentation](/resource/rivanna/software/jupterlab) for more details..

## Editing and Running the Notebook

Once the JupyterLab instance has started, you can edit and run your notebook as described here.

# TensorFlow SLURM jobs
Singularity can make use of the local NVIDIA drivers installed on a host equipped with a GPU device.  The SLURM script needs to include the #SBATCH -p gpu and #SBATCH --gres=gpu directives in order to request access to a GPU node and its GPU device.  Please visit the Jobs Using a GPU section for details.

To run commands in an GPU-enabled container image, load the singularity module and add the --nv flag when executing the singularity run or singularity exec commands.  Before running the following commands it is assumed that a TensorFlow container image (tensorflow-1.12.0-py36.simg) has been copied to your personal /scratch directory.

For example:
```
module load singularity
singularity run --nv /scratch/$USER/tensorflow-1.12.0-py36.simg tf_example.py
```
In the container build script, python was defined as the default command to be excuted and singularity passes the argument(s) after the image name, i.e. tf_example.py, to the python interpreter. So the above singularity command is equivalent to
```
singularity exec --nv /scratch/$USER/tensorflow-1.12.0-py36.simg python tf_example.py
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
singularity run --nv $containerdir/tensorflow-1.12.0-py36.simg tf_example.py
```

# TensorFlow Interactive Jobs (ijob)
Just as described for SLURM jobs, it is recommended to copy a TensorFlow container image (e.g. tensorflow-1.12.0-py36.simg) to your personal /scratch directory before starting an ijob.

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
singularity run --nv /scratch/$USER/tensorflow-1.12.0-py36.simg tf_example.py
```

# Interaction with the Host File System
The following user directories are overlayed onto each container by default on Rivanna:

* /home
* /scratch
* /nv
* /project

Due to the overlay, these directories are by default the same inside and outside the container with the same read, write, and execute permissions.  This means that file modifications in these directories (e.g. in `/home`) via processes running inside the container are persistent even after the container instance exits.  The `/nv` and `/project` directories refer to leased storage locations that may not be available to all users.
