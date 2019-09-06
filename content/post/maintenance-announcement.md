+++
author = "Staff"
date = "2019-09-03T05:18:25-05:00"
expiryDate = "2019-09-18T23:00:01-05:00"
title = "Scheduled Maintenance 9/17/2019"
draft = false
tags = ["rivanna","maintenance","feature"]
categories = ["feature"]
type = "post"
url = "/maintenance"
summary = "Learn about the upcoming maintenance of the Rivanna HPC platform and how it will affect you."
+++

<p class=lead>Rivanna will be down for maintenance on Tuesday, September 17, beginning at 6 a.m. You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service. Rivanna is expected to return to service by 6 a.m. on Wednesday, September 18.</p>

**IMPORTANT MAINTENANCE NOTES:**

- System engineers will be installing a new `/scratch` system with 1.4PB of storage space. Users are encouraged to back up their important data prior to the maintenance period. `/scratch` is intended as temporary storage (90 days maximum) for active work. It is not backed up and needs to be purged periodically in order to maintain a stable HPC environment. Research Computing offers a number of affordable, long-term data storage options to researchers. The current `/scratch` system will be renamed `/oldscratch` after the maintenance period. Data on `/oldscratch` that has been saved within the last 90 days will automatically transfer to the upgraded `/scratch` system. Data older than 90 days will need to be manually transferred from `/oldscratch` to the new system. RC staff will be in Brown Library, Room 145 from 3-5 p.m. on Wednesday, September 18 offering technical support for those who need help moving their files from `/oldscratch` to `/scratch`.</li>
- Users who compile their own code may need to recompile after the maintenance period. A complete list of compiling instructions will be posted on the RC website by noon on 18 September.</li>

If you have any questions or concerns about these changes, please contact our user support team at [hpc-support@virginia.edu](mailto:hpc-support@virginia.edu) prior to 9/17/2019.

- - -

{{< button button-class="primary" button-text="About Rivanna HPC" button-url="/userinfo/rivanna/overview/" >}}

{{< button button-class="primary" button-text="XDMOD Metrics" button-url="https://rci.hpc.virginia.edu/xdmod/" >}}
