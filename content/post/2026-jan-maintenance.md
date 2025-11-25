+++
images = [""]
author = "Staff"
description = ""
date = "2026-01-01T00:00:00-05:00"
title = "HPC Maintenance: Jan 6, 2026"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The UVA HPC systems, Afton/Rivanna, will be unavailable for maintenance beginning <strong>Tuesday, Janurary 6, 2026</strong> beginning at 6 am.{{< /alert-green >}}

All systems are expected to return to service by **Wednesday, January 7** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### What to Expect During Maintenance  

### System

- The NVIDIA driver will be upgraded to 580.95.05 to support CUDA 13.

### Modules

New modules:

- cuda/13.0.2
- cudnn/9.15.0-CUDA-13.0.2
- nccl/2.28.9-CUDA-13.0.2
- nvhpc/25.11
- nvompi/25.11_5.0.7
- pytorch/2.9.0
- ucx-cuda/1.19.0-CUDA-13.0.2 

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|atat   |3.36   |3.50 |
|cc3d   |4.2.5  |4.7.0 |
|cuda   |11.4.2 |11.8.0+ |
|mumax3 |3.10   |3.11.1 |
{{< /table >}}

If you have any questions about the maintenance or GPU queue improvements, please [contact our user services team](https://www.rc.virginia.edu/support/). 
