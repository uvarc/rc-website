+++
images = [""]
author = "Staff"
description = ""
date = "2022-05-11T00:00:00-05:00"
title = "Rivanna Maintenance: May , 2021"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna and the Globus data transfer nodes (DTNs) will be down for maintenance on <strong>, May , 2022</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

## IMPORTANT MAINTENANCE NOTES

### Modules

1. The following software modules will be **removed** from Rivanna during the maintenance period:

2. **Upgrades**:
    - Addition of Matplotlib widget ipympl/0.8.7 to JupyterLab
    - tensorflow/2.8.0
    - swig/4.0.2

   Default version changes:
    - alphafold/2.1.1 -> 2.1.2
    - gatk/4.1.6.0 -> 4.2.3.0
    - igvtools/2.8.9 -> 2.12.0
    - metamorpheus/0.0.311-dev -> 0.0.320

3. **New** modules:
    - nvompic/21.9_3.1.6_11.4.2 toolchain (nvhpc/21.9 + openmpi/3.1.6 + cuda/11.4.2)
        - libraries: scalapack, fftw, hdf5
        - berkeleygw/3.0.1
        - quantumespresso/7.0
        - yambo/5.0.4
    - pandoc/2.17
    - trinity/2.13.2
    - cufflinks/2.2.1
    - redis-cli/6.2.6
