+++
images = [""]
author = "Staff"
description = ""
date = "2021-12-03T00:00:00-05:00"
title = "Rivanna Maintenance: December 14, 2021"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna will be down for maintenance on <strong>Tuesday, December 14, 2021</strong>, beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

Rivanna is expected to return to service by .

## IMPORTANT MAINTENANCE NOTES

### Modules

1. The following software modules will be **removed** from Rivanna during the maintenance period:
    - tensorflow/1.12.0-py27, 2.0.0-py36
    - IDL/8.4

2. The following **upgrades** will take place during the maintenance period.
    - gcc/11.2.0 and libraries:
        - openmpi/
        - openblas/0.3.17
        - scalapack/2.1.0
        - fftw/3.3.10
        - boost/1.77.0
        **The default version is still 9.2.0.** We plan to upgrade the default to 11.2.0 in June 2022.
    - gromacs/2021.2 - with GPU support; please load `goolfc` first

   Upgrades to default versions of applications:
    - nvhpc/20.9 -> 21.9 (includes CUDA 11.4)
    - [alphafold/2.0.0](/userinfo/rivanna/software/alphafold) - 2.0.0 -> 2.0.1
    - amptorch/20210308 -> 0.1
    - freebayes/0.9.9 -> 1.3.4
    - salmon/1.2.1 -> 1.5.1
    - rapids/0.19 -> 21.10

3. **New** modules:
    - rosetta/3.13 - computational modeling and analysis of protein structures
    - cc3d/4.2.5 - CompuCell3D
    - deeplabcut/2.2 - animal pose estimation
    - [namd/2.14](/userinfo/rivanna/software/namd) - Nanoscale Molecular Dynamics
    - vmd/1.9.4 - Visualization software for NAMD
    - ocaml/3.12.1
    - pov-ray/3.7.0 - 3D graphics with raytracing
    - unrar/6.0.2
