+++
images = [""]
author = "Staff"
description = ""
date = "2024-12-04T00:00:00-05:00"
title = "HPC Maintenance: Dec 12, 2024"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The HPC cluster will be down for maintenance on <strong>Tuesday, Dec 12, 2024</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the cluster is returned to service.

All systems are expected to return to service by **Wednesday,**

## IMPORTANT MAINTENANCE NOTES

### Modules

- The following modules will be **removed** from Rivanna during the maintenance period.

{{< table title="replacement" class="table table-striped" >}}
| Module | Removed version | Replacement |
|---|---|---|
|amber   | 22.0    | 24-CUDA-12.2.2 |
|gatk    | 4.3.0.0, 4.5.0.0 | 4.6.0.0 |
|kraken2 | 2.1.2   | 2.1.3 |
|orca    | 5.0.2   | 5.0.4 |
|rust    | 1.66.1  | 1.79.0 |
|star    | 2.7.9a  | 2.7.11b |
{{< /table >}}
