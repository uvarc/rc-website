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

<p class="lead">The <code>lmod</code> modules system on the HPC system enables users to easily set their environments for selected software and to choose versions if appropriate.</p>
<p class="lead">The <code>lmod</code> system is hierarchical; not every module is available in every environment.  We provide a core environment which contains most of the software installed by Research Computing staff, but software that requires a compiler or MPI is not in that environment and a compiler must first be loaded.</p>

{{< button button-class="primary" button-text="View All Modules" button-url="/userinfo/hpc/software/complete-list/" >}}


- - -

# Basic Commands
**List all available software**

{{< code-snippet >}}
module avail
{{< /code-snippet >}}

Use `key` to list all modules in a particular category.  The current choices are

{{< code-snippet nobutton >}}
base, bio, cae, chem, compiler, data, debugger, devel, geo, ide, lang, lib, math, mpi, numlib, perf, phys, system, toolchain, tools, vis, licensed
{{< /code-snippet >}}

Example:

{{< code-snippet >}}
module key bio
{{< /code-snippet >}}

**Load the environment for a particular package**

{{< code-snippet >}}
module load thepackage
{{< /code-snippet >}}

If you do not specify a version, the system default is loaded.  For example, to load the default version of our Python distribution, run

{{< code-snippet >}}
module load miniforge
{{< /code-snippet >}}

If you do not wish to use the default version chosen by the module's environment, you must specify the version explicitly. For example, to select a version of the gcc compiler suite that is different from the default:

{{< code-snippet >}}
module load gcc/13.3.0
{{< /code-snippet >}}

Note that the 'default' version of a module may change, so if you are developing applications yourself we highly recommend that you load explicit versions of modules; that is, do not invoke the default package, but specify a version.  If the version is eventually dropped for newer versions, loading the module will fail, which will make you aware that you will need to update your application appropriately.

**Remove a module**

{{< code-snippet >}}
module unload thepackage
{{< /code-snippet >}}

**List all modules you have loaded in the current shell**

{{< code-snippet >}}
module list
{{< /code-snippet >}}

**Change from one version to another**

{{< code-snippet >}}
module swap
{{< /code-snippet >}}

For example, if you have loaded gcc/11.4.0 and you wish to switch to intel/2023.1

{{< code-snippet >}}
module swap gcc/11.4.0 intel/2023.1
{{< /code-snippet >}}

This will unload the `gcc/11.4.0` environment entirely, and load the `intel/2023.1` environment. 

**Clear all modules you have loaded**

```
module purge
```

**Finding prerequisites**

Use "module spider" to find all possible modules.  Once you determine the name of the software you want to use, spider will also show you all available versions.

```
module spider

module spider hdf5
```

Note that spider will sometimes show modules whose version numbers begin with a period, e.g. icc/.17.0.  Any such module is “hidden” and users should not be required to load them explicitly.

For many applications, you will need to load one or more prerequisites. For example, to find out how to load a specific R version, run

```
module spider R/version
```
where you must replace "version" with the value.  At one particular time, module spider shows us that the following R versions are available:

```
module spider R

----------------------------------------------------------------------------
  R:
----------------------------------------------------------------------------
    Description:
      R is a free software environment for statistical computing and
      graphics.

     Versions:
        R/3.2.1
        R/3.4.4
        R/3.5.3
        R/3.6.3
        R/4.0.0
```
If we wish to determine how to run R 3.6.3 we run module spider for it
```
module spider R/3.6.3

----------------------------------------------------------------------------
  R: R/3.6.3
----------------------------------------------------------------------------
    Description:
      R is a free software environment for statistical computing and
      graphics.


    You will need to load all module(s) on any one of the lines below before the
 "R/3.6.3" module is available to load.

      gcc/7.1.0  openmpi/3.1.4
      intel/18.0  intelmpi/18.0
```
This shows that two versions of R 3.6.3 are available, one built with the gcc compiler and one built with the Intel compiler suite.  We must choose *one* of those.  We'll select the gcc version.

```
module load gcc/7.1.0
module load openmpi/3.1.4
module load R/3.6.3
```

More about these commands can be found in [the documentation](https://lmod.readthedocs.io/en/latest/).

- - -
# Modules Best Practices
Whenever several modules are loaded at the same time, there is the potential for modules to conflict with one another. Conflicting modules can cause code dependent on these modules to not work. Here are some ways to commit to best practices when using modules:

**Start with a clean slate**

`module purge` before beginning your workflow. If you need to switch what you are doing within the current session, like changing from working in Python to R, purge and load your new modules so there is no chance for conflicts.

**Know what you are loading**

When loading modules, it is best to specify what version you are using instead of using the default. If you commit to using the default option each time, you may miss when our default changes and load modules that are no longer compatible with your workflow. Use `module spider` to see what versions of each module we offer.

**Advanced Usage**

If you are consistently loading the same modules on startup, you might find it convenient to load your modules using your .bashrc file. This is **NOT** within best practices. Interactive apps like Jupyter Labs and RStudio automatically load some modules that they are dependent on. Your .bashrc file still executes on startup within those settings, thus leading to potential conflicts.

A better way to load modules efficiently is to use a bash script. Writing a bash script that will load all your necessary modules with an aliased command falls more within best practices than filling your .bashrc file. Whenever you need to switch to a new workflow, module purge then execute your other script. Remember to change your scripts whenever we offer different versions of the modules that you use so your scripts are not out of date.

- - -
# Modules in Job Scripts
After the definition of job variables, and before the command line to run the program, add `module load` lines for every application that you want included in your run environment.  Although it is not required, we also recommend that you clear your module environment before your job starts executing.  For example, to run R version 3.6.3 in the module environment described above, your job script should resemble the following:

```
#!/bin/bash
#SBATCH -p standard
#SBATCH -A MyAcct
#SBATCH -n 1
#SBATCH --time=00:10:00
#SBATCH --mem-per-cpu=4000

module purge
module load gcc/7.1.0
module load openmpi/3.1.4
module load R/3.6.3

Rscript myScript.R
```

Please contact us if you encounter any problems using these applications in your job scripts.

- - -
# Creating Your Own Modules
If you install your own software, you can create your own modules stored in your home directories.  This is not necessary; you can also add the path to your `.bashrc` file or write a script or just provide the path.  But it may be convenient to have a custom module.

The first step is to create a directory to store the modulefiles used by `lmod`.

{{< code-snippet >}}
mkdir $HOME/modulefiles
{{< /code-snippet >}}

Next, download the software package for which you would like to create a module. Carefully follow the instructions to install your software.  Remember that most packages assume you can install as an administrator, and that is not permitted on the HPC system, so you must change your installation directory.  If you are compiling software you can find a tutorial at our [training site](https://learning.rc.virginia.edu/tutorials/building-running-c-cpp-fortran/).

In the following example we are installing a version of `git` according to its instructions:

```
$ wget https://www.kernel.org/pub/software/scm/git/git-2.6.2.tar.gz
$ tar xf git-2.6.2.tar.gz
$ cd git-2.6.2
$ ./configure --prefix=$HOME/git/2.6.2
$ make
$ make install
```

Once the software has been installed, a modulefile (written in the Lua programming language) must be created. The modulefile should be placed in a subdirectory named after the software and the file should be named using the version number of the software. Any text editor of your choice may be used.  The modulefile in this example adds `~/git/2.6.2/bin` to the user's path so that the personal version of `git` can be found.

```
$ cd ~/modulefiles
$ mkdir git
$ cd git
```

Use an editor to create the following file and name it `2.6.2.lua`

```
local home    = os.getenv("HOME")
local version = myModuleVersion()
local pkgName = myModuleName()
local pkg     = pathJoin(home,pkgName,version,"bin")
prepend_path("PATH", pkg)
```

The first line reads the user’s HOME directory from the environment. The second line uses the “pathJoin” function provided from Lmod. It joins strings together with the appropriate number of “/”. The last line calls the “prepend_path” function to add the path to this version of git at the beginning of the user’s path.

Finally, to use the module:

```
$ module use $HOME/modulefiles
$ module load git
$ which git
~/git/2.6.2/bin/git
```

- - -
# Finding Modules with the Same Name

If the user has created a module and at a later date the system provides a newer version, the default behavior if no version is specified to the `module load` command is to use the highest version available in all module paths searched.

```
$ module avail git

----------------------------- /home/mst3k/modules ------------------------------
git/2.6.2

--------------- /apps/modulefiles/standard/core ------------------------
git/1.7.4   git/2.0.1   git/3.5.4 (D)

$ module load git
```

The `module load` command will load `git/3.5.4` because it is the highest version.
More about user created modules can be found in [the documentation](https://lmod.readthedocs.io/en/latest/020_advanced.html).
