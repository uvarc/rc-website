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

### System upgrades
- Operating system: Rocky 8.10
- Slurm: 24.11.3
- NVIDIA driver: 570.124.06 (CUDA 12.8)

### Modules

The software stack is migrated from `/sfs/applications` to `/sfs/gpfs/tardis/applications` and the `/apps` symbolic link is updated accordingly. Unless the full path is required, users should simply use `/apps`.

Default version changes include:
- cuda/12.4.1 &rarr; 12.8.0
- miniforge/24.3.0-py3.11 &rarr; 24.11.3-py3.12
- nvhpc/24.5 &rarr; 25.3
- R/4.4.1 &rarr; 4.5.0

(The original defaults are not removed.)

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|afni       | 23.1.10 | 25.0.12 |
|cellranger | 8.0.0 | 9.0.1 |
|code-server| 4.92.2 | 4.99.1 |
|cmake      | 3.23.3, 3.24.3 | 3.28.1, 4.0.0 |
|cutadapt   | 3.4 | 4.9 |
|fastqc     | 0.11.5 | 0.12.1 |
|fsl        | 6.0.7.6 | 6.0.7.17 |
|gcc        | 13.3.0 | 14.2.0 |
|go         | 1.21.4 | 1.23.6 |
|intel      | 2024.0 | 2025.0 |
|jupyterlab | 3.6.3-py3.11 | 4.3.6-py3.12 |
|kraken2    | 2.1.3 | 2.1.5 |
|mathematica| 11.2 | 14.2 |
|matlab     | R2022b | R2024b |
|multiqc    | 1.14 | 1.27.1 |
|nextflow   | 23.04.1 | 24.10.5 |
|openmpi    | 4.1.4-nofabric[-withoutverbs] | 4.1.4 |
|openmpi    | 4.1.5-intel | 4.1.5 |
|perl       | 5.36.0 | 5.40.2 |
|ruby       | 3.1.2 | 3.4.3 |
|spaceranger| 3.1.1 | 3.1.3 |
|sumo       | 1.14.1 | 1.22.0 |
|texlive    | 2023 | 2025 |
|tmux       | 2.5 | 3.4 |
|trimgalore | 0.6.4 | 0.6.10 |
{{< /table >}}
