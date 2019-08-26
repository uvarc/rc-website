+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2019-06-23T08:37:46-05:00"
tags = [
  "lang",
]
draft = false
shorttitle = "R & RStudio"
title = "R and RStudio on Rivanna"
description = "R and RStudio in Rivanna's HPC environment"
author = "RC Staff"

+++

## R

[R]( https://www.r-project.org/) is a programming language that often is used for data analytics, statistical programming, and graphical visualization.


##### Loading the R module
On Rivanna, R is available through our module system.  To load R, simply type:

`
module load gcc R
`

Notice that we included gcc in the load command. There are two reasons why including gcc is important:
1.  R was built with the gcc compiler.  Due to its hierarchical layout, the module system must be told which build of R is needed.
2.  R has many computationally-intensive packages that are built with C, C++, or Fortran. By including gcc, we ensure that the same environment used for building R is loaded for any package installs.

The load command will load a default version of R, unless another version is specified.  For example, you could type:

`
module load gcc R/3.3.0
`

To see the available versions of R, type:

`
module spider R
`

##### Loading the RStudio module

RStudio is a development environment for R.  It also is supported through its own module, but you must load a version of R first. For example, to load and run Rstudio, you could type the following:

```bash
module load gcc R/3.5.1 
module load rstudio 
rstudio & 
```

RStudio is also available through our web-based portal to Rivanna.  For instructions on how to access it, see the [Rstudio Server page](https://arcs.virginia.edu/rstudio-server).  



##### Submitting a Single-Core Job to the Cluster
After you have developed your R program, you can submit it to the compute nodes by using a SLURM job script similar to the following: 

```bash
#!/bin/bash
#SBATCH -n 1
#SBATCH -t 01:00:00
#SBATCH -o results.out
#SBATCH -p standard
#SBATCH -A mygroup

module load gcc R/3.5.1
Rscript myRprog.R
```
This script should be saved in a file, called (for example) job.slurm.  To run your job, you would submit the script by typing:

```bash
sbatch job.slurm
```



##### Submitting Multi-Core Jobs to the Cluster
R programs can be written to use multiple cores on a node.  You will need to ensure that both SLURM and your R code know how many cores it will be using.  To submit a multi-core job to Rivanna, we recommend that the SLURM script be set up in the following way:

```bash
#!/bin/bash
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=10      
#SBATCH -t 00:30:00
#SBATCH -o results.out
#SBATCH -p standard
#SBATCH -A mygroup

module load gcc R
Rscript myRprog.R ${SLURM_CPUS_PER_TASK}
```

In the R code, you will need to read in the number of cores, passed in through the command line:


```R
cmdArgs <- commandArgs(trailingOnly=TRUE)
numCores <- as.integer(cmdArgs[1])
options(mc.cores=numCores) 
```



##### Submitting MPI Jobs to the Cluster

R programs can be distributed across multiple nodes with with MPI (message passing interface) and the appropriate MPI packages.  To run a parallel R job that uses MPI, the SLURM script would be similar to the following:

```bash
#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=10
#SBATCH -t 00:30:00
#SBATCH -o results.out
#SBATCH -p parallel
#SBATCH -A mygroup

module load gcc openmpi R

srun Rscript myRprog.R
```


Contact arcs@virginia.edu for consulting in optimizing and parallelizing your scripts.
