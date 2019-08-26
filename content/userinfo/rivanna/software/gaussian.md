+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "chem"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
  "mpi"
]
draft = false
modulename = "gaussian"
softwarename = "Gaussian"
title = "Gaussian on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions and learn how to load them, run:
<pre>module spider {{% module-name %}}</pre>

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
<pre>module spider {{% module-firstversion %}}</pre>

{{% module-versions %}}

# GaussView
The GaussView graphical interface is available on Rivanna.  Users must log in through a client capable of displaying X11 graphics.  We recommend [FastX Web](/userinfo/rivanna/logintools/fastx).  GaussView can be used to create input files for Gaussian jobs which should then be submitted to the compute nodes.  To start GaussView, in an X11-enabled terminal first load the gaussian module as above, then run
```
gview &
```
The ampersand (&) returns the terminal to input mode while GaussView is running.  Most use of GaussView will probably fit within the limits for frontend interactive use, but for very long or large GV jobs, please submit an ijob (interactive job).

# Single-Core SLURM Script
This is a SLURM job command file to run a Gaussian 16 batch job. In this example, the Gaussian 16 input is in the file `h2o.com`.  If no output file is specified, it will go to `h2o.log`.  The script assumes it will be submitted from the user's `/scratch` directory and the input file is in the same directory.  Gaussian also tends to use a lot of memory, so we make sure to request the amount per core that is available.  We pass that to g16 with the `-m` flag.  Be sure the value is less than or equal to what you request from SLURM.
```
#!/bin/bash
#SBATCH --tasks=1
#SBATCH -t 160:00:00
#SBATCH -p standard
#SBATCH --mem=6000
#SBATCH -A mygroup

module load gaussian/g16

# Define Gaussian scratch directory as compute node scratch space.
# It's best to use a separate directory for each job.
export GAUSS_SCRDIR=/scratch/$USER/$SLURM_JOBID
mkdir $GAUSS_SCRDIR

g16 -m=6gb h2o.com
```

# Multicore Gaussian Job
By default, Gaussian runs on a single core.  However, many jobs can efficiently utilize more than one core on a node.  See the Gaussian documentation for their recommendations.  Not all jobs will scale at all, and some will scale only to a limited number of cores, so it's important to run tests and track the speedup for multicore jobs, so as not to waste resources or service units.

The Gaussian documentation on multicore jobs contains instructions to specify core numbers and they are moving to this system, away from users specifying the number of cores.  However, on a resource-managed system the user **must not** specify core numbers, since these are assigned by SLURM.  Gaussian 16 still provides an option to request a particular number of cores.  The safest way in a resource-managed environment is to use the command-line option with a SLURM environment variable.
```
#!/bin/bash
#SBATCH --nodes=1
#SBATCH -c 8
#SBATCH -t 160:00:00
#SBATCH -p standard
#SBATCH --mem=48000
#SBATCH -A mygroup

module load gaussian/g16

# Define Gaussian scratch directory as compute node scratch space.
# It's best to use a separate directory for each job.
export GAUSS_SCRDIR=/scratch/$USER/$SLURM_JOBID
mkdir $GAUSS_SCRDIR

#Stop OpenMP from interfering with Gaussian's thread mechanism.
export OMP_NUM_THREADS=1

g16 -m=48gb -p=${SLURM_CPUS_PER_TASK} h2o.com
```

# Multinode Computations with Linda
A few types of computation can make effective use of more than one node through Gaussian's Linda parallel execution system.  The Gaussian documentation states that "HF, CIS=Direct, and DFT calculations are Linda parallel, including energies, optimizations, and frequencies. TDDFT energies and gradients and MP2 energies and gradients are also Linda parallel. Portions of MP2 frequency and CCSD calculations are Linda parallel."

Only a few very large scale computations should need to use Linda.  If your code does not scale well past a small number of threads, you may be able to use multiple nodes to increase the effective number of processes.  Some jobs may also scale acceptably beyond 20 cores and so will benefit from Linda.  Linda requires that your processes be able to ssh between nodes and you must specify ssh in the Link 0 section of your description file with

```
#UseSSH
```
To request permission for internode ssh, please [contact us](/support).

Linda does not utilize the high-speed Infiniband network, so it is best to use one Linda worker per node.  You specify the node list using information from SLURM, then use a cpus-per-task directive as for the multicore case above.
```
#!/bin/bash
#SBATCH --nodes=2
#SBATCH -c 20
#SBATCH -t 48:00:00
#SBATCH -p parallel
#SBATCH --mem=120000
#SBATCH -A mygroup

module load gaussian/g16

# Define Gaussian scratch directory as compute node scratch space.
# It's best to use a separate directory for each job.

export GAUSS_SCRDIR=/scratch/$USER/$SLURM_JOBID
mkdir $GAUSS_SCRDIR

#Stop OpenMP from interfering with Gaussian's thread mechanism.
export OMP_NUM_THREADS=1
for n in `scontrol show hostname | sort -u`; do
  echo ${n}
done | paste -s -d, > snodes.$SLURM_JOBID

g16 -m=100gb -p=${SLURM_CPUS_PER_TASK} -w=`cat snodes.$SLURM_JOBID` h2o.com
#Clean up
rm snodes.$SLURM_JOBID
```
