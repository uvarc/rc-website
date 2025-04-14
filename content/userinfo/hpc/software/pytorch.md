+++
type = "rivanna"
date = "2020-02-28T08:37:46-05:00"
tags = [
  "rivanna", "software", "machine-learning","deep-learning"
]
draft = false
modulename = "pytorch"
softwarename = "PyTorch"
title = "PyTorch and UVA HPC"
description = "PyTorch and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}

**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# PyTorch Jupyter Notebooks
Jupyter Notebooks can be used for interactive code development and execution of Python scripts and several other codes. PyTorch Jupyter kernels are backed by containers in the corresponding modules.

## Accessing the JupyterLab Portal

1. Open a web browser and go to:  [https://ood.hpc.virginia.edu](https://ood.hpc.virginia.edu).
2. Use your “Netbadge” credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on `Interactive Apps`.
4. In the drop-down box, click on `JupyterLab`.

## Requesting access to a GPU node

To start a JupyterLab session, fill out the resource request webform.  To request access to a GPU, verify the correct selection for the following parameters:

1. Under Rivanna Partition, choose "GPU".
2. Under Optional GPU Type, choose a GPU type or leave it as "default" (first available).
Click `Launch` to start the session.

## Editing and Running the Notebook

Once the JupyterLab instance has started, you can edit and run your notebook as described [here](/userinfo/hpc/software/jupyterlab).

# PyTorch Slurm jobs

The following is a Slurm script template. The commented numbers correspond to the items in the ensuing notes.

```
#!/bin/bash
#SBATCH -A mygroup
#SBATCH -p gpu          # 1
#SBATCH --gres=gpu:1    # 1
#SBATCH -c 1
#SBATCH -t 00:01:00
#SBATCH -J pytorchtest
#SBATCH -o pytorchtest-%A.out
#SBATCH -e pytorchtest-%A.err

module purge
module load apptainer pytorch/2.0.1  # 2

apptainer run --nv $CONTAINERDIR/pytorch-2.0.1.sif pytorch_example.py # 3
```

Notes:

1. The Slurm script needs to include the `#SBATCH -p gpu`and `#SBATCH --gres=gpu` directives in order to request access to a GPU node and its GPU device.  Please visit the [Jobs Using a GPU](/userinfo/hpc/slurm/#jobs-using-a-gpu) section for details.

1. To use the pytorch container, load the apptainer and pytorch modules. You may choose a different version (see `module spider` above).

    Do **not** load the `cuda` or `cudnn` modules since these libraries are included with pytorch.

1. The `--nv` flag sets up the container's environment to use a GPU when running a GPU-enabled application. The `run` command executes the default command defined in the container, which in this case is `python`. What follows after the `*.sif` is passed as arguments. In summary, the apptainer command can be translated as: "Use the `python` interpreter inside the pytorch container to execute `pytorch_example.py` with GPU enabled."

# PyTorch Interactive Jobs (ijob)

Start an [ijob](/userinfo/hpc/slurm/#submitting-an-interactive-job).  Note the addition of `-p gpu` and `--gres=gpu` to request access to a GPU node and its GPU device.

```
ijob -A mygroup -p gpu --gres=gpu -c 1
```

```
module purge
module load apptainer pytorch/2.0.1
apptainer run --nv $CONTAINERDIR/pytorch-2.0.1.sif pytorch_example.py
```

# Interaction with the Host File System
The following user directories are overlayed onto each container by default on the HPC system:

+ /home
+ /scratch
+ /nv
+ /standard
+ /project

Due to the overlay, these directories are by default the same inside and outside the container with the same read, write, and execute permissions. **This means that file modifications in these directories (e.g. in /home) via processes running inside the container are persistent even after the container instance exits.** The `/nv` and `/project` directories refer to leased storage locations that may not be available to all users.
