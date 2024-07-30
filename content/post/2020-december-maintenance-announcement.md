+++
images = [""]
author = "Staff"
description = ""
date = "2020-11-29T00:00:00-05:00"
title = "Rivanna Maintenance: December 16-17, 2020"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++


{{< alert-green >}}Rivanna will be down for maintenance on <strong>Wednesday, December 16 & Thursday, December 17</strong>, beginning at 6 a.m. on December 16.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.
<!--more-->

Rivanna is expected to return to service later in the day on December 17. The instructional queue will not be available until January 10.

## IMPORTANT MAINTENANCE NOTES

### Modules

1. The following software modules will be **removed** from Rivanna during the maintenance period:
    - gcc/8.3.0 (replaced by 9.2.0)

1. The following **upgrades** will take place during the maintenance period:
    - Changes to the default compiler and related toolchain versions:
        - gcc/7.1.0 -> 9.2.0
        - intel/18.0 -> 20.0
        - cuda/10.2.89 -> 11.0.228

        Most dependent modules have been installed under the new default, except for R. R users must specify the previous goolf/iintelmpi version explicitly as `goolf/7.1.0_3.1.4` or `iintelmpi/18.0_18.0`. Some dependent modules have been removed from the previous default compiler/toolchain version. If you need to use a module under the previous version, please contact our user services team at hpc-support@virginia.edu.

        Users are reminded to recompile their code when switching to a different compiler/toolchain.

    - Upgrades to default versions of applications:
        - cellranger/3.1.0 -> 4.0.0
        - go/1.8.1 -> 1.13.4
        - julia/1.3.1 -> 1.5.3
        - ase/3.17.0-py3 -> 3.20.1
        - ffmpeg/4.3.1 (under gcc/9.2.0) - with x264 and x265 codecs

        If you need to use a non-default version of an application, please specify the version when you load the module. Use `module spider` to [find prerequisites](/userinfo/hpc/software/modules).
 
1. New nodes and tools:
    - Two RTX 2080 Ti nodes (10 GPU devices each) in `gpu` partition - use `--gres:rtx2080` in Slurm script
    - Visual Studio Code Server on Open OnDemand
    - nvhpc/20.9 - NVIDIA HPC SDK (CUDA 11.0)
    - awscli/2.1.10 - command line interface to Amazon Web Services
    - texlive/2020 - LaTeX
    - jq/1.6 - JSON processor
    - qiime2/2020.8 - microbiome bioinformatics platform with Empress and PICRUSt2 plugins
    - cellranger-atac/1.2.0
    - lightgbm/2.3.1 - CLI for gradient boosting framework

### Docker Hub container registry
We are now using Docker Hub as our official container registry. Details are available [here](/userinfo/hpc/software/containers/#container-registries-for-uva-research-computing). Many of these container images are very new (e.g. `pytorch:1.7.0`, `tensorflow:2.4.0`) and have not been installed as modules on Rivanna, but you are welcome to use them by following the instructions on the Docker Hub repository page.

If you have any questions or concerns about maintenance day, please contact our user support team at hpc-support@virginia.edu prior to 12/16.
