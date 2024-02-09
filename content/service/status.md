+++
title = "Service Status"
description = ""
author = "RC Staff"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "service", "status"
]
date = "2022-02-09T16:27:21-05:00"
tags = [
  "service",
  "status",
  "storage",
]
draft = false

+++

# Project Storage Data Migration

Data migration from the previous Research Project storage filesystem to the new Project storage system is taking longer than expected and causing accessibility issues for some users. The root cause is the Active File Management (AFM) connection between old and new Project storage. To mitigate the performance issues, RC engineers are switching to an alternate backend migration process on February 26, 2024, at 9:00 a.m.

**IMPORTANT:** This action will make data that has not yet been moved from old Project appear to have vanished from the new Project storage filesystem. **Please be assured that all of your data will remain secure and intact throughout the migration process.** The new Project storage system is performing as expected without any known issues.

## Key Points:

- An alternate method of transferring data from old Research Project storage to new Research Project storage will be implemented on 2/26/24 at 9:00 a.m. EST.
- All data on old Research Project and new Research Project are secure and intact.
- New Project storage is operating without any known issues.
- Rivanna and RC’s other storage services, Scratch and Research Standard, also continue to operate normally.

## How do I request support for migrating my data? 

Researchers who are in urgent need to access files that have not been migrated to new Research Project storage yet may submit a support request through [our webform](https://www.rc.virginia.edu/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:).

**On the webform, please indicate as precisely as possible which directories or files should be transferred first.** This will allow our team of storage engineers to handle those files first that have the highest priority for you.

All files will be migrated eventually.

Questions about the data migration process should be directed to our user services team.

## Technical Details:

On February 26, RC engineers will disconnect the Active File Management (AFM) tether, remount the previous GPFS storage separately, and purge all "stub files" (files that are staged on new servers and appear in a directory listing, but have not yet been transferred from an old server). This will allow a clear differentiation between transferred and un-transferred data. Data transferred to the new GPFS storage is expected to perform optimally without any issues, while un-transferred data on the old system will need to be manually transferred by RC staff. Staff will continue to respond to data transfer requests on a first come, first serve basis. Once the transfer process has been stabilized, engineers will begin synchronizing any remaining files that users did not explicitly request to be moved.

# Incident Status Log

**2022-02-09, 08:05 AM**
Rivanna is back in service following maintenance. Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is significantly slower than normal. Users may encounter on occasion “OSError: [Errno 5] Input/output errors” which should be reported through our support webform https://www.rc.virginia.edu/form/support-request/. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as possible. Directory listings and traversals in these new top level directories is expected to show better performance.

**2022-02-07, 06:00 AM**
Rivanna, Research Project storage, and Research Standard storage will be down for maintenance on Tuesday, February 6 beginning at 6 a.m. All systems are expected to return to service by 6 a.m. on Wednesday, February 7.

**2022-02-05, 07:55 AM**
Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is currently significantly slower than normal. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as feasible. Directory listings and traversals in these new top level directories is expected to show better performance. NFS and SMB mounts for new Project storage will be enabled on February 6. New Project storage will be made available through the Open OnDemand file browser at the same time.