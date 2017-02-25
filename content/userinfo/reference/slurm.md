+++
author = "SOMRC Staff"
description = ""
title = "Slurm Job Scheduler (HPC)"
draft = false
date = "2017-02-08T15:28:51-05:00"
tags = ["hpc"]
categories = ["reference"]
images = [""]
type = "reference"

+++

<div class="bd-callout bd-callout-warning">
<h4>Slurm Job Scheduler</h4>
<p><code>Slurm</code> (Simple Linux Utility for Resource Management)</p>
<p><b>From Wikipedia:</b> Slurm is a free and open-source job scheduler for Linux and Unix-like kernels, 
used by many of the world's supercomputers and computer clusters. It provides three key functions. 
First, it allocates exclusive and/or non-exclusive access to resources (computer nodes) to users for some duration of time so they can perform work. 
Second, it provides a framework for starting, executing, and monitoring work (typically a parallel job such as MPI) on a set of allocated nodes. 
Finally, it arbitrates contention for resources by managing a queue of pending jobs.
</div>

- - -

Slurm is used by the Rivanna cluster. More information about using Slurm can be found at the [UVA ARCS website](http://arcs.virginia.edu/rivanna).

An example slurm script is below:

{{< gist nmagee c05b0b4778ae7412f3027a6eb9cffef2 >}}
