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
modulename = "berkeleygw"
softwarename = "BerkeleyGW"
title = "BerkeleyGW on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
Local support is not available. For detailed documentation and tutorials, visit the [{{% software-name %}} website]({{< module-homepage >}}). The user forum can be found [here](https://groups.google.com/a/berkeleygw.org/g/help).

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

Users may build their own versions of BerkeleyGW if they wish to use a different compiler+MPI combination, or to choose individual optional packages. Please consult the official documentation.

# Example Slurm script

We built BerkeleyGW with GPU support. It can only run on V100 and A100 GPUs. Please use the following Slurm script as a template.

```bash
#!/bin/bash
#SBATCH -A myallocation        # your allocation
#SBATCH -p gpu                 # do not change
#SBATCH --gres=gpu:1           # number of GPU devices
#SBATCH -C v100|a100           # can only run on V100 and A100
#SBATCH -N 1                   # number of nodes
#SBATCH --ntasks-per-node=2    # number of tasks
#SBATCH -t 1-00:00:00          # walltime

module purge
module load nvompic berkeleygw

# see $BERKELEYGW_ROOT/bin for the available executables
srun ...
```

We highly recommend running a [benchmark](https://learning.rc.virginia.edu/tutorials/benchmark/) to decide how many CPU cores and/or GPU devices you should use.
