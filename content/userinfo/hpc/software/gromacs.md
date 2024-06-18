+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2024-01-02T00:00:00-05:00"
tags = [
  'mpi',
  "chem"
]
draft = false
modulename = "gromacs"
softwarename = "GROMACS"
title = "GROMACS on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

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

# Usage on GPU

This module is built with CUDA support. A Slurm script template is provided below.

{{< pull-code file="/static/scripts/gromacs_gpu.slurm" lang="no-hightlight" >}}
