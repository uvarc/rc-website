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
date = "2022-02-14T06:27:21-05:00"
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

{{% callout %}}
## Key Points:

- An alternate method of transferring data from old Research Project storage to new Research Project storage will be implemented on 2/26/24 at 9:00 a.m. EST.
- All data on old Research Project and new Research Project are secure and intact.
- Starting Feb 26, data will be migrated by RC staff to a new **read-only** share `/stagedproject` on the new storage system. Files that have already been migrated to `/project` remain intact.
- New Project storage is operating without any known issues.
- Rivanna and RC’s other storage services, Scratch and Research Standard, also continue to operate normally.

**2024-02-14:** A total of 0.5 PB out of 1.5 PB have been copied from old to new Project storage (33%).
{{% /callout %}}

## What to expect on Feb 26

Currently, your `/project` folder contains a mix of files that have already been migrated and so called "stub" files. Stub files are visible on the new storage system and represent the names of files but have not been transferred yet. The actual files still reside physically on the old Project system. 

On Feb 26, the old and new Project storage systems will be disconnected. Researchers will not have any direct access to old Project storage. Current `/project` on the new storage system should perform optimally without the tether to the old storage system. We will begin deleting the empty stub files on `/project`. These are empty files not needed for the new migration process. **The original files are still secure on the old system.** 

A new filesystem `/stagedproject` will be mounted read-only on <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">Rivanna login nodes</a> and the <a href="/userinfo/globus/#transferring-files" target="_blank">UVA Standard Security Storage</a> data transfer node (DTN). It will not be available on compute nodes. This folder will be used as target to stage your data as it is being migrated from the old Project storage to the new storage system. Setting up a new destination for the to-be-migrated files prevents potential conflict with interfering with your active work in `/project`. 

**Your Project storage folders on Feb 26:** 

* `/project/MY_SHARE`: This is located on the new storage system. It contains files that have already been migrated since Fall 2023. 

* `/stagedproject_MY_SHARE`: This is a new share set up on the new storage system. It will be empty initially. Files will begin to appear here as they are migrated, starting Feb 26.  

**Note: The `/stagedproject/MY_SHARE` folder will only be created for you if you have folders/files on the old storage system that still need to be migrated.** 

## FAQ

{{% accordion-group title="Group" %}}

{{% accordion-item title="How should I prepare for Feb 26?" id="ten" %}}
If you have already reached out to us to prioritize transfer of a specific subset of your folders or files, no further action is required. These files will be copied to same-named folder in your active `/project` share on the New Project storage system.  

If there are additional folders and files that you urgently need for your active work, please reach out to RC with a specific list of those folders/files and we will add them to the file transfer queue. See here *"How can I get help with migration of my data?"*. 

Questions about the data migration process should be directed to our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>. 
{{% /accordion-item %}}

{{% accordion-item title="Some of my Project storage files disappeared. Where did they go?" id="one" %}}
Up until Feb 26, when users connect to the New Project folders, their files on the Old Project storage that haven not yet been copied over appear as empty stub files on the new system. When accessed for the first time, an empty stub file gets replaced by the original file that is being transferred on-demand from the Old Project to New Project storage.  

On Feb 26 these empty stub file will be deleted on the New Project storage as they are not needed for the new migration process. This is a gradual process that may take a few weeks to complete. **The original files behind the stub files still exist and are secure on the Old Project system.** 

See *"How do I find out what files are on Old Project storage?"*
{{% /accordion-item %}}

{{% accordion-item title="Where are you copying my missing files?"  id="two" %}}
**Currently and til Feb 26**, files that you have requested to be transferred will be copied to same-named folder in your active `/project` share on the New Project storage system.  

**Starting on Feb 26**, your missing files will be copied from your Old Project storage to same-named directories in `/stagedproject`. Your folder in `/stagedproject` will be set up empty on Feb 26. This folder will gradually fill up over time with your files. Setting up a new destination for the to-be-migrated files prevents potential interference with your active work in `/project`.
{{% /accordion-item %}}

{{% accordion-item title="Why can I not access the Old Project storage directly to copy files myself?" id="three" %}}
Performance of the Old Project storage system is severely degraded. Any exploratory search for folders or file listings by users would create additional strain on the system which would further reduce the already limited data transfer rates from Old to New Project Storage.

RC set up a managed background process that transfers all files from Old Project storage to `/stagedproject` for you.

You can reach out to RC to get a list of your files on the old system, see *"How do I find out what files are on Old Project storage?"*

RC will also work with you to prioritize the list of your files so that those files most urgently needed for your active work can be transferred first. See *"How can I get help with migration of my data?"*
{{% /accordion-item %}}

{{% accordion-item title="How do I find out what files are on Old Project storage?"  id="four" %}}
You will not be able to connect to Old Project storage, see *"Why can I not access the Old Project storage directly to copy files myself?"*

You may reach out to RC to <a href="/form/support-request/?category=Storage&request_title=Old%20Project%20Storage:%20File%20List%20Request&description=Please%20send%20me%20a%20list%20of%20my%20files%20on%20old%20Project%20storage." class="card-link" target="_blank">request a list of files</a> that you have on the Old Project storage system. We will place a txt file containing that file list in the top level folder of your new share on `/stagedproject`.

{{% /accordion-item %}}

{{% accordion-item title="How can I get help with migration of my data?"  id="five" %}}
Researchers who are in urgent need to access files that have not been migrated to new Research Project storage yet may submit a support request through <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="_blank">our webform</a>.

**On the webform, please indicate as precisely as possible which directories or files should be transferred first.** This will allow us to handle those files first that have the highest priority for you. 

To help with your file prioritization, you may reach out to RC to <a href="/form/support-request/?category=Storage&request_title=Old%20Project%20Storage:%20File%20List%20Request&description=Please%20send%20me%20a%20list%20of%20my%20files%20on%20old%20Project%20storage." class="card-link" target="_blank">request a list of files</a> that you have on the old Project storage system.

All files will be migrated eventually. Questions about the data migration process should be directed to our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>.
{{% /accordion-item %}}

{{% accordion-item title="Are all files being transferred at once?"  id="six" %}}
No. We are prioritizing transfer of files that you actively need for your research. You may reach out to us to provide a specific list of your high priority, essential directories and files. 

**The more selective this list, the better we can help you with this transition.**

Once the transfer process has been stabilized, engineers will begin synchronizing any remaining files that users did not explicitly request to be moved.

See *"How can I get help with migration of my data?"*
{{% /accordion-item %}}

{{% accordion-item title="How do I get an estimate of when my files will be transferred?"  id="seven" %}}
While the new Project storage provides vastly improved performance, the overall transfer from old to new Project storage is limited by the degraded performance of the old storage system. 

We anticipate that the majority of the actively used data needed for current ongoing research will be transferred by the end of [month]. **You can facilitate this process by providing us a narrowed down list of files that you need for your research over the next few months. This will allow us to deprioritize less urgently needed files.** 

See *"How can I get help with migration of my data?"*

Eventually all data will be migrated but this process is expected to take several months to complete. We will post weekly progress of data migration on this page. 

We will notify the PI of the storage allocation when all their folders have been copied over. **We will not purge any files on Old Project storage til the PI had an opportunity to verify that all their files have been migrated to the New Project storage system.**
{{% /accordion-item %}}

{{% accordion-item title="Where can I access the new /stagedproject folder?"  id="eight" %}}
On Feb 26, a new folder `/stagedproject` will become available **read-only** on the <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">Rivanna login nodes</a> and the <a href="/userinfo/globus/#transferring-files" target="_blank">UVA Standard Security Storage</a> data transfer node (DTN). It will not be available on compute nodes. This directory will be used as destination to stage data that are being migrated from your Old Project storage to the new storage system. 
{{% /accordion-item %}}

{{% accordion-item title="How can I work with the files that have been transferred into my /stagedproject folder?"  id="nine" %}}
On Feb 26, your folder in `/stagedproject` is set up as **read-only** on the <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">Rivanna login nodes</a> and the <a href="/userinfo/globus/#transferring-files" target="_blank">UVA Standard Security Storage</a> data transfer node (DTN). It is *not* available on any  compute nodes. 

<img src="/images/service/StorageOverview.png" alt="Project storage" width="100%"/>
<small>*AFM: Active File Management</small>

For compute jobs, you should copy files from `/stagedproject` into your `/project` or `/scratch` folder. Then launch compute jobs reading and writing files using the `/project` or `/scratch` folders as you usually do. You could copy files to your `/home` folder as well, but be aware of the limited 50GB per user quota which makes this impractical.

{{% /accordion-item %}}

{{% /accordion-group %}}

## Technical Details

On February 26, RC engineers will disconnect the Active File Management (AFM) tether, remount the old Project storage (GPFS) separately, and purge all "stub files" (files that are staged on new storage system and appear in a directory listing, but have not yet been transferred from old Project). This will allow a clear differentiation between transferred and un-transferred data. Data already transferred to the new Project storage are expected to perform optimally without any issues, while un-transferred data on the old system will need to be manually transferred by RC staff. Staff will continue to respond to data transfer requests on a first come, first serve basis. Once the transfer process has been stabilized, engineers will begin synchronizing any remaining files that users did not explicitly request to be moved.

# Incident Status Log

{{% scrollable height="500px" %}}

- **2022-02-09, 06:22 PM**
SMB/NFS exports have been enabled for new Project storage. Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is significantly slower than normal. Users may encounter on occasion “OSError: [Errno 5] Input/output errors” which should be reported through our support webform https://www.rc.virginia.edu/form/support-request/. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as possible. Directory listings and traversals in these new top level directories is expected to show better performance. 

- **2022-02-08, 08:05 AM**
Rivanna is back in service following maintenance. Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is significantly slower than normal. Users may encounter on occasion “OSError: [Errno 5] Input/output errors” which should be reported through our support webform https://www.rc.virginia.edu/form/support-request/. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as possible. Directory listings and traversals in these new top level directories is expected to show better performance.

- **2022-02-07, 06:00 AM**
Rivanna, Research Project storage, and Research Standard storage will be down for maintenance on Tuesday, February 6 beginning at 6 a.m. All systems are expected to return to service by 6 a.m. on Wednesday, February 7.

- **2022-02-05, 07:55 AM**
Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is currently significantly slower than normal. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as feasible. Directory listings and traversals in these new top level directories is expected to show better performance. NFS and SMB mounts for new Project storage will be enabled on February 6. new Project storage will be made available through the Open OnDemand file browser at the same time.

{{% /scrollable %}}
