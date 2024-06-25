+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2023-12-20T00:00:00-05:00"
tags = [
  "lang",
  "programming",
]
draft = false
modulename = "R"
softwarename = "R"
shorttitle = "R & RStudio"
title = "R and RStudio and UVA HPC"
description = "R and RStudio in the HPC environment"
author = "RC Staff"
+++

# Overview

[R](https://www.r-project.org/) is a programming language that often is used for data analytics, statistical programming, and graphical visualization.

# Loading the R module
On the UVA HPC system, R is available through our module system.  For example, to load R, you can type:

```
module load goolf R
```

Notice that we included `goolf` in the load command. There are two reasons why including `goolf` is important:

1. R was built with a compiler, an interface to OpenMPI, and other utilities.  The `goolf` module will ensure that each of these items is loaded.

2. R has many computationally-intensive packages that are built with C, C++, or Fortran. By including goolf, we ensure that the same environment used for building R is loaded for any package installs.

The load command will load a default version of R, unless another version is specified.

To see the available versions of R, type:

```
module spider R
```


# Loading the RStudio module

RStudio is a development environment for R. We recommend launching RStudio through our web-based portal to the HPC system. For instructions on how to access it, see [RStudio Server on the HPC system](/userinfo/hpc/software/rstudio/).

For users who must launch RStudio from the commandline, start up a FastX or Open OnDemand Desktop session and run `rstudio-launcher` in the terminal. Then follow the instructions.

To use your local R packages in RStudio, run:
```
echo "R_LIBS_USER=~/R/goolf/x.y" > ~/.Renviron
```
where `x.y` is the major-minor version, e.g. `4.3`.

# Installing packages

Due to the amount and variability of packages available for R, Research Computing does not maintain R packages beyond the very basic.  If you need a package, you can install it in your account, using a local library.  For example, to install `BiocManager`, you can type:

```
$ module load goolf R
$ R
   .
   .
   .
> install.packages('BiocManager')

```

If the R interpreter prompts you about creating a local library, type `yes`.  If it asks you to select a CRAN mirror, scroll down the list it provides and select one of the US sites.

Or, you can launch RStudio and install the packages as you would on your laptop.


# Submitting a Single-Core Job to the Cluster

After you have developed your R program, you can submit it to the compute nodes by using a Slurm job script similar to the following: 

{{< pull-code file="/static/scripts/r_job.slurm" lang="no-hightlight" >}}

This script should be saved in a file, called (for example) r_job.slurm.  To run your job, you would submit the script by typing:

```
sbatch job.slurm
```

# Submitting Multi-Core Jobs to the Cluster
R programs can be written to use multiple cores on a node.  You will need to ensure that both Slurm and your R code know how many cores they will be using.  In the Slurm script, we recommend using `--cpus-per-task` to specify the number of cores.  For example:

{{< pull-code file="/static/scripts/r_multicore.slurm" lang="no-hightlight" >}}

For the R code, the number of cores can be passed in with a command-line argument, as shown in the above example with ${SLURM_CPUS_PER_TASK}.  The code will need to be designed to read in the command-line argument and establish the number of available cores.  For example:

```
cmdArgs <- commandArgs(trailingOnly=TRUE)
numCores <- as.integer(cmdArgs[1]) - 1
options(mc.cores=numCores)
```
Or, you if you do not want to use command-line arguments, you can use the function `Sys.getenv()` in the R code.  For example:

```
numCores <- as.integer(Sys.getenv("SLURM_CPUS_PER_TASK")) - 1
options(mc.cores=numCores)

```

Do not use the `detectCores()` function, which is often shown in tutorial examples.  It will detect the number of physical cores -- not how many core Slurm is allowing the program to use.


# Submitting MPI Jobs to the Cluster

R programs can be distributed across multiple nodes with MPI (message passing interface) and the appropriate MPI packages.  To run a parallel R job that uses MPI, the Slurm script would be similar to the following:

{{< pull-code file="/static/scripts/r_mpi.slurm" lang="no-hightlight" >}}

The items to notice in this script are 

i)   the number of nodes; 

ii)  the number of tasks; 

iii) the parallel partition; and 

iv)  the `srun` before the command to run the R code.



If you have questions about running your R code on the HPC system or would like a consultation to optimize or parallelize your code, contact hpc-support@virginia.edu.
