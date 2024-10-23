+++
type = "rivanna"
date = "2024-01-02T00:00:00-05:00"
tags = [
  "rivanna", "software", "machine learning"
]
draft = false
title = "TensorFlow and UVA HPC"
description = "TensorFlow and UVA HPC"
author = "RC Staff"

+++
# Overview
TensorFlow is an open source software library for high performance numerical computation.  It has become a very popular tool for machine learning and in particular for the creation of deep neural networks.  The latest TensorFlow versions are now provided as prebuilt Apptainer containers on the HPC system.  The basic concept of running Apptainer containers on the HPC system is described here.

TensorFlow code is provided in two flavors, either with or without support of general purpose graphics processing units (GPUs).  All TensorFlow container images provided on the HPC system require access to a GPU node.  Access to GPU nodes is detailed in the sections below.

# TensorFlow and Keras
Keras is a high-level neural networks application programming interface (API), written in Python and capable of running on top of TensorFlow, CNTK, or Theano.  Since version 1.12.0, TensorFlow contains its own Keras API implementation as described on the TensorFlow website.

# What is inside the TensorFlow containers?
The TensorFlow modules on the HPC system include common Python packages such as Matplotlib and OpenCV. See <https://hub.docker.com/r/uvarc/tensorflow> for details.

# TensorFlow Jupyter Notebooks
Jupyter Notebooks can be used for interactive code development and execution of Python scripts and several other codes. A few TensorFlow kernels are available.

## Accessing the JupyterLab Portal

1. Open a web browser and go to URL:  https://ood.hpc.virginia.edu
2. Use your `Netbadge` credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on “Interactive Apps”.
4. In the drop-down box, click on `JupyterLab`.

## Requesting access to a GPU node

To start a JupyterLab session, fill out the resource request webform.  To request access to a GPU, verify the correct selection for the following parameters:

1. Under Rivanna Partition, choose "GPU".
2. Under Optional GPU Type, choose a GPU type or leave it as "default" (first available).
3. Click `Launch` to start the session.

Review our [Jupyter Lab documentation](/userinfo/hpc/software/jupyterlab) for more details..

## Editing and Running the Notebook

Once the JupyterLab instance has started, you can edit and run your notebook as described here.

# TensorFlow Slurm jobs
Apptainer can make use of the local NVIDIA drivers installed on a host equipped with a GPU device.  The Slurm script needs to include the `#SBATCH -p gpu` and `#SBATCH --gres=gpu` directives in order to request access to a GPU node and its GPU device.  Please visit the Jobs Using a GPU section for details.

To run commands in an GPU-enabled container image, load the apptainer module and add the `--nv` flag when executing the apptainer run or apptainer exec commands.

For example:
```
module load apptainer tensorflow/2.10.0
apptainer run --nv $CONTAINERDIR/tensorflow-2.10.0.sif tf_example.py
```
In the container build script, `python` is defined as the default command to be executed and Apptainer passes the argument(s) after the image name, i.e. `tf_example.py`, to the Python interpreter. So the above apptainer command is equivalent to
```
apptainer exec --nv $CONTAINERDIR/tensorflow-2.10.0.sif python tf_example.py
```
The TensorFlow container images were built to include CUDA and cuDNN libraries that are required by TensorFlow.  Since these libraries are provided within each container, we do not need to load the CUDA/cuDNN libraries available on the host.

**Example Slurm Script:**

{{< pull-code file="/static/scripts/tensorflow.slurm" lang="no-highlight" >}}

# TensorFlow Interactive Jobs (ijob)
Start an ijob.  Note the addition of `-p gpu --gres=gpu` to request access to a GPU node and its GPU device.
```
ijob -A mygroup -p gpu --gres=gpu -c 1
```
**Console output"**
```
salloc: Pending job allocation 12345
salloc: job 12345 queued and waiting for resources
salloc: job 12345 has been allocated resources
salloc: Granted job allocation 12345
```
Now you can load the `apptainer` module and execute commands provided by the container. For example:
```
module purge
module load apptainer tensorflow/2.13.0
apptainer run --nv $CONTAINERDIR/tensorflow-2.13.0.sif tf_example.py
```

# Interaction with the Host File System
The following user directories are overlayed onto each container by default on the HPC system:

* /home
* /scratch
* /nv
* /project

Due to the overlay, these directories are by default the same inside and outside the container with the same read, write, and execute permissions.  **This means that file modifications in these directories (e.g. in `/home`) via processes running inside the container are persistent even after the container instance exits.**  The `/nv` and `/project` directories refer to leased storage locations that may not be available to all users.

# TensorBoard

Request a Desktop session under Interactive Apps via [Open OnDemand](https://ood.hpc.virginia.edu/pun/sys/dashboard). Fill out the form to submit the Slurm job. Launch the session and open a terminal in the desktop. Enter these commands:

```
$ module load apptainer tensorflow/2.13.0
$ apptainer shell --nv $CONTAINERDIR/tensorflow-2.13.0.sif
Apptainer> python -m tensorboard.main --logdir=logdir
```

Open the resulting URL (of the form `http://localhost:xxxx/`) in Firefox.

# Can I install my own TensorFlow (that works on a GPU)?

Yes, you may either pull the official TensorFlow Docker image or create your own environment. We shall use TensorFlow 1.14 as an example.

## Docker

1. Go to https://hub.docker.com/r/tensorflow/tensorflow/tags and search for the desired version. Use the `-gpu` variant.

1. Note the provided pull command (`docker pull tensorflow/tensorflow:1.14.0-gpu`) and change it into Apptainer. The differences are underlined by `^`:
    ```bash
    apptainer pull docker://tensorflow/tensorflow:1.14.0-gpu
    ^^^^^^^^^      ^^^^^^^^^
    ```

1. You will find the Apptainer image `tensorflow_1.14.0-gpu.sif` in your current directory. Consult the instructions in the previous sections. Remember to replace `$CONTAINERDIR/tensorflow-2.13.0.sif` with the actual path to your own Apptainer image.
 
## Pip

Please read the [manual](https://www.tensorflow.org/install/pip) for instructions. Especially note the `[and-cuda]` part of the pip install comand.

You may consider creating a conda environment (see [miniforge](/userinfo/hpc/software/miniforge)) for your local installation.
