+++
type = "howto"
date = "2020-04-01T15:12:46-05:00"
tags = [
  "rivanna", "software", "compiler", "fortran"
]
categories = ["howto","software","rivanna"]
draft = false
title = "Building Your Code on the HPC System"
description = "Building on the HPC System"
author = "RC Staff"

+++

# Building your Application

Creating an executable from source with a compiled language requires two steps, compiling and linking.  The combination of these is generally called building.  The output of the compiler is generally an object file, which on Unix will end in a .o suffix.  Object files are machine code and are not human-readable, but they are not standalone and cannot be executed.  The linker, which is usually invoked through the compiler, takes all object files, along with any external libraries, and creates the executable (also called a binary).

Compilers are invoked on source files with a line such as

```
<compiler> <options> code.<suffix>
```

You must know the name of the compiler you wish to use as well as its options. Most compilers offer a large number of options that can control very detailed properties of the resulting executable, but the average user need only know a few of them.

Please see our compiler [documentation](/userinfo/hpc/software/compilers) for information about the available compilers on the HPC system.  For building and running parallel code, see the [documentation](/userinfo/hpc/software/mpi).

## Debugging and Profiling

To use a debugger you must compile with a special flag.  On all Unix compilers this is `-g`.  

Fortran programmers can add a flag to check that array accesses fall within the declared bounds.  For gfortran this flag is -fbounds-check, for ifort it is -CB, and for pgfortran it is -C or -Mprof.  Since array-bounds errors are the most common cause of segmentation violations in Fortran, this can be a very valuable flag, but it slows down the execution.

**Examples:**
```
gcc -g mycode.c
gfortran -g -fbounds-check mycode.f90
```
Options for profiling vary more by compiler.  For Gnu compilers it is a combination flag `-pg`.  Intel uses separate options `-p -g`.  The PGI compiler uses `-Mprof`.

Using debuggers and profilers is covered separately [here](/userinfo/hpc/software/debuggers).  If you write your own code, profiling is useful to increase the performance of your code.

## Optimizing
Once your code is working, you should remove all debugging flags and compile from source.  Debugging flags inhibit optimizations and can cause your code to waste SUs.  The general optimization flag for all compilers is `-O`.  With no integer it will set optimization at the default level, which varies by compiler.  You can specify different levels of optimization (including none) with an integer immediately after `O`.  The number of available levels and where the default lies varies by compiler.  Gnu and Intel have three levels and the default is -O1.  PGI has four levels and the default is `-O2`.  The flag `-O0` disables all optimizations, which can be useful for debugging; the `-g` flag may or may not imply `-O0`.

**Examples:**
```
gcc -O mycode.c
icc -O2 mycode.c
gfortran -O0 mycode.f90
```
As noted above, it is particularly important for Fortran programmers to remove the bounds-checking flag for production runs, as that can slow down execution considerably.

Compilers have many more options to fine-tune optimization levels.  However, users should be clear on what they need and why, and should avoid flags like -fast that may bind the executable too tightly to a specific architecture, since HPC nodes are of different ages and architectures.

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

- - -

# Managing the Build
Typing a compiler line for each source file is tedious and error-prone.  There are several systems to help manage building.  The most widely used on Unix for C, C++, and Fortran is make.  Make uses rules to determine how to generate a particular file, called a target, from its dependencies.  It has a rather peculiar syntax so a more complete discussion can be found [here](/userinfo/howtos/rivanna/make).

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
The default installation prefix is usually `/usr` or `/usr/local`.  UVA HPC users are not allowed to write to either of these directories, so an alternative must be provided.   Normally you should use a directory in your home directory.  The minimum configure command would thus be
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

CMake often requires that you specify the compiler.  It does not follow paths, so even if you load a gcc module, it will use a hardcoded path that will generally pick up the system compiler, which is often quite old.  You can modify this with the flags
```
-DCMAKE_C_Compiler
-DCMAKE_Fortran_Compiler
-DCMAKE_CXX_Compiler
```

For example
```
cmake -DCMAKE_C_COMPILER=gcc -DCMAKE_INSTALL_PREFIX=/home/mst3k/softpack ..
```

Other options can be set in different ways.  In order to see a list of the user-changeable options, you can run `ccmake`, which will bring up a simple text-based graphical user interface, where you can turn options on or off, set paths, and so forth.  More information is available at [Kitware's CMake website](https://cmake.org/cmake/help/v3.14/manual/ccmake.1.html).

Regardless of how CMake is run, it will generate a CMakeCache.txt file that will not be overwritten if `cmake` is run again; it must be removed in order to redo the configuration.

As for autoconf, on Unix the output of cmake is a Makefile, so
```
make
make install
```
is generally the recipe to build and install the program.

The default `cmake` on the HPC system is fairly old and most users will need to load a newer `cmake` module.  If any newer version will work, `module load` will suffice.  Otherwise `module spider cmake` will show the options.

For more detailed instructions on building and running compiled codes on the HPC system, please see our online [tutorial](https://learning.rc.virginia.edu/tutorials/building-running-c-cpp-fortran/).

