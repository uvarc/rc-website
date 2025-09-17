+++
images = [""]
author = "Staff"
description = ""
date = "2025-05-13T00:00:00-05:00"
title = "HPC Maintenance: May 27, 2025"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The UVA HPC systems, Afton/Rivanna, will be down for maintenance on <strong>Tuesday, May 27, 2025</strong> beginning at 6 am.{{< /alert-green >}}

All systems are expected to return to service by **Wednesday, May 28** at 6 am.

## How should I prepare and what to expect on May 27, 2025? 

You may continue submitting jobs to the HPC system until the maintenance period begins. However, if the system determines your job won't finish in time, it will not start until the system is back online. The upcoming maintenance will include upgrades to the HPC image (upgrading to Rocky 8.10), the HPC scheduler (Slurm 24.11), the NVIDIA driver and Open OnDemand. To complete these tasks, all compute nodes and login nodes - including the Open OnDemand and FastX portals – will need to be taken offline. However, Research Project Storage and Research Standard Storage will remain accessible via SMB and NFS mounts. Additionally, the UVA Standard Security Storage Data Transfer Node (DTN) will stay operational throughout the maintenance period. 

If you have any questions about the upcoming HPC system maintenance, you may [contact our user services team](https://www.rc.virginia.edu/support/). 

## IMPORTANT MAINTENANCE NOTES

### System upgrades
- Operating system: Rocky 8.10
- Slurm: 24.11.3
- NVIDIA driver: 570.124.06 (CUDA 12.8)
- Open OnDemand: 4.0

### Modules

The software stack is migrated from `/sfs/applications` to `/sfs/gpfs/tardis/applications` and the `/apps` symbolic link is updated accordingly. Unless the full path is required, users should simply use `/apps`.

Default version changes include:
- cuda/12.4.1 &rarr; 12.8.0
- miniforge/24.3.0-py3.11 &rarr; 24.11.3-py3.12
- namd/2.14 &rarr; 3.0.1
- nvhpc/24.5 &rarr; 25.3
- R/4.4.1 &rarr; 4.5.0

(The original defaults are not removed.)

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|afni       | 23.1.10 | 25.0.12 |
|bracken    | 2.9 | 3.1 |
|cellranger | 8.0.0 | 9.0.1 |
|code-server| 4.92.2 | 4.99.1 |
|cmake      | 3.23.3, 3.24.3 | 3.28.1, 4.0.0 |
|cuda       | 10.2.89, 11.8.0 | 12.8.0 |
|cudnn      | 8.2.4.15, 8.9.7 | 8.9.4.25, 9.8.0-CUDA-12.8.0 |
|cutadapt   | 3.4 | 4.9 |
|fastqc     | 0.11.5 | 0.12.1 |
|fmriprep   | 23.1.4 | 25.0.0 |
|fsl        | 6.0.7.6 | 6.0.7.17 |
|gcc        | 13.3.0 | 14.2.0 |
|globus_cli | 3.11.0 | 3.34.0 |
|go         | 1.21.4 | 1.23.6 |
|intel      | 2024.0 | 2025.0 |
|jcuda      | 11.4.1 | - |
|jupyterlab | 3.6.3-py3.11 | 4.4.1-py3.12 (see note below) |
|kraken2    | 2.1.3 | 2.1.5 |
|mathematica| 11.2 | 14.2 |
|matlab     | R2022b | R2024b |
|multiqc    | 1.14 | 1.27.1 |
|nextflow   | 23.04.1 | 24.10.5 |
|openmpi    | 4.1.4-nofabric[-withoutverbs] | 4.1.4 |
|openmpi    | 4.1.5-intel | 4.1.5 |
|perl       | 5.36.0 | 5.40.2 |
|pytorch    | 1.12.0, 2.0.1 | 2.4.0, 2.7.0 |
|ruby       | 3.1.2 | 3.4.3 |
|smrtlink   | 13.1.0.221970 | 25.2.0 |
|spaceranger| 3.1.1 | 3.1.3 |
|sumo       | 1.14.1 | 1.22.0 |
|texlive    | 2023 | 2025 |
|tmux       | 2.5 | 3.4 |
|tree       | 1.8.0 | 2.2.1 |
|trimgalore | 0.6.4 | 0.6.10 |
{{< /table >}}

## Post-Maintenance Note

- Due to issues with accessing subfolders in the new JupyterLab, we have reverted to the pre-maintenance version on Open OnDemand. However, the issue is not observed when Jupyter is launched manually from the command line, and so the new version is still kept as a module for those who wish to launch it manually (e.g. within a Desktop session). Consequently the default version of miniforge is also reverted to the pre-maintenance version.
