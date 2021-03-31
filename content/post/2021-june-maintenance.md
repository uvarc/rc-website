+++
images = [""]
author = "Staff"
description = ""
date = "2021-06-29T00:00:00-05:00"
title = "Rivanna Maintenance: June, 2021"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++


{{< alert-green >}}Rivanna will be down for maintenance on <strong></strong>, beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

Rivanna is expected to return to service later in the day.

## IMPORTANT MAINTENANCE NOTES

### Modules

1. The following software modules will be **removed** from Rivanna during the maintenance period:
    - singularity/3.5.2, 3.6.1 - replaced by 3.7.1 (details below)
    - anaconda/5.2.0-py3.6, 2019.10-py3.7 - replaced by 2020.11-py3.8 (details below)
    - qiime2/2020.6 - replaced by 2020.8
    - cellprofiler/2.2.0 - replaced by 3.1.8
    - nextflow/0.26.0.4715 - replaced by 20.10.0
    - lftp/4.8.4 - replaced by 4.9.2

2. The following **upgrades** will take place during the maintenance period:
    - JupyterLab backed by Anaconda 2020.11 with Python 3.8.8
    - python/3.7.7 -> 3.8.8
    - pytorch/1.5.1 -> 1.8.0
    - tensorflow/2.1.0-py37 -> 2.4.1

    For anaconda/python-dependent modules, please see below.

3. **New** modules:
    - rapidsai/0.17 - NVIDIA data science libraries
    - pipenv/2020.11.15 - automatically create and manage a virtualenv

### Changes to Anaconda/Python modules

Many of our Anaconda/Python modules have been updated to Python 3.8.8 in light of [security vulnerabilities](https://www.python.org/downloads/release/python-388/). If you need assistance with migrating python packages from one version to another, please visit here.

The following table shows the detailed version changes for all affected modules. Please note:
- The new version replaces **all** older versions. If the new version is `-`, that means the module version stays the same.
- The Python version is updated to 3.8.8 for all cases.
- In some cases, the module load command is different. Check `module spider <module>/<version>` if you cannot load a module.
- If you must use a particular module with an older Python version, please [create your own conda environment](/userinfo/rivanna/software/anaconda/#running-python2-and-python3-using-virtual-environments).

| Module | Current Default | Python | New version |
|---|---|---|---|
|anaconda  | 2020.11-py3.8 | 3.8.5 | - |
|bioconda  | py3.8         | 3.8.5 | - |
|globus_cli| 1.12.0        | 3.7.7 | 2.0.0 |
|gpustat   | 0.6.0         | 3.7.7 | - |
| hexrd    | 0.6.12        | 2.7.17| 0.8.4 |
| hoomd    | 2.9.4         | 3.7.7 | 2.9.6 |
| meson    | 0.53.1        | 3.7.7 | 0.57.1-py3.8 |
| ninja    | 1.10.0        | 3.7.7 | 1.10.2-py3.8 |

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

</details>
