+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "debugger"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
  "mpi",
  "programming"
]
draft = false
modulename = "totalview"
softwarename = "TotalView"
title = "Code Debugging on Rivanna"
author = "RC Staff"
+++

# TotalView
TotalView is a full-featured, source-level, graphical debugger for applications written in C, C++, Fortran (77 and 90/95/2003), assembler, and mixed source/assembler codes. It is a multiprocess, multithread debugger that supports multiple parallel programming paradigms including MP and OpenMP. The University has a near-site license (256 tokens) for Totalview on all versions of Linux. Visit the [TotalView website]({{< module-homepage >}}) for detailed documentation.

# Getting started with TotalView.
Your code must be compiled appropriately to use Totalview. For most Unix compilers, the debug flag `-g` must be added to the compilation options, just as it would be for other debuggers such as gdb. Optimization should also generally be suppressed, since optimization can change the code in ways that make it difficult for the debugger to interpret. Once the code has been recompiled and an executable generated, you are ready to invoke Totalview.

To start TotalView, execute the following command:
```
module load totalview
totalview
```

Totalview is normally used with its X11-based graphical user interface and to use it directly, you must have an X server running on your local system or use [FastX](/userinfo/rivanna/logintools/fastx). Computers running Linux will automatically have an X server available.

* On Mac OS X you will need to install `XQuartz`.
* Windows users must also install an X server; we recommend `XminGW`.

The recommended way to run X applications remotely is to enable X11 port forwarding in your ssh client (SecureCRT, PuTTY, etc.) and run the X server in the background (passively). Another option is the [FastX client](/userinfo/rivanna/logintools/fastx) which can be installed on the user's local system to open a desktop on the cluster frontend.

# Using Totalview to Debug MPI Codes
One of the most powerful features of Totalview is its ability to debug parallel codes.

# Using the Client on the Nodes
If you have a long debugging job or you want to debug an MPI application, you should run an interactive job using SLURM.  The `ijob` command is most appropriate for this task.  

# Using the Debugger Through FastX
You can use TotalView via FastX. If your debugging work is sufficiently small to run on the frontend, start TotalView like any other X11 application from the command line:
```
module load totalview
totalview &
```
Otherwise please see the FastX documentation to start an `ijob` with graphical capabilities.
