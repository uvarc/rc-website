+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2024-01-02T00:00:00-05:00"
tags = [
  "chem",
  "multi-core",
  "mpi"
]
draft = false
modulename = "gaussian"
softwarename = "Gaussian"
title = "Gaussian and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

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

# License and Permission
We have a site license. Please contact us if you need access to the software. (Non-PIs should ask their PI to send in the request.)

For research, please load `gaussian`. For course work, please load `gaussian/grads16`.

# GaussView
The GaussView graphical interface is available on the UVA HPC system.  Users must log in through a client capable of displaying X11 graphics.  We recommend the Desktop session through [Open OnDemand](/userinfo/hpc/ood/overview).  GaussView can be used to create input files for Gaussian jobs which should then be submitted to the compute nodes.  To start GaussView, in an X11-enabled terminal first load the gaussian module as above, then run
```
gview &
```
The ampersand (&) returns the terminal to input mode while GaussView is running. 

Note: If the above command launches a text editor instead of GaussView, either you have not been granted access or your `PATH` is incorrectly configured. In either case, please run the following commands and send us the output:

```bash
groups
# if "gaussian" is not present in the output:
#   - if you are the PI, please contact us for access
#   - if you are not the PI, please ask your PI to request access for you
#   - no need to execute the remaining commands

module load gaussian # or gaussian/grads16, see explanation in previous section
which g16 gview
hostname
```

# Single-Core Slurm Script
This is a Slurm job command file to run a Gaussian 16 batch job. In this example, the Gaussian 16 input is in the file `h2o.com`.  If no output file is specified, it will go to `h2o.log`.  The script assumes it will be submitted from the user's `/scratch` directory and the input file is in the same directory.  Gaussian also tends to use a lot of memory, so we make sure to request the amount per core that is available.  We pass that to g16 with the `-m` flag.  Be sure the value is less than or equal to what you request from Slurm.

{{< pull-code file="/static/scripts/gaussian_serial.slurm" lang="no-hightlight" >}}

# Multicore Gaussian Job
By default, Gaussian runs on a single core.  However, many jobs can efficiently utilize more than one core on a node.  See the Gaussian documentation for their recommendations.  Not all jobs will scale at all, and some will scale only to a limited number of cores, so it's important to run tests and track the speedup for multicore jobs, so as not to waste resources or service units.

The Gaussian documentation on multicore jobs contains instructions to specify core numbers and they are moving to this system, away from users specifying the number of cores.  However, on a resource-managed system the user **must not** specify core numbers, since these are assigned by Slurm.  Gaussian 16 still provides an option to request a particular number of cores.  The safest way in a resource-managed environment is to use the command-line option with a Slurm environment variable.

{{< pull-code file="/static/scripts/gaussian_multicore.slurm" lang="no-hightlight" >}}

# Multinode Computations with Linda
A few types of computation can make effective use of more than one node through Gaussian's Linda parallel execution system.  The Gaussian documentation states that "HF, CIS=Direct, and DFT calculations are Linda parallel, including energies, optimizations, and frequencies. TDDFT energies and gradients and MP2 energies and gradients are also Linda parallel. Portions of MP2 frequency and CCSD calculations are Linda parallel."

Only a few very large scale computations should need to use Linda.  If your code does not scale well past a small number of threads, you may be able to use multiple nodes to increase the effective number of processes.  Some jobs may also scale acceptably beyond 20 cores and so will benefit from Linda.  Linda requires that your processes be able to ssh between nodes and you must specify ssh in the Link 0 section of your description file with

```
#UseSSH
```
To request permission for internode ssh, please [contact us](/support).

Linda does not utilize the high-speed Infiniband network, so it is best to use one Linda worker per node.  You specify the node list using information from Slurm, then use a cpus-per-task directive as for the multicore case above.

{{< pull-code file="/static/scripts/gaussian_multinode.slurm" lang="no-hightlight" >}}

# galloc: could not allocate memory
According to [here](https://docs.computecanada.ca/wiki/Gaussian_error_messages#galloc:_could_not_allocate_memory):

**Explanation of error**

This is a memory allocation error due to lack of memory. Gaussian handles memory in such a way that it actually uses about 1GB more than `%mem`.

**Fixing the error**

The value for `%mem` should be at least 1GB less than the value specified in the job submission script. Conversely, the value specified for `--mem` in your job script should be at least 1GB greater than the amount specified in the `%mem` directive in your Gaussian input file. The exact increment needed seems to depend on the job type and input details; 1GB is a conservative value determined empirically.

If you encounter this error, please keep the `-m` value passed to `g16` constant and increase the `--mem` value passed to `#SBATCH`. For example:
```
#SBATCH --mem=130000
...
g16 -m=128gb ...
```

See [here](https://docs.computecanada.ca/wiki/Gaussian_error_messages) for a list of common Gaussian error messages.
