+++
images = [""]
author = "Staff"
description = ""
date = "2021-12-01T00:00:00-05:00"
title = "Rivanna Maintenance: December 14, 2021"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna and the Globus data transfer nodes (DTNs) will be down for maintenance on <strong>Tuesday, December 14, 2021</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

Users will be unable to transfer data using Globus during the maintenance period. Rivanna and the Globus DTNs are expected to return to service by 6 a.m. on **Wednesday, December 15.**

## IMPORTANT MAINTENANCE NOTES

### New GPU

We are pleased to announce the addition of DGX A100 GPU to the `gpu` partition. To request an A100 GPU in Slurm scripts, use `--gres=gpu:a100`.

**Attention PyTorch/TensorFlow users:** We are removing all the non-default PyTorch and TensorFlow versions, together with the corresponding Jupyter kernels, as they are not compatible on the A100, and adding a new version that will replace the current default (1.8.1 -> 1.10.0 for PyTorch; 2.4.1 -> 2.7.0 for TensorFlow). For the sake of reproducibility/continuity of ongoing projects, the deprecated containers will be accessible from `/share/resources/containers/singularity/archive` and can be used to [install your own Jupyter kernel](/userinfo/howtos/rivanna/custom-jupyter-kernels). You may use them on other GPUs by excluding the A100 via the Slurm option `-x udc-an28-[1,7]`.

### Modules

1. The following software modules will be **removed** from Rivanna during the maintenance period:
    - pytorch/1.4.0-py37, 1.5.1 (see section above)
    - tensorflow/1.12.0-py27, 1.12.0-py36, 2.0.0-py36, 2.1.0-py37 (see section above)
    - cuda/9.2.148.1
    - cudnn/7.4.1.5
    - python/3.8.8 under `gompic` -> moved to `goolfc`
    - matlab/R2018b, 2019a, R2019b
    - mathematica/12.0, 12.1
    - epacts/3.3.0 - replaced by 3.3.2 under `goolf/7.1.0_3.1.4`
    - R/3.2.1, 3.4.4, 3.5.3, 4.0.0, 4.1.0

    **Attention R users**: We will streamline the R modules to include the following versions: 3.6.3, 4.0.3, and 4.1.1. The default version will be 4.0.3. If you have hard-coded an older version of R in your scripts (e.g., R/3.5.3), you will need to update your scripts to specify one of the newer versions. If you need to switch to a newer version of R, your library containing the packages that you have installed will have to be updated. You can attempt this manually, or you can contact hpc-support@virginia.edu for help with automating the installation of your packages.

2. The following **upgrades** will take place during the maintenance period.
    - gcc/11.2.0 and libraries (openmpi/3.1.6, openblas/0.3.17, scalapack/2.1.0, fftw/3.3.10, boost/1.77.0)

        **The default version is still 9.2.0.**

    - gromacs/2021.2 - with GPU support; please load `goolfc` first

   Upgrades to default versions of applications:
    - R/3.6.3 -> 4.0.3
    - matlab/R2021a -> R2021b
    - mathematica/12.2 -> 12.3
    - nvhpc/20.9 -> 21.9
    - cuda/11.0.228 -> 11.4.2
    - cudnn/7.6.5.32 -> 8.2.4.15
    - pytorch/1.8.1 -> 1.10.0
    - tensorflow/2.4.1 -> 2.7.0
    - [alphafold/2.0.0](/userinfo/hpc/software/alphafold) -> 2.1.1; note changes to flags!
    - amptorch/20210308 -> 0.1
    - freebayes/0.9.9 -> 1.3.4
    - salmon/1.2.1 -> 1.5.1
    - rapids/0.19 -> 21.10

3. New **modules**:
    - [spark/3.1.2](/userinfo/hpc/software/spark)
    - rosetta/3.13 - computational modeling and analysis of protein structures
    - [namd/2.14](/userinfo/hpc/software/namd) - Nanoscale Molecular Dynamics
    - vmd/1.9.4 - Visualization software for NAMD
    - cc3d/4.2.5 - CompuCell3D
    - deeplabcut/2.2 - animal pose estimation
    - mirdeep2/0.1.3
    - multiqc/1.11
    - pbwt/3.0
    - ocaml/3.12.1
    - pov-ray/3.7.0 - 3D graphics with raytracing
    - unrar/6.0.2
