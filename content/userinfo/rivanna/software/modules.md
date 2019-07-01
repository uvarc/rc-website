+++
type = "rivanna"
date = "2019-04-23T08:37:46-05:00"
tags = [
  "rivanna",
]
draft = false
title = "Software Modules"
description = "Software Modules"
author = "RC Staff"

+++

<p class="lead">The <code>lmod</code> modules system on Rivanna enables users to easily set their environments for selected software and to choose versions if appropriate.</p>
<p class="lead">The <code>lmod</code> system is hierarchical; not every module is available in every environment.  We provide a core environment which contains most of the software installed by Research Computing staff, but software that requires a compiler or MPI is not in that environment and a compiler must first be loaded.</p>

- - -

# Basic Commands
List all available software in the core environment:

```
module avail
```

Use "module spider" to find all possible modules.

```
module spider

module spider hdf5
```

If a version is specified to spider, it will indicate how to load that version.

```
module spider openmpi/2.1.1
```

Note that spider will sometimes show modules whose version numbers begin with a period, e.g. icc/.17.0.  Any such module is “hidden” and users should not be required to load them explicitly.

Use `key` to list all modules in a particular category.  The current choices are

```
base, bio, cae, chem, compiler, data, debugger, devel, geo, ide, lang, lib, math, mpi, numlib, perf, phys, system, toolchain, tools, vis, licensed
```

Example:

```
module key bio
```

Load the environment for a particular package:

```
module load thepackage
```

If you do not specify a version, the system default is loaded.  For example, to load the default version of R, run

```
module load R
```
If you do not wish to use the default version chosen by the modules environment, you may specify a path to the module script. For example, to select the older version of R

```
module load R/3.3.0
```
Note that the 'default' version of a module may change, so if you are developing applications yourself we highly recommend that you load explicit versions of modules; that is, do not invoke the default X, but specify a version.  If the package is upgraded, loading that module will fail, however.

Delete a module:

```
module unload thepackage
```
List all modules you have loaded in the current shell:

```
module list
```

To change from one version to another, use

```
module swap
```
For example, if you have loaded gcc/7.1.0 and you wish to switch to intel/17.0

```
module swap gcc/7.1.0 intel/17.0
```
This will unload the gcc/7.1.0 environment entirely, and load the intel/17.0 environment. 

To clear all modules you have loaded and return to the default state:

```
module purge
```
More about these commands can be found in the documentation.

- - -
# Modules in Job Scripts
After the definition of job variables, and before the command line to run the program, add module load X lines for every application that you want included in your run environment. For example, to run R version 3.3.0 your job script should resemble the following:

```
#!/bin/bash
#SBATCH -p standard
#SBATCH -A MyAcct
#SBATCH -n 1
#SBATCH --time=00:10:00
#SBATCH --mem-per-cpu=4000

module load R/3.3.0

Rscript myScript.R
```

Please contact us if you encounter any problems using these applications in your job scripts.
