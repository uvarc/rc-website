+++
images = [""]
author = "Staff"
description = ""
date = "2024-12-17T00:00:00-05:00"
title = "HPC Maintenance: Jan 7, 2025"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The HPC cluster will be down for maintenance on <strong>Tuesday, Jan 7, 2025</strong> beginning at 6 am.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the cluster is returned to service.

All systems are expected to return to service by **Wednesday, Jan 8** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### How should I prepare and what to expect on Jan 7, 2025? 

You may continue submitting jobs to the HPC system until the maintenance period begins. However, if the system determines your job won't finish in time, it will not start until the system is back online. The maintenance will involve upgrading the storage client, requiring all compute and login nodes, including the Open OnDemand and FastX portals, to be taken offline. Additionally, Research Project Storage and home directories will be inaccessible. Research Standard Storage will remain accessible via SMB and NFS mounts. The UVA Standard Security Storage Data Transfer Node (DTN) will remain operational throughout the maintenance period.

### Reminder: New Service Unit pricing and consumption rates 

Effective January 8, 2025, Research Computing will implement a new Service Unit (SU) and pricing schedule for HPC services. Standard and instructional SU allocations will remain free of charge. Jobs that start after the maintenance period will be charged based on the updated SU consumption rates determined by the type of hardware utilized. For details on the changes, see the [pricing table](https://www.rc.virginia.edu/userinfo/pricing/)  and [SU consumption rates](https://www.rc.virginia.edu/userinfo/hpc/). Additionally, the default memory allocation per CPU core will decrease to 4GB, reflecting typical usage patterns and aligning with the updated SU model. This change provides more granular control, as SU charges will now account separately for CPU, memory, and specialty hardware like GPUs. If your job encounters an "Out-of-Memory" error, [adjust your memory request accordingly](https://www.rc.virginia.edu/userinfo/hpc/slurm/#configurable-options-in-slurm). 

### Reminder: “Dedicated Computing” as a new service model 

This model allows researchers to lease hardware managed by Research Computing (RC) as an alternative to purchasing their own equipment. It provides dedicated access to HPC resources with no wait times. [See here](https://www.rc.virginia.edu/userinfo/hpc/allocations/#dedicated-computing). 

### Removed old DNS names

The old Domain Name System (DNS) entries for logging into Rivanna/Afton HPC have been removed. Please refer to the table below for the updated login names.

|Old|New|
|---|---|
|rivanna.hpc.virginia.edu ->|login.hpc.virginia.edu|
|rivanna-desktop.hpc.virginia.edu ->|fastx.hpc.virginia.edu|
|rivanna-portal.hpc.virginia.edu ->| ood.hpc.virginia.edu|

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
