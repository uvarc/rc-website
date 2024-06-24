+++
type = "rivanna"
date = "2024-01-02T00:00:00-05:00"
tags = [
  "rivanna", "software", "compiler", "c/c++", "fortran"
]
draft = false
title = "Compilers and UVA HPC"
description = "Compilers and UVA HPC"
author = "RC Staff"

+++

UVA HPC offers multiple compiler bundles for C, C++, and Fortran.  Different compilers have different strengths and weaknesses and different error messaging and debugging features, so users should be willing to try another one when appropriate.  The modules system manages the compiler environment and ensures that only compatible libraries are available for loading.

Many users of compiled languages are working with codes that can employ MPI for multinode parallel runs.  MPI users should first understand how their chosen compiler works, then see the MPI instructions at our [parallel programming](/userinfo/hpc/software/mpi) page.

Compiled languages can be more difficult to debug, and the assistance of a good debugger can be essential.  Descriptions of debuggers available on Rivanna can be found at our [debuggers and utilities](/userinfo/hpc/software/debuggers) page.

# Available Compilers on The HPC System

{{< rivanna-software moduleclasses="compiler" exclude="mpi" >}}

# GNU Compiler
The [GNU Compiler Collection](https://gcc.gnu.org) compilers are free, open-source tools. Additional tools included are the gdb debugger and the gprof performance profiler. For detailed documentation, visit the [GNU](https://gcc.gnu.org/onlinedocs/) website.

The compilers are:

* Fixed-format Fortran: gfortran [options] filename.f
* Free-format Fortran: gfortran [options] filename.f90
* C: gcc [options] filename.c
* C++: g++ [options] filename.cpp or g++ [options] filename.cxx

A list of compiler options can be obtained by invoking the compiler with the -help option. For example: gfortran -help

More information is available from the manpage, e.g.:
```
man g++
```

The default GNU compilers on the HPC system are typically fairly old. Newer versions can be invoked through an appropriate [module](/userinfo/hpc/software/modules). For available versions, please run
```
module spider gcc
```
It is important to load the correct module if you want to use more advanced features available in newer standards, particularly for C++ and Fortran.
```
module load gcc
```
It may be necessary to use an older compiler for programs using GPGPUs.

## Available GNU Compilers

{{< module-versions module="gcc" >}}

# Intel Compiler
The [Intel Linux Fortran and C/C++ compilers](https://software.intel.com/en-us/compilers) are for x86-64 processor-based systems running Linux. These compilers have specific optimizations for Intel architectures. The University has floating network licenses for the Intel compiler suite as well as for the Math Kernel Libraries.

For detailed information, review the documentation on the [Intel C/C++](https://software.intel.com/en-us/articles/intel-c-compiler-professional-edition-for-linux-documentation/) and [Fortran compiler](https://software.intel.com/en-us/fortran-compiler-developer-guide-and-reference) website.

The Intel compilers are accessed on the cluster by using the modules software to dynamically set the appropriate environmental variables (e.g. `PATH` and `LD_LIBRARY_PATH`). To initialize your environment to use the Intel compilers, use the command:

```
module load intel
```

* Fortran fixed format: ifort [options] filename.f
* Fortran free format: ifort [options] filename.f90
* C: icc [options] filename.c
* C++: icpc [options] filename.cpp or: icpc [options] filename.cxx

A list of compiler options can be obtained by invoking the compiler with the -help option, e.g.:
```
ifort -help
```
or by accessing the manpage, e.g.
```
man ifort
```

To see the available versions, run
```
module spider intel
```
Then load the appropriate module, in this case the default version
```
module load intel
```

## Available Intel Compilers

{{< module-versions module="intel" >}}


**Important note for Fortran programmers:** Nearly all Fortran code must be compiled with the flag `-heap-arrays` added or it will encounter a segmentation violation.

If you still experience segmentation violations, recompile with `-g -CB` (for debugging and bounds checking respectively) and run the program under the control of a debugger.  Once the program is debugged, be sure to remove the `-g` and certainly the `-CB` flags and recompile with `-O` or `-O -ipo`. If that works, try `-O3` or `-O3 -ipo` for a higher level of optimization.  

If mathematical libraries are needed, we strongly recommend the Intel Math Kernel Libraries (MKL). They provide LAPACK, BLAS, and a number of other libraries. They are highly optimized, especially for Intel architecture, and they automatically work with the compiler. The Intel module for any version loads the MKL that is compatible with that compiler. The module script sets an environment variable `MKL_DIR` (with `MKLROOT` as a synonym). This variable can be used in scripts and makefiles. For example, in a [mM]akefile: `LIBS=-L$(MKLROOT)`.

The MKL consists of a number of libraries, and which ones to link is not always obvious.  In newer Intel compilers a flag `-mkl` can be added for both compiler and linker.  However, that does not always suffice, so Intel provides a link line advisor at their site. Remember that default integers are 32 bits even on 64-bit systems. The MKL bundled with our compiler suite includes ScaLAPACK.

# NVIDIA CUDA Compiler
The NVIDIA HPC SDK C, C++, and Fortran compilers support GPU acceleration of HPC modeling and simulation applications with standard C++ and Fortran, OpenACC directives, and CUDA.

NVIDIA CUDA compilers are accessed on the HPC cluster by using modules to dynamically set the appropriate environmental variables (e.g. `PATH` and `LD_LIBRARY_PATH`). To initialize your environment to use the CUDA compilers, use the command

```
module load cuda
```
or
```
module load nvhpc
```

## Available NVIDIA CUDA Compilers

{{< module-versions module="cuda" >}}

{{< module-versions module="nvhpc" >}}

Please see [here](/userinfo/hpc/software/nvhpc) for details.

# PGI Compiler
Please use the `nvhpc` module instead (see previous section).

# Building on the HPC System
For more information about building your code on UVA HPC, please see our [howto](/userinfo/howtos/rivanna/compiler-howto).
