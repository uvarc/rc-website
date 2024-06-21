+++
images = [""]
author = "Staff"
description = ""
date = "2023-09-21T00:00:00-05:00"
title = "Rivanna Maintenance: October 3, 2023"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna will be down for maintenance on <strong>Tuesday, October 3, 2023</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service. All systems are expected to return to service by **6 a.m. on Wednesday, October 4**.

## IMPORTANT MAINTENANCE NOTES

### New `largemem` nodes
RC engineers will be adding 36 nodes, each with 40 cores and 750 GB total memory, to the `largemem` partition on Rivanna. Jobs that need more memory than 9 GB per core should be submitted to the `largemem` partition rather than the `standard` partition. Some examples are given below.

_I need 4 cores and 100 GB memory._ Since this amounts to 25 GB memory per core, the job should be submitted to `largemem`.
```bash
#SBATCH -p largemem
#SBATCH -c 4
#SBATCH --mem=100G
```

_I need 10 cores and 50 GB memory._ Since this amounts to 5 GB memory per core, the job should be submitted to `standard` without specific memory requests. By default 9 GB per core will be allocated.
```bash
#SBATCH -p standard
#SBATCH -c 10
```

_I am not sure how much memory I need._ First submit the job to the `standard` partition without specific memory requests. If the job runs out of memory, resubmit to the `largemem` partition. To check the memory usage of a completed job, you may either [run the seff command](/userinfo/hpc/slurm/#completed-job) or add to your Slurm script:
```bash
#SBATCH --mail-user=your_computing_id@virginia.edu
#SBATCH --mail-type=end
```
and check the report in your email.

### NVIDIA driver upgrade and modules
The NVIDIA driver will be upgraded to version 535.104.12 (CUDA 12.2). The default CUDA module version will remain at 11.4.2. New modules will be added:

- cuda/12.2.2
- cudnn/8.9.4.25
- pytorch/2.0.1
- tensorflow/2.13.0

The corresponding Jupyter kernels for PyTorch and TensorFlow will be provided as well.

AlphaFold versions 2.1.2, 2.2.2, and their corresponding database will be removed. The 2.3 database will be migrated off of the current `/project` storage and the `ALPHAFOLD_DATA_PATH` environment variable will be updated accordingly.

QGIS (Open OnDemand) will be upgraded to 3.28.10.

### Old scratch permanently retired on October 17
A reminder that the `/oldscratch` (i.e. `/gpfs/gpfs0/scratch`) filesystem will be permanently retired on October 17 and all the data it contains will be deleted. A sample script for users who wish to transfer files to the new `/scratch` system can be found [here](https://www.rc.virginia.edu/2023/07/new-scratch-system-on-rivanna-july-18-2023).

If you have any questions or concerns about the maintenance period, you may contact us [here](https://www.rc.virginia.edu/form/support-request/).
