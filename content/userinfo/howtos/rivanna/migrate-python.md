+++
type = "howto"
date = "2021-04-01T00:00:00-05:00"
tags = [
  "rivanna", "software", "python"
]
draft = false
title = "Migrating Python packages"
description = "How to migrate Python packages from one Python version to another"
author = "RC Staff"

+++

# Scenario

You installed Python packages in, say, Python 3.6 and now want to use the same packages in, say, Python 3.8. There are several ways to do this depending on the package manager. In this how-to we will look at Pip and Conda.

You will need to load the module with the newer Python version. In this case,

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

## Use latest versions or whichever mutually compatible

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

## Update Python in old environment

```bash
source activate myenv
conda install python=3.8
```

Note that if you have many packages in the environment, such an update could take very long due to conda's slow dependency resolution. Individual package versions are not preserved.

## Create new environment

It is better to create a new environment and let the dependency solver do its work from scratch:

```bash
conda create -n mynewenv python=3.8 <list of packages>
```

Use the syntax `<package>=<version>` if you have version requirements.
