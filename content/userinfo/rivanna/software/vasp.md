+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "chem"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
]
draft = false
modulename = "vasp"
softwarename = "VASP"
title = "VASP on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
Local support is not available. The package is supported by its developers through their documentation site. **VASP is licensed software and licenses are issued to individual research groups.** Each group must build and maintain its own copy of the code.

**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions and learn how to load them, run:
<pre>module spider {{% module-name %}}</pre>

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
<pre>module spider {{% module-firstversion %}}</pre>

{{% module-versions %}}

# Building VASP
VASP is typically built with the Intel compiler and relies on Intel's Math Kernel Libraries (MKL).  VASP users should read our documentation for this compiler before beginning.  VASP version 5.4.1 and up provides a sample makefile.include.linux_intel that can be modified for local requirements and for different distributions of MPI.

We recommend that users copy `makefile.include.linux_intel` from the arch subdirectory to `makefile.include` in the top-level VASP directory, i.e.
```
cp arch/makefile.include.linux_intel ./makefile.include
```
This `makefile.include` is preconfigured to use the Intel compiler, IntelMPI, and the Intel MKL libraries. We recommend a few local modifications:

1. VASP is written primarily in Fortran and on Rivanna the compiler option `-heap-arrays` should be added to the `makefile.include`. This can be added to the FFLAGS variable, e.g. `FFLAGS = -heap-arrays -assume byterecl -w`
2. It is advisable to change the SCALAPACK library name to `-lmkl_scalapack_lp64.so`.

To use [OpenMPI](/userinfo/rivanna/software/mpi), the user must also change the Fortran compiler to `FC=mpif90` and the `BLACS` library to `-lmkl_blacs_openmpi_lp64` while leaving `SCALAPACK = -lmkl_scalapack_lp64.a`.

The VASP suite consists of three executables: `vasp_std`, `vasp_gam`, and `vasp_ncl`.  The default `makefile.include` will attempt to build all three consecutively. Users may find it works best to compile these individually, by editing the line
```
VERSIONS=
```
to contain only one of `std`, `gam`, or `ncl`, and then running the build process for each one.

# Example SLURM script
To run VASP, the user prepares a group of input files with predetermined names.  The path to the vasp binary must be provided to the SLURM process manager `srun`; in the example below we assume it is in a directory `bin` at the same level as the directory from which the job is submitted.  All input and potential files must be located in the same directory as the SLURM job script in this example.
```
#!/bin/bash
#SBATCH --account my_acct
#SBATCH --nodes=8
#SBATCH --ntasks-per-node=16
#SBATCH --time=3-00:00:00
#SBATCH --output=thermo.out
#SBATCH --partition=parallel

module load intel intelmpi

srun ../bin/vasp_std
```
