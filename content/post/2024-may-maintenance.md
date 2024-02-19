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

### Modules

1. The NVIDIA driver will be upgraded to version (TBD). The compiler toolchain `nvhpc` and `nvompi` will be upgraded to `24.1` and `24.1_4.1.6`, respectively. The previous versions `23.7` and `23.7_4.1.4` will be removed. All modules under this toolchain will be rebuilt. You may not need to rebuild your own codes.

1. The following modules will be **removed** from Rivanna during the maintenance period:

| Module | Removed version | Replacement |
|---|---|---|
|gatk     |4.2.3.0 | 4.3.0.0 |
|gpumd    |3.7     | 3.9.1   |
|gurobi   |10.0.1  | 11.0.0 |
|picard   |2.23.4  | 2.27.5 |