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
    - bcftools|htslib|samtools/1.23
    - mariadb/11.8.3 (new)
    - postgresql/18.1
    - python/3.13.11
    - R/4.6.0
    - rust/1.92.0

    If a module is only found under GCC 11.4.0, it should be seen as deprecated, meaning it will be removed with the entire GCC 11.4.0 toolchain in the future, but not during this maintenance. Deprecated modules are listed at the end of this page. If you still need to use these modules, please let us know as soon as possible.

    Some specifics:

    - A few modules will be moved under `openmpi` (e.g. hisat2/2.2.1) or `apptainer` (e.g. grass/8.4.2). Please use `module spider <NAME>` to check the load command.
    - **[R]** Apart from the removal of 4.3.1, existing R versions will remain under GCC 11.4.0, so that users won't have to reinstall their R libraries. Starting from 4.6.0, R will be built under 14.2.0.
    - **[Boost]** Starting from version 1.88.0, the MPI-enabled module name is `boost.mpi`. The non-MPI module name is `boost`.
    - **[Berkeley DB]** `berkeley_db` is renamed to `db`.
    - **[SRA Toolkit]** `sratoolkit` is renamed to `sra-toolkit`.
    - **[wigToBigWig/Kent Tools]** `wigtobigwig` is absorbed into `kent-tools/487`. Note the change in the version format of the latter.
- GCC 12.4.0 and all modules under it will be removed. 
- Apptainer will be upgraded to 1.4.5. Existing containers do not need to be rebuilt.
- The modules to be removed during this maintenance are listed below.

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
|gromacs                  |2023.2  |2025.1+ |
|gsea                     |4.3.3   |4.4.0 |
|metamorpheus             |0.0.320 |-|
|nanopolish               |0.13.2  |-|
|nibabies                 |22.1.3  |-|
|openmm                   |7.5.0   |-|
|peer                     |1.3     |-|
|R                        |4.3.1   |4.4.1+ |
|rmats-turbo              |4.1.1   |-|
|skopeo                   |1.13.1  |-|
|subversion               |1.14.0  |-|
|thermorawfileparser      |1.3.4   |-|
|vg                       |1.22.0  |-|
{{< /table >}}

- Deprecated modules under GCC 11.4.0 are listed alphabetically below. They will not be removed during this maintenance.
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
