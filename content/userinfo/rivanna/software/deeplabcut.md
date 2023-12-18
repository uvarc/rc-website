+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "bio"
]
date = "2021-08-11T00:00:00-05:00"
draft = false
modulename = "deeplabcut"
softwarename = "DeepLabCut"
title = "DeepLabCut on Rivanna"
author = "RC Staff"
+++

# Description

{{% module-description %}}

**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# Dockerfile

We cannot use the official Docker image on Rivanna because:
- the CUDA version is incompatible with our NVIDIA driver version (as of August 2021);
- at runtime it tries to download pretrained models inside the container, which is not possible via Apptainer.

For further details please visit [here](https://github.com/uvarc/rivanna-docker/blob/master/deeplabcut/2.2/Dockerfile).

# Usage

## Python script
Please submit jobs to the GPU partition. A Slurm script template is provided below.

{{< pull-code file="/static/scripts/deeplabcut.slurm" lang="no-hightlight" >}}

## GUI
Please request a Desktop session on the GPU partition via our Open OnDemand portal. Open a terminal and load the module. Then execute:

{{< code-snippet >}}
module load apptainer deeplabcut
apptainer run --nv $CONTAINERDIR/deeplabcut-2.2.1.1-anipose.sif -m deeplabcut
{{< /code-snippet >}}
