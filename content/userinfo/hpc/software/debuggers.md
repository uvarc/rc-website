+++
type = "rivanna"
date = "2020-03-10T12:51:46-05:00"
tags = [
  "rivanna", "software", "compiler", "debuggers", "profilers"
]
draft = false
title = "Debuggers and Profilers"
description = "Debuggers and Profilers on Rivanna"
author = "RC Staff"

+++

# Debuggers

To use a debugger, it is necessary to rebuild your code with the `-g` flag added.  All object files must be removed anytime compiler flags change.  If you have a Makefile run `make clean` if it is available.  The program must then be run under the _control_ of the debugger.  For example, if you are using gdb, you run
```
gdb ./myexec
```

Adding debugging flags generally disables any optimization flags you may have added, and can slow down the code.  Please remember to recompile with `-g` removed once you have found your bugs.

## Gnu Debugger (gdb) and Profiler (gprof)
The [Gnu Compiler Collection](https://gcc.gnu.org) compilers are free, open-source tools. Additional tools included are the gdb debugger and the gprof performance profiler. For detailed documentation, visit the [Gnu](https://gcc.gnu.org/onlinedocs/) website.

The gdb and gprof tools are included with the gcc compiler suite and are loaded with the gcc module.

```
module load gcc
```

Both gdb and gprof are text-based, command-line tools.  

{{< module-versions module="gcc" >}}

## Intel 

To load the Intel compilers and associated tools, run
```
module load intel
```
The Intel debugger for versions 16.0 and beyond is a modified `gdb` and is used in a similar manner. After the Intel module is loaded, it can be accessed as `gdb-ia`.

<br>
**Available Intel Compilers**

{{< module-versions module="intel" >}}

## PGI Compiler
The PGI Server Compilers and tools are licensed for Linux systems.
```
module load pgi
```
<br>
**Available PGI and NVIDIA Compilers**

{{< module-versions module="pgi" >}}

PGI provides a very capable debugger, `pgdbg`. In its default mode, it is graphical, and it requires that an X server run on the user's local desktop machine. It may be run in command-line mode with the `-text` option; see the manpage for a full list of options. As with all debuggers, the user's program must be compiled with the `-g` flag in order to enable debugging. If you wish to use the graphical debugger and do not have or want to install an X11 server, you can also use FastX. 

{{< module-versions module="nvhpc" >}}

The PGI compiler is transitioning to the NVIDIA HPC SDK tools.  The NVHPC debugger is called `cuda-gdb`.

## Totalview
The most powerful debugger available on Rivanna for OpenMP and MPI codes is [Totalview](/userinfo/rivanna/software/totalview).  It is also an excellent general-purpose debugger.  It has a command line interface but is not easy to use in that mode; it is nearly always used through its graphical user interface, which is highly intuitive.  For short runs with few processes it can be used on a frontend through [FastX](/userinfo/rivanna/logintools/fastx); longer or otherwise more demanding debugging runs can occur by running an Open OnDemand [Desktop](/userinfo/rivanna/ood/desktop).

## Valgrind
[Valgrind](https://valgrind.org) is a framework for dynamic analysis tools. The most widely used tool is probably `memcheck` for detecting memory leaks. Build your code as usual with `-g`, then run it as
```
valgrind --leak-check=yes ./myprog arg1 arg2 > valgrind.out
```
The output from memcheck can be voluminous.  Running under memcheck will also be much slower than a normal run and can require more memory.

# Profilers

Profilers are tools for locating areas where the code can be sped up.  Most profilers function by interrupting the code frequently and randomly, determining what subprogram is executing, and counting the time required for a subprogram to execute, how many times it is called, and so forth.

## Gnu Profiler (gprof)

The Gnu profiler is a command-line, text-oriented tool.  The code must be recompiled with `-g -p` flags.  Run the code and usual.  This will produce a binary file called `gmon` by default.  Then run the profiler
```
gprof > gprof.out
```

## Intel Tools

### VTune Profiler

VTune is a powerful profiler for code built with Intel compilers.  A getting-started guide is available from [Intel](https://software.intel.com/en-us/get-started-with-vtune-linux-os).

### Intel Trace Analyzer

The Intel Trace Analyzer, which is focused on MPI codes, is included with our Intel compiler licenses.  Intel provides a tutorial [here](https://software.intel.com/en-us/get-started-with-itac-for-linux).  Some modifications are needed to run under Slurm.  Add a flag `-bootstrap=slurm` to the mpirun commmand, and use `-n $SLURM_NTASKS} rather than hard-coding a value.  

## Open|SpeedShop

[Open|SpeedShop](https://openspeedshop.org) is a profiler capable of operating in several different modes, for different "experiments." Unlike many profilers, it requires that only the `-g` flag be enabled.

# Building on Rivanna
For general information about building your code on Rivanna, please see our [howto](/userinfo/howtos/rivanna/compiler-howto)
