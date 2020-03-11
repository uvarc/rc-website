+++
images = [""]
author = "Staff"
description = ""
date = "2020-03-11T10:18:25-05:00"
title = "Rivanna Software Updates: March 11, 2020"
draft = false
tags = ["Rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}The Rivanna maintenance has been completed on March 11 and the system is back in service.{{< /alert-green >}}

- - - 

The following software modules have been **removed** from Rivanna during the maintenance period. Please use the suggested newer versions:

- `gcc/5.4.0` & toolchains -> `7.1.0`
    - All modules that depend on `gcc/5.4.0` are now available under `gcc/7.1.0`.
    - The only exception is `cushaw3/3.0.3`. Please contact us if you need to use it.
- `pgi/19.7` & toolchains -> `19.10`
    - All modules that depend on `pgi/19.7` are now available under `pgi/19.10`.
- `anaconda/5.2.0-py2.7` -> `2019.10-py2.7`
    - All modules that depend on `anaconda/5.2.0-py2.7` are now available under `anaconda/2019.10-py2.7`.
- `tensorflow/1.6.0-py27`, `-py36` -> `1.12.0`, `2.0.0`, or `2.1.0`
    - If you must use version 1.6.0, please pull the image from our repository on [Singularity Library](https://cloud.sylabs.io/library/uvarc/default/tensorflow).
- `singularity/3.1.1` -> `3.5.2`
- `boost/1.66.0` -> `1.68.0`
- `julia/1.0.2`, `1.0.3` -> `1.3.1`
- `cushaw3/3.0.3` - no replacement

The following **upgrades** have taken place during the maintenance period:

- JupyterLab v1.2.6 - based on `anaconda/2019.10-py3.7`
- Python 3.7 Jupyter kernel - based on `anaconda/2019.10-py3.7`
    - The previous **"Python 3"** kernel (based on `anaconda/5.2.0-py3.6`) has been **renamed as "Python 3.6"**.
- `anaconda/2019.10-py2.7`, `-py3.7`
- `gcc/9.2.0` & toolchains - gcc/7.1.0 remains the default
- `singularity/3.5.2` - now default version
- `gurobi/9.0.1`
- `tensorflow/2.1.0-py37` - Singularity container module & Jupyter kernel
- `julia/1.3.1` - module & Jupyter kernel
- `ansys/2020r1`
- `samtools/1.10`
- `rust/1.41.0`
- `cmake/1.16.5`


**New tools**:

- LibreOffice - through FastX Web desktop environment
- `pytorch/1.4.0` - Singularity container module & Jupyter kernel
- `openfoam 7` (version 1909) - open-source CFD software
- `goolfc/6.5.0_3.1.4_10.1.168` - GOOLF toolchain (GCC + OpenMPI + OpenBLAS + ScaLAPACK + FFTW) with CUDA support
- `atom/1.43.0` - Atom text editor
- `rclone/1.51.0` - Rclone for cloud file syncing (supports Google Drive)
- `nodejs/12.14.1` - Node.js JavaScript runtime environment
- `ninja/1.10.0-py3.6` - Ninja build system
- `meson/0.53.1-py3.6` - Meson build system
- `gtk+/3.24.14` - GTK+ 3 libraries for GUI applications
- `fribidi/1.0.8` - Free Implementation of the Unicode Bidirectional Algorithm
- `atk/2.28.1` - Accessibility Toolkit
- `tree/1.8.0` - Tree structure of file system
- `gnupg/2.2.19` - GnuPG encrypt and sign data
