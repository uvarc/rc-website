+++
type = "rivanna"
categories = [
  "HPC",
  "software"
]
date = "2024-07-16T00:00:00-05:00"
tags = [
  "multi-core",
  "chem"
]
draft = false
modulename = "vasp"
softwarename = "VASP"
title = "VASP and UVA HPC"
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
```
module spider {{% module-name %}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# Building VASP
VASP is typically built with the Intel compiler and relies on Intel's Math Kernel Libraries (MKL).  VASP users should read our documentation for this compiler before beginning.  VASP version 5.4.1 and up provides a sample makefile.include.linux_intel that can be modified for local requirements and for different distributions of MPI.

We recommend that users copy `makefile.include.linux_intel` from the arch subdirectory to `makefile.include` in the top-level VASP directory, i.e.
```
cp arch/makefile.include.linux_intel ./makefile.include
```
This `makefile.include` is preconfigured to use the Intel compiler, IntelMPI, and the Intel MKL libraries. We recommend a few local modifications:

1. VASP is written primarily in Fortran and on the HPC system the compiler option `-heap-arrays` should be added to the `makefile.include`. This can be added to the FFLAGS variable, e.g. `FFLAGS = -heap-arrays -assume byterecl -w`
2. It is advisable to change the SCALAPACK library name to `-lmkl_scalapack_lp64.so`.

To use [OpenMPI](/userinfo/hpc/software/mpi), the user must also change the Fortran compiler to `FC=mpif90` and the `BLACS` library to `-lmkl_blacs_openmpi_lp64` while leaving `SCALAPACK = -lmkl_scalapack_lp64.a`.

Installation details can be found on the VASP wiki: [5.x](https://www.vasp.at/wiki/index.php/Installing_VASP.5.X.X#How_to_make_VASP), [6.x](https://www.vasp.at/wiki/index.php/Installing_VASP.6.X.X).

# Example Slurm script
To run VASP, the user prepares a group of input files with predetermined names.  The path to the vasp binary must be provided to the Slurm process manager `srun`; in the example below we assume it is in a directory `bin` under the user's home directory.  All input and potential files must be located in the same directory as the Slurm job script in this example.

{{< pull-code file="/static/scripts/vasp.slurm" lang="no-hightlight" >}}

# Known issues

## `vasp_gam` on AMD node
When running `vasp_gam` on AMD nodes (i.e. all nodes in `parallel`, Afton nodes in `standard`), ScaLAPACK must be disabled or else your job may hang at the first electronic step. In `INCAR`:

```
LSCALAPACK = .FALSE.
```

Alternatively, if your job fits on 40 cores or less, you can choose not to disable ScaLAPACK and run it in `standard` with the `rivanna` constraint so that it will not land on an AMD node:

```
#SBATCH -p standard
#SBATCH -C rivanna
```
