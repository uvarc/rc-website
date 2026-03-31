+++
description = ""
title = "GPU Best Practices"
draft = false
date = "2025-07-25T17:45:12-05:00"
tags = ["hpc","rivanna","afton","utilization","slurm","supercomputer","queues"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++


---

Efficient memory usage helps ensure that limited cluster resources remain available for all users. Requesting too much memory can lead to longer queue times (for you and others), while requesting too little may cause jobs to fail.

Aim to request an appropriate amount memory for your job.
•	Target utilization: ~70–90% of requested memory 
•	Too low (<30%) → likely over-requesting 
•	Too high (>95%) → risk of job failure (OOM)

If you are running many similar jobs (e.g., job arrays, parameter sweeps, or pipelines like Nextflow/Snakemake), it’s important to **estimate memory needs before scaling up.**

Why this matters
Submitting hundreds or thousands of jobs with overestimated memory can:
•	Increase your queue wait times 
•	Reduce overall cluster throughput 
•	Lead to significant unused allocated memory

---

## How to Request Memory in Slurm
You can request memory in two main ways:
•	Per node (total memory):
   #SBATCH --mem=16G
•	Per CPU core:
   #SBATCH --mem-per-cpu=4G

---

## OOD vs SLURM (When to Use What)

* **Open OnDemand (interactive):** Fast prototyping, visualization, short tests. Keep sessions short and purposeful. Stop them when not actively using the GPU.
* **SLURM batch (production):** Long or repeatable runs, sweeps, or multi‑GPU/multi‑node training. Log metrics and use checkpoints so work can resume if preempted or time‑limited.

## How to Check Memory Usage

1. seff (after job completes)
Provides a quick summary of efficiency:
seff <JobID>
Example output:
Memory Utilized: 1.2 GB
Memory Efficiency: 7.5% of 16.0 GB
✔ Best for: quick post-job checks
⚠ Limitation: only works after job completion
 
2. jobstats (recommended)
More detailed and works for running jobs:
module load jobstats; jobstats <JobID>

Provides:
•	Memory usage over time 
•	CPU utilization 
•	Helpful for tuning future jobs 
✔ Best for: diagnosing real usage patterns
 
3. Grafana Dashboard
Our Grafana dashboards provide interactive monitoring of job performance, including:
•	Memory usage over time 
•	CPU utilization trends 
•	Node-level resource usage 
✔ Best for:
•	Visualizing spikes vs steady usage 
•	Identifying peak memory requirements 
•	Comparing multiple jobs 

---

## Practical Workflow for Right-Sizing Memory

1.	Start with an estimate 
   o	Based on prior runs, documentation, or small tests 
2.	Run a test job 
   o	Use a reduced dataset if possible 
3.	Check usage 
   o	seff → quick efficiency check 
   o	jobstats → detailed behavior 
4.	Adjust memory 
   o	Increase if near OOM 
   o	Decrease if utilization is low 
5.	Repeat once or twice 
   o	Most jobs converge quickly to a good value 

---

## Common Pitfalls

•	Over-requesting “just to be safe”
   → leads to longer queue times and wasted resources 
•	Forgetting memory scales with CPUs
   → --mem-per-cpu × CPUs can unintentionally request large totals 
•	Ignoring peak vs average usage
   → short spikes matter (Grafana/jobstats help here) 
•	Not re-tuning after pipeline changes
   → different steps may have very different memory needs 

---

## Need Help?

If you're unsure how much memory your workflow requires, Research Computing is happy to help:
•	Review your job scripts 
•	Analyze jobstats output 
•	Recommend optimized resource requests 

https://www.rc.virginia.edu/support/