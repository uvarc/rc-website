+++
title = "Miniforge and UVA HPC"
description = ""
author = "RC Staff"
images = [""]
date = "2024-10-23T00:00:00-05:00"
categories = ["userinfo"]
tags = [
    "HPC",
    "software"
]
modulename = "miniforge"
softwarename = "Miniforge"
draft = false
+++

# Overview

Miniforge provides the Conda and Mamba package managers, with the default channel being conda-forge.
(Mamba is a reimplementation of the Conda package manager in C++ that uses a state-of-the-art library "libsolv" for much faster dependency solving.)

We have transitioned from Anaconda to Miniforge on Oct 15, 2024. See [here](https://www.rc.virginia.edu/2024/10/transition-from-anaconda-to-miniforge-october-15-2024) for details.

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

# Installing packages 

Packages could be installed via the `pip`, `conda`, or `mamba` package managers

## Using `pip`

Open the bash terminal, and type:

1. `module load miniforge`
1. `pip search package_name` (search for a package by name)
1. `pip install --user package_name` (install a package)
1. `pip update package_name --upgrade` (upgrade the package to the latest stable version)
1. `pip list` (list all installed packages)

{{% callout %}}
**Do not upgrade pip**. If you see the following message asking you to upgrade your pip version, it is usually safe to ignore it.
```
You are using pip version x.x.x, however version y.y.y is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```
Doing so may result in broken dependencies.

(As of 01/10/2020, this error message is suppressed.)
{{% /callout %}}

However, if you must upgrade pip, please do so in a virtual environment, such as conda.

## Using `conda` {#package-installation-with-conda}

You can specify which version of Python you want to run using conda. This can be done on a project-by-project basis, and is part of what is called a "Virtual Environment". A Virtual Environment is simply your isolated copy of Python in which you maintain your own version of files and directories. It enables you to keep other projects unaffected. With projects that have similar dependencies, you can freely install different versions of the same package without worry on two different Virtual Environments. In order to jump between two VE's, you simply activate or deactivate your environment. Follow the steps below:

1.  Set up your Virtual Environment:

	`conda create -n your_env_name_goes_here` (default Python version: use `conda info` to find out)

	OR 

	`conda create -n your_env_name_goes_here python=version_goes_here` (This command will automatically upgrade pip to the latest version in the environment. To find specific Python versions, use `conda search "^python$"`.)

1. If it asks you for `y/n`, hit `y` to proceed. It will start the installation
1. Activate your newly created environment `source activate your_env_name_goes_here`
1. Install a package in your activated environment

	`conda install -n your_env_name_goes_here your_package_name_goes_here`

	OR 

	`conda install -n your_env_name_goes_here \ your_package_name_goes_here=version_goes_here`

	OR (even better)

	In your home directory or Conda installation directory, create a file called `.condarc` (if not already there) Inside the file write the following:
	```
	create_default_packages
		- your_package_name_goes_here
		- your_package_name_goes_here
		- your_package_name_goes_here
		...
	```
	Now everytime you create a new environment, all those packages listed in `.condarc` will be installed.
1. To end the current environment session:
	`conda deactivate`
1. Remove an environment:
    `conda remove -n your_env_name_goes_here -all`
1. To create a JupyterLab tile for your conda environment:

	Install ipykernel inside your activated environment:
		`conda install -c conda-forge ipykernel`
	
	Then, create a new kernel:
		`python -m ipykernel install --user --name=MyEnvName`

	Your new kernel will show up as a tile when you select File-> New Launcher in JupyterLab. **Note:** Create your kernels from a FastX terminal, SSH connection, or using HPC Shell Access within Open OnDemand - please avoid using the terimnal within an interactive JupyterLab session for this purpose.
 
To see all available environments, run `conda env list`.

{{% callout %}}
**Tip: use `mamba` instead of `conda`.** Conda can take a long time to resolve environment dependencies and install packages. A new tool, `mamba`, has been developed to speed up this process considerably. Simply replace `conda` with `mamba` in any commands used to build an environment or install packages. Then you can still call your environment using `source activate <env>`.
{{% /callout %}}

# Python and MPI

The most widely used MPI library for Python is `mpi4py`. We recommend creating an environment for it.  When installing on the cluster, please do not use `conda install` since this will install prebuilt binaries, including a version of MPICH that does not communicate correctly with our Slurm resource manager.  The best practice is to install from the conda-forge channel using their `external` versions of an MPI library.  These are simply bindings to an MPI package provided by the underlying system.  For our system we will use OpenMPI.

First load a compiler and a corresponding version of OpenMPI.
```
module load gcc openmpi
```
For the above example, with the versions of gcc available on our system, this is gcc 11.4.0. Now check the version of OpenMPI.
```bash
module list
```
In this example it is OpenMPI 4.1.4.  Be aware that specific version numbers will change with time.

Now view the available external versions of OpenMPI from conda-forge
```bash
conda search -f openmpi -c conda-forge
```
Install the bindings
```bash
conda install -c conda-forge "openmpi=4.1.4=external_*"
```

Now you can install mpi4py
```bash
conda install -c conda-forge mpi4py
```

# Example Slurm script
## Non-MPI

{{< pull-code file="/static/scripts/python_serial.slurm" lang="no-highlight" >}}

## MPI

{{< pull-code file="/static/scripts/python_mpi.slurm" lang="no-highlight" >}}

# Using Conda Environments on Rio

When running Slurm jobs on Rio, it is essential to ensure that all packages and environments installed with miniforge are configured correctly. Rio compute nodes can only run jobs from high-security research standard storage, so it’s important to ensure that all necessary files and variables point to this location.

The following environment variables should be exported in your `~/.bashrc` file to install conda packages and environment into a specific directory (`/standard/ivy-xxx-xxxx/path/to/.conda/`):

```
export HTTPS_PROXY=http://figgis-s.hpc.virginia.edu:8080 
export HTTP_PROXY=http://figgis-s.hpc.virginia.edu:8080
export CONDA_PKGS_DIRS="/standard/ivy-xxx-xxxx/path/to/.conda/pkgs"
export CONDA_ENVS_PATH="/standard/ivy-xxx-xxxx/path/to/.conda/envs" 
export CONDA_CACHE_DIR="/standard/ivy-xxx-xxxx/path/to/.conda/cache" 
export CONDA_ROOT="/standard/ivy-xxx-xxxx/path/to/.conda" 
export XDG_CACHE_HOME="/standard/ivy-xxx-xxxx/path/to/.conda/cache"
```

{{% callout %}}
Keep in mind to replace `/standard/ivy-xxx-xxxx/path/to/.conda` with the path to your `.conda`
directory in your storage share.

Additionally, You'll want to make sure all of the sub directories exist under `.conda` (Eg pkgs, envs, and cache)
{{% /callout %}}

Conda environments will need to be created with the `--prefix` flag. Eg

```
module purge
module load miniforge

conda create --prefix /standard/ivy-xxx-xxxx/path/to/.conda/envs/my_env python=3.11
```

If you do not export the previous commands in your `~/.bashrc` file, you'll need to export all of them on the compute node in order to access the environment. You can then activate the full file path to the environment:

```
source activate /standard/ivy-xxx-xxxx/path/to/.conda/envs/my_env
```

# More Information
Please visit the official [website](https://github.com/conda-forge/miniforge).
