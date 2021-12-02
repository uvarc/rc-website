+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "chemistry"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "mpi",
]
draft = false
modulename = "abinit"
softwarename = "Abinit"
title = "Abinit on Rivanna"
author = "RC Staff"
+++

# Description
{{< module-description >}}

<br>
**Software Category:** {{< module-category >}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# Build Your Own Version
Users may build their own versions of {{% software-name %}} if they wish to use a different compiler/MPI combination. Instructions are available on the [{{% software-name %}} website]({{< module-homepage >}}). If using the Intel compiler, you need to add the `-heap-arrays` flag to the Fortran compiler options.

# Slurm Script Example
To run {{% software-name %}} on Rivanna, a script similar to the following can be used. {{% software-name %}} has many options so only a basic example is shown.

```
#!/bin/bash
#SBATCH --job-name=abinit
#SBATCH -N 5
#SBATCH --mem-per-cpu=6000
#SBATCH --ntasks-per-node=20
#SBATCH -t 10:00:00
#SBATCH -p parallel
#SBATCH -A mygroup

module purge
module load intel/16.0 openmpi/2.1.1 abinit/8.2.2

# assumes that the textfile “files” is present in the current directory
# pseudopotentials need to be in directory as defined in “files"

srun abinit <files>& gw-$SLURM_JOBID.log
```
<br>
For this example, the text file `files` has the following content:
```
gw.in
gw.out
gwi
gwo
gwt
../pseudo/sc-sg15.oncvpsp.psp8
../pseudo/se-sg15.oncvpsp.psp8
../pseudo/mo-sg15.oncvpsp.psp8
../pseudo/w-sg15.oncvpsp.psp8
```
