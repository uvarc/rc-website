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

The storage hardware serving the Research Project Storage file system has been experiencing intermittent disruptions since October 2023. In response, we acquired and installed new, upgraded hardware offering faster, more reliable access and capacity.  

However, because an Active File Management (AFM) connection between the old and new systems was used to facilitate automatic file transfers, the new system’s performance is being negatively impacted by the old hardware and causing accessibility issues for some users.  

To mitigate these issues, Research Computing engineers are switching to an alternate backend migration process on February 26, 2024, at 9:00 a.m. 

**IMPORTANT:** This action will make data that have not yet been transferred appear to have vanished from the new Project storage file system. **Please be assured that all data will remain secure and intact throughout the migration process.** Rivanna and RC’s other storage services, Scratch and Research Standard, continue to operate normally. 

{{% callout %}}
## Key Points:

- An alternate method of transferring data from old Research Project storage to new Research Project storage will be implemented on 2/26/24 at 9:00 a.m. EST.
- All data on old Research Project and new Research Project are secure and intact.
- Starting February 26, data will be transferred by RC staff to a new **read-only** share `/stagedproject` on the new storage system. Files that have already been migrated to `/project` remain intact. 
- Though the new Project storage system is operating with expected performance, the transfer of all data from the old storage system will take several months. The severe performance degradation of the old storage system will remain a bottleneck regardless of the change in data transfer method.
- Rivanna and RC’s other storage services, Scratch and Research Standard, continue to operate normally.

**2024-02-14:** A total of 1.5 PB out of 4.3 PB have been copied from old to new Project storage (35%).
{{% /callout %}}

## Incident Response 

Research Computing will reach out to all known users of this storage system with instructions for accessing data before and after February 26, and for assistance prioritizing files for transfer.  

## What to expect on February 26

Before February 26, your `/project` folder contains a mix of files, including those that have already been transferred and those that still reside physically on the old Project storage system. Files that are still on the old system present as empty stub files in the new system. Because the old and new systems are still connected, if you try to access a file that is still on the old system, the empty stub file is replaced by the original file as it is transferred on-demand to the new system.  

On February 26, the old and new Project storage systems will be disconnected. Researchers will not have any direct access to old Project storage. The current `/project` folder on the new storage system should perform optimally without the tether to the old storage system. We will begin deleting the empty stub files on `/project`. These are empty files not needed for the new migration process. **The original files are still intact and secure on the old system.** 

A new filesystem `/stagedproject` will be mounted read-only on <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">Rivanna login nodes</a> and the <a href="/userinfo/globus/#transferring-files" target="_blank">UVA Standard Security Storage</a> data transfer node (DTN). This folder will not be available on compute nodes. This folder will be used as target to stage your data as it is being transferred from the old system to the new system. Setting up a new destination for the not yet transferred files prevents potential interference with your active work in `/project`. 

**Your Project storage folders on February 26:**

* `/project/MY_SHARE`: This is located on the new storage system. It contains files that have already been transferred since Fall 2023 as well as newly-created files. 

* `/stagedproject/MY_SHARE`: This is a new share set up on the new storage system. It will be empty initially. Files will begin to appear here as they are transferred, starting Feb 26.  

    <small>“MY_SHARE” refers to your personal project name</small>

**Note: The `/stagedproject/MY_SHARE` folder will only be created for you if you have folders/files on the old storage system that still need to be migrated.** 

## FAQ

{{% accordion-group title="Group" %}}

{{% accordion-item title="How should I prepare for the changes coming on February 26?" id="ten" %}}
If you have already reached out to us to prioritize transfer of a specific subset of your folders or files, no further action is required. These files will be copied to same-named folder in your active `/project` share on the new Project storage system.  

If you have not yet contacted us with a list of priority folders or files to transfer, or if there are additional folders and files that you urgently need for your active work, please <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="_blank">reach out to RC</a> with a specific list of those folders/files and we will add them to the file transfer queue. See *"How can I get help with migration of my data?"* for details. 

Questions about the data migration process should be directed to our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>. 
{{% /accordion-item %}}

{{% accordion-item title="Some of my Project storage files disappeared. Where did they go?" id="one" %}}
Until February 26, all files are shown in the new Project storage system, including those that have already been transferred and those that are still on the old Project storage system. Files that are still on the old system present as empty stub files in the new system. When accessed for the first time, the empty stub file is replaced by the original file as it is transferred on-demand from the old system to the new system. 

On February 26, the empty stub files will be deleted from the new system as they are not needed for the new migration process. This is a gradual process that may take a few weeks to complete, so you may see different files, depending on when you access the new system. **However, the original files behind the stub files still exist and are secure on the Old Project system.** 

See *"How do I find out what files are on Old Project storage?"*
{{% /accordion-item %}}

{{% accordion-item title="Where are you copying my files?" id="two" %}}
Until February 26, files that you have already requested be transferred will be copied to the same-named directories in your active `/project` share on the new Project storage system. 

Beginning February 26, all your files, including files that are still on the old system and files that have already been transferred to the new system, will start being copied to the same-named directories in a new `/stagedproject` share. The `/stagedproject` share was created for your to-be-migrated files to prevent potential interference with your active work in `/project`. **Note:** Your folder in `/stagedproject` will be empty on February 26, but will gradually fill with your files as they are copied over.  
{{% /accordion-item %}}

{{% accordion-item title="How do I access the new /stagedproject folder?"  id="eight" %}}
On February 26, a new `/stagedproject` folder will become available in **read-only** mode on the <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">Rivanna login nodes</a> and the <a href="/userinfo/globus/#transferring-files" target="_blank">UVA Standard Security Storage</a> data transfer node (DTN). It will not be available on compute nodes. This folder will be used as destination to stage data transferred from your old Project storage to the new storage system. 
{{% /accordion-item %}}

{{% accordion-item title="How can I work with the files that have been transferred into my /stagedproject folder?"  id="nine" %}}
On Feb 26, your folder in `/stagedproject` is set up as **read-only** on the <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">Rivanna login nodes</a> and the <a href="/userinfo/globus/#transferring-files" target="_blank">UVA Standard Security Storage</a> data transfer node (DTN). It is *not* available on any  compute nodes. 

<img src="/images/service/StorageOverview.png" alt="Project storage" width="100%"/>
<small>*AFM: Active File Management</small>

For compute jobs, you should copy files from `/stagedproject` into your `/project` or `/scratch` folder. Then launch compute jobs reading and writing files using the `/project` or `/scratch` folders as you usually do. You could copy files to your `/home` folder as well, but be aware of the limited 50GB per user quota which makes this impractical.

{{% /accordion-item %}}

{{% accordion-item title="Why can't I access the old Project storage system directly to copy my own files?" id="three" %}}
Performance of the old Project storage system is severely degraded. Any exploratory search for folders or file listings by users would create additional strain on the system, which would further reduce the already limited data transfer rates from the old to new Project storage system.

Because of these performance issues, RC set up a managed process that transfers all files from the old Project storage system to a new `/stagedproject` folder for you in the new system. See *“How do I access the new /stagedproject folder?”*.

You can reach out to RC to <a href="/form/support-request/?category=Storage&request_title=Old%20Project%20Storage:%20File%20List%20Request&description=Please%20send%20me%20a%20list%20of%20my%20files%20on%20old%20Project%20storage" taregt="_blank">request a list</a> of your files on the old Project storage system. See *"How do I find out what files are on the old Project storage system?"*

RC will work with you to prioritize the list of your files so that those files most urgently needed for your active work can be transferred first. See *"How can I get help with the migration process?"*
{{% /accordion-item %}}

{{% accordion-item title="How do I find out what files are on the old Project storage system?" id="four" %}}
After February 26, you will not be able to connect to old Project storage system. See *"Why can't I access the old Project storage system directly to copy my own files?"*

However, you can reach out to RC to <a href="/form/support-request/?category=Storage&request_title=Old%20Project%20Storage:%20File%20List%20Request&description=Please%20send%20me%20a%20list%20of%20my%20files%20on%20old%20Project%20storage" taregt="_blank">request a list</a> of your files on the old Project storage system. We will place a txt file containing that file list in the top-level folder of your new share on `/stagedproject`.
{{% /accordion-item %}}

{{% accordion-item title="Are all files being transferred to the new Project storage system at once?"  id="six" %}}
No. We are prioritizing transfer of files that you actively need for your research. You may <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="blank_">reach out to us</a> to provide a specific list of your high priority, essential folders and files. 

The severe performance degradation of the old storage system will remain a bottleneck regardless of the change in data transfer method. **However, the more selective this list, the better we can help you with this transition.** See *“Can I pick which of my files are transferred first?"* for details. 

Once the transfer process has been stabilized, engineers will begin transferring any remaining files that users did not explicitly request to be moved.
{{% /accordion-item %}}

{{% accordion-item title="Can I pick which of my files are transferred first?"  id="eleven" %}}
Yes. Please complete this <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="_blank">web form</a> to provide us with a list of specific, high priority folders and files for migration. **Please indicate as precisely as possible which folders or files should be transferred first so our storage engineers can prioritize these items.** The more selective this list, the better we can help you with the transition.  

If you need help with your file prioritization, you may reach out to RC to <a href="/form/support-request/?category=Storage&request_title=Old%20Project%20Storage:%20File%20List%20Request&description=Please%20send%20me%20a%20list%20of%20my%20files%20on%20old%20Project%20storage." target="_blank">request a list of files</a> that you still have on the old Project storage system. 
{{% /accordion-item %}}

{{% accordion-item title="How can I get an estimate of when my files will be transferred?"  id="seven" %}}
Though the new Project storage system provides vastly improved performance, the overall transfer of files is limited by the degraded performance of the old system. This issue with the old storage system will remain a bottleneck regardless of the change in data transfer method. 

**However, you can facilitate the data transfer process by providing us with a narrowed down list of files that you need for your research over the next few months. This will allow us to deprioritize less urgently needed files.** 

See *“Can I pick which of my files are transferred first?"* for details.

All data will be migrated eventually, but this process is expected to take several months to complete. We will post weekly progress of data migration on this page. 

We will notify the PI of the storage allocation when all their folders have been copied over. **We will not purge any files on old Project storage system until the PI has had an opportunity to verify that their files have been migrated to the new Project storage system.** 
{{% /accordion-item %}}

{{% accordion-item title="How can I get help with the data migration process?"  id="five" %}}
Researchers with an urgent need to access files that have not been migrated to the new Project storage system yet may submit a support request through our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="_blank">webform</a>. **Please indicate as precisely as possible which folders or files should be transferred first so we can prioritize these items.**

If you need help with your file prioritization, you may reach out to RC to <a href="/form/support-request/?category=Storage&request_title=Old%20Project%20Storage:%20File%20List%20Request&description=Please%20send%20me%20a%20list%20of%20my%20files%20on%20old%20Project%20storage." class="card-link" target="_blank">request a list of files</a> that you still have on the old Project storage system.

All files will be transferred eventually. Questions about the data migration process should be directed to our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>.
{{% /accordion-item %}}

{{% /accordion-group %}}

## Technical Details

On February 26, RC engineers will disconnect the Active File Management (AFM) tether, remount the old Project storage system (GPFS) separately, and purge all "stub files" (files that are staged on new storage system and appear in a directory listing, but have not yet been transferred from old Project). This will allow a clear differentiation between transferred and un-transferred data. Data already transferred to the new Project storage system are expected to perform optimally without any issues, while un-transferred data on the old system will need to be manually transferred by RC staff. Staff will continue to respond to data transfer requests on a first come, first serve basis. Once the transfer process has been stabilized, engineers will begin transferring any remaining files that users did not explicitly request to be moved.

# Incident Status Log

{{% scrollable height="500px" %}}

- **2024-02-09, 06:22 PM**
SMB/NFS exports have been enabled for new Project storage. Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is significantly slower than normal. Users may encounter on occasion “OSError: [Errno 5] Input/output errors” which should be reported through our support webform https://www.rc.virginia.edu/form/support-request/. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as possible. Directory listings and traversals in these new top level directories is expected to show better performance. 

- **2024-02-08, 08:05 AM**
Rivanna is back in service following maintenance. Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is significantly slower than normal. Users may encounter on occasion “OSError: [Errno 5] Input/output errors” which should be reported through our support webform https://www.rc.virginia.edu/form/support-request/. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as possible. Directory listings and traversals in these new top level directories is expected to show better performance.

- **2024-02-07, 06:00 AM**
Rivanna, Research Project storage, and Research Standard storage will be down for maintenance on Tuesday, February 6 beginning at 6 a.m. All systems are expected to return to service by 6 a.m. on Wednesday, February 7.

- **2024-02-05, 07:55 AM**
Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is currently significantly slower than normal. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as feasible. Directory listings and traversals in these new top level directories is expected to show better performance. NFS and SMB mounts for new Project storage will be enabled on February 6. new Project storage will be made available through the Open OnDemand file browser at the same time.

{{% /scrollable %}}
