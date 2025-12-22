+++
images = [""]
author = "Staff"
description = ""
date = "2025-12-14T00:00:00-05:00"
title = "HPC Maintenance: Jan 6, 2026"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The UVA HPC systems, Afton/Rivanna, will be unavailable for maintenance on <strong>Tuesday, Janurary 6, 2026</strong> beginning at 6 am.{{< /alert-green >}}

All systems are expected to return to service by **Wednesday, January 7** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### What to Expect During Maintenance  

**Access:**
 
You will not be able to log in or use the HPC systems, including Open OnDemand and FastX. 

**Jobs:**
 
You can submit jobs until maintenance begins. If the scheduler determines that a job cannot finish before maintenance starts, it will be held in the queue and will automatically start once the system is back online. <strong>No jobs will run during maintenance.</strong> 

**Storage:**
 
Research Standard and Research Project storage remain accessible via Globus, Server Message Block (SMB), and Network File System (NFS) mounts, meaning: 

- You cannot access files through the HPC interface during maintenance. 

- You can access files from other systems (e.g., your computer) if mounts are set up. 

- The Data Transfer Node (DTN) stays online for ongoing data transfers via Globus. 

### System

- The NVIDIA driver will be upgraded to 580.95.05 to support CUDA 13. (The driver is backwards-compatible with older versions of CUDA, so users should not have to rebuild their own codes. Please contact us if you experience any issues.)

### Modules

New modules:

- cuda/13.0.2
- cudnn/9.15.0-CUDA-13.0.2
- nccl/2.28.9-CUDA-13.0.2
- nvhpc/25.11
- nvompi/25.11_5.0.7
- pytorch/2.9.0
- qiime2/2025.10
- quantumespresso/7.5
- ucx-cuda/1.19.0-CUDA-13.0.2 

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|alphafold|3.0.0  |3.0.1 |
|atat     |3.36   |3.50 |
|cc3d     |4.2.5  |4.7.0 |
|cuda     |11.4.2 |11.8.0+ |
|gurobi   |10.0.1, 11.0.0 |13.0.0 |
|isoseqenv|py3.7  |isoseq/4.3.0 |
|lammps   |2Aug2023-cpu | 22Jul2025_update1 |
|mumax3   |3.10   |3.11.1 |
|quantumespresso|6.4.1|7.2.0+ |
{{< /table >}}

If you have any questions about the maintenance, please [contact our user services team](https://www.rc.virginia.edu/support/). 
