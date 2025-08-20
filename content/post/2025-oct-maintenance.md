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

All systems are expected to return to service by **Wednesday, October 15** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### System

- Slurm will be upgraded from 24.11 to 25.05.

### Modules

- The `nvhpc/24.1` and `nvompi/24.1_4.1.6` toolchains, together with all associated modules, will be removed. Users should migrate to newer versions.
- We are dropping Python 2 support. If possible, users should migrate to Python 3; otherwise, please create your own conda environment.

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|jq        | 1.6    | 1.8.1 |
|julia     | 1.9.2  | 1.11.6 |
|nvhpc     | 24.1   | 24.5, 25.3 |
|orca      | 5.0.4, 6.0.0 | 6.1.0 |
|parallel  |20200322| 20250722 |
|python    | 2.7.18 | 3.11.4 |
|rclone    | 1.61.1 | 1.70.3 |
|thirdorder| 1.1.1 | 1.1.3 |
{{< /table >}}

If you have any questions about the maintenance, please [contact our user services team](https://www.rc.virginia.edu/support/). 
