+++
images = [""]
author = "Staff"
description = ""
date = "2024-06-17T00:00:00-05:00"
title = "Production Release of the Afton HPC System: July 2, 2024"
# url = "/maintenance"
draft = false
tags = ["afton"]
categories = ["feature"]
+++

<p class="lead">
Our new supercomputer, “Afton,” is now available for general use. This represents the first major expansion of RC’s computing resources since Rivanna's last hardware refresh in 2019. Afton represents a substantial increase in the High-Performance Computing (HPC) capabilities available at UVA, more than doubling the available compute capacity. Each of the 300 compute nodes in the new system has 96 compute cores, an increase from a maximum of 48 cores per node in Rivanna. The increase in core count is augmented by a significant increase in memory per node. Each Afton node boasts a minimum of 750GB of memory, with some supporting up to 1.5 Terabytes (TB) of RAM memory. The large amount of memory per node allows researchers to efficiently work with the ever-expanding datasets we are seeing across diverse research disciplines.
</p>

# Maintenance: July 2, 2024

{{< alert-green >}}The HPC system in the standard security zone, including <i>Rivanna</i>, will be down on <strong>Tuesday, July 2, 2024</strong> beginning at 6 a.m. During the downtime RC engineers will implement final configuration changes in preparation of the <b>full production release of the new <i>Afton HPC system</i></b>.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the HPC systems are returned to service.

The *Rivanna* and *Afton* production systems are expected to return to service by **Wednesday, July 3 at 6 a.m.**

**Questions:** Please contact our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>, or join us for our [virtual office hours](/support/#office-hours) every Tuesday, 3-5 p.m. and Thursday, 10-12 p.m..


{{% callout %}}
## What to expect after the maintenance on July 3?

- **New hardware:** On May 28, a total of 300 compute nodes, 96 cores each, based on the AMD EPYC 9454 architecture have been added to UVA's HPC environment as the new Afton system. The new Afton hardware provides additional capacity for serial, parallel and GPU computing side-by-side with the existing Rivanna system.

- **Configuration:** The hardware partition definitions will be reconfigured to optimize effective use of the new Afton and existing Rivanna systems.

- **Access:** The Rivanna and Afton systems are accessible via the existing and shared Open OnDemand, FastX and ssh access points.

- **Software, Code, and Job Submissions:** The shared software stack and modules have been tested during the pre-release phase. **In most cases users can utilize the system without any changes to their job submission scripts.** In some instances users may need to update their Slurm job scripts or recompile their own code. The RC team is available to help with the transition.

- **Policy:** A new charge rate policy will be implemented on July 2 to reflect more closely the actual hardware cost.

{{% /callout %}}

## FAQ

{{% accordion-group title="Group" id="faqgroup"%}}

{{% accordion-item title="1. Is Afton replacing the older Rivanna system?" id="faq-1" %}}

No, the new Afton system exists side-by-side with the existing Rivanna system. Both systems are accessible through shared login nodes, see ["How do I login to the Afton system?"](/userinfo/#faq-4). [test](/2024/06/production-release-of-the-afton-hpc-system-july-2-2024/#faq-4)

{{% /accordion-item %}}

{{% accordion-item title="2. What compute capabilities does the new Afton hardware offer?" id="faq-2" %}}

On May 28, total of 300 compute nodes, 96 cores each, based on the AMD EPYC 9454 architecture have been added to UVA’s HPC environment. The added nodes expand UVA's HPC capabilities in the following areas:

- A complete hardware refresh of the `parallel` partition that roughly doubles its capacity (based on aggregated cpu core count).

- Expanded capacity of the `standard` partition for single node jobs and high-throughput computing, including new largemem nodes.

- Addition of new nodes with general purpose graphics processing units (GPUs) accommodate more ML/DL computing in the `gpu` partition.

{{% /accordion-item %}}

{{% accordion-item title="3. How can I get an account to access the Afton system? Can I use my Rivanna allocation?" id="faq-3" %}}

The service unit allocations are shared for Rivanna and Afton. If you already have an active Rivanna allocation, no action is required. If you'd like to start using Afton or Rivanna, please [follow the instructions here](/userinfo/hpc/allocations/#allocation-types).

{{% callout %}}
**Please note:** {{% pi-eligibility %}}
{{% /callout %}}

{{% /accordion-item %}}

{{% accordion-item title="4. How do I log in to the Afton system?" id="faq-4" %}}

The login access points are shared for the Afton and Rivanna systems.

- **Option 1:** Web access via Open OnDemand

- **Option 2:** Remote Desktop via FastX

- **Option 3:** Secure Shell (ssh) session

See [here for details](/userinfo/hpc/login/). You have to be a member of an active HPC allocation before you can log in.

{{% /accordion-item %}}

{{% accordion-item title="5. Can I still use Rivanna?" id="faq-5" %}}

Yes. Login access points are shared for the Rivanna and Afton systems. We added new hardware feature tags that allow you to specifically request Rivanna resources for your compute jobs once logged in. 

See ["What are the changes to the hardware partitions?"](#faq-6) and ["What are hardware features? What are the hardware feature defaults for each partition?"](#faq-10).

{{% /accordion-item %}}

{{% accordion-item title="6. What are the changes to the hardware partitions?" id="faq-6" %}}

The following partition changes are taking place on July 2:
 
- The pre-release `afton` partition will be removed. The nodes will be placed in other partitions. 
- The `parallel` partition will be completely replaced with 200 Afton nodes. The original nodes will be placed in `standard`.
- The `largemem` partition will be removed. All 750GB nodes will be placed in the `standard` partition. 
- All RTX3090 nodes from the `gpu` partition will be placed in the `interactive` partition.

New partition configuration:
{{< table title="partition-config" class="table table-striped" >}}
| Partition | Rivanna Nodes | Afton Nodes | Use Cases | 
| --- | --- | --- | --- |
| `standard` | yes | yes | For jobs on a single compute node, including those with large memory requirements. |
| `parallel` | no| yes | For large parallel multi-node jobs. |
| `gpu` | yes | yes | For jobs using general purpose graphical processing units, e.g. for machine learning/deep learning. |
| `interactive` | yes | yes | For quick interactive sessions, code development, and instructional use. It includes a small number of lower-end GPU nodes. |
{{< /table >}}

{{% /accordion-item %}}

{{% accordion-item title="7. What happened to the largemem, dev, and instructional partitions?" id="faq-7" %}}

Nodes of the `largemem` partition have been moved to the `standard` partition. See ["What are the changes to the hardware partitions?"](#faq-6)

The `dev` and `instructional` partitions have been merged and replaced with a single `interactive` partition during the *Afton pre-release* on May 30.

{{% /accordion-item %}}

{{% accordion-item title="8. What are hardware feature constraints? What are the default hardware feature constraints for each partition?" id="faq-8" %}}

Features constraints and generic resources (GRES) allow you to request specific hardware within a given partition. **Through feature constraints you can specify if a job should be scheduled on the new Afton hardware or the older Rivanna system.**

Features constraints are optional; you may submit jobs without feature constraints. If no feature constraint is specified, the Slurm scheduler will place your job on available partition hardware following a default priority order.

**Note:** Not all features are available in every partition. This table lists the available features for each partition, including the default if no feature is specified. 

{{< table title="feature-constraints-and-gres" class="table table-striped" >}}
| Partition | Available Features Constraints | GRES | Default Priority Order | Notes |
| --- | --- | --- | --- | --- | 
| `standard` | `afton`, `rivanna` | None | `rivanna` > `afton` | If not specified, the scheduler will attempt to place the job on Rivanna hardware first or Afton hardware as second alternative. |
| `parallel` | None | None | n/a | The entire partition is configured with new Afton nodes. No feature constraint is required.
| `gpu` | None | `v100`, `a40`, `a6000`, `a100_40gb`, `a100_80gb` | `v100` > `a6000` > `a40` >  `a100_40gb`> `a100_80gb`  | If no GRES request is specified, the scheduler will attempt to place the job on a V100 node first and A100 80GB nodes (i.e. the BasePOD) hardware as last alternative. The A40 nodes were purchased along with the new Afton hardware. | 
| `interactive` | `afton`, `rivanna` | `rtx2080`, `rtx3090` | `rivanna` > `afton` | If not specified, the scheduler will attempt to place the job on Rivanna hardware first or Afton hardware as second alternative. |
{{< /table >}}

<br>

See ["How do I use Afton for my Slurm job? Do I need to update my job scripts?"](#faq-9) and ["How can I use the new Afton hardware in Open OnDemand?"](#faq-10) for instructions to use these feature constraints in your job submission scripts or Open OnDemand.

{{% /accordion-item %}}

{{% accordion-item title="9. How do I use Afton for my Slurm job? Do I need to update my job scripts?" id="faq-9" %}}

Most users should be able to submit jobs without changing their Slurm job scripts, unless:
- invalid request due to partition changes (see ["What are the changes to the hardware partitions?"](#faq-6))

    - *Example:* A job submitted to `largemem` will become invalid since the partition is removed. One should submit to `standard` with `--mem=...` to specify the memory.

- cost considerations (see [How is compute time charged on the Rivanna and Afton systems?](#faq-12))
    - *Example:* Instead of running a light GPU job on an A100 in `gpu`, request an RTX2080 or RTX3090 in `interactive` via `--gres=gpu`.

- need specific Rivanna vs Afton hardware for performance/reproducibility/benchmarking reasons (only relevant for `standard` and `interactive`) 
    - *Example:* To restrict a `standard` job to run on the new Afton hardware, provide a constraint (`-C`):
```
#SBATCH -p standard
#SBATCH --constraint=afton
```
and likewise for Rivanna hardware:
```
#SBATCH -p standard
#SBATCH --constraint=rivanna
```

{{% /accordion-item %}}

{{% accordion-item title="10. How can I use the new Afton hardware in Open OnDemand?" id="faq-10" %}}

When setting up an *Interactive App* session in Open Ondemand you may enter the `--constraint=afton` or `--constraint=rivanna` feature constraint in `Optional: Slurm Option ( Reservation, Constraint )` field.

Available feature constraints are listed here: ["What are hardware features? What are the default hardware features for each partition?"](#faq-8).  

{{% /accordion-item %}}

{{% accordion-item title="11. Do I need to recompile my code?" id="faq-11" %}}

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

{{% accordion-item title="12. How is compute time charged on the Rivanna and Afton systems?" id="faq-12" %}}

Starting on Jul 2, a new service unit (SU) charge rate policy will be implemented to reflect more closely the actual hardware cost. For all non-GPU jobs, the SU charge rate will be based on the amount and type of CPU cores (Intel on Rivanna, AMD on Afton) plus memory allocated. For GPU jobs (in `gpu` and `interactive`), the SU charge rate will be based on the number and type of GPU devices allocated.

{{< table title="charge-rate" class="table table-striped" >}}
| Partition | Hardware | Charge per core | Charge per GB memory | Charge per GPU device| 
|---|---|---|---|---| 
|standard| Rivanna | | | n/a |
|standard| Afton   | | | n/a |
|parallel| Afton   | | | n/a |
|gpu     | A40     | n/a | n/a | |
|gpu     | A6000   | n/a | n/a | |
|gpu     | V100    | n/a | n/a | |
|gpu     | A100 (40G)| n/a | n/a | |
|gpu     | A100 (80G)| n/a | n/a | |
|interactive | Rivanna (non-GPU) | | | n/a |
|interactive | Afton (non-GPU) | | | n/a |
|interactive| RTX2080 (GPU) | n/a | n/a | |
|interactive| RTX3090 (GPU) | n/a | n/a | |
{{< /table >}}

{{% /accordion-item %}}

{{% accordion-item title="13. Why are there different charge rates for Rivanna, Afton, and GPU hardware?" id="faq-13" %}}

Starting on Jul 2, a new charge rate policy will be implemented to reflect more closely the actual hardware cost. For all non-GPU jobs, the charge rate will be based on the amount of CPU cores and memory allocated. For GPU jobs (in `gpu` and `interactive`), the charge rate will be based on the amount of GPU devices allocated.

Use of Afton hardware may allow jobs to complete faster but may consume more SUs overall due to a higher burn rate.

{{% /accordion-item %}}

{{% accordion-item title="14. What is fairshare?" id="faq-14" %}}

To ensure fair access to the HPC environment for all research groups, we utilize Slurm's job accounting and fairshare system. This system influences job placement priority, with a higher fairshare value typically resulting in a higher queue priority. However, the fairshare value decreases as more service units are consumed.

Crucially, fairshare values are linked to the Principal Investigator (PI) of the allocation being utilized. This connection prevents any single group from dominating the resources and maintains fairness across PI groups, especially those who have not utilized their fairshare allocation for an extended period.

Paid service units place fairshare values and job priority above those of users utilizing instructional or standard allocations. 

{{% /accordion-item %}}

{{% accordion-item title="15. How do use of different hardware and service unit burn rates affect my fairshare?" id="faq-15" %}}

The high performance new Afton hardware as well as the higher-end GPU hardware incur higher service unit (SU) burn rates. For example, allocation of 40 cores and 256GB of memory on a new Afton node consumes more service units per hour than the same cpu core and memory allocation on an older Rivanna node. Similarly, use of an NVIDIA A100 80GB GPU device incurs a higher SU charge per hour compared to a lower-end NVIDIA A6000 GPU device.

The more SUs have been consumed, the lower the fairshare value drops. This will impact the user's priority when submitting new jobs with the same allocation.

Use of Afton hardware may allow jobs to complete faster but may consume more SUs overall due to a higher burn rate. See ["How is compute time charged on the Rivanna and Afton systems?"](#faq-12).

{{% /accordion-item %}}

{{% accordion-item title="16. How can I get help?" id="faq-16" %}}

Please contact our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>, or join us for our [virtual office hours](/support/#office-hours) every Tuesday, 3-5 p.m. and Thursday, 10-12 p.m..

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
