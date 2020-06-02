+++
images = [""]
author = "Staff"
description = ""
date = "2020-06-02T00:00:00-05:00"
title = "Rivanna Maintenance: June 17, 2020"
# url = "/maintenance"
draft = false
tags = ["Rivanna"]
categories = ["feature"]
+++


{{< alert-green >}}Rivanna will be down for maintenance on <strong>Wednesday, June 17</strong>, beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

Rivanna is expected to return to service later in the day.

1. The following software modules will be removed from Rivanna during the maintenance period:
    * intel/16.0 & toolchains - replaced by intel/18.0, 20.0
    * imsl/7.1.0 - expired license

1. The following upgrades will take place during the maintenance period:
    * intel/20.0 & toolchains - default 18.0
    * goolfc/8.3.0_3.1.6_10.2.89 - GCC 8 toolchain with OpenMPI, CUDA support, and numerical libraries
    * cuda/10.2.89
    * R/3.6.3 (default), 3.5.3, 3.4.4; removed 3.6.[0-2], 3.5.1, 3.4.3
    * matlab/R2020a
    * netcdf/4.7.3
    * sagemath/9.0 - removed 8.0
    * salmon/1.2.1 - removed 1.0.0 and 1.1.0 due to segfault bug
    * snap-stanford/5.0.9-py3.6
    * rust/1.41.0

1. New tools:
    * R/4.0.0 under intel/18.0
    * python/3.7.7 under intel/20.0 - Intel Distribution for Python
    * gpustat/0.6.0 - GPU monitoring tool
    * orca/4.2.1 - quantum chemistry package
    * anvio/6.2
    * atat/3.36
