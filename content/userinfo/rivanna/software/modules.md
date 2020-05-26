+++
type = "rivanna"
date = "2019-04-23T08:37:46-05:00"
tags = [
  "rivanna",
  "lmod",
  "software",
  "hpc"
]
draft = false
title = "Software Modules"
description = "Software Modules"
author = "RC Staff"
categories = ["userinfo"]

+++

<p class="lead">The <code>lmod</code> modules system on Rivanna enables users to easily set their environments for selected software and to choose versions if appropriate.</p>
<p class="lead">The <code>lmod</code> system is hierarchical; not every module is available in every environment.  We provide a core environment which contains most of the software installed by Research Computing staff, but software that requires a compiler or MPI is not in that environment and a compiler must first be loaded.</p>

<a href="/userinfo/rivanna/software/complete-list/"><button class="btn btn-primary"">View All Modules</button></a> &nbsp;

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

If a version is specified to `spider`, it will indicate how to load that version.

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
This will unload the `gcc/7.1.0` environment entirely, and load the `intel/17.0` environment. 

To clear all modules you have loaded and return to the default state:

```
module purge
```
More about these commands can be found in [the documentation](https://lmod.readthedocs.io/en/latest/).

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

- - -
# Creating Your Own Modules
Rivanna users may create their own modules stored in their home directories.  The first step is to create a directory to store the modulefiles used by `lmod`.

```
mkdir $HOME/modulefiles
```

Next, download the software package for which you would like to create a module.  When configuring for build, make sure that the prefix is set to `--prefix=$HOME/pkg/<software name>/<software version>`. This documentation demonstrates creating a module for `git 2.6.2` as an example

```
$ wget https://www.kernel.org/pub/software/scm/git/git-2.6.2.tar.gz
$ tar xf git-2.6.2.tar.gz
$ cd git-2.6.2
$ ./configure --prefix=$HOME/pkg/git/2.6.2
$ make
$ make install
```

Once the software has been built and installed, a modulefile (written in the Lua programming language) needs to be created that contains information about where to find the software.  The modulefile should be placed in a directory named after the software and the file should be named using the version number of the software. Any text editor of your choice may be used, but this example show the use of the `cat` utility to create the lua file.  The modulefile in this example adds `~/pkg/git/2.6.2/bin` to the user's path so that the personal version of `git` can be found.

```
$ cd ~/modulefiles
$ mkdir git
$ cd git
$ cat > 2.6.2.lua
local home    = os.getenv("HOME")
local version = myModuleVersion()
local pkgName = myModuleName()
local pkg     = pathJoin(home,"pkg",pkgName,version,"bin")
prepend_path("PATH", pkg)
^D

```

The first line reads the user’s HOME directory from the environment. The second line uses the “pathJoin” function provided from Lmod. It joins strings together with the appropriate number of “/”. The last line calls the “prepend_path” function to add the path to git to the user’s path.

Finally, to use the module:

```
$ module use $HOME/modulefiles
$ module load git
$ type git
~/pkg/git/2.6.2/bin/git
```

## Finding Modules with the Same Name
If the user has created a module and at a later date the system provides a newer version, the default behavior if no version is specified to the `module load` command is to use the highest version available.

```
$ module avail git
--------------- /home/user/modulefiles ----------------
git/2.6.2

--------------- /opt/apps/modulefiles ----------------
git/1.7.4   git/2.0.1   git/3.5.4 (D)

$ module load git
```

The `module load` command will load `git/3.5.4` because it is the highest version.
More about user created modules can be found in [the documentation](https://lmod.readthedocs.io/en/latest/020_advanced.html).
