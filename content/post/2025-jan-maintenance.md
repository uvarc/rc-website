+++
images = [""]
author = "Staff"
description = ""
date = "2025-01-01T00:00:00-05:00"
title = "HPC Maintenance: Jan 7, 2025"
draft = true
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The HPC cluster will be down for maintenance on <strong>Tuesday, Jan 7, 2025</strong> beginning at 6 am.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the cluster is returned to service.

All systems are expected to return to service by **Wednesday, Jan 8** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### Dedicated Compute/Charge Rate

### Removed old DNS names

The old Domain Name System (DNS) entries for logging into Rivanna/Afton HPC have been removed. Please refer to the table below for the updated login names.

|Old|New|
|---|---|
|rivanna.hpc.virginia.edu|login.hpc.virginia.edu|
|rivanna-desktop.hpc.virginia.edu|fastx.hpc.virginia.edu|
|rivanna-portal.hpc.virginia.edu| ood.hpc.virginia.edu|

### Modules

- Apptainer will be upgraded from 1.2.2 to 1.3.4. There is no change to the containers themselves, and users do not need to rebuild their own containers.

- The following modules will be **removed** from Rivanna during the maintenance period.

{{< table title="replacement" class="table table-striped" >}}
| Module | Removed version | Replacement |
|---|---|---|
|amber    | 22.0    | 24-CUDA-12.2.2 |
|apptainer| 1.2.2   | 1.3.4 |
|blender  | 3.2.1, 3.4.1 | 3.6.17 |
|diamond  | 2.0.14  | 2.1.6 |
|freesurfer| 6.0.1  | 7.2.0 |
|gatk     | 4.3.0.0, 4.5.0.0 | 4.6.0.0 |
|irfinder | 1.3.1   | 2.0.1 |
|kraken2  | 2.1.2   | 2.1.3 |
|orca     | 5.0.2   | 5.0.4, 6.0.0 |
|rapidsai | 23.10   | 24.06 |
|rust     | 1.66.1  | 1.79.0 |
|scons    | 4.2.0   | 4.5.2 |
|smrtlink | 12.0.0.177059 | 13.1.0.221970 |
|spaceranger| 2.0.1 | 3.1.1 |
{{< /table >}}
