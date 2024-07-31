+++
type = "howto"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
  "howto"
]
date = "2022-02-14T08:37:46-05:00"
tags = ["compilers","software","hpc"]
draft = false
shorttitle = "Make"
title = "The Make Tool"
description = "Compiling and linking programs with make"
author = "RC Staff"

+++


# Overview
Make is a program used primarily on Unix systems to manage compiling and linking (building) programs written in C, C++, Fortran, or other compiled languages.  Make operates on targets using rules to create those targets.  It has a set of built-in rules but users may write their own or override the default rules.   Make scans the dependencies of each target looking for files newer than the target.  If it finds them, it recreates the target.   Targets may and usually do depend on other targets; make will work its way through the chain to rebuild the final target, which is typically an executable.

To utilize the program, the user types
```
make
```
Make looks first for a file called `makefile`.  If it does not find that it will look for `Makefile`.  If neither is present, it will attempt to use its default rules, which is seldom successful.  Users can name their file other than `makefile` or `Makefile` but then must invoke make with the `-f` option
```
make -f filename
```
The name `Makefile` (capital M) is most frequently used on Unix because it will stand out in a directory where other files are entirely or mostly lower case.

Make is often used in conjunction with `autoconf`.  Autoconf uses a script called `configure` to generate a Makefile.  In most cases, the configure script will be provided by the developer of a particular program.   The configure script usually takes several optional arguments, including an option `--prefix=/path/to/installation` which will allow users to install to a location other than the default, which is usually `/usr/bin` and is not writeable by ordinary users.

Another popular build system is [cmake](https://cmake.org/).  Cmake is more similar to autoconf than to make, since on Unix it creates a Makefile which must then be executed.

Basics of Make
The Makefile must follow a rigid format.  The target must start in the first column of a line and must be terminated with a colon (:).  Any dependencies, i.e. files required to create this target, must follow the colon as a space-separated list on a single line.  The rules required to create the target from the dependencies **must** follow on separate lines and each rule line **must** begin with a tab character.

**Example:**
```
myexec: file1.o file2.o
<tab>g++ file1.o file2.o
file1.o: file1.cxx
<tab> g++ -c file1.cxx
file2.o: file2.cxx
<tab> g++ -c file2.cxx
```
Because some patterns occur repeatedly, make supports suffix rules, which describe how to create targets from certain files.  For example, a suffix rule to compile any Fortran file ending in .f90 would be written
```
.SUFFIXES .f90:

.f90.o:
<tab>gfortran -c $<
```
The `$<` special variable stands for the current target.

Make supports variables.  Normally collected at the top of the Makefile, these are conventionally written in all capitals.
```
F90=gfortran
```
Our suffix rule could then be expressed as
```
.f90.o:
<tab> $(F90) -c $<
```
Variables make it easy to

# Make on the HPC system
Users who write their own code and need to generate a Makefile can start with the makemake script.  It is local to the HPC system and should automatically be in the path so it is sufficient to type
```
makemake
```
This will create a skeleton Makefile.  The user must at minimum assign a value to the PROG variable
```
PROG=myexec
```
Usually it will also be necessary to change the compiler names to that actually used, especially for Fortran programs.

The version of makemake installed on the HPC system attempts to create a Makefile valid for C, C++, and Fortran programs.  Any lines in the Makefile not pertinent to the user's application (such as C++ for a Fortran program or vice versa) may be deleted.

It is important to note that makemake is not intelligent.  It simply collects all files it finds in a directory that end in the suffices .f, .f90, .c, .cxx, and a few others.  Any of those files that are not compilable, for example because they are included into another source file, must be removed from the SRCS and OBJS lists.

The makemake script also creates a special target, called a dummy, `clean`.  Typing `make clean` removes the executable and all object (.o) files, as well as any .mod files for Fortran.

Users should `make clean` every time compiler options are changed.

# Special note for Fortran Programs
Modern Fortran programs typically use modules.  Make is not very good at determining correct dependency chains with modules and may not rebuild when modules are changed.  If this happens it will be necessary to `make clean` when module files are altered.
