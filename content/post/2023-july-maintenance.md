+++
images = [""]
author = "Staff"
description = ""
date = "2023-07-10T00:00:00-05:00"
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

RC engineers will be installing a new `/scratch` storage filesystem that can be accessed at `/scratch/$USER` after the end of maintenance.

**Modified queue limits will be implemented to provide maximum read/write performance of the new `/scratch` filesystem.** Users are encouraged to consult our [updated documentation](/userinfo/rivanna/overview/#job-queues) and adjust their job scripts accordingly.

**The current `/scratch` filesystem will be permanently retired on October 17, 2023 and all the data it contains will be deleted.**  We have prepared a sample script for users who wish to transfer files to the new scratch system.  Users should clean up their current `/scratch` directory in preparation, to minimize the load.  A sample script is posted below.

**Example script to copy files**

{{< pull-code file="/static/scripts/demo-copy-scratch.slurm" lang="bash" >}}

The script will also be available through the Open OnDemand Job Composer:

1. Go to [Open OnDemand Job Composer](https://ood.hpc.virginia.edu/pun/sys/dashboard/apps/show/myjobs)
1. Click: New Job -> From Template
1. Select `demo-copy-scratch`
1. In the right panel, click "Create New Job"
1. This will take you to the "Jobs" page. In the "Submit Script" panel at the bottom right, click "Open Editor"
1. Enter your own allocation. You may edit the script as needed. Click "Save" when done.
1. Going back to the "Jobs" page, select `demo-copy-scratch` and click the green "Submit" button.

As we expect a high volume of data migration, please refrain from doing so directly on the login nodes but instead submit it as a job via the provided Slurm script as described above.

The new scratch is subject to the same 10 TB quota and 90-day purge policy. There is no restriction on the number of files. A friendly reminder that scratch is intended as a temporary work directory, not long-term storage space. It is not backed up and old files need to be purged periodically for system stability. RC offers a number of low-cost storage options to researchers. For more information, visit our [storage page](/userinfo/storage).

### Modules

The following software modules will be **removed** from Rivanna during the maintenance period:

| Module | Removed version | Replacement |
|---|---|---|
|abinit |8.2.2 (intel/18.0), 8.10.3 (intel/20.0) | 8.10.3 (intel/2022.11) |
|maven | 3.3.9 | 3.9.0 |
|postgresql | 11.3 | 14.5 |
