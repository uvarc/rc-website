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
title = "ORCA and UVA HPC"
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

# License and Permission
We have an "ACADEMIA" license. Usage is restricted to academic purposes. Please contact us if you need access to the software.

# Slurm script template

Below is a Slurm script template. Please note that:

- Loading the `orca` module will automatically load `gcc` and `openmpi`. Do not load the latter manually.
- For your convenience we have defined the environment variable `orcadir` in the module.
- The full path to the executable `orca` is thus `$orcadir/orca`.
- Do not use `srun`/`mpirun`. The software will take care of MPI.

{{< pull-code file="/static/scripts/orca_serial.slurm" lang="no-highlight" >}}

Submit the job in the same directory as `my.inp`.

## Multi-node

For larger calculations, you may run on multiple nodes. The following example will run on a total of 120 cores:

{{< pull-code file="/static/scripts/orca_multinode.slurm" lang="no-highlight" >}}

**Important notes:**
- The `nprocs` in `*.inp` should be equal to the total number of cores requested in your Slurm script.
- Do not run multi-node ORCA jobs from research standard storage `/nv`. (See [here](https://orcaforum.kofo.mpg.de/viewtopic.php?f=8&t=4188&p=17142&hilit=failed+to+store+the+Coulomb+matrix).) We recommend scratch.

# References

For more information please visit:

- [ORCA Forum](https://orcaforum.kofo.mpg.de/app.php/portal). You will need to create an account.
- [ORCA Input Library](https://sites.google.com/site/orcainputlibrary/home)
