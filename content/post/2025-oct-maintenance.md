+++
images = [""]
author = "Staff"
description = ""
date = "2025-10-08T00:00:00-05:00"
title = "HPC Maintenance: Oct 14, 2025"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The UVA HPC systems, Afton/Rivanna, will be down for maintenance on <strong>Tuesday, October 14, 2025</strong> beginning at 6 am.{{< /alert-green >}}

All systems are expected to return to service by **Thursday, October 16** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### System

- Slurm will be upgraded from 24.11 to 25.05.

### Modules

- The `nvhpc/24.1` and `nvompi/24.1_4.1.6` toolchains, together with all associated modules, will be removed. Users should migrate to newer versions.
- We are dropping Python 2 support. If possible, users should migrate to Python 3; otherwise, please create your own conda environment.

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|ant       | 1.10.1 | 1.10.15 |
|bamtools  | 2.5.1  | 2.5.3 |
|caviar    | 2.2    | - |
|cppcheck  | 1.83   | 2.18.0 |
|ddd       | 3.3.12 | 3.4.1 |
|dragonn   | 0.4.1  | - |
|gcloud-sdk| 422.0.0| gcloud/536.0.1 |
|gperf     | 3.0.4  | 3.3 |
|hunspell  | 1.6.2  | 1.7.2 |
|jq        | 1.6    | 1.8.1 |
|julia     | 1.9.2  | 1.11.6 |
|jupyterlab|3.6.3-py3.11, 4.4.1-py3.12| 4.4.6-py3.12 |
|libxc     | 2.2.0  | 5.2.3, 6.1.0 |
|mrtrix3   | 3.0.2  | 3.0.7 |
|nvhpc     | 24.1   | 24.5, 25.3 |
|orca      | 5.0.4, 6.0.0 | 6.1.0 |
|parallel  |20200322| 20250722 |
|pymol     | 2.5.5  | 3.1.6.1 |
|python    | 2.7.18 | 3.11.4 |
|rclone    | 1.61.1 | 1.70.3 |
|rdp-classifier|2.12| 2.14 |
|sagemath  | 9.0    | 10.7 |
|sga       | 0.10.15| - |
|sgp       |pytorch-1.0| - |
|shapelib  | 1.5.0  | 1.6.1 |
|slim      | 4.0.1  | 5.0 |
|spaceranger| 3.1.3 | 4.0.1 |
|spark     | 3.4.1  | 4.0.0 |
|spglib    | 1.10.4 | 2.0.2 |
|superlu_mt| 3.1    | 4.0.1 |
|trimmomatic| 0.39  | 0.40 |
|redis-cli | 6.2.6  | redis/8.2.1 |
|thirdorder| 1.1.1  | 1.1.3 |
{{< /table >}}

If you have any questions about the maintenance, please [contact our user services team](https://www.rc.virginia.edu/support/). 
