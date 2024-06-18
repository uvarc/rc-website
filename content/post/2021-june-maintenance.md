+++
images = [""]
author = "Staff"
description = ""
date = "2021-06-03T00:00:00-05:00"
title = "Rivanna Maintenance: June 15, 2021"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna will be down for maintenance on <strong>Tuesday, June 15, 2021</strong>, beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

Rivanna is expected to return to service by 6 a.m. on Wednesday, June 16.

## IMPORTANT MAINTENANCE NOTES

### Globus

Some Globus users may need to rebuild their shared connections after the maintenance period has ended. Users who require assistance with this task are invited to join us for office hours between 10 a.m. and 12 p.m. on Thursday, June 17. The Zoom link is available [here](https://www.rc.virginia.edu/support/#office-hours).

### Modules

1. The following software modules will be **removed** from Rivanna during the maintenance period:
    - singularity/2.6.1, 3.5.2, 3.6.1 - replaced by 3.7.1 ([details](#changes-to-singularity-modules))
    - anaconda/5.2.0-py3.6, 2019.10-py3.7 - replaced by 2020.11-py3.8 ([details](#changes-to-anacondapython-modules))
    - julia/0.6.0, 1.1.0, 1.3.1 - replaced by 1.5.3, 1.6.0
    - vscode/1.50.1, 1.53.2 - replaced by Code Server on Open OnDemand
    - cellprofiler/2.2.0 - replaced by 3.1.8
    - meme/4.10.2 - replaced by 5.1.0, 5.3.3
    - nextflow/0.26.0.4715 - replaced by 20.10.0
    - phono3py/1.19.1 - 1.22.3 included in phonopy/2.9.3
    - qiime2/2020.6 - replaced by 2020.8
    - salmon/0.11.2 - replaced by 1.2.1
    - samtools/0.1.20, 1.4.1, 1.7 - replaced by 1.9, 1.10, 1.12
    - lftp/4.8.4 - replaced by 4.9.2

2. The following **upgrades** will take place during the maintenance period. Upgrades to default versions of applications:
    - JupyterLab backed by Anaconda 2020.11 with Python 3.8.8
    - python/3.7.7 -> 3.8.8
    - pytorch/1.5.1 -> 1.8.1
    - tensorflow/2.1.0-py37 -> 2.4.1
    - cellranger-atac/1.2.0 -> 2.0.0
    - lammps/20200615 -> 20201029
    - meme/5.1.0 -> 5.3.3
    - samtools/1.10 -> 1.12

    For anaconda/python-dependent modules, please [see below](#changes-to-anacondapython-modules).

3. **New** modules:
    - rapidsai/0.19 - NVIDIA data science libraries
    - pipenv/2020.11.15 - automatically create and manage a virtualenv

### Changes to Singularity modules

All Singularity modules are now under 3.7.1. If you hardcoded older Singularity versions, e.g.
```bash
module load singularity/2.6.1 # or 3.5.2, 3.6.1
```
please change it to
```bash
module load singularity
```

The containers themselves have not been modified. We have not encountered backwards compatibility issues; please let us know if you do.

If you need to know the Singularity version that was used to create a container, run:
```bash
singularity inspect /path/to/container
```

### Changes to Anaconda/Python modules

Many of our Anaconda/Python modules have been upgraded to Python 3.8.8 in light of [security vulnerabilities](https://www.python.org/downloads/release/python-388/). If you need assistance with migrating python packages from one version to another, please visit [here](/userinfo/howtos/rivanna/migrate-python/). Note that conda environments created by one anaconda module version can be activated by another.

The following table shows the detailed version changes for all affected modules. Please note:
- The Python version is upgraded to 3.8.8 unless otherwise stated.
- The new version replaces the current default. If the new version is `-`, that means the module version remains the same.
- In some cases, the module load command is different. Check `module spider <module>/<version>` if you cannot load a module.
- If you must use a particular module with an older Python version, please [create your own conda environment](/userinfo/ivy/ivy-windows-sw/data-analysis/anaconda/#running-python2-and-python3-using-virtual-environments).

| Module | Version | Python| NEW version  | NEW Python | Removed versions |
|---|---|---|---|---|---|
|anaconda     | 2020.11-py3.8 | 3.8.5 | -            |  | 5.2.0-py3.6, 2019.10-py3.7 |
| ase         | 3.20.1        | 3.7.9 | -            |  | 3.17.0-py3 |
| bart        | 2.0           | 3.7.8 | -            |  | 1.0.1 |
|bioconda     | py3.8         | 3.8.5 | -            |  | py3.6, py3.7 |
|biopython    | 1.70-py2      | 2.7.17| 1.78-py3     |  | - |
|cudatoolkit  | 10.1.168-py3.6| 3.6.10| 11.0.3-py3.8 |  | 10.1.168-py3.6 |
| cutadapt    | 2.5           | 3.7.4 | 3.4          |  | 1.16, 2.5 |
| deeptools   | 3.3.1         | 3.6.6 | 3.5.1        |  | 2.5.3, 3.3.1 |
|gcloud-sdk   | 196.0.0       | 2.7.17| 334.0.0      |  | 196.0.0 |
|gdc-client   | 1.5.0         | 3.7.7 | 1.6.0        | 3.7.10 | 1.3.0, 1.5.0 |
|globus_cli   | 1.12.0        | 3.7.7 | 2.0.0        |  | 1.11.0, 1.12.0 |
|google-api   | 1.9.6         | 2.7.17| 2.0.2        |  | 1.9.6 |
|gpustat      | 0.6.0         | 3.7.7 | -            |  | - |
| hexrd       | 0.6.12        | 2.7.17| 0.8.4        |  | jb-0.3.x, jb-0.5.6, 0.6.12 |
| hoomd       | 2.9.4         | 3.7.7 | 2.9.6        |  | 2.9.4 |
| idr         | 2.0.2-py3     | 3.6.6 | -            |  | - |
| iqtree      | 2.0.3         | 3.7.9 | 2.1.2        |  | 2.0.3 |
| intervene   | 0.6.4         | 3.7.3 | 0.6.5        |  | 0.6.4 |
| kallisto    | 0.44.0        | 3.7.3 | 0.46.2       |  | 0.44.0 |
| marge       | 1.0           | 3.6.7 | -            |  | - |
| mayavi      | 4.5.0         | 2.7.15| 4.7.2        |  | 4.5.0 |
| meson       | 0.53.1        | 3.7.7 | 0.57.1-py3.8 |  | 0.53.1, 0.54.3 |
| mrtrix3     | rc3           | 2.7.17| 3.0.2        |  | rc3 |
|mrtrix3tissue| 5.2.8         | 2.7.17| 5.2.9        |  | 5.2.8 |
| mysqlclient | 1.4.6-py3.7   | 3.7.4 | 2.0.3-py3.8  |  | 1.4.4-py3.6, 1.4.6-py3.7 |
| ninja       | 1.10.0        | 3.7.7 | 1.10.2-py3.8 |  | 1.10.0 |
|openslide-python| 1.1.1-py3  | 3.6.6 | 1.1.2-py3    |  | 1.1.1-py3 |
| phonopy     | 2.6.1         | 3.7.7 | 2.9.3        |  | 2.6.1 |
| pybind11    | 2.2.4-py3.7   | 3.7.4 | 2.6.2-py3.8  |  | 2.2.4-py3, 2.2.4-py3.7 |
| reframe     | 2.17          | 3.6.7 | -            |  | - |
|snakemake    | 5.2.2         | 3.6.6 | 6.0.5        |  | 5.2.2 |
|snap-stanford| 5.0.9-py3.6   | 3.6.6 | 5.0.9-py3.8  |  | 4.1, 5.0.9-py3.6, snap-stanford-py/4.1 |
|spades       | 3.15.0        | 3.7.4 | 3.15.2       |  | 3.15.0 |
|thirdorder   | 1.1.1-py3     | 3.6.6 | -            |  | - |
|trimgalore   | 0.6.4         | 3.6.8 | -            |  | 0.4.5 |
| wasp        | 0.3.4         | 3.7.7 | -            |  | - |
