+++
images = [""]
author = "Staff"
description = ""
date = "2025-07-28T00:00:00-05:00"
title = "HPC Maintenance: Aug 12, 2025"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The UVA HPC systems, Afton/Rivanna, will be down for maintenance on <strong>Tuesday, August 12, 2025</strong> beginning at 6 am.{{< /alert-green >}}

All systems are expected to return to service by **Wednesday, August 13** at 6 am.

## IMPORTANT MAINTENANCE NOTES

Research computing has implemented new internal reporting to better understand how the community is using the current GPUs and to better inform our future purchases. This reporting has identified that GPU cards are often idle for extended periods of time while held by user jobs. We continue to hear from the community that many workflows require interactive access to the GPU nodes, and that long queue times make those workflows difficult. To improve the community’s experience, we are implementing changes that will make users aware of these idle resources and more quickly return GPU cards that are left idle to the available pool of resources. In addition, we are removing many old modules that are no longer maintained.  

Below are details on the maintenance impacts and upcoming GPU-related changes designed to reduce wait times and enhance system performance.   

### What to Expect During Maintenance 

**Access:**
 
You will not be able to log in or use the HPC systems, including Open OnDemand and FastX. 

**Jobs:**
 
You can submit jobs until maintenance begins. If the scheduler determines that a job cannot finish before maintenance starts, it will be held in the queue and will automatically start once the system is back online. No jobs will run during maintenance. 

**Storage:**
 
Research Standard and Research Project storage remain accessible via Globus, Server Message Block (SMB) and Network File System (NFS) mounts, meaning: 

- You can access files from other systems (e.g., your computer) if mounts are set up. 

- You cannot access files through the HPC interface during maintenance. 

- The Data Transfer Node (DTN) stays online for ongoing data transfers. 


### Improving GPU Resource Availability and Job Efficiency 

To improve wait times and system performance in the gpu partition, we are implementing three key updates. These are in addition to a significant new investment in GPU hardware planned for this Fall. 

**1. User Awareness Emails – Starting Aug. 13** 
    
Informational alerts will be sent to users whose GPU jobs show zero utilization for extended periods. These alerts encourage efficient GPU use and will not affect your job status. 

**2. Job Termination Policy – Starting Sept. 9** 
    
GPU jobs that show no utilization may be automatically terminated, in line with our [usage guidelines](https://www.rc.virginia.edu/userinfo/hpc/job-alerts/). This policy ensures that GPU resources are used efficiently by active jobs. We'll share more information ahead of the change. This applies only to no-charge SU jobs in the gpu partition. 

 
**3. New Experimental gpu-mig Partition – Available Starting Aug. 13** 
    
To help you get faster access to GPU resources, we are launching a gpu-mig partition that uses NVIDIA’s Multi-Instance GPU (MIG) technology to split a single A100 80GB GPU into 56 smaller instances. 

**What this means for you:** Run smaller GPU jobs with less queue delays — and without using any Service Units (SUs).  

[See how to submit a job to the gpu-mig partition](https://www.rc.virginia.edu/userinfo/hpc/slurm/#mig-gpu-partition). 


### Open OnDemand

The PySpark Interactive App will be removed. Please use the new PySpark 4.0.0 kernel within JupyterLab. For details see [here](/userinfo/hpc/software/spark).

### Modules

Default version changes:
- homer/4.11 &rarr; 5.1
- nodejs/18.12.1 &rarr; 24.5.0

We are removing many old modules that are no longer maintained. If you need to use any of these please contact us.

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|amptorch     |0.1, 20201028-al | - |
|aspera-connect|4.2.4  | 4.2.8 |
|bazel        | 6.1.1  | 8.3.1 |
|bioconda     | py3.10 | py3.11 |
|biopython    |1.81-py3| 1.85 |
|blasr        |20190414| - |
|bsmap        | 2.42   | - |
|cd-hit       | 4.8.1  | - |
|cellpose     | 2.3.2  | 3.0.10, 4.0.5 |
|ciftilib     | 1.6.0  | - |
|clearcut     | 1.3.0  | - |
|cnnpeaks     | 200913 | - |
|cromwell     | 30.1   | - |
|dbg2olc      |20200723| - |
|emboss       | 6.6.0  | - |
|evm          | 1.1.1  | - |
|exonerate    | 2.4.0  | - |
|fgwas        | 0.3.6  | - |
|fsa          | 1.15.9 | - |
|gdrcopy      | 2.4.4  | (system) |
|genrich      | 0.6.1  | - |
|glpk         | 5.0    | - |
|gpunufft     | 2.1.0  | - |
|grace        | 5.1.25 | - |
|impute2      | 2.3.2  | - |
|intltool     | 0.51.0 | - |
|io_lib       | 1.14.8 | - |
|jdftx        | 1.7.0  | - |
|jtreeview    | 3      | - |
|junit        | 4.12   | - |
|levmar       | 2.6    | - |
|locuszoom    | 1.4    | - |
|manta        | 1.6.0  | - |
|marge        | 1.0    | - |
|mirdeep2     | 0.1.3  | - |
|motif        | 2.3.8  | - |
|mutect       | 1.1.4  | - |
|mutsigcv     | 1.41   | - |
|ncl          | 6.6.2  | - |
|netperf      | 2.6.0  | - |
|nextflow     | 24.10.5| 25.04.6 |
|nseg         | 1.0.0  | - |
|ocp-models   | 0.1    | - |
|openbugs     | 3.2.3  | - |
|openspeedshop| 2.4    | - |
|p3dfft       | 2.7.9  | - |
|paintor      | 3.0    | - |
|pcmsolver    | 1.3.0  | - |
|peakseq      | 1.31   | - |
|platform-mpi |9.01.04.03| - |
|pov-ray      |3.7.0.10| - |
|psipred      | 4.02   | - |
|psmc         | 0.6.5  | - |
|pstool       | 0.4.5  | - |
|qtltools     | 1.3.1  | - |
|rapidsai     | 24.06  | 25.06 |
|rasqual      |20210424| - |
|readosm      | 1.1.0a | - |
|saint        | 2.5.0  | - |
|saintexpress | 3.6.3  | - |
|seacr        | 1.3    | - |
|slatec       | 4.1    | - |
|snakemake    | 7.24.2 | 9.8.1 |
|sparc        |20180702| - |
|sparseassembler|2016  | - |
|sparsehash   | 2.0.3  | - |
|tophat       | 2.1.1  | - |
|torus        |20221211| - |
|wasp         | 0.3.4  | - |
|wdltool      | 0.14   | - |
|yaff         | 1.6.0  | - |
|yasm         | 1.3.0  | - |
{{< /table >}}

If you have any questions about the maintenance, software stac or GPU queue improvements, please [contact our user services team](https://www.rc.virginia.edu/support/). 
