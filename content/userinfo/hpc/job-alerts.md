+++
description = ""
title = "Upcoming Policy on Zero GPU Utilization Jobs – User Notifications and Enforcement"
draft = false
date = "2025-07-28T17:45:12-05:00"
tags = ["hpc","rivanna","afton","utilization","supercomputer","queues","gpu"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

# Upcoming Policy on Zero GPU Utilization Jobs – User Notifications and Enforcement 

Research Computing expects all users of the UVA HPC clusters to make efficient use of the resources allocated to their jobs. Recently, we’ve observed significant queuing delays in the gpu partition, an issue frequently echoed in user feedback. At the same time, many submitted GPU jobs either show very low utilization or, in some cases, no GPU usage at all—despite consuming high-demand resources. 

To improve system efficiency and reduce wait times, we are introducing the following policy changes: 

## Alert Emails Begin August 12, 2025 

Starting August 12, Research Computing will begin sending informational emails to users whose jobs in the gpu partition meet the following conditions: 

- **Jobs with zero GPU usage for the first 3 hours** will trigger a warning email at the start of the 3rd hour. 

- **Jobs that initially use the GPU but then show 5 consecutive hours of zero utilization** will trigger a warning email at the start of the 5th idle hour. 

These notifications are intended to raise awareness and encourage best practices. **They will not affect job execution at this stage.** 

## Job Terminations Begin September 9, 2025 

Starting September 9, jobs meeting the above criteria will be **terminated** if no action is taken after two warning emails are sent. A third email will confirm the job termination. 

 

## Jobs Not Affected 

- GPU jobs running in the dedicated or interactive partitions 

- GPU jobs using paid (purchased) SU allocations 

- GPU jobs with a wall time of less than 3 hours 

## Exceptions 

Users with legitimate workflows that result in delayed GPU usage can request an exemption by opening a support ticket. Approved users will be added to an exclusion list and will no longer receive alerts or be subject to job termination under this policy. 

## Need Help? 

If you receive a warning email and have questions, simply reply to that message to open a support ticket. For general inquiries, please [contact our user services team](https://www.rc.virginia.edu/form/support-request/).  

Thank you for helping us improve resource efficiency and support all researchers using our systems. 

 