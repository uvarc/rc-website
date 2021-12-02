+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2019-06-22T08:37:46-05:00"
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

The non-Intel version is built with CUDA support. A Slurm script template is provided below.

```
#!/bin/bash
#SBATCH -A mygroup            # your allocation account
#SBATCH -p gpu                # partition
#SBATCH --gres=gpu:1          # number of GPUs
#SBATCH -N 1                  # number of nodes
#SBATCH --ntasks-per-node=10  # number of tasks
#SBATCH -t 10:00:00           # time

module purge
module load goolfc gromacs

srun gmx_mpi <arguments>
```

Please do not run the Intel version on the `gpu` partition.
