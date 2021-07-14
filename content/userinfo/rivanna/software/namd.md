+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2021-05-21T00:00:00-05:00"
tags = [
  "chem",
  "multi-core",
  "mpi"
]
draft = false
modulename = "orca"
softwarename = "ORCA"
title = "ORCA on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# NAMD with MPI

The NAMD module was built on Rivanna with MPI support. Below is a SLURM script template.

```
#!/bin/bash
#SBATCH -A mygroup             # your allocation account
#SBATCH -p parallel            # partition
#SBATCH -N 2                   # number of nodes
#SBATCH --ntasks-per-node=40   # number of tasks
#SBATCH -t 24:00:00            # time

module purge
module load goolf namd
mpiexec namd2 input.namd       # please use mpiexec as the executor for NAMD
```

You may want to benchmark it to see how well it scales for the type of job that you are running. Please refer to [our tutorial](https://learning.rc.virginia.edu/notes/benchmark/) on this topic. 
