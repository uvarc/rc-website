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

There are major changes to compiler and container toolchains (GCC, NVHPC, Apptainer). Users should read the corresponding sections carefully if applicable.

#### GCC

GCC 14.2.0 will become the new default. Most modules under 11.4.0 will be migrated under 14.2.0. Some of the most important upgrades include:
- bcftools|htslib|samtools/1.23
- mariadb/11.8.3 (new)
- postgresql/18.1
- python/3.13.11
- R/4.6.0
- rust/1.92.0

If a module is only found under GCC 11.4.0, it should be seen as deprecated, meaning it will be removed with the entire GCC 11.4.0 toolchain in the future, but not during this maintenance. Deprecated modules are listed at the end of this page. If you still need to use these modules, please let us know as soon as possible.

Some specifics:

- A few modules will be moved under `openmpi` (e.g. hisat2/2.2.1) or `apptainer` (e.g. grass/8.4.2). Please use `module spider <NAME>` to check the load command.
- [R] Apart from the removal of 4.3.1, existing R versions will remain under GCC 11.4.0, so that users won't have to reinstall their R libraries. Starting from 4.6.0, R will be built under 14.2.0. (We have prepared a script to help you transition to 4.6. See section below for more information.)
- [Amber] `amber` and `ambertools` will become distinct modules.
- [Berkeley DB] `berkeley_db` will be renamed to `db`.
- [Boost] Starting from version 1.88.0, the MPI-enabled module name will be `boost.mpi`. The non-MPI module name will be `boost`.
- [SRA Toolkit] `sratoolkit` will be renamed to `sra-toolkit`.
- [wigToBigWig/Kent Tools] `wigtobigwig` will be absorbed into `kent-tools/487`. Note the change in the version format of the latter.

GCC 12.4.0 and all modules under it will be removed. 

#### NVHPC

Starting from 26.1, the `nvhpc` toolchain will become a complete toolchain (compiler + MPI + math libary). Instead of building our own OpenMPI with the NVIDIA compilers, we will switch to the bundled HPC-X (NVIDIA's modified OpenMPI). Simply run `module load nvhpc/26.1`. Do not load `nvompi` or `openmpi`. In Slurm scripts replace `srun` with `mpirun`.

Users who build MPI code using NVIDIA compilers should test out the new toolchain as soon as possible. We recommend against cross-compiling (e.g. building on the frontend) as it can often lead to "illegal instruction" errors at runtime. We recommend building on an Ampere GPU (A40, A6000, A100).

Users who only need the compilers but not NVIDIA's MPI or math libraries should load `nvidia-compilers/26.1`.

During this maintenance, only 24.5 will be removed. 25.x are deprecated and will be removed in the future.

#### Apptainer

Apptainer will be upgraded to 1.4.5. Existing containers do not need to be rebuilt.

#### Transitioning to a new R version

If you want to use the newer R 4.6.0 version you will need to update your R packages. Without reinstalling your packages manually, you can run the `updateRlib` script. This script is located under `/share/resources/HPCtools`.

To use the script, provide two arguments: the current version of R and the newer version. For example, if you want to install the packages you're using with R 4.3.1 with R 4.6.0, type:

```
/share/resources/HPCtools/updateRlib 4.3.1 4.6.0
```

The script will prompt you:
```
Packages from
~/R/goolf/4.3 
will be built in 
~/R/goolf/4.6 
Is this what you want to do? <Y or N>
```
Respond with `Y` to re-install your packages and make them compatible with the newer R version.

#### Removed modules

The modules to be removed during this maintenance are listed below.

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|apptainer                |1.3.4   |1.4.5 |
|cellassign               |0.99.2  |-|
|cellpose                 |3.0.10  |4.0.5+ |
|clara-parabricks         |4.2.0   |4.6.0 |
|cumulus_feature_barcoding|0.10.0  |-|
|danpos                   |2.2.2   |-|
|gcc                      |12.4.0  |14.2.0 (default), 11.4.0 (legacy) |
|gdb                      |13.1-py3.11|16.3 |
|gromacs                  |2023.2, 2025.1  |2025.3 (cpu), 2026.0 (gpu) |
|gsea                     |4.3.3   |4.4.0 |
|metamorpheus             |0.0.320 |-|
|nanopolish               |0.13.2  |-|
|nibabies                 |22.1.3  |-|
|nvhpc                    |24.5    |25.3+ |
|openmm                   |7.5.0   |-|
|peer                     |1.3     |-|
|R                        |4.3.1   |4.4.1+ |
|rmats-turbo              |4.1.1   |-|
|skopeo                   |1.13.1  |-|
|subversion               |1.14.0  |-|
|thermorawfileparser      |1.3.4   |-|
|vg                       |1.22.0  |-|
{{< /table >}}

#### Deprecated modules under GCC 11.4.0

Deprecated modules under GCC 11.4.0 are listed alphabetically below. They will not be removed during this maintenance.

- Non-MPI

    ```
    abseil bart-mri bedops canu circos eigensoft
    g2clib g2lib gd gemma grackle
    lapack libibmad libibumad libmatheval libmcfp libtorch libxml++
    mm-common mrc mrtrix3tissue nlopt
    pasapipeline protobuf protobuf-python qwt
    seqoutbias shapeit4 shapelib
    tensorrt viennarna xxdiff
    ```

- MPI

    ```
    attrdict3 chemps2 cloudcompare finestructure
    gildas itk mafft regtools sundials
    wxpython wxwidgets
    ```


If you have any questions about the maintenance, please [contact our user services team](https://www.rc.virginia.edu/support/). 
