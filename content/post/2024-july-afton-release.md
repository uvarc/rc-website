+++
images = [""]
author = "Staff"
description = ""
date = "2024-06-14T00:00:00-05:00"
title = "Production Release of the Afton HPC System: July 2, 2024"
# url = "/maintenance"
draft = false
tags = ["afton"]
categories = ["feature"]
+++



{{< alert-green >}}The HPC system in the standard security zone, including <i>Rivanna</i>, will be down on <strong>Tuesday, July 2, 2024</strong> beginning at 6 a.m. During the downtime RC engineers will implement final configuration changes in preparation of the <b>full production release of the new <i>Afton HPC system</i></b>.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the HPC systems are returned to service.

The *Rivanna* and *Afton* production systems are expected to return to service by **Wednesday, July 3 at 6 a.m.**

**Questions:** Please contact our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>, or join us for our [virtual office hours](/support/#office-hours) every Tuesday, 3-5 p.m. and Thursday, 10-12 p.m. starting March 6.


{{% callout %}}
## What to expect after the maintenance on July 3?

- **New hardware:** On May 28, a total of 300 compute nodes, 96 cores each, based on the AMD EPYC 9454 architecture have been added to UVA's HPC environment as the new Afton system. The new Afton hardware provides additional capacity for serial, parallel and GPU computing side-by-side with the existing Rivanna system.

- **Access:** The Rivanna and Afton systems are accessible via the existing and shared Open OnDemand, FastX and ssh access points.

- **Configuration:** The hardware partition definitions will be reconfigured to optimize effective use of existing Rivanna and new Afton hardware.

- **Software, Code, and Job Submissions:** The shared software stack and modules have been tested during the pre-release phase. In some cases users may need to update their Slurm job scripts or recompile their own code.

- **Policy:** A new charge rate policy will be implemented on July 2 to reflect more closely the actual hardware cost.

{{% /callout %}}

## FAQ

{{% accordion-group title="Group" id="faqgroup"%}}

{{% accordion-item title="Is Afton replacing the older Rivanna system?" id="faq-1" %}}

No, the new Afton system exists side-by-side with the existing Rivanna system. The hardware to both systems can be accessed through shared login access points, see ["How do I login to the Afton system?"](#faq-4).

{{% /accordion-item %}}

{{% accordion-item title="What compute capabilities does the new Afton hardware offer?" id="faq-2" %}}

On May 28, total of 300 compute nodes, 96 cores each, based on the AMD EPYC 9454 architecture have been added to UVA’s HPC environment. The added nodes expand UVA's HPC capabilities in the following areas:

- A complete hardware refresh of the `parallel` partition that roughly doubles its capacity (based on aggregated cpu core count).

- Expanded capacity of the `standard` partition for single node jobs and high-throughput computing, including new largemem nodes.

- Addition of new nodes with general purpose graphics processing units (GPUs) accommodate more ML/DL computing in the `gpu` partition.

{{% /accordion-item %}}

{{% accordion-item title="How can I get an account to access the Afton system? Can I use my Rivanna allocation?" id="faq-3" %}}

The service unit allocations are shared for Rivanna and Afton. If you already have an active Rivanna allocation, no action is required. If you'd like to start using Afton or Rivanna, please [follow the instructions here](/userinfo/rivanna/allocations/#allocation-types).

{{% callout %}}
**Please note:** {{% pi-eligibility %}}.
{{% /callout %}}

{{% /accordion-item %}}

{{% accordion-item title="How do I log in to the Afton system?" id="faq-4" %}}

The login access points are shared for the Afton and Rivanna systems.

- **Option 1:** Web access via Open OnDemand

- **Option 2:** Remote Desktop via FastX

- **Option 3:** Secure Shell (ssh) session

See [here for details](/userinfo/rivanna/login/). You have to be a member of an active HPC allocation before you can log in.

{{% /accordion-item %}}

{{% accordion-item title="Can I still use Rivanna?" id="faq-5" %}}

Yes. Login access points are shared for the Rivanna and Acton systems. We added new hardware feature tags that allow you to specifically request Rivanna resources for your compute jobs. 

See ["What are the changes to the hardware partitions?"](#faq-6) and ["What are hardware features? What are the hardware feature defaults for each partition?"](#faq-10).

{{% /accordion-item %}}

{{% accordion-item title="What are the changes to the hardware partitions?" id="faq-6" %}}

- The pre-release `afton` partition will be removed. The nodes will be placed in other partitions. 
- The `parallel` partition will be completely replaced with 200 Afton nodes. The original nodes will be placed in `standard`.
- The `largemem` partition will be removed. All 750GB nodes will be placed in the `standard` partition. 
- All RTX3090 nodes from the `gpu` partition will be placed in the `interactive` partition.

{{% /accordion-item %}}

{{% accordion-item title="What happened to the largemem, dev, and instructional partitions?" id="faq-7" %}}

Nodes of the `largemem` partition have been moved to the `standard` partition. See ["What are the changes to the hardware partitions?"](#faq-6)

The `dev` and `instructional` partitions have been merged and replaced with a single `interactive` partition during the *Afton pre-release* on May 30.

{{% /accordion-item %}}

{{% accordion-item title="Do I need to update my Slurm job scripts?" id="faq-8" %}}

Most users should be able to submit jobs without changing their Slurm scripts, unless:
- invalid request due to partition changes (see ["What are the changes to the partitions?"](#faq-6))
    - *Example:* A job submitted to `largemem` will become invalid since the partition is removed. One should submit to `standard` with `--mem=...` to specify the memory.
- cost considerations (see *FAQ: How is compute time charged on the Rivanna and Afton systems?*)
    - *Example:* Instead of running a light GPU job on an A100 in `gpu`, request an RTX2080 or RTX3090 in `interactive` via `--gres=gpu`.
- need specific Rivanna vs Afton hardware for performance/reproducibility/benchmarking reasons (only relevant for `standard` and `interactive`) 
    - *Example:* To restrict a `standard` job to run on the new Afton hardware, provide a constraint (`-C`):
```
#SBATCH -p standard
#SBATCH -C afton
```
and likewise for Rivanna hardware:
```
#SBATCH -p standard
#SBATCH -C rivanna
```

{{% /accordion-item %}}

{{% accordion-item title="Do I need to recompile my code?" id="faq-9" %}}

If you have already done this for the Afton pre-release testing then no. Otherwise please use the following flowchart.

- Which compiler did you use to build your code?
    - Not Intel (e.g. GCC `gcc`, NVIDIA `nvhpc`) &rarr; **no**
    - Intel &rarr; **continue**

- Do you intend to run your code on Afton hardware? (Please note the `parallel` partition will be completely replaced by Afton hardware.)
    - No &rarr; **no**
    - Yes &rarr; **continue**

- Did you use the `-x` flag (e.g. `-xavx`)?
    - No &rarr; **no**
    - Yes &rarr; **yes**, rebuild with `-march=skylake-avx512` instead of `-x...`

{{% /accordion-item %}}

{{% accordion-item title="What are hardware features? What are the hardware feature defaults for each partition?" id="faq-10" %}}

{{% /accordion-item %}}

{{% accordion-item title="How do I run jobs on the new Afton hardware?" id="faq-11" %}}

{{% /accordion-item %}}

{{% accordion-item title="How is compute time charged on the Rivanna and Afton systems?" id="faq-12" %}}

A new charge rate policy will be implemented to reflect more closely the actual hardware cost. For all non-GPU jobs, the charge rate will be based on the amount of CPU cores and memory. For GPU jobs (in `gpu` and `interactive`), the charge rate will be based on the amount of GPU devices.

{{< table title="charge-rate" class="table table-striped" >}}
| Partition | Hardware | Charge rate (per core or GPU)| 
|---|---|---|
|standard| Rivanna | |
|standard| Afton   | |
|parallel| Afton   | |
|gpu     | A40     | |
|gpu     | A6000   | |
|gpu     | V100    | |
|gpu     | A100 (40G)| |
|gpu     | A100 (80G)| |
|interactive| Rivanna | |
|interactive| Afton   | |
|interactive| RTX2080 | |
|interactive| RTX3090 | |
{{< /table >}}

{{% /accordion-item %}}

{{% accordion-item title="Why are there different charge rates for Rivanna, Afton, and GPU hardware?" id="faq-13" %}}

{{% /accordion-item %}}

{{% accordion-item title="How do the use of different hardware and service unit burn rates affect my fair share?" id="faq-14" %}}

{{% /accordion-item %}}

{{% accordion-item title="What is fair share?" id="faq-15" %}}

{{% /accordion-item %}}

{{% accordion-item title="How can I get help?" id="faq-16" %}}

Please contact our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>, or join us for our [virtual office hours](/support/#office-hours) every Tuesday, 3-5 p.m. and Thursday, 10-12 p.m. starting March 6.

{{% /accordion-item %}}

{{% /accordion-group %}}

## Afton Release Announcements 

{{% accordion-group title="Comms" id="commsgroup" %}}

{{% accordion-item title="May 30, 2024 - Afton is available in pre-release configuration" id="comm-3" %}}

**Effective May 30**, the new Afton HPC hardware is now available in a pre-release configuration as part of the HPC environment. During this pre-release phase the number of available Afton nodes may fluctuate as the RC team completes final configurations. The full production release of the Afton cluster with stable service of all 300 nodes is planned for **Tuesday, July 2**. [Learn more](/2024/05/rivanna-maintenance-may-28-2024/).

{{% /accordion-item %}}


{{% accordion-item title="May 20, 2024 - Reminder: Rivanna maintenance and Afton pre-release" id="comm-1" %}}

Dear Rivanna user: 
  

A friendly reminder that Rivanna and Research Project storage will be down for maintenance from Tuesday, May 28 at 6 a.m. through Thursday, May 30 6 a.m..  

  
**How to prepare and what to expect during the maintenance?** 
You may continue to submit jobs to Rivanna until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service. All Rivanna compute nodes and login nodes will be offline, including the Open OnDemand and FastX portals. Research Project storage will be unavailable. The UVA Standard Security Storage data transfer node (DTN) and Research Standard storage remain online throughout the maintenance period.  
  
**Pre-release of the new Afton cluster after the maintenance** 
All systems are expected to return to service by 6 a.m. on Thursday, May 30. The new Afton HPC hardware will become available in a pre-release configuration at that time, with the addition of 300 new compute nodes, 96 cores each, based on the AMD EPYC 9454 architecture. The new Afton hardware will provide additional capacity for serial, parallel and GPU computing side-by-side with the existing Rivanna system. During this pre-release phase the number of available Afton nodes may fluctuate as the RC team completes final configurations. The full production release of the Afton cluster with stable service of all 300 nodes is planned for Tuesday, July 2. 
 
A detailed description of the maintenance plan and instructions for using the new Afton resources is available on the RC website.   
 
If you have any questions about the Rivanna maintenance or Afton pre-release, you may contact our user services team. 
  
At your service, RC staff 
 
 
Research Computing

E hpc-support@virginia.edu
P 434.243.1107

University of Virginia
P.O. Box 400231
Charlottesville 22902

{{% /accordion-item %}}

{{% accordion-item title="May 14, 2024 - Rivanna maintenance and Afton pre-release" id="comm-2" %}}

Dear Rivanna user: 
  
A reminder that Rivanna and Research Project storage will be down for maintenance from **Tuesday, May 28 at 6 a.m.** through **Thursday, May 30 6 a.m.**.  
  
**How to prepare and what to expect during the maintenance?** 
You may continue to submit jobs to Rivanna until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service. All Rivanna compute nodes and login nodes will be offline, including the Open OnDemand and FastX portals. Research Project storage will be unavailable. The UVA Standard Security Storage data transfer node (DTN) and Research Standard storage remain online throughout the maintenance period.  
  
**Pre-release of the new Afton cluster after the maintenance** 
All systems are expected to return to service by 6 a.m. on Thursday, May 30. The new Afton HPC hardware will become available in a pre-release configuration at that time, with the addition of 300 new compute nodes, 96 cores each, based on the AMD EPYC 9454 architecture. The new Afton hardware will provide additional capacity for serial, parallel and GPU computing side-by-side with the existing Rivanna system. During this pre-release phase the number of available Afton nodes may fluctuate as the RC team completes final configurations. The full production release of the Afton cluster with stable service of all 300 nodes is planned for Tuesday, July 2. 
 
A detailed description of the maintenance plan and instructions for using the new Afton resources is available on the RC website.   
 
If you have any questions about the Rivanna maintenance or Afton pre-release, you may contact our user services team. 
  
At your service, RC staff 
 
 
Research Computing

E hpc-support@virginia.edu
P 434.243.1107

University of Virginia
P.O. Box 400231
Charlottesville 22902

{{% /accordion-item %}}

{{% /accordion-group %}}
