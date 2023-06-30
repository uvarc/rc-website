+++
images = [""]
author = "Staff"
description = ""
date = "2023-07-11T00:00:00-05:00"
title = "Rivanna Maintenance: July 18, 2023"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna will be down for maintenance on <strong>July 18, 2023</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

All systems are expected to return to service by **6 a.m. on Wednesday, July 19**.

## IMPORTANT MAINTENANCE NOTES

### New scratch

We are pleased to announce a new storage system for scratch that can be accessed at `/scratch/$USER` after the maintenance. The old GPFS scratch at `/oldscratch/$USER` will be retired on **DATE** and **all data will be wiped**. If you wish to retain your old scratch files, we have prepared a Slurm script at **URL** to assist you with migration to the new scratch. (Edit the script if you only need a subset of your old files.) As we expect a high volume of data migration, please refrain from doing so on the login nodes but instead submit it as a job via the provided Slurm script.

You will not be able to use Globus to transfer files from `/oldscratch` to `/scratch`.

The new scratch is subject to the same 10 TB quota. There is no restriction on the number of files.

### Modules

The following software modules will be **removed** from Rivanna during the maintenance period:

| Module | Removed version | Replacement |
|---|---|---|
|abinit |8.2.2 (intel/18.0), 8.10.3 (intel/20.0) | 8.10.3 (intel/2022.11) |
|maven | 3.3.9 | 3.9.0 |
|postgresql | 11.3 | 14.5 |
