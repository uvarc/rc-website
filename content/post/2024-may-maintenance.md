+++
images = [""]
author = "Staff"
description = ""
date = "2024-05-06T00:00:00-05:00"
title = "Rivanna Maintenance: May 28, 2024"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna will be down for maintenance on <strong>May 28, 2024</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service. Users will not be able to access the Globus data transfer node during the maintenance period.

All systems are expected to return to service by **6 a.m. on May 29.**

## IMPORTANT MAINTENANCE NOTES

### System upgrades
1. **Operating System:** Rocky 8.7 &rarr; 8.9. There is no need to rebuild your own code. (Intel users may need to do so but for a different reason; see below.)
1. **Slurm:** 21.08.8 &rarr; 23.02.7. Job-related commands remain the same.
1. **NVIDIA driver:** 535.104.12 &rarr; 550.54.14.

### Modules

1. **Attn Intel users** In anticipation of the new Afton nodes that are based on the AMD EPYC architecture, we have reorganized and rebuilt all modules under the `intel` toolchain. If you used `-x` (e.g. `-xavx`) to build your own code, you should rebuild it with `-march=skylake-avx512` for it to run on both AMD and Intel hardware. Below we list all the modules that are upgraded or moved to a different toolchain. The toolchain needs to be loaded before the module, e.g. `module load gomkl alamode`.

    | Module | New verison | Toolchain|
    |---|---|---|
    |alamode/1.4.2  | -      | gomkl |
    |cesm/2.1.3     | 2.2.2  | intel | 
    |chemps2/1.8.12 | -      | gomkl |
    |cp2k/2023.1    | 2024.1 | intel |
    |elpa/2023.05.001| -     | goolf |
    |esmf/8.4.1     | -      | gomkl |
    |fltk/1.3.8     | -      | gcc |
    |gmp/6.2.0      | -      | gcc |
    |kim-api/2.3.0  | -      | gcc |
    |mpfr/4.2.0     | -      | gcc |
    |ncview/2.1.7   | 2.1.10 | intel |
    |neuron/8.2.2   | -      | gompi |
    |p3dfft/2.7.9   | -      | gompi |
    |pcmsolver/1.3.0| -      | gompi |
    |pcre2/10.42    | -      | gcc |
    |raxml/8.2.12   | -      | gompi |
    |readosm/1.1.0a | -      | gcc |
    |relion/4.0.1   | -      | gomkl |
    |scotch/7.0.3   | -      | gompi |
    |shapelib/1.5.0 | -      | gcc |
    |siesta/4.1.5   | -      | goolf |
    |viennarna/2.5.1| -      | gcc |
    |voro++/0.4.6   | -      | gcc |

    The `gompi` toolchain is equivalent to `gcc openmpi`. The `gomkl` toolchain is the former plus Intel MKL. For Intel modules not listed above, you can use the same module load command as before.

    There is no impact to the existing modules built with GCC.

1. **Attn NVHPC users** The compiler toolchain `nvhpc` and `nvompi` will be upgraded to `24.1` and `24.1_4.1.6`, respectively. The previous versions `23.7` and `23.7_4.1.4` will be removed. All modules under this toolchain will be rebuilt. There should be no need to rebuild your own code.

1. The following modules will be **removed** from Rivanna during the maintenance period.

    | Module | Removed version | Replacement |
    |---|---|---|
    |cellranger|6.0.1,7.2.0| 8.0.0 |
    |fiji      |1.53t   | 2.14.0 |
    |gatk      |4.2.3.0 | 4.3.0.0 |
    |gpumd     |3.7     | 3.9.1   |
    |picard    |2.23.4  | 2.27.5 |
