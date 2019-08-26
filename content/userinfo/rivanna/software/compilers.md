+++
type = "rivanna"
date = "2019-04-23T08:37:46-05:00"
tags = [
  "rivanna", "software"
]
draft = false
title = "Compilers on Rivanna"
description = "Compilers on Rivanna"
author = "RC Staff"

+++

Rivanna offers multiple compiler bundles for C, C++, and Fortran.  Different compilers have different strengths and weaknesses and different error messaging and debugging features, so users should be willing to try another one when appropriate.  The modules system manages the compiler environment and ensures that only compatible libraries are available for loading.

Many users of compiled languages are working with codes that can employ MPI for multinode parallel runs.  MPI users should first understand how their chosen compiler works, then see the MPI instructions at our [parallel programming](/userinfo/rivanna/software/mpi) page.

Compiled languages can be more difficult to debug, and the assistance of a good debugger can be essential.  Descriptions of debuggers available on Rivanna can be found at our [debuggers and utilities](/userinfo/rivanna/software/totalview) page.

# Available Compilers on Rivanna

{{% rivanna-software tags="compiler" %}}

# Gnu Compiler
The [Gnu Compiler Collection](https://gcc.gnu.org) compilers are free, open-source tools. Additional tools included are the gdb debugger and the gprof performance profiler. For detailed documentation, visit the [Gnu](https://gcc.gnu.org/onlinedocs/) website.

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

The default Gnu compilers on Rivanna are typically fairly old. Newer versions can be invoked through an appropriate [module](/resource/rivanna/software/modules). For available versions, please run
```
module spider gcc
```
It is important to load the correct module if you want to use more advanced features available in newer standards, particularly for C++ and Fortran.
```
module load gcc
```
It may be necessary to use an older compiler for programs using GPGPUs. The `gcccuda` module will load the correct version.

# Intel Compiler
The [Intel Linux Fortran and C/C++ compilers](https://software.intel.com/en-us/compilers) are for x86-64 processor-based systems running Linux. These compilers have specific optimizations for Intel architectures. The University has floating network licenses for the Intel compiler suite as well as for the Math Kernel Libraries.

For detailed information, review the documentation on the [Intel C/C++](https://software.intel.com/en-us/articles/intel-c-compiler-professional-edition-for-linux-documentation/) and [Fortran compiler](https://software.intel.com/en-us/fortran-compiler-developer-guide-and-reference) website.

The Intel compilers are accessed on the Rivanna cluster by using the modules software to dynamically set the appropriate environmental variables (e.g. `PATH` and `LD_LIBRARY_PATH`). To initialize your environment to use the Intel compilers, use the command: module load intel.

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

**Important note for Fortran programmers:** Nearly all Fortran code must be compiled with the flag `-heap-arrays` added or it will encounter a segmentation violation.

If you still experience segmentation violations, recompile with `-g -CB` (for debugging and bounds checking respectively) and run the program under the control of a debugger.  Once the program is debugged, be sure to remove the `-g` and certainly the `-CB` flags and recompile with `-O` or `-O -ipo`. If that works, try `-O3` or `-O3 -ipo` for a higher level of optimization.  

If mathematical libraries are needed, we strongly recommend the Intel Math Kernel Libraries (MKL). They provide LAPACK, BLAS, and a number of other libraries. They are highly optimized, especially for Intel architecture, and they automatically work with the compiler. The Intel module for any version loads the MKL that is compatible with that compiler. The module script sets an environment variable `MKL_DIR` (with `MKLROOT` as a synonym). This variable can be used in scripts and makefiles. For example, in a [mM]akefile: `LIBS=-L$(MKLROOT)`.

The MKL consists of a number of libraries, and which ones to link is not always obvious.  In newer Intel compilers a flag `-mkl` can be added for both compiler and linker.  However, that does not always suffice, so Intel provides a link line advisor at their site. Remember that default integers are 32 bits even on 64-bit systems. The MKL bundled with our compiler suite includes ScaLAPACK.

The Intel compiler should also be used, along with its companion Intel MPI, for Intel Many-Integrated Core systems.  To compile for MIC architectures use the flag -xMIC-AVX512 on your compile line.

# PGI Compiler
The PGI Server Compilers and tools are licensed for Linux systems.

PGI compilers are accessed on the HPC cluster by using modules to dynamically set the appropriate environmental variables (e.g. `PATH` and `LD_LIBRARY_PATH`). To initialize your environment to use the PGI compilers, use the command
```
module load pgi
```
After you have modified your environment to access the PGI compilers, you can invoke the compiler on a source code file in one of the following ways.

* Fortran fixed format: pgf77 or pgf90 [options] filename.f
* Fortran free format: pgf90 [options] filename.f90
* C: pgcc [options] filename.c
* C++: pgc++ [options] filename.cpp or pgCC [options] filename.cxx

A list of compiler options can be obtained by invoking the compiler with the `-help` option, e.g.: `pgf90 –help`

More information is available from the manpage, e.g.: `man pgf90`

PGI provides a very capable debugger, `pgdbg`. In its default mode, it is graphical, and it requires that an X server run on the user's local desktop machine. It may be run in command-line mode with the `-text` option; see the manpage for a full list of options. As with all debuggers, the user's program must be compiled with the `-g` flag in order to enable debugging. If you wish to use the graphical debugger and do not have or want to install an X11 server, you can also use FastX. Another option for a graphical debugger is [TotalView](/resource/rivanna/software/totalview).

The PGI compilers are particularly strong in their support of OpenACC for programming NVIDIA GPGPUs.

# Building Your Program on Rivanna
Creating an executable from source with a compiled language requires two steps, compiling and linking.  The combination of these is generally called building.  The output of the compiler is generally an object file, which on Unix will end in a .o suffix.  Object files are machine code and are not human-readable, but they are not standalone and cannot be executed.  The linker, which is usually invoked through the compiler, takes all object files, along with any external libraries, and creates the executable (also called a binary).

Compilers are invoked on source files with a line such as

`<compiler> <options> code.<suffix>`
You must know the name of the compiler you wish to use as well as its options. Most compilers offer a large number of options that can control very detailed properties of the resulting executable, but the average user need only know a few of them.

## Debugging and Profiling
To use a debugger you must compile with a special flag.  On all Unix compilers this is `-g`.  

Fortran programmers can add a flag to check that array accesses fall within the declared bounds.  For gfortran this flag is -fbounds-check, for ifort it is -CB, and for pgfortran it is -C or -Mprof.  Since array-bounds errors are the most common cause of segmentation violations in Fortran, this can be a very valuable flag, but it slows down the execution.

**Examples:**
```
gcc -g mycode.c
gfortran -g -fbounds-check mycode.f90
```
Options for profiling vary more by compiler.  For Gnu compilers it is a combination flag `-pg`.  Intel uses separate options `-p -g`.  The PGI compiler uses `-Mprof`.

Using a debugger is covered separately here.  If you write your own code, profiling is useful to increase the performance of your code.

## Optimizing
Once your code is working, you should remove all debugging flags and compile from source.  Debugging flags inhibit optimizations and can cause your code to waste SUs.  The general optimization flag for all compilers is `-O`.  With no integer it will set optimization at the default level, which varies by compiler.  You can specify different levels of optimization (including none) with an integer immedately after `O`.  The number of available levels and where the default lies varies by compiler.  Gnu and Intel have three levels and the default is -O1.  PGI has four levels and the default is `-O2`.  The flag `-O0` disables all optimizations, which can be useful for debugging; the `-g` flag may or may not imply `-O0`.

**Examples:**
```
gcc -O mycode.c
icc -O2 mycode.c
gfortran -O0 mycode.f90
```
As noted above, it is particularly important for Fortran programmers to remove the bounds-checking flag for production runs, as that can slow down execution considerably.

Compilers have many more options to fine-tune optimization levels.  However, users should be clear on what they need and why, and should avoid flags like -fast that may bind the executable too tightly to a specific architecture, since Rivanna nodes are of different ages and architectures.

## Renaming the Executable
Unless otherwise specified, the name of your executable will be `a.out`.  To change that, add the flag `-o <name>`.  It is critical to include the name between the `-o` and the source file, or the compiler will overwrite your source file.

**Examples:**
```
g++ -o mycode mycode.cxx
ifort -o mycode mycode.f90
pgcc -o mycode mycode.c
```

## Separating Compiling and Linking
Unless otherwise specified, the compiler will attempt to compile all the source files name to the end of the line, then to link them into an executable.  If there are no dependencies in the source files this can work.  However, frequently there are dependencies or other special circumstances, so that the compilation and link steps must be performed separately.  To suppress the link step use the -c option.  To execute the link step, the compiler must be provided with a list of all the resulting .o files that are needed to create the executable.

**Example:**
```
ifort -c -O mycode.f90
ifort -c -O mymod.f90
ifort -o mycode mycode.o mymod.o
```

## Linking Libraries
Executables for more advanced programs frequently need to link external libraries, such as numerical packages or data-management libraries.  If the libraries are in the compiler's default search path, they are specified by adding flags after the last object file.  For known paths the flag is `-l` followed by the "root" name of the library, which drops the "lib" in front and everything including and after a period.  So we would specify `libblas.so` as `-lblas`.  Order matters because the linker resolves references from left to right.  Therefore if we also use lapack, we must have a line like
```
gfortran -o mycode mycode.o mymod.o -llapack -lblas
```
If these libraries are not located in the compiler's search path, the paths for both header or module files and library files must be provided to it.  Header paths must go on compile lines, whereas library paths go on the link line.  In the example above, if we wanted to link a library in the user home directory, we'd require the `-I` flag for including and the `-L` flag for the library:
```
gfortran -c -O -I/home/msk3k/myblas mycode.f90
gfortran -c -O mymod.f90
gfortran -o mycode -L/home/mst3k/myblas mycode.o mymod.o -lopenblas
```

# Managing the Build
Typing a compiler line for each source file is tedious and error-prone.  There are several systems to help manage building.  The most widely used on Unix for C, C++, and Fortran is make.  Make uses rules to determine how to generate a particular file, called a target, from its dependencies.  It has a rather peculiar syntax so a more complete discussion can be found [here](/userinfo/rivanna/software/make).

Make does not set up paths to external libraries, or specify a compiler other than the default, or enable or disable different build options.  Other systems have been written to handle these initialization steps.  The autoconf/configure system is widely used on Unix.  Another popular system is CMake, which is cross-platform and works on Windows and Mac OSX as well as on Unix.

## Autoconf
A code that uses autoconf will provide a script named configure which should be run before building.  Since the current directory is not in the default user path, usually this is invoked with
```
./configure <options>
```
Options to the configure script will vary depending on the software package.  To see a full list, type
```
./configure --help
```
The default installation prefix is usually `/usr` or `/usr/local`.  Rivanna users are not allowed to write to either of these directories, so an alternative must be provided.   Normally you should use a directory in your home directory.  The minimum configure command would thus be
```
./configure --prefix=/home/yourid/your/directory/path
```
Other options to configure generally involve adding or removing options or specifying a path to libraries that it may not be able to find on its own.  Library paths are particularly important in a modules-based system such as ours, because those directories won't always be visible to configure.  The module should set an environment variable for the path that you can use.  For example, if you wish to link the HDF5 library corresponding to your toolchain, you can run
```
printenv | grep HDF
```
In this case we might specify a configure line such as
```
./configure --prefix=/home/mst3k/softpack --with-hdf=${HDF5_ROOT}
```
Configure generates a Makefile.  Once configure has completed, run
```
make
```
If that succeeds run
```
make install
```

## CMake
CMake is an increasingly popular build system.  Whereas autoconf is generally tied to Unix, CMake is cross-platform.  It has several important differences from autoconf.  Most importantly, it pays no attention to user paths for binaries or libraries.  Each package has specific environment variables that must be set if it is to find binaries or libraries not in its internal default search path.  These environment variables can be set in the shell where cmake is run, or it can be specified at the cmake command line.

CMake usually expects to build packages in a separate directory that typically must be created by the user.  The user must change to this directory before invoking the cmake command.  This command looks for a file CMakeLists.txt, so it takes a command-line argument of the directory where that file is located.

The equivalent to the `--prefix` of autoconf is `CMAKE_INSTALL_PREFIX`.   The equivalent to the configure example above for our hypothetical package would be (assuming a separate build directory)
```
mkdir build
cd build
cmake -DCMAKE_INSTALL_PREFIX=/home/mst3k/softpack ..
```
This assumes that `HDF5_ROOT` is already in the environment.  If it is not, another option `-DHDF5_ROOT=/path/to/hdf5` must be included.

Other options can be set in different ways.  In order to see a list of the user-changeable options, you can run `ccmake`, which will bring up a simple text-based graphical user interface, where you can turn options on or off, set paths, and so forth.  More information is available at [Kitware's CMake website](https://cmake.org/cmake/help/v3.14/manual/ccmake.1.html).

Regardless of how CMake is run, it will generate a CMakeCache.txt file that will not be overwritten if `cmake` is run again; it must be removed in order to redo the configuration.

As for autoconf, on Unix the output of cmake is a Makefile, so
```
make
make install
```
is generally the recipe to build and install the program.

The default cmake on Rivanna is fairly old and most users will need to load a newer [cmake module](reource/rivanna/software/cmake) for a newer cmake.  If any newer version will work, module load will suffice.  Otherwise `module spider cmake` will show the options.
