+++
description = ""
title = "Rivanna Queues"
draft = false
date = "2020-05-12T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","gpu","allocations","queues"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

Several queues (or "partitions") are availble to users for different types of jobs.  One queue is restricted to single-node (serial or threaded) jobs; another for multinode parallel programs, and others are for access to specialty hardware such as large-memory nodes or nodes offering GPUs.

<table class="table" style="font-weight:normal;">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Partition</th>
      <th scope="col">Max time per job</th>
      <th scope="col">Max nodes per job</th>
      <th scope="col">Max cores per job</th>
      <th scope="col">Max memory per core</th>
      <th scope="col">Max memory per node per job</th>
      <th scope="col">SU Charge Rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row"><code><a href="/userinfo/rivanna/slurm/#basic-serial-program">standard</a></code></th>
      <th scope="row">7 days</th>
      <th scope="row">1</th>
      <th scope="row">40</th>
      <th scope="row">9GB</th>
      <th scope="row">375GB</th>
      <th scope="row">1.00</th>
    </tr>
    <tr>
      <th scope="row"><code><a href="/userinfo/rivanna/slurm/#job-scripts-for-parallel-programs">parallel</a></code></th>
      <th scope="row">3 days</th>
      <th scope="row">45</th>
      <th scope="row">900</th>
      <th scope="row">9GB</th>
      <th scope="row">120GB</th>
      <th scope="row">1.00</th>
    </tr>
    <tr>
      <th scope="row"><code>largemem</code></th>
      <th scope="row">4 days</th>
      <th scope="row">1</th>
      <th scope="row">16</th>
      <th scope="row">64GB</th>
      <th scope="row">975GB</th>
      <th scope="row">1.00</th>
    </tr>
    <tr>
      <th scope="row"><code><a href="/userinfo/rivanna/slurm/#gpu-intensive-computation">gpu</a></code></th>
      <th scope="row">3 days</th>
      <th scope="row">4</th>
      <th scope="row">8</th>
      <th scope="row">32GB</th>
      <th scope="row">240GB</th>
      <th scope="row">3.00 <a href="#gpu-detail">*</a></th>
    </tr>
    <tr>
      <th scope="row"><code>knl</code></th>
      <th scope="row">3 days</th>
      <th scope="row">8</th>
      <th scope="row">512 cores / 2048 threads</th>
      <th scope="row">3GB (per physical core)</th>
      <th scope="row">192GB</th>
      <th scope="row">1.00</th>
    </tr>
    <tr>
      <th scope="row"><code>dev</code></th>
      <th scope="row">1 hour</th>
      <th scope="row">2</th>
      <th scope="row">8</th>
      <th scope="row">6GB</th>
      <th scope="row">36GB</th>
      <th scope="row">0.00</th>
    </tr>
  </tbody>
</table>

<p style="font-size:90%;"><a name="gpu-detail">*</a> GPU jobs incur at least 3 SUs: By default a job uses 1 core (1 SU) + 1 GPU (2 SUs) for a total of 3. To calculate for more intensive jobs, add the number of cores plus twice the number of GPUs requested.</p>
