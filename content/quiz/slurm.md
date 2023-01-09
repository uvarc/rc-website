+++
date = "2022-01-08T23:59:16-05:00"
tags = ["quiz","rivanna","hpc"]
categories = ["quiz"]
images = [""]
about = true
author = "Staff"
description = ""
title = "SLURM Quiz"
draft = false
type = "quiz"
private = true
+++

{{< quizdown >}}

---
primary_color: orange
secondary_color: lightgray
text_color: black
shuffle_questions: false
---

## What command submits a SLURM job to the scheduler?

---
shuffle_answers: true
---

- [ ] `squeue`
- [ ] `submit`
- [ ] `sjob`
- [x] `sbatch`

## What command submits an interactive job to SLURM?

---
shuffle_answers: true
---

> Some hint

- [ ] `jobs`
- [ ] `interactive`
- [x] `ijob`
- [ ] `sbatch`

## How do you check for the status of a job?

---
shuffle_answers: true
---

> Some hint

- [x] `sstat <jobid>`
- [ ] `status <jobid>`
- [ ] `sjob <jobid>`
- [ ] `sbatch <jobid>`

## How do you cancel a SLURM job?

---
shuffle_answers: true
---

> Some hint

- [ ] `sstat cancel <jobid>`
- [ ] `sjob <jobid>`
- [x] `scancel <jobid>`
- [ ] `sbatch -c <jobid>`

## What command gets accounting data for a job?

---
shuffle_answers: true
---

> Some hint

- [ ] `squeue`
- [x] `sacct`
- [ ] `account`
- [ ] `sbatch -a`
