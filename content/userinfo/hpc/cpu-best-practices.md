+++
description = ""
title = "CPU Memory Best Practices"
draft = false
date = "2026-07-25T17:45:12-05:00"
tags = ["hpc","rivanna","afton","utilization","slurm","supercomputer","queues"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++


---

Efficient CPU memory usage helps ensure that the shared cluster resources remain available for all users. Requesting too much memory can lead to longer queue times (for you and others), while requesting too little may cause jobs to fail.

Aim to request an appropriate amount memory for all of your jobs.
•	Target utilization: ~80–90% of requested memory 

If you are running many similar jobs (e.g., job arrays, parameter sweeps, workflows processing many different samples, etc.), it is especially important to **estimate memory needs before scaling up.**

**Why this matters**

Submitting hundreds or thousands of jobs with overestimated memory can:
•	Increase queue wait times 
•	Compound wasted memory
•	Reduce overall cluster throughput 
•	Lead to significant unused allocated memory
•	Once all a node's memory is used, any remaining CPUs on a node are inaccessible to other users.

---

## How to Request Memory in Slurm

You can request memory in two main ways:
•	Total memory:
   #SBATCH --mem=16G
•	Memory per CPU core:
   #SBATCH --mem-per-cpu=4G

---

## How to Check Memory Usage

1. seff (after job completes)
Provides a quick summary of efficiency:
seff <JobID>
Example output:
Memory Utilized: 1.2 GB
Memory Efficiency: 7.5% of 16.0 GB
 
2. jobstats (during or after job)
More detailed and works for running jobs:
module load jobstats; jobstats <JobID>
Provides:
•	Memory usage (maximum)
•	CPU utilization 
 
3. Grafana Dashboard (during or after job)
Provides interactive monitoring of job performance, including:
•	Memory usage over time 
•	CPU utilization trends 
•	Node-level resource usage 
Best for:
•	Visualizing spikes vs steady usage 
•	Identifying peak memory requirements 

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

---

## Practical Workflow for Right-Sizing Memory

1. Run a small number of test jobs first

Before launching a large batch:

Submit 1–3 representative jobs
Use realistic input sizes (or slightly larger, if unsure)
Monitor with:
jobstats <JobID>
seff <JobID> (after completion)
Grafana Dashboard

2. Identify peak memory usage (not just average)

Focus on:

Maximum memory used during the job
Not just final or average values

Grafana is especially useful here to spot memory spikes over the course of your job(s) which can help identify potential code inefficiencies.

3. Account for variation in inputs

Memory usage can vary depending on:

Input file size (e.g., small vs large FASTQ files)
Data complexity (e.g., coverage depth, number of features)
Model or parameter size (for ML/AI workloads)

Make sure to:

Test both a typical case and a worst-case input
Size your memory request based on the specific workload

Example 100 job workflow:
95/100 jobs expect to consume 5GB memory
5/100 jobs expect to consume 90GB memory
Do not request 100 GB for every job - leads to significant wasted memory
Do split workflow into separate arrays i.e. 95 jobs requesting 10GB and 5 jobs requesting 100GB

4. Add a small safety margin

Once you identify peak usage:

Add ~10–20% buffer to avoid out-of-memory failures
Avoid large safety margins (e.g., 2–10×), which lead to inefficiency

5. Scale up

After validating your memory needs:

Launch your full job array or pipeline
Use consistent, right-sized memory requests
Example

Instead of submitting 1,000 jobs like this:

#SBATCH --mem=16G

You might find after testing:

Actual peak usage: ~1.2 GB
Recommended request: ~2 GB
#SBATCH --mem=2G

This can dramatically improve scheduling efficiency and reduce wait times.


Workflows may have different steps that have very different memory requirements.

Avoid using one large memory value for all steps
Assign step-specific memory requirements where possible
Test the most memory-intensive steps individually

### Summary

✔ Run a few test jobs first
✔ Measure peak memory usage
✔ Account for input variability
✔ Add a modest safety buffer
✔ Then scale to full production

---

## Common Pitfalls

•	Over-requesting “just to be safe”
   → leads to longer queue times and wasted resources 
•	Forgetting memory scales with CPUs
   → --mem-per-cpu × CPUs can unintentionally request large totals 
•	Ignoring peak vs average usage
   → short spikes matter (Grafana helps here) 
•	Not re-tuning after pipeline changes
   → different steps may have very different memory needs 

---

## Need Help?

If you're unsure how much memory your workflow requires, Research Computing is happy to help:

•	Review job scripts 
•	Analyze seff/jobstats/Grafana output 
•	Recommend optimized resource requests 

https://www.rc.virginia.edu/support/