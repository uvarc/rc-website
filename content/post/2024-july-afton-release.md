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

- **New hardware:** On May 28, a total of 300 compute nodes, 96 cores each, based on the AMD EPYC 9454 architecture have been added to UVA's HPC environment. The new Afton hardware provides additional capacity for serial, parallel and GPU computing side-by-side with the existing Rivanna system.  (add link).

- **Access:** The Rivanna and Afton systems are accessible via the existing and shared Open OnDemand, FastX and ssh access points. (add link)

- **Configuration:** The hardware partition definitions will be reconfigured to optimize effective use of existing Rivanna and new Afton hardware.  (add link).

- **Software, Code, and Job Submissions:** The shared software stack and modules have been tested during the pre-release phase. In some cases users may need to update their Slurm job scripts or recompile their own code.

- **Policy:** A new charge rate policy will be implemented on July 2 to reflect more closely the actual hardware cost.  (add link)

{{% /callout %}}

## FAQ

{{% accordion-group title="Group" id="faqgroup"%}}

{{% accordion-item title="What's the difference between Rivanna and Afton?" id="faq-1" %}}

{{% /accordion-item %}}

{{% accordion-item title="What compute capabilities does the new Afton hardware offer?" id="faq-2" %}}

On May 28, total of 300 compute nodes, 96 cores each, based on the AMD EPYC 9454 architecture have been added to UVA’s HPC environment.

{{% /accordion-item %}}

{{% accordion-item title="How can I get access to the Afton system? Can I use my Rivanna allocation?" id="faq-3" %}}

{{% /accordion-item %}}

{{% accordion-item title="Can I still use Rivanna?" id="faq-4" %}}

{{% /accordion-item %}}

{{% accordion-item title="What are the new hardware partitions?" id="faq-5" %}}

- The pre-release `afton` partition will be removed. The nodes will be placed in other partitions. 
- The `parallel` partition will be completely replaced with 200 Afton nodes. The original nodes will be placed in `standard`.
- The `largemem` partition will be removed. All 750GB nodes will be placed in the `standard` partition. 
- All RTX3090 nodes from the `gpu` partition will be placed in the `interactive` partition.

{{% /accordion-item %}}

{{% accordion-item title="What happened to the largemem, dev, and instructional partitions?" id="faq-6" %}}

{{% /accordion-item %}}

{{% accordion-item title="Do I need to update my Slurm job scripts?" id="faq-7" %}}

Most users should be able to submit jobs without changing their Slurm scripts, unless:
- invalid request due to partition changes (see #1)
- cost considerations (see #2), e.g. running a light GPU job on an RTX instead of an A100
- need specific Rivanna vs Afton hardware, e.g. for consistency/reproducibility or benchmarking reasons 

The last item is only relevant in the `standard` and `interactive` partitions. For instance, to request a `standard` job be run on the new Afton hardware, provide a constraint (`-C`):
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

{{% accordion-item title="Do I need to recompile my code?" id="faq-8" %}}

If you have already done this for the Afton pre-release testing then no. Otherwise please use the following flowchart.

- Which compiler did you use to build your code?
    - Not Intel (e.g. GCC, NVIDIA) &rarr; **no**
    - Intel &rarr; **continue**

- Do you intend to run your code on Afton hardware? (Please note the `parallel` partition will be completely replaced by Afton hardware.)
    - No &rarr; **no**
    - Yes &rarr; **continue**

- Did you use the `-x` flag (e.g. `-xavx`)?
    - No &rarr; **no**
    - Yes &rarr; **yes**, rebuild with `-march=skylake-avx512` instead of `-x...`

{{% /accordion-item %}}

{{% accordion-item title="What are hardware features? What are the hardware feature defaults for each partition?" id="faq-9" %}}

{{% /accordion-item %}}

{{% accordion-item title="How do I run jobs on the new Afton hardware?" id="faq-10" %}}

{{% /accordion-item %}}

{{% accordion-item title="How is compute time charged on the Rivanna and Afton systems?" id="faq-11" %}}

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

{{% accordion-item title="Why are there different charge rates for different hardware?" id="faq-12" %}}

{{% /accordion-item %}}

{{% accordion-item title="How does use of different hardware and service unit charge rates affect my fair share?" id="faq-13" %}}

{{% /accordion-item %}}

{{% accordion-item title="What is fair share?" id="faq-14" %}}

{{% /accordion-item %}}

{{% accordion-item title="How can I get help?" id="faq-15" %}}

Please contact our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>, or join us for our [virtual office hours](/support/#office-hours) every Tuesday, 3-5 p.m. and Thursday, 10-12 p.m. starting March 6.

{{% /accordion-item %}}

{{% /accordion-group %}}

## Technical Details

< Ruoshi >

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
