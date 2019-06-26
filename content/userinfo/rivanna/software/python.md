+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2019-06-23T08:37:46-05:00"
tags = [
  "programming"
]
draft = false
modulename = "anaconda"
softwarename = "Anaconda"
shorttitle = "Python"
title = "Python on Rivanna"
description = "Python in Rivanna's HPC environment"
author = "RC Staff"

+++
# Overview
Python is an integrated technical computing environment that combines sophisticated computation, advanced graphics and visualization, and a high-level programming language.

# Learning Python
The Research Computing groups offers a free 10-part video series called "Python for Scientists & Engineers". Click [here](https://workshops.somrc.virginia.edu/categories/programming-in-python-for-scientists-and-engineers/) to start learning Python.

# Python on Rivanna
The default Python is required for system purposes and is generally too old for applications. We offer Python through the [Anaconda]() distribution from Continuum Analytics. Anaconda bundles a large number of popular modules and packages, as well as the Spyder IDE, an iPython console, and Jupyter notebooks. To see all available versions, run
```
module spider anaconda
```

{{% module-versions tags="lang" %}}

The module version extensions, i.e. py2.7 and py3.6, indicate the version of the Python interpreter.

To load the `anaconda/5.2.0-py2.7` module which sets up your environment to use the Python 2.7 interpreter, run this command:
```
module load anaconda/5.2.0-py2.7
```

# View list of all installed packages
After loading an `anaconda` module, a list of all installed packages can be viewed by running this command:
```
conda list
```
A large number of packages are included in Anaconda.  If you need a package not available in the bundle, you can install it yourself with `pip` or `conda`.

# Package installation with pip
```
pip install --user yourpackage
```
The `--user` option will install it into your home directory.  It is bound to a particular version and will have to be reinstalled if Anaconda is upgraded.

# Package installation with conda
Certain Python packages are available pre-bundled via public Conda channels. Conda packages are installed in environments, i.e. specific directories. This is useful to isolate incompatible packages so that they do not conflict with each other. Only one Conda environment can be active at any given time. The Anaconda distribution provides a root environment that contains all of the preinstalled Anaconda packages. In addition, users can create their own Conda environments in their home directory.

Use one of the following two commands to install a particular package provided via a specific Conda channel in your own custom environment.

**Creating a new environment**
For example, if you want to install the epic package into a new environment named `custom_env` that does not exist yet, run this command:
```
module load anaconda/5.2.0-py3.6
conda create -n custom_env -c bioconda epic
```

**Updating an existing environment**
To install the same package into an existing environment, run:
```
conda install -n custom_env -c bioconda epic
```
* `-n custom_env`: Specifies the name of the environment where the package(s) will be installed.
* `-c bioconda`: Specifies that the packages to be installed are provided by the `bioconda` channel.
* `epic`: The name of the Conda package to be installed. Multiple packages separated by whitespaces can be listed.

The user environments are installed under `~/.conda/envs`.

# Using Conda environments
After loading an anaconda module on Rivanna, the root environment with default packages is activated.  To list all environments, run this command:
```
conda env list
```
To use packages in your own environment named custom_env, run this command:
```
source activate custom_env
```
To switch back to the default root environment, run this command:
```
source deactivate custom_env
```

# Example SLURM script
```
#!/bin/bash
#SBATCH -n 1
#SBATCH -t 01:00:00
#SBATCH -o myprog.out
#SBATCH -p standard
#SBATCH -A mygroup

module purge
module load anaconda/5.2.0-py3.6 # or anaconda/5.2.0-py2.7
# optional: uncomment next line to use your custom Conda environment; replace 'custom_env' with actual env name
# source activate custom_env

python myscript.py
```
