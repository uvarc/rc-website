+++
images = [""]
author = "Staff"
description = ""
date = "2026-01-12T00:00:00-05:00"
title = "Rio HPC Expansion: New HSZ Storage and Access Enhancements"
draft = false
tags = ["Rio","HPC","HSZ"]
categories = ["feature"]
+++

The Rio High-Performance Computing (HPC) system is, specifically designed for storing and analyzing [highly sensitive data (e.g., HIPAA- and FERPA-regulated data)](https://www.rc.virginia.edu/userinfo/storage/data-sensitivity/). As part of our ongoing efforts to enhance Rio within the High Security Zone (HSZ), we are pleased to announce the completion of the next phase of its expansion. This second phase completes key enhancements that bring Rio closer to parity with our Standard Security Zone (SSZ) HPC systems, Rivanna and Afton, and further advances our goal of providing robust HPC capabilities within the HSZ. 

[Rio can be accessed through an Ivy Linux virtual machine (VM)](https://www.rc.virginia.edu/userinfo/ivy/). 

## Key updates: 

- **HSZ Project Storage Availability** 

HSZ Project storage, backed by an IBM GPFS parallel file system, is now available on Rio and on the VMs that serve as Rio login nodes. This storage option is more performant and feature-rich than HSZ Standard storage and is generally equivalent to SSZ Project storage for HPC workloads. Data stored in HSZ Project storage is encrypted at rest and can be transferred to Rio at high speed using Globus. 

- **Default Open OnDemand and HPC Account Provisioning** 

Any Ivy project with a Linux VM eligible to serve as a Rio login node is now provisioned by default with an HPC account and Open OnDemand. This ensures access to services comparable to those available on our SSZ HPC systems. Open OnDemand is a web-based portal that provides access to HPC resources, including applications such as RStudio, JupyterLab, and a desktop environment for running Graphical User Interface (GUI)-based applications on compute nodes. 

- **No-Cost Base VM for Rio Access** 

[RC uses a cost-recovery model for Ivy VMs](https://www.rc.virginia.edu/userinfo/pricing/#ivy-virtual-machines); however, to facilitate access to Rio, we have introduced a base VM image (4 CPU cores and 16 GB of memory) that is available to Rio users at no cost. For existing VMs that already meet this specification, billing was discontinued as of last September. 

We look forward to seeing increased adoption of Rio by researchers across the University. RC is happy to provide training and consultations, and we encourage you to contact our [HPC support team](https://www.rc.virginia.edu/support/) with any questions. Please refer to the [Ivy and Rio Secure Environments](https://www.rc.virginia.edu/userinfo/ivy/) page for information on how to open an Ivy account and obtain access to Rio. 