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
date = "2022-02-10T06:27:21-05:00"
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
- New Project storage is operating without any known issues.
- Rivanna and RC’s other storage services, Scratch and Research Standard, also continue to operate normally.

**2024-02-10:** A total of X PB out of Y PB has been migrated from old to new Project storage (zz %). This reflects an estimated NN % of actively used data.
{{% /callout %}}

## FAQ

{{% accordion-group title="Group" %}}

{{% accordion-item title="Are all files being transferred at once?"  id="one" %}}
No. We are prioritizing transfer of files that you actively need for your research. You may reach out to us to provide a specific list of your high priority, essential directories and files. 

**The more selective this list, the better we can help you with this transition.**

See "How can I get help with migration of my data?"

{{% /accordion-item %}}

{{% accordion-item title="How can I get help with migration of my data?"  id="two" %}}
Researchers who are in urgent need to access files that have not been migrated to new Research Project storage yet may submit a support request through <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="_blank">our webform</a>.

**On the webform, please indicate as precisely as possible which directories or files should be transferred first.** This will allow our team of storage engineers to handle those files first that have the highest priority for you.

All files will be migrated eventually. Questions about the data migration process should be directed to our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>.
{{% /accordion-item %}}

{{% accordion-item title="Some of my Project storage files disappeared. Where did they go?" id="three" %}}
Up until Feb 26, when users connect to the New Project folders, their files on the Old Project storage that haven not yet been copied over appear as zero-length stub files on the new system. These stub files get transferred automatically on-demand as they are accessed for the first time. 

On Feb 26 these empty stub file will be deleted on the New Project storage.  **The original files still exist and are secure on the Old Project system.** See "How do I find out what files are on Old Project storage GPFS?"
{{% /accordion-item %}}

{{% accordion-item title="How do I find out what files are on Old Project storage GPFS?"  id="four" %}}
On Feb 26, the Old Project storage filesystem will be mounted as /oldproject on the Rivanna frontends in read-only mode. You can go through folders and run ls commands in an <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">ssh terminal session</a> or you can use Open OnDemand, <a href="/userinfo/rivanna/ood/overview/#command-line-interface-shell" target="_blank">see here</a>.  
{{% /accordion-item %}}

{{% accordion-item title="How do I get an estimate of when my files will be transferred?"  id="five" %}}
While the new Project storage provides vastly improved performance, the overall transfer from old to new Project storage is limited by the degraded performance of the old filesystem. 

We anticipate that actively used data that are needed for current ongoing research will be transferred by mm/dd. Migration of all Project storage data is expected to conclude by mm/dd.  We will post weekly progress of data migration on this page.
      
{{% /accordion-item %}}

{{% /accordion-group %}}


## Technical Details

On February 26, RC engineers will disconnect the Active File Management (AFM) tether, remount the previous GPFS storage separately, and purge all "stub files" (files that are staged on new servers and appear in a directory listing, but have not yet been transferred from an old server). This will allow a clear differentiation between transferred and un-transferred data. Data transferred to the new GPFS storage is expected to perform optimally without any issues, while un-transferred data on the old system will need to be manually transferred by RC staff. Staff will continue to respond to data transfer requests on a first come, first serve basis. Once the transfer process has been stabilized, engineers will begin synchronizing any remaining files that users did not explicitly request to be moved.

# Incident Status Log

{{% scrollable height="500px" %}}

- **2022-02-09, 06:22 PM**
SMB/NFS exports have been enabled for new Project storage. Data migration from Old Project storage to New Project storage is ongoing. First-time access of old files and old directory listings is significantly slower than normal. Users may encounter on occasion “OSError: [Errno 5] Input/output errors” which should be reported through our support webform https://www.rc.virginia.edu/form/support-request/. For their ongoing work users should create New Project storage directories that are as close to the top level directory of their storage share as possible. Directory listings and traversals in these new top level directories is expected to show better performance. 

- **2022-02-08, 08:05 AM**
Rivanna is back in service following maintenance. Data migration from Old Project storage to New Project storage is ongoing. First-time access of old files and old directory listings is significantly slower than normal. Users may encounter on occasion “OSError: [Errno 5] Input/output errors” which should be reported through our support webform https://www.rc.virginia.edu/form/support-request/. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as possible. Directory listings and traversals in these new top level directories is expected to show better performance.

- **2022-02-07, 06:00 AM**
Rivanna, Research Project storage, and Research Standard storage will be down for maintenance on Tuesday, February 6 beginning at 6 a.m. All systems are expected to return to service by 6 a.m. on Wednesday, February 7.

- **2022-02-05, 07:55 AM**
Data migration from Old Project storage to New Project storage is ongoing. First-time access of old files and old directory listings is currently significantly slower than normal. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as feasible. Directory listings and traversals in these new top level directories is expected to show better performance. NFS and SMB mounts for new Project storage will be enabled on February 6. New Project storage will be made available through the Open OnDemand file browser at the same time.

{{% /scrollable %}}
