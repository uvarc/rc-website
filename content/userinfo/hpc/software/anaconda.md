+++
title = "Anaconda and UVA HPC"
description = ""
author = "RC Staff"
images = [""]
date = "2024-01-02T17:45:12-05:00"
categories = ["userinfo"]
tags = [
    "HPC",
    "software"
]
modulename = "anaconda"
softwarename = "Anaconda"
draft = false
+++

# Overview
Built to complement the rich, open source Python community, the Anaconda platform provides an enterprise-ready data analytics platform that empowers companies to adopt a modern open data science analytics architecture.

The UVA HPC system has Python 2 and 3 available as part of the Anaconda distribution. Anaconda comes installed with many packages best suited for scientific computing, data processing, and data analysis, while making deployment very simple. Its package manager **conda** installs and updates python packages and dependencies, keeping different package versions isolated on a project-by-project basis. Anaconda is available as open source under the New BSD license. It also ships with **pip**, the common python package manager. 

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

Packages could be installed via the `pip` or `conda` package managers

## Using `pip`

Open the bash terminal, and type:

1. `module load anaconda`
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

	In your home directory or Conda installation folder, create a file called `.condarc` (if not already there) Inside the file write the following:
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
		`conda install -c anaconda ipykernel`
	
	Then, create a new kernel:
		`python -m ipykernel install --user --name=MyEnvName`

	Your new kernel will show up as a tile when you select File-> New Launcher in JupyterLab.
 
To see all available environments, run `conda env list`.

{{% callout %}}
**Tip: use `mamba` instead of `conda`.** Anaconda can take a long time to resolve environment dependencies and install packages. A new tool, `mamba`, has been developed to speed up this process considerably. You can load it using `module load mamba` and then replace `conda` with `mamba` in any commands used to build an environment or install packages. Then you can still call your environment using `source activate <env>`.
{{% /callout %}}

# Python and MPI

As long as an MPI toolchain (e.g. `gcc` + `openmpi`) is loaded, you can install `mpi4py` using any Python/Anaconda module via `pip install --user mpi4py`. It is important to use a version of OpenMPI built for the cluster so that it will work correctly with Slurm.  You may find it desirable to set up a conda environment for use with mpi4py.

# Example Slurm script
## Non-MPI

{{< pull-code file="/static/scripts/anaconda_serial.slurm" lang="no-highlight" >}}

## MPI

{{< pull-code file="/static/scripts/anaconda_mpi.slurm" lang="no-highlight" >}}

# More Information
Please visit the official [Anaconda website](https://www.anaconda.com/download).
