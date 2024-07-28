+++
type = "rivanna"
categories = [
  "HPC",
  "software"
]
date = "2022-03-10T00:00:00-05:00"
tags = [
  "multi-core",
  "phys",
  "gpu"
]
draft = false
modulename = "yambo"
softwarename = "Yambo"
title = "Yambo and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
Local support is not available. For detailed documentation and tutorials, visit the [{{% software-name %}} website]({{< module-homepage >}}). The user forum can be found [here](https://www.yambo-code.org/forum/).

**Software Category:** {{% module-category %}}

# Available Versions
To find the available versions and learn how to load them, run:
```
module spider {{% module-name %}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

Users may build their own versions of Yambo if they wish to use a different compiler+MPI combination, or to choose individual optional packages. Please consult the official documentation.

# Example Slurm script

We built Yambo with GPU support. It can only run on V100 and A100 GPUs. Please use the following Slurm script as a template.

{{< pull-code file="/static/scripts/yambo.slurm" lang="no-highlight" >}}

We highly recommend running a [benchmark](https://learning.rc.virginia.edu/tutorials/benchmark-parallel-programs/) to decide how many CPU cores and/or GPU devices you should use.
