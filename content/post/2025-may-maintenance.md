+++
images = [""]
author = "Staff"
description = ""
date = "2025-05-20T00:00:00-05:00"
title = "HPC Maintenance: May 27, 2025"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The HPC cluster will be down for maintenance on <strong>Tuesday, May 27, 2025</strong> beginning at 6 am.{{< /alert-green >}}

All systems are expected to return to service by **Wednesday, May 28** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### Slurm
Slurm will be upgraded to 24.11.3.

### Modules

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|cutadapt   | 3.4 | 4.9 |
|fastqc     | 0.11.5 | 0.12.1 |
|go         | 1.21.4 | 1.23.6 |
|intel      | 2024.0 | 2025.0 |
|multiqc    | 1.14 | 1.27.1 |
|trimgalore | 0.6.4 | 0.6.10 |
{{< /table >}}
