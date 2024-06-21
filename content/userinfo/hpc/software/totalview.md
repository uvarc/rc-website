+++
type = "rivanna"
categories = [
  "HPC",
  "software"
]
date = "2021-06-04T08:37:46-05:00"
tags = [
  "debugger",
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

# Getting started with TotalView.
Your code must be compiled appropriately to use Totalview. For most Unix compilers, the debug flag `-g` must be added to the compilation options, just as it would be for other debuggers such as gdb. Optimization should also generally be suppressed, since optimization can change the code in ways that make it difficult for the debugger to interpret. Once the code has been recompiled and an executable generated, you are ready to invoke Totalview.

To start TotalView, execute the following command:
```
module load totalview
totalview
```

Totalview is normally used with its X11-based graphical user interface and to use it directly, you must have an X server running on your local system or use [FastX](/userinfo/hpc/logintools/fastx). Computers running Linux will automatically have an X server available.

* On Mac OS X you will need to install `XQuartz`.
* Windows users must also install an X server; we recommend `XminGW`.

The recommended way to run X applications remotely is to enable X11 port forwarding in your ssh client (SecureCRT, PuTTY, etc.) and run the X server in the background (passively). Another option is the [FastX client](/userinfo/hpc/logintools/fastx) which can be installed on the user's local system to open a desktop on the cluster frontend.

# Using Totalview to Debug MPI Codes
One of the most powerful features of Totalview is its ability to debug parallel codes.

# Using the Debugger Through FastX
You can use TotalView via FastX. If your debugging work is sufficiently small to run on the frontend, start TotalView like any other X11 application from the command line:
```
module load totalview
totalview &
```

# Using the Client on Compute Nodes
If you have a long debugging job or you want to debug an MPI application, you should run an interactive job through Slurm using the Open OnDemand [Desktop](/userinfo/hpc/ood/desktop) interactive application.  When the Desktop is launched, start a terminal window and type the above commands as usual.
