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
title = "ANSYS and UVA HPC"
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
The current general UVA license can be used for research but is limited in the size of the models it can use, and some of the more advanced features are not available.  Users who have their own research licenses with greater capabilities must specify that license.  To use such a research license on the UVA HPC system, before running ANSYS set the following environment variable
```no-highlight
export ANSYSLMD_LICENSE_FILE=1055@myhost.mydept.virginia.edu
```
You may also need
```no-highlight
export ANSYSLI_SERVERS=2325@myhost.mydept.virginia.edu
```
You must obtain the full names of the hosts and the port numbers from your group's license administrator.  The numbers in the above lines are the standard ANYSYS ports, but it is possible they may differ for some license servers; consult your license administrator for specific values. The ANSYSLI_SERVERS environment variable is generally not necessary if the default port is used, but ANSYSLMD_LICENSE_FILE will always be required.

These environment variables must be set in each shell and in every Slurm script that invokes ANSYS.

# Using ANSYS Workbench
If you wish to run jobs using the Workbench, you need to edit the `~/.kde/share/config/kwinrc` file and add the following line:
```
FocusStealingPreventionLevel=0
```

The workbench application, `runwb2`, should be executed in an interactive [Open OnDemand Desktop](/userinfo/hpc/ood/desktop) session.  
When you are assigned a node, launch the desktop, start a terminal, load the desired module and start the workbench with the `runwb2` command.
```
module load ansys
unset SLURM_GTIDS
runwb2
```
Be sure to delete your Open OnDemand session if you finish before your requested time expires.

# Multi-Core Jobs
It is possible to run multicore jobs through Open OnDemand. In a terminal, load the ansys module and then run the appropriate package frontend: for general ANSYS applications, including CFX, that is the Workbench; for Fluent run `fluent` to start its graphical interface.  Choose the "Parallel Options" tab to set up a run.  Be sure to use only the number of cores you requested when you launched the OOD Desktop.

For longer jobs, and for all multinode jobs, you should run in batch mode using  a Slurm script.  Please refer to ANSYS documentation for instructions in running from the command line.  These examples use threading to run on multiple cores on a single node.

**ANSYS Slurm Script:**

{{< pull-code file="/static/scripts/ansys.slurm" lang="no-hightlight" >}}

**CFX Slurm Script:**

{{< pull-code file="/static/scripts/cfx.slurm" lang="no-hightlight" >}}

# Multi-Node MPI Jobs

For Fluent specify `-mpi=intel` along with the flag `-srun` to dispatch the MPI tasks using Slurm's task launcher. If more than the default memory per core is required, it is generally better with ANSYS and related products to request a total memory over all processes rather than using `--mem-per-cpu`, because a process can exceed the allowed memory per core.  Please refer to our [documentation](/userinfo/hpc/overview/#job-queues) for current information about default memory per core in each partition.

These examples also show the minimum number of command-line options; you may require more for large jobs.

<!--- You must also set up _passwordless ssh_ between nodes as described [here](/userinfo/hpc/logintools/rivanna-ssh). -->

**Fluent Slurm Script:**

{{< pull-code file="/static/scripts/fluent.slurm" lang="no-hightlight" >}}

The syntax for CFX is different and includes a "start-method." We recommend Intel MPI. Please refer to documentation for other options that may be required.

**CFX Slurm script:**

{{< pull-code file="/static/scripts/cfx_mpi.slurm" lang="no-hightlight" >}}
