+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2024-01-02T00:00:00-05:00"
tags = [
  "rivanna", "software", "intel"
]
draft = false
modulename = "intel"
softwarename = "Intel"
title = "Intel and UVA HPC"
description = "Intel compilers and tools"
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

{{< highlight >}}
The 2024.0 version is experimental. Most users should load an older version for the time being.
{{< /highlight >}}

# Compiler

For general information on building code using compilers, please see our How-To pages:

- [Building Your Code on UVA HPC](/userinfo/howtos/rivanna/compiler-howto/)
- [Building and Running MPI Code](/userinfo/howtos/rivanna/mpi-howto/)

The Intel compilers are:

{{< table class="table table-striped" >}}
||<2024|>=2024|
|---|---|---|
C| `icc` | `icx` |
C++| `icpc` | `icpx` |
Fortran| `ifort` | `ifort` |
{{< /table >}}

# Tools

## Intel Trace Analyzer and Collector
The Intel Trace Collector is a low-overhead tracing library that performs event-based tracing in applications. The Intel Trace Analyzer provides a convenient way to monitor application activities gathered by the Intel Trace Collector through graphical displays. 

To use this tool:
```
module load intel
source $EBROOTINTEL/parallel_studio_xe_20**.*.***/bin/psxevars.sh}}
```
Fill in the `*` with the actual path.

In your Slurm script, replace `srun myprog` with
```
#SBATCH -n <number_of_tasks>
...
mpirun -trace -bootstrap slurm -n ${SLURM_NTASKS} myprog
```
The Slurm variable `${SLURM_NTASKS}` will expand to the `<number_of_tasks>` that you specify in the SBATCH directive.

This will write a trace file (`*.stf`) that you can analyze with `traceanalyzer`. You will need to run this on [FastX Web MATE desktop environment](/userinfo/hpc/logintools/fastx/) (recommended) or add the `-Y` flag when you ssh into the HPC system.
