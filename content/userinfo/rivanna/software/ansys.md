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
The current general UVA license can be used for research but is limited in the size of the models it can use, and it cannot use multinode (MPI) mode.  Users who have their own research licenses with greater capabilities must specify that license.  To use such a research license on Rivanna, before running ANSYS set the following environment variable
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

The workbench application, `runwb2`, should be executed in an interactive [Open OnDemand Desktop](/userinfo/rivanna/ood/desktop) session.  
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

{{< pull-code file="/static/scripts/ansys.slurm" lang="no-hightlight" >}}

**CFX Slurm Script:**

{{< pull-code file="/static/scripts/cfx.slurm" lang="no-hightlight" >}}

# Multi-Node MPI Jobs

You must use IntelMPI.  IBM MPI (Platform) will not work on our system.
For Fluent specify `-mpi=intel` along with the flag `-srun` to dispatch the MPI tasks using Slurm's task launcher.  Also include the `-slurm` option.  It is generally better with ANSYS and related products to request a total memory over all processes rather than using memory per core, because a process can exceed the allowed memory per core.  You must have access to a license that supports HPC usage.  These examples also show the minimum number of command-line options; you may require more for large jobs.

You must also set up _passwordless ssh_ between nodes as described [here](/userinfo/rivanna/logintools/rivanna-ssh).

**Fluent Slurm Script:**

{{< pull-code file="/static/scripts/fluent.slurm" lang="no-hightlight" >}}

**CFX Slurm script:**

{{< pull-code file="/static/scripts/cfx_mpi.slurm" lang="no-hightlight" >}}
