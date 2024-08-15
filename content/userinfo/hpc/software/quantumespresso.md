+++
type = "rivanna"
categories = [
  "HPC",
  "software"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
  "chem",
  "gpu"
]
draft = false
modulename = "quantumespresso"
softwarename = "QuantumEspresso"
title = "QuantumEspresso and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
Local support is not available. For detailed documentation and tutorials, visit the [{{% software-name %}} website]({{< module-homepage >}}). QuantumEspresso (QE) has a large and active community of users; to search or join the mailing list see the instructions [here](https://www.quantum-espresso.org/forum).

**Software Category:** {{% module-category %}}

# Available Versions
We built versions of QE incorporating the most popular optional packages. To find the available versions and learn how to load them, run:
```
module spider {{% module-name %}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

Users may build their own versions of QE if they wish to use a different compiler+MPI combination, or to choose individual optional packages.  Instructions are available at the installation FAQ.

# Example Slurm script
To run the system version of QE, a script similar to the following can be used.  QE has many options so only the most basic is shown.

Please run the CPU version on non-`gpu` partitions and the GPU version only on the `gpu` partition. In both cases, we highly recommend running a [benchmark](https://learning.rc.virginia.edu/tutorials/benchmark-parallel-programs/) to decide how many CPU cores and/or GPU devices you should use.

## CPU

{{< pull-code file="/static/scripts/qe_cpu.slurm" lang="no-highlight" >}}

## GPU

{{< pull-code file="/static/scripts/qe_gpu.slurm" lang="no-highlight" >}}
