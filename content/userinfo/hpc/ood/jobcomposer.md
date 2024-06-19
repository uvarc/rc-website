+++
description = ""
title = "Open OnDemand: Job Composer"
draft = false
date = "2019-06-28T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","gpu","allocations","queues"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "rivanna"

+++

[Open OnDemand](/userinfo/hpc/ood/overview) allows you to submit Slurm jobs to the cluster without using shell commands.

The job composer simplifies the process of:

+ Creating a script
+ Submitting a job
+ Downloading results

# Submitting Jobs
We will describe creating a job from a template provided by the system.

1. Open the `Job Composer` tab from the Open OnDemand Dashboard.

2. Go to the `New Job` tab and from the dropdown, select `From Template`. You can choose the default template or you can select from the list.

3. Click on `Create New Job`. You will need to edit the file that pops up, so click the light blue `Open Editor` button at the bottom. Replace your allocation with your group name and click `Save`.

4. Open OnDemand creates a unique directory for each job. In most cases, you will need to upload or move files into the job directory, so when you have finished editing the script, return to the Job Composer tab and click the darker blue `Open Dir` button at the bottom of the page.

4. You may now use the File Explorer to upload or move the files you will need to run the job.

5. When you have finished preparing your job, click the `Submit` button. Your job will be submitted. Any errors will appear at the top of the page.

The Job Composer main panel allows you to monitor your job status. When your job has completed, select the job from the list so that it is highlighted. Click the `Open Dir` button again to enter the directory. There you may view or download your result files.
