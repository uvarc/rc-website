+++
images = [""]
author = "Staff"
description = ""
date = "2025-09-29T00:00:00-05:00"
title = "HPC Maintenance: Oct 14, 2025"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The UVA HPC systems, Afton/Rivanna, will be unavailable for maintenance beginning <strong>Tuesday, October 14, 2025</strong> beginning at 6 am.{{< /alert-green >}}

- **Rivanna**: Service will resume by <strong>6 a.m. Wednesday, Oct. 15.</strong> 

- **Afton**: Due to required vendor work, downtime will extend until <strong>6 a.m. Thursday, Oct. 16.</strong> This will affect the availability of the **standard**, **interactive** and **gpu** partitions (partially) and the **parallel** partition (fully). 

All systems are expected to return to service by **Thursday, October 16** at 6 am.

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

### Reminder: Improving GPU Resource Availability and Job Efficiency 

To improve wait times and system performance in the gpu partition, we have implemented the following key updates. <strong>These are in addition to a significant new investment in GPU hardware planned for this Fall.</strong> 

**1. User Awareness Emails and Job Termination Policy**

We have begun sending informational alerts to users whose GPU jobs show zero utilization for extended periods. These alerts are part of our job termination policy, which is designed to encourage efficient GPU use by active jobs. If no action is taken, GPU jobs with no utilization will be automatically terminated, in line with our [usage guidelines](https://www.rc.virginia.edu/userinfo/hpc/job-alerts/). This will apply only to no-charge Service Unit (SU) jobs in the **gpu** partition. 

**2. New Experimental gpu-mig Partition** 

To help you get faster access to GPU resources, we have launched the  **gpu-mig** partition that uses NVIDIA’s Multi-Instance GPU (MIG) technology to split a single A100 80GB GPU node into 56 smaller instances. Each job in this partition will get one-seventh of a single GPU with 10 GB of memory. 

**What this means for you:** Run smaller GPU jobs with less queue delays and without using any SUs. 

[See how to submit a job to the gpu-mig partition](https://www.rc.virginia.edu/userinfo/hpc/slurm/#mig-gpu-partition).  


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
|clang     | 15.0.7 | - |
|cppcheck  | 1.83   | 2.18.0 |
|ddd       | 3.3.12 | 3.4.1 |
|dragonn   | 0.4.1  | - |
|gcloud-sdk| 422.0.0| gcloud/536.0.1 |
|gperf     | 3.0.4  | 3.3 |
|ffmpeg    | 5.1.2  | 8.0 |
|hunspell  | 1.6.2  | 1.7.2 |
|jq        | 1.6    | 1.8.1 |
|julia     | 1.9.2  | 1.11.6 |
|jupyterlab|3.6.3-py3.11, 4.4.1-py3.12| 4.4.6-py3.12 |
|libxc     | 2.2.0  | 5.2.3, 6.1.0 |
|lame      | 3.99.5 | 3.100 |
|llvm      | 15.0.7 | 21.1.1 |
|mesa      | 23.1.4 | 25.2.3 |
|meson     |1.0.1-py3.11| 1.9.0 |
|mummer    |4.0.0rc1| 4.0.1 |
|mrtrix3   | 3.0.2  | 3.0.7 |
|ninja     |1.11.1, 1.11.1-py3.11| 1.13.1 |
|nvhpc     | 24.1   | 24.5, 25.3 |
|orca      | 5.0.4, 6.0.0 | 6.1.0 |
|parallel  |20200322| 20250722 |
|pymol     | 2.5.5  | 3.1.6.1 |
|python    | 2.7.18 | 3.11.4 |
|pytorch   | 2.4.0  | 2.7.0 |
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
|tensorflow|2.10.0, 2.13.0| 2.17.0 |
|trimmomatic| 0.39  | 0.40 |
|redis-cli | 6.2.6  | redis/8.2.1 |
|thirdorder| 1.1.1  | 1.1.3 |
|x264      |20230226| 20250619 |
|x265      | 3.5    | 4.1 |
{{< /table >}}

If you have any questions about the maintenance or GPU queue improvements, please [contact our user services team](https://www.rc.virginia.edu/support/). 
