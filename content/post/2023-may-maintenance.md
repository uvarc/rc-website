+++
images = [""]
author = "Staff"
description = ""
date = "2023-05-16T00:00:00-05:00"
title = "Rivanna Maintenance: May , 2023"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna will be down for maintenance on <strong>May , 2023</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

All systems are expected to return to service by **6 a.m. on , May **.

## IMPORTANT MAINTENANCE NOTES

### Modules

1. The toolchains `gompic` `gcccuda` `goolfc` will be **removed** from Rivanna during the maintenance period, since we now have CUDA-aware toolchains based on gcc/11.2.0. If you need assistance with rebuilding your own code, please contact us [here](https://www.rc.virginia.edu/form/support-request/). The following affected modules have been migrated:

| Module | Previous toolchain | Replacement |
|---|---|---|
|gpunufft/2.1.0 | gcccuda/9.2.0_11.0.228     | same version under gcc/11.2.0 |
|gromacs/2021.2 | goolfc/9.2.0_3.1.6_11.0.228| 2022.4 under goolf/11.2.0_4.1.4 |
|mumax3/3.10    | gcccuda/9.2.0_11.0.228     | same version under gcc/11.2.0 |

The following modules will be **removed** from Rivanna during the maintenance period.

| Module | Removed version | Replacement |
|---|---|---|
|alphafold<sup>*</sup> | 2.2.0 | 2.1.2, 2.2.2, 2.3.0 |
|awscli | 2.4.12 | 2.9.17 |
|imagemagick | 7.0.7-0 | 7.1.0-57 |

<sup>*</sup>Archived containers can be found in `/share/resources/containers/singularity/archive`.

2. **Upgrades**:

    **Default version changes:**

3. **New** modules:
