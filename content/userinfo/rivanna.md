+++
description = ""
title = "Rivanna"
draft = false
date = "2019-05-28T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","supercomputer","allocations","queues","storage"]
categories = ["userinfo"]
images = [""]
author = "Staff"  

+++

<div class="bd-callout bd-callout-warning">
<h4>Rivanna</h4>
Rivanna is the University of Virginia's High-Performance Computing (HPC) system.  Rivanna is open to all faculty, research staff, and graduate students of the University.   All faculty and research staff are eligible for a standard free allocation.  Larger allocations may be requested through the College of Arts and Sciences, the School of Engineering and Applied Science, or the Data Science Institute.
</div>

# Summary

UVA Researchers need three things to use Rivanna:

1. An **Allocation**, a group that provides billable service-units (SU's) for any work performed on Rivanna. SU's can be given to researchers and faculty as part of a new hire, given by your Dean, or purchased from Research Computing.

2. An authorized **Rivanna Login**. Members of your allocation group will be granted login access to Rivanna interactive nodes, and can run jobs charged to your allocation.

3. An understanding of the **SLURM** job submission engine. SLURM accepts job requests from all users and sends them to the right queues, in the most optimal order. 

[<button class="btn btn-success">Request Access</button>](https://www.virginia.edu/)

Learn more about Rivanna:

* Allocations
* Queues
* Software
* Storage
* Data Transfer

<div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" style="text-decoration:none;color:black;font-weight:bold;font-size:110%;">
          Hardware Configuration
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Queuing Policies
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">

Rivanna is a managed resource; users must submit jobs to queues controlled by a resource manager, also known as a queueing system.  The manager in use on Rivanna is SLURM.  SLURM refers to queues as partitions because they divide the machine into sets of resources.  There is no default partition and each job must request a specific partition.  Partitions and access policies are subject to change, but the following table shows the current structure.  Note that memory may be requested per core or for the overall job.  If the total memory required for the job is greater than the number of cores requested multiplied by the maximum memory per core, the job will be charged for the additional cores whether they are used or not.  In addition, jobs running on more than one core may still require a request of total memory rather than memory per core, since memory per core is enforced by the system but some multicore software packages (ANSYS, for example) may exceed that for a short time even though they never exceed cores x memory/core.

      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Storage Options
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>

- - -

# Queues

asdlfkjsdlfkj sdlfkj sdflkj sdflksdf

- - -

# Software

asdlfksaldfkj sdflk

- - -

# Storage

Ivy VM has a pool of over 2 petabytes of Network Attached Storage shared amongst users. A PI specifies the storage space s/he would like to have when requesting access to Ivy. Virtual machines do not come with any significant disk storage of their own.  

- - -

# Data Transfer

asldfkjasldfkjs dlfkjs dflkjs dflkjs dflksjd flskdjf 

- - -

# Secure HPC

<img src="https://pbs.twimg.com/media/DRQcamFX0AA9tmU.jpg" style="float:right;max-width:40%;" />

In 2019 we will launch a secure high performance computing system. This will support computationally-intensive research for sensitive data, within the Ivy secure environment.

<br clear=all />
