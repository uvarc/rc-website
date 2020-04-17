+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "numlib"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "intel","serial","mpi"
]
draft = false
modulename = "imsl"
softwarename = "IMSL"
title = "IMSL on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
IMSL provides high-performance computing software and expertise needed to develop and execute sophisticated numerical analysis applications. These libraries free you from developing your own code by providing pre-written mathematical and statistical algorithms that you can embed into your Fortran applications.  Currently we provide only the Fortran libraries.

The numerical algorithms of the IMSL Fortran Library can be accessed using Fortran 77 or using Fortran 90 language constructs. Some of the Fortran 90 implementation of IMSL routines let users take advantage of parallel computing through the library's underlying use of the Message Passing Interface (MPI) libraries if their environment supports it (e.g. the HPC cluster).

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

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

# Building and Linking Your Application

## Compiling and linking Fortran library applications.
Before using the IMSL Libraries you must define certain environment variables. On the HPC clusters, you should use a modules command to set up the IMSL environment.

The module sets many environment variables and shell aliases/functions. The following is a list of what is useful to the Fortran IMSL Library user. Several other variables are set that are used internally by IMSL products.

| Variable            | Explanation |
|---------------------|---|
| $F90                | Fortran 90 compiler |
| $MPIF90	            | MPI Fortran 90 |
| $F90FLAGS           | Fortran 90 compiler options |
| $FC	                | Fortran 77 compiler |
| $FFLAGS	            | Fortran 77 compiler options |
| $LINK_F90_SHARED    | Link options required to link with the shared Fortran 90 MP library (does not require MPI library, uses scalar error handler) |
| $LINK_F90           | By default set to $LINK_F90_SHARED |
| $LINK_FNL_SHARED    | Link options required to link with the shared Fortran Numerical Libraries (does not require MPI library, uses scalar error handler) |
| $LINK_FNL	          | By default, set to $LINK_FNL_SHARED |
| $LINK_MPI	          | Link options required to link with the static Fortran 90 MP Library (requires MPI library). This LINK environment variable uses the  parallel IMSL error handler.  The parallel IMSL error handler is designed to behave correctly in an MPI environment. |
| $VNI_LICENSE_NUMBER	| Contains your license number. |

<br>
**Note:** The `F90FLAGS` or `FFLAGS` variables do not include any optimization or debugging options. Use the normal compiler flags as you would for any program. For Fortran 90 applications that do not use subroutines using MPI, the following command will compile and link an application program:
```
imsl_prog.f`: $F90 -o imsl_prog $F90FLAGS imsl_prog.f90 $LINK_F90
```

For Fortran 90 applications (use subroutines using MPI), the following command will compile and link an application program:
```
imsl_prog.f: $MPIF90 -o imsl_prog $F90FLAGS imsl_prog.f90 $LINK_MPI
```

To use flags more approprate for Fortran 77, the following command will compile and link an application program
```
imsl_prog.f: $FC -o imsl_prog $FFLAGS imsl_prog.f $LINK_FNL
```
Note that in many cases, `$FC` is still the Fortran 90 / 95 compiler with appropriate options for fixed-form source.

## Using Makefiles
Compiling and linking codes with IMSL requires the addition of include paths for compilation and libraries for linking. This task can be greatly simplified by use of the Unix make command. A specific example of a Makefile that can compile and link an IMSL example program, `imslmp.f`, is shown below:
```
FCFLAGS = $(FFLAGS) -O
LIBS  = $(LINK_FNL)

LDR = $(FC)
LDFLAGS =

OBJS = imslmp.o

.SUFFIXES: .o .f
.f.o:
        $(FC) -c $(FCFLAGS) $< imslmp: $(OBJS)
        $(LDR) $(LDFLAGS) -o imslmp $(OBJS) $(LIBS)
```
This Makefile requires that the IMSL module be loaded. The make program is aware of environment variables that have been set in the shell from which it is invoked.

## Finding the Right Routine
The modules command will set an environment variable that will enable you to find examples to use as templates for writing your own programs. For instance, the directory `$FNL_EXAMPLES/manual` contains the examples documented in the IMSL Fortran Library User's Guides. Refer to the README file located in the manual directory for details on how to run these examples. Users interested in the IMSL Library's parallel capability should look through the directory `$FNL_EXAMPLES/mpi_manual`, which contains the MPI examples documented in the IMSL Fortran Library User's Guide. These examples make use of the subroutines which can take advantage of MPI. Refer to the README file located in the mpi_manual directory for details on how to run these examples. Similarly, examples for the C library can be found in `$CNL_EXAMPLES`. The most useful examples are in `$CNL_EXAMPLES/validate`.

IMSL documentation can be found [here]({{< module-homepage >}}).

# IMSL on Rivanna
To use IMSL you must load the compatible compiler (Intel 16.0) and MPI (IntelMPI).
```
module load intel/16.0
module load intelmpi/16.0
module load imsl
```
This sets the environment variables described above.  After this you can build your program.

# SLURM Example Scripts

## Serial Job
This is a SLURM job command file to run a serial job that is compiled with the IMSL libraries.
```
#!/bin/bash
#SBATCH -n 1
#SBATCH -t 01:00:00
#SBATCH -o output_filename
#SBATCH -p standard
#SBATCH -A mygroup

module load intel/16.0
module load intelmpi/16.0
module load imsl

./myprogram
```

## Parallel Job
To run a parallel program use `srun` rather than `mpirun`.  Following is a SLURM job command file to run a parallel job that is compiled with the IMSL libraries.
```
#!/bin/bash
#SBATCH -n 2
#SBATCH --ntasks-per-node=20
#SBATCH -t 01:00:00
#SBATCH -o output_filename
#SBATCH -p parallel
#SBATCH -A mygroup

module load intel/16.0
module load intelmpi/16.0
module load imsl

srun ./myprogram
```
