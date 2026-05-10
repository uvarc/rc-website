+++
description = ""
title = "Using UVA’s High-Performance Computing Systems"
draft = false
date = "2024-12-03T00:00:00-05:00"
tags = ["hpc","rivanna","parallel-computing","supercomputer","allocations","queues","storage","infrastructure"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"
layout = "single"
aliases = [ "/rivanna" ]
+++

![Rivanna Status](https://img.shields.io/badge/dynamic/json?color=color&label=Rivanna&query=message&url=https%3A%2F%2Ftja4lfp3da.execute-api.us-east-1.amazonaws.com%2Fapi%2Fbadge%2Frivanna&style=for-the-badge)

{{% callout %}}
  <img src="/images/hpc-cluster.jpg" alt="HPC" style="float:right;max-width:35%;margin-left:1rem;" />
  {{< get_allocation_blurb name="Afton" >}}
{{% /callout %}}

{{% callout %}}
  {{< get_allocation_blurb name="Rivanna" >}}
{{% /callout %}}

{{< systems-boilerplate >}}

{{< lead >}}
The sections below contain important information for new and existing Rivanna and Afton users. Please read each carefully.
{{< /lead >}}

{{< lead >}}
New users are invited to attend one of our free orientation sessions ("Introduction to HPC") held throughout the year.
{{< /lead >}}

<div>
<a href={{% intro-rivanna-request %}}><button  class="btn btn-primary btn-md">Sign up for an "Intro to HPC" session</button></a>
</div>

- - -

# Get Started

<div class="card-group">
  <div class="card image-shadow col-md-5 p-3 mb-5 rounded" style="margin-right:3rem;border:solid 3px #ccc;">
    <div class="card-body">
      <h5 class="card-title">Access / Allocations</h5>
      <p class="card-text">Learn how to request an allocation and add collaborators.</p>
      <a href="/userinfo/hpc/access/"><button class="btn btn-primary">Request an Allocation</button></a>
    </div>
  </div>
  <div class="card image-shadow col-md-5 p-3 mb-5 bg-white rounded" style="border:solid 1px #ccc;"">
    <div class="card-body">
      <h5 class="card-title">Logging In</h5>
      <p class="card-text">Log in through a Web browser or a command-line tool.</p>
      <a href="/userinfo/hpc/login/"><button class="btn btn-warning">Learn More</button></a>
    </div>
  </div>
</div>

<div class="card-group">
  <div class="card image-shadow col-md-5 p-3 mb-5 bg-white rounded" style="margin-right:3rem;border:solid 1px #ccc;"">
    <div class="card-body">
      <h5 class="card-title">File Transfer</h5>
      <p class="card-text">Moving files between Rivanna/Afton and other systems.</p>
      <a href="/userinfo/data-transfer/"><button class="btn btn-warning">Learn More</button></a>
    </div>
  </div>
  <div class="card image-shadow col-md-5 p-3 mb-5 bg-white rounded" style="border:solid 1px #ccc;"">
    <div class="card-body">
      <h5 class="card-title">Software</h5>
      <p class="card-text">See a listing of available software.</p>
      <a href="/userinfo/hpc/software"><button class="btn btn-warning">Learn More</button></a>
    </div>
  </div>
</div>

<div class="card-group">
  <div class="card image-shadow col-md-5 p-3 mb-5 bg-white rounded" style="margin-right:3rem;border:solid 1px #ccc;"">
    <div class="card-body">
      <h5 class="card-title">Storage</h5>
      <p class="card-text">Options for free short-term and leased long-term storage</p>
      <a href="/userinfo/hpc/storage/"><button class="btn btn-warning">Learn More</button></a>
    </div>
  </div>
  <div class="card image-shadow col-md-5 p-3 mb-5 bg-white rounded" style="border:solid 1px #ccc;"">
    <div class="card-body">
      <h5 class="card-title">Running Jobs in Slurm</h5>
      <p class="card-text">Submitting jobs to Rivanna/Afton through the Slurm resource manager</p>
      <a href="/userinfo/hpc/slurm/"><button class="btn btn-warning">Learn More</button></a>
    </div>
  </div>
</div>

<div class="card-group">
  <div class="card image-shadow col-md-5 p-3 mb-5 bg-white rounded" style="margin-right:3rem;border:solid 1px #ccc;">
    <div class="card-body">
      <h5 class="card-title">Job Queues</h5>
      <p class="card-text">Determine the best queue (or “partition”) for running your jobs.</p>
      <a href="#job-queues"><button class="btn btn-warning">Learn More</button></a>
    </div>
  </div>
  <div class="card image-shadow col-md-5 p-3 mb-5 bg-white rounded" style="border:solid 1px #ccc;">
    <div class="card-body">
      <h5 class="card-title">Usage Policies</h5>
      <p class="card-text">Understand the terms and conditions for using Rivanna/Afton.</p>
      <a href="/userinfo/hpc/#usage-policies"><button class="btn btn-warning">Learn More</button></a>
    </div>
  </div>
</div>

<div class="card-group">
  <div class="card image-shadow col-md-5 p-3 mb-5 bg-white rounded" style="margin-right:3rem;border:solid 1px #ccc;">
    <div class="card-body">
      <h5 class="card-title">FAQs</h5>
      <p class="card-text">Frequently Asked Questions.</p>
      <a href="/userinfo/faq/rivanna-faq"><button class="btn btn-warning">Rivanna and Afton FAQ</button></a>
    </div>
  </div>
</div>

- - -

# Overview

A high performance computing cluster is typically made up of at least four service layers:

1. **Login nodes** - Where you log in, interact with data and code, and submit jobs.
2. **Compute nodes** - Where production jobs are run. On Rivanna and Afton these nodes are heterogeneous; some have more memory, some have GPU devices, and so forth. Partitions are homogeneous so you can select specialty hardware by your partition request, sometimes along with a resource request (gres).
3. **Storage** - Where files are stored, accessible by all nodes in the cluster.
4. **Resource Manager** - A software system that accepts job requests, schedules the jobs on a node or set of nodes, then manages their execution.

<p style="margin-top:3rem;">Click on elements of the image to learn more:</p>
<img src="/images/hpc-overview.png" alt="Parts of a High Performance Computing cluster" style="margin-top:0rem;display:block;" class="hpc-overview" usemap="#hpc_map" data-bg_fill="rgba(244,124,67,0.5)" />
<map name="hpc_map">
  <area id="login-nodes" alt="Login Nodes" title="Login Nodes" href="/userinfo/hpc/login/" shape="rect" coords="243,37,555,100" style="outline:none;" class="hpchover" />
  <area id="compute-nodes" alt="Compute Node" title="Compute Node" href="/userinfo/hpc/#job-queues" shape="rect" coords="38,150,700,390" style="outline:none;" class="hpchover" />
  <area id="storage" alt="Storage" title="Storage" href="/userinfo/hpc/storage/" shape="rect" coords="70,440,700,580" style="outline:none;" class="hpchover" />
  <area id="resource-manager" alt="Resource Manager" title="Resource Manager" href="/userinfo/hpc/slurm/" shape="rect" coords="500,38,650,138" style="outline:none;" class="hpchover" />
</map>


- - -

# System Details

## Hardware Configuration {#hardware-configuration}

{{< new-rivanna-specs >}}

{{< systems-boilerplate >}}

## Job Queues

Rivanna and Afton are managed resources; users must submit jobs to queues controlled by a resource manager, also known as a queueing system.  The manager in use on Rivanna and Afton is Slurm.  Slurm refers to queues as partitions because they divide the machine into sets of resources.  There is no default partition and each job must request a specific partition.  Partitions and access policies are subject to change, but the following table shows the current structure.  Note that memory may be requested per core or for the overall job.  If the total memory required for the job is greater than the number of cores requested multiplied by the maximum memory per core, the job will be charged for the additional cores whether they are used or not.  In addition, jobs running on more than one core may still require a request of total memory rather than memory per core, since memory per core is enforced by the system but some multicore software packages (ANSYS, for example) may exceed that for a short time even though they never exceed cores x memory/core.

{{< new-rivanna-queue >}}

### Remarks

- `standard` maximum *aggregate* CPU cores allowed for a single user’s running jobs is 1000.
- `parallel` requires *at least* 2 nodes and 4 CPU cores.
- Slurm's default memory unit is in MB. Different units may be specified, e.g. `--mem=100G`, where 1G = 1024M.
- The `gpu` partition is dedicated to jobs that can utilize a general purpose graphics processing unit (GPGPU). In Slurm scripts you must request at least one GPU device through `--gres=gpu`. Jobs that do not utilize any GPUs are not allowed in this partition.
- `interactive` maximum *aggregate* CPU cores (GPUs) is 24 (2) for a single user.
- The NVIDIA DGX BasePOD offers high-performance GPUs that bring new AI and ML functionality to support parallel GPU computing and large deep-learning models.
<a href="/userinfo/hpc/basepod"><button class="btn btn-success">Learn More</button></a> &nbsp;&nbsp;

- - -

# Usage Policies

Research computing resources at the University of Virginia are for use by faculty, staff, and students of the University and their collaborators in academic research projects.  Personal use is not permitted.  Users must comply with all University policies for access and security to University resources.  The HPC system has additional usage policies to ensure that this shared environment is managed fairly to all users. UVA's Research Computing (RC) group reserves the right to enact policy changes at any time without prior notice.

## Login Nodes

Exceeding the limits on the login nodes (frontend) will result in the user’s process(es) being killed. Repeated violations will result in a warning; users who ignore warnings risk losing access privileges.

## Scratch Directory

{{% scratch-policy %}}

## Software Licenses

Excessive consumption of licenses for commercial software, either in time or number, if determined by system and/or RC staff to be interfering with other users' fair use of the software, will subject the violator's processes or jobs to termination without warning.  Staff will attempt to issue a warning before terminating processes or jobs but inadequate response from the violator will not be grounds for permitting the processes/jobs to continue.

## Inappropriate Usage

Any violation of the University’s security policies, or any behavior that is considered criminal in nature or a legal threat to the University, will result in the immediate termination of access privileges without warning.

## Acceptable Use of the University’s Information Technology Resources

Users are required to comply with all applicable University policies governing [acceptable use of information technology resources](https://uvapolicy.virginia.edu/policy/irm-002). This includes restrictions on downloading or using prohibited applications such as DeepSeek AI, TikTok, WeChat, and CapCut on RC resources. 

In addition, users are responsible for safeguarding research records in accordance with [RES-002: Ownership, Retention, Safeguarding, Management, and Transfer of Research Records](https://uvapolicy.virginia.edu/policy/RES-002) and should adhere to the University's [Generative AI Use Guidelines](https://in.virginia.edu/genai-useguidelines). This includes maintaining research records on University-owned and/or University-managed devices, systems, or services. The University recommends the use of appropriately contracted and licensed Gen AI tools to prevent the inadvertent exposure of internal use or sensitive data.

<br clear=all />

<script>
if (window.location.search == '?showHardware') {
  $('#collapseOne').addClass('show');
}
</script>
