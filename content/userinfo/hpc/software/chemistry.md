+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2024-01-02T00:00:00-05:00"
tags = ["chem"
]
draft = false
shorttitle = "Chemistry"
title = "Chemistry and UVA HPC"
description = "Chemistry Software in the HPC environment"
author = "RC Staff"

+++
# Overview
Many popular software packages for computational chemistry are available on Rivanna and Afton.

# General considerations
Most computational chemistry packages utilize MPI for parallel execution.  Accordingly, the Slurm job scripts should contain the following two SBATCH directives:
```
#SBATCH -N <M>                  # request M nodes (replace with a number)
#SBATCH --ntasks-per-node=<L>   # request L MPI processes per node
```
You should launch your program with `srun` as the MPI executor, for example for Quantum Espresso
```
srun pw.x -in mymol.in
```
Please see the page of the particular package you wish to use for more details.

**VASP Users**
The Vienna Ab-Initio Simulation Package, is licensed by individual groups and we do not have a common installation.  We have basic instructions for building VASP on the HPC system at its page.


# Available Chemistry Software

To get an up-to-date list of the installed chemistry applications, log on to UVA HPC and run the following command in a terminal window:
```
module keyword chem
```

To get more information about a specific module version, run the module spider command, for example:
```
module spider quantumespresso
```

<br>

**List of Chemistry Software Modules**

{{< rivanna-software moduleclasses="chem" >}}

# Using a Specific Software Module

To use a specific software package, run the `module load` command. The `module load` command in itself does not execute any of the programs but only prepares the environment, i.e. it sets up variables needed to run specific applications and find libraries provided by the module.

After loading a module, you are ready to run the application(s) provided by the module. **For example:**
```
module load intel quantumespresso
```
