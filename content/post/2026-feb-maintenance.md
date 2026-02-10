+++
images = [""]
author = "Staff"
description = ""
date = "2026-02-02T00:00:00-05:00"
title = "HPC Maintenance: Feb 17, 2026"
draft = false
tags = ["ivy", "hpc"]
categories = ["feature"]
+++

{{< alert-green >}}The UVA HPC system, Rio, will be unavailable for maintenance on <strong>Tuesday, February 17, 2026</strong> beginning at 6 am.{{< /alert-green >}}

All systems are expected to return to service by **Wednesday, February 17** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### What to Expect During Maintenance  

**Access:**

 
You will continue to have access to your Ivy Virtual Machine (VM). However, you will not be able to access the HPC systems, including Open OnDemand, from those VMs used as Rio login nodes. 

**Jobs:**
 
You can submit jobs until maintenance begins. If the scheduler determines that a job cannot finish before maintenance starts, it will be held in the queue and will automatically start once the system is back online. No jobs will run during maintenance. 

**Storage:**
 
HSZ Research Standard and Research Project storage will remain accessible via the VMs. However, the Data Transfer Node (DTN) will undergo a brief security upgrade, temporarily pausing ongoing Globus transfers. All transfers will automatically resume once the DTN is back online. 

### System

Slurm will be upgraded to 25.05.

### Modules

New toolchain `gompi/14.2.0_5.0.7 (gcc/14.2.0 openmpi/5.0.7)`.

If you have any questions about the maintenance, please [contact our user services team](https://www.rc.virginia.edu/support/). 
