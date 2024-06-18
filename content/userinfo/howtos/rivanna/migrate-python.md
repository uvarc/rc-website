+++
type = "howto"
date = "2021-04-01T00:00:00-05:00"
tags = [
  "rivanna", "software", "python"
]
categories = ["howto"]
draft = false
title = "Migrating Python packages"
description = "How to migrate Python packages from one Python version to another"
author = "RC Staff"

+++

# Scenario

You have installed Python packages locally in one version and now wish to use them in a different version.  For example, you have been using Python 3.6 but it is obsolete and will be removed soon, so you need to set up those packages for Python 3.8.  There are several ways to accomplish this, depending on the package manager. In this how-to we will discuss `pip` and `conda`.

You will need to load the module for the newer Python version. For this example,

{{< code-snippet >}}
module load anaconda/2020.11-py3.8
{{< /code-snippet >}}

# Pip

The Python packages are installed in a hidden location under your home directory:

```
~/.local/lib/pythonx.y/site-packages
```

where `x` and `y` are the major and minor Python versions, respectively.

## Preserve individual package versions

To preserve the versions for all individual packages, first freeze the environment into a file, say `requirements.txt`:

{{< code-snippet >}}
pip freeze --path ~/.local/lib/python3.6/site-packages > requirements.txt
{{< /code-snippet >}}

Next, install the packages:

{{< code-snippet >}}
pip install --user -r requirements.txt
{{< /code-snippet >}}

## Use the latest versions or whichever are mutually compatible

If you have no preference on the package versions, you can remove the version requirements:

{{< code-snippet >}}
pip freeze --path ~/.local/lib/python3.6/site-packages | sed 's/==.*$//g' > requirements.txt
{{< /code-snippet >}}

Install the packages:

{{< code-snippet >}}
pip install --user -r requirements.txt
{{< /code-snippet >}}

# Conda

Despite the `-py3.8` suffix in the Anaconda module, you can create/load a conda environment that uses a different Python version. Suppose the environment name is `myenv`. You can either update the existing environment or create a new one.

## Update Python in the old environment

```bash
source activate myenv
conda install python=3.8
```

Note that if you have many packages in the environment, such an update could take very long due to conda's slow dependency resolution. Individual package versions are not preserved.

## Create the new environment

It is better to create a new environment and let the dependency solver do its work from scratch:

```bash
conda create -n mynewenv python=3.8 <list of packages>
```

Use the syntax `<package>=<version>` if you have version requirements.

Run `conda list -n myenv` to get a list of all packages in `myenv`. You can use the following command to show the same list in one line without version information:

{{< code-snippet >}}
conda list -n myenv | awk '{if($1 !~ /^#/) print $1}' | tr '\n' ' '
{{< /code-snippet >}}

Please also visit [this page](/userinfo/rivanna/software/anaconda/#package-installation-with-conda) for more information.
