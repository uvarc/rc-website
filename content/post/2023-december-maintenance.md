+++
images = [""]
author = "Staff"
description = ""
date = "2023-12-11T00:00:00-05:00"
title = "Rivanna Maintenance: December 18, 2023"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna will be down for maintenance on <strong>December 18, 2023</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

All systems are expected to return to service by **6 a.m. on , December **.

## IMPORTANT MAINTENANCE NOTES

The operating system will be upgraded to Rocky 8.7 with system glibc 2.28 and GCC 8.5.0. Due to fundamental changes in system libraries, the entire software stack is rebuilt. Users should rebuild all in-house codes; please contact us [here](https://www.rc.virginia.edu/form/support-request/) if you need assistance.

The NVIDIA driver version is upgraded to 535.54.03 (CUDA 12.2).

### Modules

1. Compilers and toolchains have been consolidated to the following:
    - GCC: `gcc/11.4.0`, `goolf/11.4.0_4.1.4` 
    - Intel: `intel/2023.1`, `intel/18.0` (for legacy software)
    - NVIDIA: `nvhpc/23.7`, `nvompi/23.7_4.1.5`

1. Singularity has been renamed to Apptainer. Please load the `apptainer/1.2.2` module for containers. (The `singularity` command is provided as an alias.)

1. There are many module version upgrades and deprecation of older versions. Please run `module spider NAME` to check the available versions and the corresponding load command. Contact us [here](https://www.rc.virginia.edu/form/support-request/) if you need a different version. Only the most important changes are listed below:

{{< table title="Replacements" class="table table-striped" >}}
|Name       |Default version|Other versions|Removed|
|---|---|---|---|
|JupyterLab | 3.6.3  | - | 2.2.9 |
|anaconda   |2023.07-py3.11 | | 2019.10-py2.7, 2020.11-py3.8|
|clang      |15.0.7  | - | 10.0.1 |
|cuda       |12.2.0  |10.2.89, 11.4.2| 10.1.168, 11.0.228 |
|gcc        |11.4.0  | - | 7.1.0, 9.2.0, 11.2.0 |
|intel      |2023.1  | 18.0 | 20.0, 2022.11 |
|julia      |1.9.2   | - | 1.5.3, 1.6.0 |
|llvm       |15.0.7  | - | 4.0.0 |
|nvhpc      |23.7    | - | 21.9 |
|perl       |5.36.0  | - | 5.24.0 |
|python     |3.11.4  | 2.7.18, 3.9.16 | 2.7.16, 3.6.6, 3.6.8, 3.7.7, 3.8.8 |
|R          |4.2.3   | - | 3.5.3, 3.6.3, 4.0.3, 4.1.1, 4.2.1 |
|ruby       |3.1.2   | - | 2.3.4 |
|rust       |1.66.1  | - | 1.38.0, 1.41.0 |
|spark      |3.4.1   | - | 3.1.2 |
|texlive    |2023    | - | 2020  |
{{< /table >}}
