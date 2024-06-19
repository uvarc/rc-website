+++
type = "howto"
date = "2020-02-21T15:12:46-05:00"
tags = [
  "rivanna", "software", "mpi"
]
categories = ["howto"]
draft = false
title = "Building and Running MPI Code"
description = "MPI on Rivanna"
author = "RC Staff"

+++

# Building an MPI Code
All implementations provide wrappers around the underlying [compilers](/userinfo/hpc/software/compilers) that simplify compilation.   As it is very important to use the headers that correspond to a given library, users are urged to make use of the wrappers whenever possible.   For OpenMPI and MVAPICH2 these are:

* mpicc \(C)
* mpicxx (C++)
* mpif90 (Fortran free or fixed format)

For Intel MPI these use gcc/g++/gfortran by default, which is generally not recommended; to use the Intel compilers the corresponding wrappers are:

* mpiicc
* mpiicpc
* mpiifort

**Note**: At this time, we recommend MPI users build with Intel 18.0 and IntelMPI 18.0
```no-highlight
module load intel/18.0
module load intelmpi/18.0
```

Most MPI programs are distributed for Linux with a Makefile or a means to create a Makefile, such as `configure` or `cmake`.  If the Makefile can be edited directly, it usually contains variables such as `CC`, `CXX`, `FC` or `F90`, or similar that are set to the compiler to be used.  It is only necessary to use the appropriate wrapper as the compiler.  For `configure` or `cmake`, it may be necessary to export environment variables, e.g.
```
export CC=mpicc
```
before running the command.  Users should refer to the installation documentation for the code they wish to build.

The same wrappers should also be used to link the program, since they automatically link the correct MPI library for the chosen compiler and implementation.  When using the wrappers as the linker, any Makefile variables such as `MPILIB` should be left blank.

Users who have difficulty building an MPI code not already present on the system can contact RC for assistance.

# Running MPI Codes
MPI programs are invoked under the control of an executor; without invoking an executor only a single process will be instantiated, so it is equivalent to running a serial executable.

# Running on Uncontrolled Systems
On a system not controlled by Slurm, the executors are usually `mpirun` or `mpiexec` (these are typically equivalent). They take a number of options, including the number of processes and a file containing a list of the hostnames on which to run them.

Users are permitted to run short (approximately 10 minutes or less), small (4-8 processes) testing/debugging runs on the Rivanna frontends.  Multi-node frontend runs are not permitted.  It is not necessary to specify a `hostfile` if all processes are run on the same system.  To run a test job on a frontend with four processes, first load the appropriate modules and then type
```
mpirun -np 4 ./mycode
```
On the frontends the processes will not be assigned to specific cores and may be competing with other processes, so performance may be poor.

To use a debugger with an MPI program, compile with the `-g` flag as for a serial code.  We provide the [Totalview](/userinfo/hpc/software/totalview) graphical debugger for MPI and OpenMP applications. Totalview requires that the `mpiexec` executor be in your path before you invoke it.  If you need to debug for a longer time, with a large number of cores, or with multiple nodes, you can use Totalview through the Open OnDemand [Desktop](/userinfo/hpc/ood/desktop). Please request all cores for the node whether you use them or not, because Totalview cannot use the `srun` command as the executor.

# Running Under Slurm
When running with Slurm, the `srun` command **must** be used as the executor.  Load the appropriate modules in your script, then invoke
```
srun ./mycode
```
Do not specify the number of processes or the list of hosts since `srun` will obtain that information from your request to Slurm and will distribute your processes on the nodes and cores to which your job was assigned.

This example is a Slurm job command file to run a parallel (MPI) job using the OpenMPI implementation:
```
#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=16
#SBATCH --time=12:00:00
#SBATCH --output=output_filename
#SBATCH --partition=parallel
#SBATCH -A mygroup

module load gcc
module load openmpi

srun ./parallel_executable
```
In this example, the Slurm job file is requesting two nodes with sixteen tasks per node for a total of 32 processes.  Both OpenMPI and IntelMPI are able to obtain the number of processes and the host list from Slurm, so these are not specified.  In general, MPI jobs should use all of a node so we'd recommend `--ntasks-per-node=20` on the parallel partition, but some codes cannot be distributed in that manner so we are showing a more general example here.

Please see our MPI [software page](/userinfo/hpc/software/mpi) for examples of Slurm scripts for more complex situations, including running hybrid MPI/OpenMP codes.

For more detailed instructions on building and running compiled codes on Rivanna, please see our online [tutorial](https://learning.rc.virginia.edu/tutorials/building-running-c-cpp-fortran/).
