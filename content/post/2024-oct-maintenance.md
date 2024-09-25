+++
images = [""]
author = "Staff"
description = ""
date = "2024-10-04T00:00:00-05:00"
title = "HPC Maintenance: Oct 15, 2024"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The HPC cluster will be down for maintenance on <strong>Tuesday, Oct 15, 2024</strong> beginning at 6 am.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the cluster is returned to service.

All systems are expected to return to service by **Wednesday, Oct 16** at 6 am.

## IMPORTANT MAINTENANCE NOTES

###Expansion of /home

To transition away from the Qumulo filesystem, we will migrate all /home directories to the GPFS filesystem and automatically increase each user’s /home directory limit to 200GB. 

### Transition from Anaconda to Miniforge module

Due to the recent [licensing restrictions by Anaconda](https://legal.anaconda.com/policies/en/)  on research usage, we will be removing the licensed Anaconda distribution from our system on October 15, 2024.  
The anaconda module will redirect to the new miniforge/24.3.0-py3.11 module, with a reduced number of preinstalled packages in the base environment, but includes the essential Conda and Mamba package managers along with commonly used packages such as numpy, pandas, matplotlib, etc., from the conda-forge channel. 
By default, the miniforge distribution will only provide packages from the conda-forge channel. Therefore, if you require packages from channels that are covered by the Anaconda repository Terms of Service (main/anaconda, r, msys2) you may specify this in your installation command but only for environments that are restricted to educational use, i.e., instructional work in your classes.

The use of your existing environments should not be affected by this change. For instructional use you may continue to install python packages from the licensed Anaconda default channels however, any use of such environment for research purposes is a violation of the Anaconda license unless you obtained your own license.   

We understand that these changes may cause inconvenience, but these changes are mandated by the Anaconda licensing condition which we cannot control. If you have any questions or concerns, please feel free to reach out.

### Modules

- The following modules will be **removed** during the maintenance period.

{{< table title="replacement" class="table table-striped" >}}
| Module | Removed version | Replacement |
|---|---|---|
|anaconda   | 2023.07-py3.11 | miniforge/24.3.0-py3.11 |
|anvio      | 6.2            | 8 |
|code-server| 4.16.1         | 4.92.2 |
|deeplabcut | 2.2.1.1-anipose| 3.0.0rc4 |
|deeptools  | 3.5.1          | 3.5.5 |
|maestro    | 1.3.0          | 1.5.1 |
|mamba      | 22.11.1-4      | miniforge/24.3.0-py3.11 |
{{< /table >}}
