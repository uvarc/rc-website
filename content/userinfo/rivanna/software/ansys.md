+++
type = "rivanna"
categories = [
  "HPC",
  "software"
]
date = "2021-06-04T08:37:46-05:00"
tags = [
  "cae",
  "multi-core",
  "mpi"
]
draft = false
modulename = "ansys"
softwarename = "ANSYS"
title = "ANSYS on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

Local support is minimal; users should make an account at the student forum through the [{{% software-name %}} website]({{< module-homepage >}}) for technical support and for obtaining detailed information.

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
# Licensing
UVA has a research license that covers most research needs, and ANSYS on Rivanna uses this by default.  However, some research groups have their own licenses with more capabilities.  If you need to direct ANSYS to a different license server, you must set the `ANSYSLI_SERVERS` and `ANSYSLMD_LICENSE_FILE` environment variables.  The format for these for a three-server license server cluster is
```
export ANSYSLI_SERVERS=ansysliport@hostname1:ansysliport@hostname2:ansysliport@hostname3
export ANSYSLMD_LICENSE_FILE=flexnetport@hostname1:flexnetport@hostname2:flexnetport@hostname3
```
You must obtain the values for `ansysliport` (a port number), `flexnetport` (another port number), and the names of the hosts from your group's license administrator.  If you have only a single license server host you need only list the one hostname in each variable.

You can add these lines to your `~/.bashrc` file or you may add them to your Slurm batch scripts.

# Using ANSYS Workbench
If you wish to run jobs using the Workbench, you need to edit the `~/.kde/share/config/kwinrc` file and add the following line:
```
FocusStealingPreventionLevel=0
```

The workbench application, runwb2, should be executed as an interactive job through the Open OnDemand [desktop](/userinfo/rivanna/ood/desktop).  
When you are assigned a node, launch the desktop, start a terminal, load the desired module and start the workbench with the `runwb2` command.
```
module load ansys
unset SLURM_GTIDS
runwb2
```
Be sure to delete your Open OnDemand session if you finish before your requested time expires.

# Multi-Core Jobs
You can write a batch script to run ANSYS jobs.  Please refer to ANSYS documentation for instructions in running from the command line.  These examples use threading to run on multiple cores on a single node.

**ANSYS Slurm Script:**
```
#!/bin/bash
#SBATCH --nodes=1
#SBATCH --cpus-per-task
#SBATCH --time=12:00:00
#SBATCH --partition=standard
#SBATCH -J myCFXrun
#SBATCH -A mygroup
#SBATCH --mem=96000
#SBATCH --output=myCFXrun.txt

mkdir /scratch/$USER/myCFXrun
cd /scratch/$USER/myCFXrun

module load ansys/19.2
ansys192 -np ${SLURM_CPUS_PER_TASK} -def /scratch/yourpath/yourdef.def -ini-file/scratch/yourpath/yourresfile.res
```

**CFX Slurm Script:**
```
#!/bin/bash
#SBATCH --nodes=1
#SBATCH --cpus-per-task=20
#SBATCH --partition=standard
#SBATCH -J myCFXrun
#SBATCH -A mygroup
#SBATCH --mem=12000
#SBATCH --output=myCFXrun.txt

cfx5solve -double -def /scratch/yourpath/mydef.def -par-local -partition "$SLURM_CPUS_PER_TASK"
```

# Multi-Node MPI Jobs

You must use IntelMPI.  IBM MPI (Platform) will not work on our system.
For Fluent specify `-mpi=intel` along with the flag `-srun` to dispatch the MPI tasks using Slurm's task launcher.  Also include the `-slurm` option.  It is generally better with ANSYS and related products to request a total memory over all processes rather than using memory per core, because a process can exceed the allowed memory per core.  You must have access to a license that supports HPC usage.  These examples also show the minimum number of command-line options; you may require more for large jobs.

**Fluent Slurm Script:**
```
#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=40
#SBATCH --time=12:00:00
#SBATCH --partition=parallel
#SBATCH -J myFluentrun
#SBATCH -A mygroup
#SBATCH --mem=96000
#SBATCH --output=myFluentrun.txt

for host in $SLURM_JOB_NODELIST; do
    scontrol show hostname $host >> hosts
done

IFS=' '

module load intel/18.0
module load ansys/19.2
fluent 3ddp -g -t${SLURM_NPROCS} -cnf=hosts -srun -pinfiniband -mpi=intel -ssh -i myjournalfile.jou
```

**CFX Slurm script:**
```
#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=20
#SBATCH --time=12:00:00
#SBATCH --partition=parallel
#SBATCH -J myCFXrun
#SBATCH -A mygroup
#SBATCH --mem=12000
#SBATCH --output=myCFXrun.txt

NPARTS=`expr $SLURM_NTASKS_PER_NODE \* $SLURM_NNODES`

for host in $SLURM_JOB_NODELIST; do
    echo -n $(scontrol show hostname $host)>> hostfile
done

read -a hosts < hostfile

hostlist=${hosts[0]}","

for (( i=1; i<${#hosts[@]}-1; i++)); do
    hostlist+=${hosts[$i]}","
done

hostlist+=${hosts[${#hosts[@]}-1]}

rm hostfile
module load intel/18.0
module load ansys/19.2

cfx5solve -double -def /scratch/yourpath/mydef.def -par-dist "$hostlist" -partition "$NPARTS" -start-method "Intel MPI Distributed Parallel"
```
