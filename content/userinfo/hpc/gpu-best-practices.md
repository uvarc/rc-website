+++
description = ""
title = "GPU Best Practices"
draft = false
date = "2025-07-25T17:45:12-05:00"
tags = ["hpc","rivanna","afton","utilization","slurm","supercomputer","queues","gpu"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

# GPU Best Practices (High‑Level Guidance)

---

## Core Principles

1. **Measure before you scale.** Always take a short, single‑GPU baseline and record simple metrics.
2. **Right‑size, don’t over‑ask.** Request only the GPUs/CPUs/RAM and walltime your measurements justify.
3. **Keep GPUs busy.** If utilization is low, fix input/data issues before adding more GPUs.
4. **Short interactive, long batch.** Use OOD for quick experiments; move long work to SLURM.
5. **Be a good citizen.** Release idle sessions, clean up scratch, and prefer storage patterns that reduce system load.

---

## Right‑Sizing in 5 Steps

1. **Baseline (≤5 minutes):** Run a tiny slice on 1 GPU. Note:

   * Throughput (samples/s or tokens/s)
   * GPU utilization and memory usage
   * Any stalls from CPU or I/O
2. **Find the knee:** Increase batch size and enable mixed precision if supported. Stop when throughput stops improving or memory is exhausted.
3. **Unblock the pipeline:** If GPUs are idle, tune the data path (fewer tiny files, local scratch, sensible parallelism). Re‑measure.
4. **Decide to scale:** Add GPUs only if the job speeds up *near* linearly. If efficiency drops sharply, stay smaller.
5. **Set requests:** Convert measured step/epoch time into walltime with a modest buffer. Request CPUs/RAM in proportion to actual need.

---

## OOD vs SLURM (When to Use What)

* **Open OnDemand (interactive):** Fast prototyping, visualization, short tests. Keep sessions short and purposeful. Stop them when not actively using the GPU.
* **SLURM batch (production):** Long or repeatable runs, sweeps, or multi‑GPU/multi‑node training. Log metrics and use checkpoints so work can resume if preempted or time‑limited.

---

## Scaling & Efficiency (Rules of Thumb)

* **Start single‑GPU.** Only scale once your single‑GPU run is clearly compute‑bound.
* **Scale gradually.** Test 1→2→4→8 GPUs. Keep going only if speedup per added GPU remains healthy.
* **Stop when it flattens.** If added GPUs don’t meaningfully reduce time‑to‑result, you’ve hit bottlenecks (I/O, synchronization, model limits).
* **Small, concurrent jobs:** Consider partitioning large GPUs (e.g., MIG/MPS where available) for many lightweight inference tasks.

---

## Monitoring & Hygiene

* **During runs:** Periodically check utilization, memory, and throughput trend. Watch for drift or stalls.
* **After runs:** Capture a simple summary (config + metrics). Keep what helps you compare future runs; delete bulky, unused artifacts.
* **Storage:** Use scratch/local fast storage for hot data and checkpoints. Avoid floods of tiny files; favor chunked/sharded formats.

---

## Resource Etiquette

* **Right‑size by evidence.** Measurements justify requests—nothing more, nothing less.
* **Release promptly.** End idle OOD sessions and cancel stuck jobs.
* **Share context.** When asking for help, include a short description of the task, resources requested, and your key measurements.

---

## Quick Decision Guide

* **New idea?** → OOD short session → measure.
* **Throughput improving with batch/precision?** → keep tuning until the knee.
* **GPU still idle?** → fix data/I/O before scaling.
* **Near‑linear speedup when adding GPUs?** → scale; else, stay smaller.
* **Run >1 hour or needs a queue slot?** → SLURM batch with checkpoints.

---

## What to Report When Seeking Help

* What you tried (one sentence) and the goal.
* Your baseline measurements (throughput, GPU util/memory) and any obvious bottleneck.
* What you requested (GPUs/CPUs/RAM/time) and whether the job finished or stalled.

---
