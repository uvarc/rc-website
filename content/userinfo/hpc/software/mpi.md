+++
type = "rivanna"
date = "2019-04-23T08:37:46-05:00"
tags = [
  "rivanna", "software", "mpi"
]
draft = false
title = "Message Passing Interface (MPI) and UVA HPC"
description = "Distributed Memory and Message Passing Interface and UVA HPC"
author = "RC Staff"

+++
# Overview
MPI stands for Message Passing Interface. The MPI standard is defined by the Message Passing Interface Forum. The standard defines the interface for a set of functions that can be used to pass messages between processes on the same computer or on different computers. MPI can be used to program shared memory or distributed memory computers. There is a large number of implementations of MPI from various computer vendors and academic groups. MPI is supported on the HPC clusters.

# MPI On the HPC System
MPI is a standard that describes the behavior of a library.  It is intended to be used with compiled languages (C/C++/Fortran).  Several implementations of this standard exist.  UVA HPC supports OpenMPI for all our compilers and IntelMPI for the Intel compiler.   MPI can also be used with the interpreted languages R and Python through packages that link to an implementation; on the HPC system these languages use OpenMPI.  

# Selecting Compiler and Implementation
An MPI implementation must be built with a specific [compiler](/userinfo/hpc/software/compilers). Consequently, only compilers for which MPI has been prepared can be used with it. All versions of the Intel compiler will have a corresponding IntelMPI. For OpenMPI run
```
module spider openmpi
```
This will respond with the versions of OpenMPI available. To see which version goes with which compiler, run
```
module spider openmpi/<version>
```
For example:
```
module spider {{< module-firstversion modulename="openmpi" >}}
```
Example output:
```
You will need to load all module(s) on any one of the lines below before the
"{{< module-firstversion modulename="openmpi" >}}" module is available to load.
   gcc/11.4.0
```
This shows that OpenMPI version {{< module-firstversion modulename="openmpi" >}} is available for gcc 11.4.0.

Once a choice of compiler and MPI implementation have been made, the modules must be loaded.  First load the compiler, then the MPI.  For instance, to use OpenMPI with gcc 11.4.0, run
```
module load gcc/11.4.0
module load openmpi
```
To load the Intel compiler version and its IntelMPI version, run
```
module load intel
```
However, for Intel 18.0, run:
```
module load intel/18.0
module load intelmpi/18.0
```
It is also possible to combine these into one line, as long as the compiler is specified first (this can result in errors if you not using the default compiler, however)
```
module load gcc openmpi
```

For a detailed description of building and running MPI codes on the HPC system, please see our [HowTo](/userinfo/howtos/rivanna/mpi-howto).

<br>
**Available MPI library modules**

{{< rivanna-software moduleclasses="mpi" >}}

# Example Slurm Scripts

This example is a Slurm job command file to run a parallel (MPI) job using the OpenMPI implementation:

{{< pull-code file="/static/scripts/mpi_job.slurm" lang="no-hightlight" >}}

In this example, the Slurm job file is requesting two nodes with sixteen tasks per node for a total of 32 processes.  Both OpenMPI and IntelMPI are able to obtain the number of processes and the host list from Slurm, so these are not specified.  In general, MPI jobs should use all of a node, but some codes cannot be distributed in that manner so we are showing a more general example here.

Slurm can also place the job freely if the directives specify only the number of tasks. In this case do not specify a node count.  This is not generally recommended, however, as it can have a significant negative impact on performance.

{{< pull-code file="/static/scripts/mpi_job_free_placement.slurm" lang="no-hightlight" >}}

**Example: MPI over an odd number of tasks**

{{< pull-code file="/static/scripts/mpi_job_odd_number.slurm" lang="no-hightlight" >}}

## MPI with OpenMP

The following example runs a total of 32 MPI processes, 8 on each node, with each task using 5 cores for threading.  The total number of cores utilized is thus 160.

{{< pull-code file="/static/scripts/hybrid_job.slurm" lang="no-hightlight" >}}

