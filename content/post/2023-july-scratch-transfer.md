+++
images = [""]
author = "Staff"
description = ""
date = "2023-07-18T00:00:00-05:00"
title = "New Scratch System on Rivanna: July 18, 2023"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}During the July 18th maintenance, RC engineers installed a new /scratch file storage system on Rivanna. We have created sample scripts and instructions to help you transfer your files from the previous file system to the new one.(Expand the link below for details.){{< /alert-green >}}


**The previous scratch filesystem, now called `/oldscratch`, will be permanently retired on October 17, 2023 and all the data it contains will be deleted.**  
Users should clean up their `/oldscratch` directory in preparation, to minimize the load.  A sample script is posted below.

**Modified queue limits have been implemented to provide maximum read/write performance of the new /scratch filesystem.** Please refer to our [updated documentation](/userinfo/hpc/#job-queues) and adjust your job scripts accordingly.

## Transfer Instructions

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


