+++
categories = ["userinfo"]
type = "rivanna"
date = "2025-03-28T00:00:00-05:00"
tags = [
    "hpc","rivanna","parallel-computing","software","containers"
]
draft = false
title = "HGX H200 Nodes and the NVIDIA DGX BasePOD™"
description = ""
author = "RC Staff"

+++

# HGX H200 Nodes
*March 28, 2025*

We’re excited to announce the beta release of our newest high-performance compute node featuring the NVIDIA HGX H200 platform. This node is built on the Dell PowerEdge XE9680 server model, and we currently have one server available for testing.

The node is equipped with dual Intel Xeon Platinum 8468 CPUs, offering a total of 96 cores running at 2.1GHz, and comes with a massive 2TB of memory. This addition features eight NVIDIA HGX H200 GPUs based on the NVIDIA Hopper architecture.

Each H200 GPU includes 141 GB of memory and delivers up to 4.8 TB/s of memory bandwidth. High-speed communication between GPUs is supported via 900 GB/s NVLink, while connectivity between CPU and GPU uses PCIe Gen5, providing up to 128 GB/s bi-directional bandwidth. More information can be found [here](https://www.nvidia.com/en-us/data-center/h200/).

This node is now integrated into our SLURM scheduler and can be accessed using the `gpu` partition. H200 GPUs must be requested specifically by either including `--gres=gpu:h200` or adding the SLURM feature constraint `--constraint=h200` in the job script. For example
```
#SBATCH -p gpu
#SBATCH --gres=gpu:h200
```
or
```
#SBATCH -p gpu
#SBATCH --contraint=h200
```
Jobs that do not specify the h200 gres/constraint will not start on the H200s.

{{% callout %}}
Note:
The H200 node may be taken out of service during beta-release phase on short notice for ad hoc configuration adjustments and diagnoses outside of scheduled maintenance windows. Usage of the H200s will be charged at production rate, but failed jobs will incur no SU charges. The node is destined to go into production by May 1st. 

During the beta-release, GPUs can only be accessed through Slurm batch jobs. Jobs through Open OnDemand  are not available.
{{% /callout %}}

Information for accounting and scheduling purposes can be found [here](https://www.rc.virginia.edu/userinfo/hpc/#hardware-configuration).

We invite users with GPU-intensive workflows to take advantage of these powerful nodes and provide feedback during the beta release phase. Any questions or feedback should be communicated through the support web form [here](https://www.rc.virginia.edu/form/support-request/) on our website with "H200 Beta Feedback" as the description of the request.

# Introducing the NVIDIA DGX BasePOD™
*May 30, 2023*

As artificial intelligence (AI) and machine learning (ML) continue to change how academic research is conducted, the NVIDIA DGX BasePOD, or BasePOD, brings new AI and ML functionality UVA's High-Performance Computing (HPC) system. The BasePOD is a cluster of high-performance GPUs that allows large deep-learning models to be created and utilized at UVA. 

The NVIDIA DGX BasePOD™ on Rivanna and Afton, hereafter referred to as the POD, is comprised of:
- 18 DGX A100 nodes with
  - 2TB of RAM memory per node
  - 80 GB GPU memory per GPU device

Compared to the regular GPU nodes, the POD contains **advanced features** such as:
- NVLink for fast multi-GPU communication
- GPUDirect RDMA Peer Memory for fast multi-node multi-GPU communication
- GPUDirect Storage with 200 TB IBM ESS3200 (NVMe) SpectrumScale storage array

which makes it ideal for the following types of jobs:
- The job needs multiple GPUs on a single node or even multiple nodes.
- The job (can be single- or multi-GPU) is I/O intensive.
- The job (can be single- or multi-GPU) requires more than 40 GB GPU memory. (The non-POD nodes with the highest GPU memory are the regular A100 nodes with 40 GB GPU memory.)

Detailed specs can be found in the [official document](https://docs.nvidia.com/dgx-basepod-reference-architecture-dgx-a100-and-dgx-h100.pdf) (Chapter 3.1).

# Accessing the POD

The POD nodes are contained in the `gpu` partition with a specific Slurm constraint, requested with `-C` or `--constraint=`.

## Slurm script

```bash
#SBATCH -p gpu
#SBATCH --gres=gpu:a100:N # replace N with the number of GPUs per node requested
#SBATCH -C gpupod
```

## Open OnDemand

Select `NVIDIA A100` in the GPU type dropdown.  Select the number requested in the appropriate textbox.  Select `Yes` for `Show Additional Options.` Into the h “Optional: Slurm Option” textbox type:
```
-Cgpupod
```

## Remarks
1. Before running on multiple nodes, please make sure the job can scale well to 8 GPUs on a single node.
1. Multi-node jobs on the POD should request all GPUs on the nodes, i.e. `--gres=gpu:a100:8`.
1. You may have already used the POD by simply requesting an A100 node without the constraint, since 18 out of the total 20 A100 nodes are POD nodes.
1. As we expand our infrastructure, there could be changes to the Slurm directives and job resource limitations in the future. Please keep an eye out for our announcements and documentation.

# Usage examples

## Deep learning

As of October 3, 2023 we are migrating toward NVIDIA’s [NGC containers](https://ngc.nvidia.com/) for deep learning frameworks such as PyTorch (2.0+) and TensorFlow (2.13+), as they have been heavily optimized to achieve excellent multi-GPU performance.

{{< alert-green >}} <b>Warning:</b> Distributed training is not automatic! Your code must be parallelizable. If you are not familiar with this concept, please visit: <a href="https://www.tensorflow.org/guide/distributed_training">TensorFlow distributed </a>, <a href=https://pytorch.org/docs/stable/notes/ddp.html>PyTorch DDP</a>.
{{< /alert-green >}}

## MPI codes

Please check the manual of your code regarding the relationship between the number of MPI ranks and the number of GPUs. For computational chemistry codes (e.g. VASP, QuantumEspresso, LAMMPS) the two are oftentimes equal, e.g.

```bash
#SBATCH --gres=gpu:a100:8
#SBATCH --ntasks-per-node=8
```

If you are building your own code, please load the modules `nvhpc` and `cuda` which provide NVIDIA compilers and CUDA libraries. **The compute capability of the POD A100 is 8.0.**

For documentation and demos, refer to the “Resources” section at the bottom of [this page](https://developer.nvidia.com/hpc-sdk).

## GPU-enabled modules

A complete list of GPU-enabled modules on the HPC system can be found [here](https://www.rc.virginia.edu/userinfo/hpc/software/gpu/). Please refer to their respective pages and/or module load messages (if any) for usage instructions.


