+++
type = "howto"
date = "2022-08-21T15:12:46-05:00" 
tags = [ "rivanna", "software", "containers" ] 
categories = ["howto"]
draft = false 
title = "How to add packages to a container?"
description = "How to add packages to a container?"
author = "RC Staff"
+++

# Basic Steps

Strictly speaking, you cannot add packages to an existing container since it is not editable. However, you can try to install missing packages locally. Using python-pip as an example:

```
module load apptainer
apptainer exec <container.sif> python -m pip install --user <package>
```

Replace `<container.sif>` with the actual filename of the container and `<package>` with the package name. The Python package will be installed in your home directory under `.local/lib/pythonX.Y` where `X.Y` is the Python version in the container.

If the installation results in a binary, it will often be placed in `.local/bin`. Remember to add this to your `PATH`:

```
export PATH=~/.local/bin:$PATH
```

You should be able to use the new package/binary in the container, as your entire home directory is mounted at runtime.

# Handling Errors

Installation may fail in more complicated scenarios, where additional libraries are needed. As a first step, load related modules (e.g. if you see "GLIBC not found" then load gcc) and try again.

You are always welcome to reach out to us for support. To expedite the process, please let us know what you have tried and include any error messages that you encountered.

# Advanced Users

Our Dockerfiles are hosted at https://github.com/uvarc/rivanna-docker. Please feel free to customize them and build your own version. For more information about our use of Docker Hub, please visit [here](/userinfo/hpc/software/containers/#container-registries-for-uva-research-computing).
