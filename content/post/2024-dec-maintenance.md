+++
images = [""]
author = "Staff"
description = ""
date = "2024-12-04T00:00:00-05:00"
title = "HPC Maintenance:  , 202"
draft = true
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The HPC cluster will be down for maintenance on <strong>Tuesday, Dec 12, 2024</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the cluster is returned to service.

All systems are expected to return to service by **Wednesday,**

## IMPORTANT MAINTENANCE NOTES

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
|star     | 2.7.9a  | 2.7.11b |
{{< /table >}}
