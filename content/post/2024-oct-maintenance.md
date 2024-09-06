+++
images = [""]
author = "Staff"
description = ""
date = "2024-10-04T00:00:00-05:00"
title = "HPC Maintenance: Oct 15, 2024"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The HPC cluster will be down for maintenance on <strong>Tuesday, Oct 15, 2024</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the cluster is returned to service.

All systems are expected to return to service by **Wednesday, Oct 16.**

## IMPORTANT MAINTENANCE NOTES

### Anaconda

### Modules

- The following modules will be **removed** from Rivanna during the maintenance period.

{{< table title="replacement" class="table table-striped" >}}
| Module | Removed version | Replacement |
|---|---|---|
|anaconda   | 2023.07-py3.11 | miniforge/24.3.0-py3.11 |
|anvio      | 6.2            | 8 |
|code-server| 4.16.1         | 4.92.2 |
|deeplabcut | 2.2.1.1-anipose| 3.0.0rc4 |
|deeptools  | 3.5.1          | 3.5.5 |
|maestro    | 1.3.0          | 1.5.1 |
|mamba      | 22.11.1-4      | miniforge/24.3.0-py3.11 |
{{< /table >}}
