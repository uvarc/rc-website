+++
images = [""]
author = "Staff"
description = ""
date = "2026-05-24T00:00:00-05:00"
title = "HPC Maintenance: May 26, 2026"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The UVA HPC systems, Afton/Rivanna, will be unavailable for maintenance on <strong>Tuesday, May 26, 2026</strong> beginning at 6 am.{{< /alert-green >}}

All systems are expected to return to service by **Wednesday, May 27** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### What to Expect During Maintenance  

### System

### Modules

- GCC 14.2.0 will become the new default. Most modules under 11.4.0 will be migrated under 14.2.0. Some of the most important upgrades include:
    - htslib|bcftools|samtools/1.23
    - python/3.13.11
    - qt6/6.9.3
    - rust/1.92.0

    If a module is only found under GCC 11.4.0, it should be seen as deprecated, meaning it will be removed with the entire GCC 11.4.0 toolchain in the future. (They are not removed during this maintenance.) If you still need to use these modules, please let us know as soon as possible.

    A few modules will be moved under `core` (no need to load gcc), `openmpi` (e.g. hisat2/2.2.1), or `apptainer` (e.g. grass/8.4.2). Please use `module spider <NAME>` to check the load command.
- GCC 12.4.0 and all modules under it will be removed. 
- Apptainer will be upgraded to 1.4.5. Existing containers do not need to be rebuilt.
- The modules to be removed during this maintenance are listed below.

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|apptainer                |1.3.4 |1.4.5 |
|cellassign               |0.99.2|-|
|cellpose                 |3.0.10|4.x|
|clara-parabricks         |4.2.0 | |
|cumulus_feature_barcoding|0.10.0|-|
|danpos                   |2.2.2 |-|
|gcc                      |12.4.0|14.2.0 (default), 11.4.0 (legacy) |
|gdb                      |13.1-py3.11|16.3|
|gromacs                  |2023.2|2025.x|
|gsea                     |4.3.3 |4.4.0|
|metamorpheus             |0.0.320|-|
|nanopolish               |0.13.2|-|
|nibabies                 |22.1.3|-|
|openmm                   |7.5.0 |-|
|peer                     |1.3   |-|
|rmats-turbo              |4.1.1 |-|
|skopeo                   |1.13.1|-|
|subversion               |1.14.0|-|
|thermorawfileparser      |1.3.4|-|
|vg                       |1.22.0|-|
{{< /table >}}

### Transitioning to a new R version

If you want to use the newer R 4.6.0 version you will need to update your R packages. Without reinstalling your packages manually, you can run the `updateRlib` script. This script is located under `/share/resources/HPCtools`.

To use the script, provide two arguments: the current version of R and the newer version. For example, if you want to install the packages you're using with R 4.3.1 with R 4.6.0, type:

```/share/resources/HPCtools/updateRlib 4.3.1 4.6.0```

The script will prompt you:
```
Packages from
~/R/goolf/4.3 
will be built in 
~/R/goolf/4.6 
Is this what you want to do? <Y or N>
```
Respond with "Y" to re-install your packages and make them compatible with the newer R version.

If you have any questions about the maintenance, please [contact our user services team](https://www.rc.virginia.edu/support/). 
