+++
description = ""
title = "Rivanna"
draft = false
date = "2019-05-28T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","supercomputer","allocations","queues","storage"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

<div class="bd-callout bd-callout-warning">
<h4>Rivanna</h4>
<p>Rivanna is the University of Virginia's High-Performance Computing (HPC) system. Time on Rivanna is allocated as Service Units (SUs). One SU corresponds to one core-hour. Multiple SUs make up what is called an allocation (e.g., a new allocation = 100K SUs). Allocations are managed through <a href="https://mygroups.virginia.edu/" target="_new" style="font-weight:bold;">MyGroups</a> groups that are automatically created for Principal Investigators (PIs) when they submit an allocation request. All UVA faculty, staff, and postdoctoral associates are considered PIs and therefore eligible for an allocation on Rivanna. Students—both graduate and undergraduate—cannot request allocations, but they are allowed to use Rivanna as members of a MyGroups group controlled by a PI.</p>
<p>Each PI is ultimately responsible for managing the roster of users in his/her MyGroups account although PIs may delegate day-to-day management to one or more other members.</p>
</div>

<p class="lead">The sidebar to your right contains important information for Rivanna users. Please read each section carefully.</p>
<p class="lead">New users are invited to attend one of our free orientation sessions ("Introduction to the HPC System") held throughout the year during office hours or by appointment.</p>

<div style="width:100%;height:4rem;"></div>

<div class="card-group">
<div class="card shadow col-md-5 p-3 mb-5 bg-white rounded" style="margin-right:3rem;border:solid 1px #ccc;"">
  <div class="card-body">
    <h5 class="card-title">Get Access</h5>
    <p class="card-text">Request access to Rivanna HPC for your research. Add collaborators to your work.</p>
    <a href="/userinfo/rivanna/overview/"><button class="btn btn-warning">Request an Allocation</button></a>
  </div>
</div>
<div class="card shadow col-md-5 p-3 mb-5 bg-white rounded" style="border:solid 1px #ccc;"">
  <div class="card-body">
    <h5 class="card-title">Login & File Transfer</h5>
    <p class="card-text">How to log in? How to move large datasets to the HPC sluter? Learn how.</p>
    <a href="/userinfo/rivanna/login/"><button class="btn btn-warning">Learn More</button></a>
  </div>
</div>
</div>
<div class="card-group">
<div class="card shadow col-md-5 p-3 mb-5 bg-white rounded" style="margin-right:3rem;border:solid 1px #ccc;"">
  <div class="card-body">
    <h5 class="card-title">Software</h5>
    <p class="card-text">Find and run software for HPC jobs. Learn how to load and use modules.</p>
    <a href="/userinfo/rivanna/software/overview/"><button class="btn btn-warning">Learn More</button></a>
  </div>
</div>
<div class="card shadow col-md-5 p-3 mb-5 bg-white rounded" style="border:solid 1px #ccc;"">
  <div class="card-body">
    <h5 class="card-title">Storage</h5>
    <p class="card-text">Learn about the vaious storage options within Rivanna: for users, groups, and temporary.</p>
    <a href="/userinfo/rivanna/storage/"><button class="btn btn-warning">Learn More</button></a>
  </div>
</div>
</div>
<div class="card-group">
<div class="card shadow col-md-5 p-3 mb-5 bg-white rounded" style="margin-right:3rem;border:solid 1px #ccc;"">
  <div class="card-body">
    <h5 class="card-title">Running Jobs</h5>
    <p class="card-text">Your code is ready. Your data is in place. Learn how to run your jobs across the cluster, and advanced SLURM features.</p>
    <a href="/userinfo/rivanna/slurm/"><button class="btn btn-warning">Learn More</button></a>
  </div>
</div>
<div class="card shadow col-md-5 p-3 mb-5 bg-white rounded" style="border:solid 1px #ccc;">
  <div class="card-body">
    <h5 class="card-title">Usage Policies</h5>
    <p class="card-text">Understand what is expected of you as a Rivanna HPC user. All users must comply with these requirements.</p>
    <a href="/userinfo/rivanna/overview/#usage-policies"><button class="btn btn-warning">Learn More</button></a>
  </div>
</div>
</div>


<div id="accordion" style="margin-top:4rem;margin-bottom:4rem;">
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style="text-decoration:none;color:black;font-weight:bold;font-size:110%;">
          Queuing Policies
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body" style="padding:1rem;">
        Rivanna is a managed resource; users must submit jobs to queues controlled by a resource manager, also known as a queueing system.  The manager in use on Rivanna is SLURM.  SLURM refers to queues as partitions because they divide the machine into sets of resources.  There is no default partition and each job must request a specific partition.  Partitions and access policies are subject to change, but the following table shows the current structure.  Note that memory may be requested per core or for the overall job.  If the total memory required for the job is greater than the number of cores requested multiplied by the maximum memory per core, the job will be charged for the additional cores whether they are used or not.  In addition, jobs running on more than one core may still require a request of total memory rather than memory per core, since memory per core is enforced by the system but some multicore software packages (ANSYS, for example) may exceed that for a short time even though they never exceed cores x memory/core.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" style="text-decoration:none;color:black;font-weight:bold;font-size:110%;">
          Hardware Configuration
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body" style="padding:1rem;">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style="text-decoration:none;color:black;font-weight:bold;font-size:110%;">
          Storage Options
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body" style="padding:1rem;">
      </div>
    </div>
  </div>
</div>

- - -

# Usage Policies

Research computing resources at the University of Virginia are for use by faculty, staff, and students of the University and their collaborators in academic research projects.  Personal use is not permitted.  Users must comply with all University policies for access and security to University resources.  The HPC system has additional usage policies to ensure that this shared environment is managed fairly to all users. UVA's Research Computing (RC) group reserves the right to enact policy changes at any time without prior notice.
 
## Frontends

Exceeding the limits on the frontend will result in the user’s process(es) being killed. Repeated violations will result in a warning; users who ignore warnings risk losing access privileges.
 
## Parallel Partition

Users must request a minimum of four cores (and no more than 2400 cores) when submitting a job to the parallel queue.
 
## Software Licenses

Excessive consumption of licenses for commercial software, either in time or number, if determined by system and/or RC staff to be interfering with other users' fair use of the software, will subject the violator's processes or jobs to termination without warning.  Staff will attempt to issue a warning before terminating processes or jobs but inadequate response from the violator will not be grounds for permitting the processes/jobs to continue.
 
## Inappropriate Usage

Any violation of the University’s security policies, or any behavior that is considered criminal in nature or a legal threat to the University, will result in the immediate termination of access privileges without warning.

<br clear=all />
