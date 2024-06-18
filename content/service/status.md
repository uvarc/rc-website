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
date = "2024-05-13T00:00:00-00:01"
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
- Starting February 26, data will be transferred by RC staff to a new **read-only** share <nobr>`/stagedproject`</nobr> on the new storage system. Files that have already been migrated to <nobr> `/project`</nobr> remain intact. 
- Though the new Project storage system is operating with expected performance, the transfer of all data from the old storage system will take several months. The severe performance degradation of the old storage system will remain a bottleneck regardless of the change in data transfer method.
- Rivanna and RC’s other storage services, Scratch and Research Standard, continue to operate normally.

**Update: 2024-05-13** 
- **Before February 26:** A total of 1.7 PB out of 4.3 PB were copied from old Project storage to /project folder on the new storage system using the automated migration process before February 26 (40%).
- **Since February 26:** A total of 3.68 PB out of 4.3 PB have been copied and are now available in the /stagedproject or /project folders on the new storage system (85.6 %)
{{% /callout %}}

{{% highlight %}}

**Do you have additional questions?** 

Please contact our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>, or join us for our [virtual office hours](/support/#office-hours) every Tuesday, 3-5 p.m. and Thursday, 10-12 p.m. starting March 6.

{{% /highlight %}}

## Incident Response 

Research Computing will reach out to all known users of this storage system with instructions for accessing data before and after February 26, and for assistance prioritizing files for transfer.  

{{% accordion-group title="Email Communications" id="commgroup" %}}

{{% accordion-item title="Email Communications" id="emails" %}}

{{% accordion-group title="Emails" id="emailgroup" %}}

{{% accordion-item title="Apr 22, 2024 - Project Storage Update" id="email-3" %}}


Dear Research Project storage user:

We are pleased to report that our new Project storage filesystem is performing as expected.

A majority of the data on the legacy Project filesystem has been successfully copied to /stagedproject on the new system, enabling researchers to access their data via /stagedproject or /project. We are e-mailing individual share owners as soon as their groups’ data have been transferred. The /stagedproject shares were provisioned as a temporary accommodation free of charge to expedite file transfers to the new storage system while allowing active work in /project.

**Please note: If you don’t have a /stagedproject share, no further action will be required. Otherwise users will need to consolidate all of their files from /stagedproject to /project storage. Step-by-step instructions are available on the RC website ([“How can I consolidate my files in /stagedproject and /project?”](https://www.rc.virginia.edu/service/status/#faq-18)). If you need assistance with consolidating your files, you may reach out to us during [office hours](https://www.rc.virginia.edu/support/#office-hours) or contact our user services team. 

In addition, monthly billing for Research Project storage quotas will resume on May 1st. Billing was suspended in October 2023 due to the filesystem’s performance issues. These bills will be based on quotas on the ‘new’ /project storage space which has been working with expected performance for the past 2 months. Usage on /stagedproject and the legacy system will not be charged. Billing questions should be directed to RC_Billing@virginia.edu.

Detailed documentation on the Project storage incident, including previous email communications and frequently asked questions, is available on our [Data Migration status page](https://www.rc.virginia.edu/service/status/). We are committed to working diligently until the data transfer is complete and the legacy system is decommissioned. Our technical support teams will continue to be available to you to answer questions and address any concerns.


With regards,

Karsten Siller
Director, Research Computing User Services
Information Technology Services
University of Virginia

{{% /accordion-item %}}


{{% accordion-item title="Feb 22, 2024 - Reminder: Upcoming Changes to Data Transfer Process for Project Storage File System" id="email-2" %}}

Dear Colleagues,  
 
This email serves as a friendly reminder of the upcoming changes to the Research Project Storage data transfer process that take effect on Monday, February 26 at 9 a.m. EST. For your convenience, a copy of the initial announcement that was released on February 16 is included below.   
 
You can find detailed documentation of the planned changes, previous email communications, and sections for frequently asked questions on our Data Migration status page (this page).  
 
We are committed to working diligently until data transfer is complete and the legacy system is decommissioned. Our technical support teams will continue to be available to you to answer questions and address any concerns.  
 
Thank you for your continued patience and partnership.  
 
With regards,  
 
Karsten Siller<br>
Director, Research Computing User Services<br>
Information Technology Services<br>
University of Virginia<br>

{{% /accordion-item %}}

{{% accordion-item title="Feb 16, 2024 - Upcoming Changes to Data Transfer Process for Project Storage File System" id="email-1" %}}

Dear Colleagues,  
 
As previously shared, efforts are still underway to transfer data in the Project Storage file system from the legacy GPFS hardware to the new, upgraded hardware. To date, we have successfully transferred about 35% of Project Storage files. These files were transferred because they were either needed for a scheduled research project, or they had been recently accessed. However, now we are finding that the Active File Management (AFM) connection being used to transfer files is causing too great of a system load for the legacy hardware, as the old system continues to degrade. This is causing additional disruptions and file access issues. Although there are issues with access, rest assured that **all files remain safe and secure**, and will be transferred to the new system by fall.  
 
**What we are doing now**  

**On Monday, 2/26, we will move from the AFM connection to a new, manual process to transfer the remaining data.** As part of this manual process, we have launched a high priority transfer request for files actively needed for your research.  As part of this manual process, we are prioritizing files identified as actively needed for current research projects. If you need to access files on the legacy system for active project work, **please indicate which directories or files should be prioritized for transfer using our data transfer request form.** You can also use this form to request a list of your files that remain on the old system.  Please note that we cannot guarantee a timeline for transferring prioritized files due to the uncertainty of the old hardware. Prioritized file transfer may still take weeks to months to complete. 
 
If you have already reached out to prioritize file transfer or do not anticipate immediate use of these files, no further action is required.  
 
**What you may experience now until the transfer is complete** 

Today, when you log in to Project Storage, you will see your complete file list in your directory. Although the file list is complete, it is possible that some files in your directory have already been migrated to the new hardware and are readily available for use, while others remain on the old cluster. Accessing files that remain on the old cluster will likely result in excessively slow access speeds or a “file not found” error. This “file not found” error only indicates that your file has not yet been transferred.   
 
On 2/26, we will move to the new, manual file transfer process. Because this process is manual and no longer based on the file connection method, file names of files not yet transferred to the new system will be removed from your /Project storage directory. These file names will automatically repopulate in your directory under a new /stagedproject folder as they are transferred to the new hardware.   
 
**Additional information about the file transfer efforts and system status is available on our new Data Migration status page (this page).** We will provide ongoing updates at this location.
 
I understand the impact these disruptions may have had on your work, and I share in your frustrations. Our mission is to provide excellent service and support for a seamless research computing experience.   
 
We are committed to working diligently until data transfer is complete and the legacy system is decommissioned. Our help desk and technical support teams will continue to be available to you to address any concerns.  
 
Thank you for your continued patience and partnership.  
 
With regards,  

Joshua Baller, PhD<br>
Associate Vice President for Research Computing<br>
Information Technology Services<br>
University of Virginia

{{% /accordion-item %}}

{{% /accordion-group %}}

{{% /accordion-item %}}

{{% /accordion-group %}}

## What to expect on February 26

Before February 26, your <nobr>`/project`</nobr> folder contains a mix of files, including those that have already been transferred and those that still reside physically on the old Project storage system. Files that are still on the old system appear as empty "stub files" in the new system. Because the old and new systems are still connected, if you try to access a file that is still on the old system, the empty stub file is replaced by the original file as it is transferred on-demand to the new system.  

On February 26, the old and new Project storage systems will be disconnected. Researchers will not have any direct access to the old Project storage. The current <nobr>`/project`</nobr> folder on the new storage system should perform optimally without the tether to the old storage system. We will begin deleting the empty stub files on <nobr>`/project`</nobr>. These are empty files and are not needed for the new migration process. **The original files are still intact and secure on the old system.** 

A new filesystem <nobr>`/stagedproject`</nobr> will be mounted read-only on <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">Rivanna login nodes</a>, compute nodes, and the <a href="/userinfo/globus/#transferring-files" target="_blank">UVA Standard Security Storage</a> data transfer node (DTN). This folder will be used as a target to stage your data as it is being transferred from the old system to the new system. Setting up a new destination for the not yet transferred files prevents potential interference with your active work in <nobr>`/project`</nobr>. 

**Your Project storage folders on February 26:**

* `/project/MY_SHARE`: This is located on the new storage system. It contains files that have already been transferred since Fall 2023 as well as newly-created files. 

* `/stagedproject/MY_SHARE`: This is a new share set up on the new storage system. It will be empty initially. Files will begin to appear here as they are transferred, starting Feb 26.  

    <small>“MY_SHARE” refers to your personal project name</small>

**Note: The `/stagedproject/MY_SHARE` folder will only be created for you if you have folders/files on the old storage system that still need to be migrated.** 

## FAQ

{{% accordion-group title="Group" id="faqgroup"%}}

{{% accordion-item title="1. How should I prepare for the changes coming on February 26?" id="faq-1" %}}
If you have already reached out to us to prioritize transfer of a specific subset of your folders or files, no further action is required. These files will be copied to same-named folder in your active <nobr>`/project`</nobr> share on the new Project storage system.  

If you have not yet contacted us with a list of priority folders or files to transfer, or if there are additional folders and files that you urgently need for your active work, please <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="_blank">reach out to RC</a> with a specific list of those folders/files and we will add them to the file transfer queue. See *"How can I get help with migration of my data?"* for details. 

Questions about the data migration process should be directed to our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>. 
{{% /accordion-item %}}

{{% accordion-item title="2. Some of my Project storage files disappeared. Where did they go?" id="faq-2" %}}
Until February 26, all files are shown in the new Project storage system, including those that have already been transferred and those that are still on the old Project storage system. Files that are still on the old system present as empty stub files in the new system. When accessed for the first time, the empty stub file is replaced by the original file as it is transferred on-demand from the old system to the new system. 

On February 26, the empty stub files will be deleted from the new system as they are not needed for the new migration process. This is a gradual process that may take a few weeks to complete, so you may see different files, depending on when you access the new system. **However, the original files behind the stub files still exist and are secure on the Old Project system.** 

See *"How do I find out what files are on the old Project storage system?"*
{{% /accordion-item %}}

{{% accordion-item title="3. Where are you copying my files?" id="faq-3" %}}
Until February 26, files that you have already requested be transferred will be copied to the same-named directories in your active <nobr>`/project`</nobr> share on the new Project storage system. 

Beginning February 26, all your files, including files that are still on the old system and files that have already been transferred to the new system, will start being copied to the same-named directories in a new <nobr>`/stagedproject`</nobr> share. The <nobr>`/stagedproject`</nobr> share was created for your to-be-migrated files to prevent potential interference with your active work in <nobr>`/project`</nobr>. **Note:** Your folder in <nobr>`/stagedproject`</nobr> will be empty on February 26, but will gradually fill with your files as they are copied over.  
{{% /accordion-item %}}

{{% accordion-item title="4. How do I access the new /stagedproject folder?"  id="faq-4" %}}
On February 26, a new <nobr>`/stagedproject`</nobr> folder will become available in **read-only** mode on the <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">Rivanna login nodes</a> and the <a href="/userinfo/globus/#transferring-files" target="_blank">UVA Standard Security Storage</a> data transfer node (DTN). It will not be available on compute nodes. This folder will be used as destination to stage data transferred from your old Project storage to the new storage system. 
{{% /accordion-item %}}

{{% accordion-item title="5. How can I work with the files that have been transferred into my /stagedproject folder?"  id="faq-5" %}}
On Feb 26, your folder in <nobr>`/stagedproject`</nobr> is set up as **read-only** on the <a href="/userinfo/rivanna/login/#secure-shell-access-ssh" target="_blank">Rivanna login nodes</a>, compute nodes, and the <a href="/userinfo/globus/#transferring-files" target="_blank">UVA Standard Security Storage</a> data transfer node (DTN).

<img src="/images/service/StorageOverview-3-5.png" alt="Project storage" width="100%"/>

**Option 1 (preferred):** 

For compute jobs we recommend you *first* copy files from `/stagedproject` into your `/project` or `/scratch` folder. For transfer of large folders see *“How can I consolidate my files in /stagedproject and /project?”*. 

{{% highlight %}}
**Note:** A subset of files may not copy over because of existing "stub files" on the `/project` storage system. Stub files are "placeholders” for files that exist on the old project storage system but had not been copied over to the new project storage system. They are not needed for the new data migration process. We began with deletion of these empty placeholder stub files on February 26. This process is still ongoing. The original files are still intact and secure on the old system. 
{{% /highlight %}}

If you do not need any of the files affected by any failed copy operation immediately, you may continue to work out of `/project` and `/scratch` folders as usual. We will inform you when all stub files have been deleted and you may consolidate the remaining files from `/stagedproject` to `/project` then, following the copy instructions one more time. See *“How can I consolidate my files in /stagedproject and /project?”* 
 
**Option 2:**

If the copy of any needed files to `/project` fails, you can update your job scripts to read the necessary input files from your `/stagedproject` folder and write the output to a new folder in your existing `/project` share. We will inform you when all stub files have been deleted and you may consolidate the remaining files from `/stagedproject` to `/project` then by following the copy instructions one more time, See *“How to consolidate files from /stagedproject to /project?”*. 
 
{{% /accordion-item %}}

{{% accordion-item title="6. Why can't I access the old Project storage system directly to copy my own files?" id="faq-6" %}}
Performance of the old Project storage system is severely degraded. Any exploratory search for folders or file listings by users would create additional strain on the system, which would further reduce the already limited data transfer rates from the old to new Project storage system.

Because of these performance issues, RC set up a managed process that transfers all files from the old Project storage system to a new <nobr>`/stagedproject`</nobr> folder for you in the new system. See *“How do I access the new <nobr>/stagedproject</nobr> folder?”*.

You can reach out to RC to <a href="/form/support-request/?category=Storage&request_title=Old%20Project%20Storage:%20File%20List%20Request&description=Please%20send%20me%20a%20list%20of%20my%20files%20on%20old%20Project%20storage" taregt="_blank">request a list</a> of your files on the old Project storage system. See *"How do I find out what files are on the old Project storage system?"*

RC will work with you to prioritize the list of your files so that those files most urgently needed for your active work can be transferred first. See *"How can I get help with the migration process?"*
{{% /accordion-item %}}

{{% accordion-item title="7. How do I find out what files are on the old Project storage system?" id="faq-7" %}}
After February 26, you will not be able to connect to the old Project storage system. See *"Why can't I access the old Project storage system directly to copy my own files?"*

However, we have placed a list of your old Project storage files in the top-level folder of your new share on <nobr>`/stagedproject`</nobr> (i.e. /stagedproject/my_share/old-project-file-list.txt). You may use this list to prioritize folders and files for your data migration (see "Can I pick which of my files are transferred first?").

Please keep in mind that the list in old-project-file-list.txt represents all your files stored on the old Project storage system, some of which have already been transferred to the new system. Eventually all files will be transferred from the old to the new Project storage system. If you already have all the data needed for your active work on the new Project storage system, no action is required.
{{% /accordion-item %}}

{{% accordion-item title="8. Are all files being transferred to the new Project storage system at once?"  id="faq-8" %}}
No. We are prioritizing transfer of files that you actively need for your research. You may <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="blank_">reach out to us</a> to provide a specific list of your high priority, essential folders and files. 

The severe performance degradation of the old storage system will remain a bottleneck regardless of the change in data transfer method. **However, the more selective this list, the better we can help you with this transition.** See *“Can I pick which of my files are transferred first?"* for details. 

Once the transfer process has been stabilized, engineers will begin transferring any remaining files that users did not explicitly request to be moved.
{{% /accordion-item %}}

{{% accordion-item title="9. Can I pick which of my files are transferred first?"  id="faq-9" %}}
Yes. Please complete this <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="_blank">web form</a> to provide us with a list of specific, high priority folders and files for migration. **Please indicate as precisely as possible which folders or files should be transferred first so our storage engineers can prioritize these items.** The more selective this list, the better we can help you with the transition.  

If you need help with your file prioritization, you may reach out to RC to <a href="/form/support-request/?category=Storage&request_title=Old%20Project%20Storage:%20File%20List%20Request&description=Please%20send%20me%20a%20list%20of%20my%20files%20on%20old%20Project%20storage." target="_blank">request a list of files</a> that you still have on the old Project storage system. 
{{% /accordion-item %}}

{{% accordion-item title="10. How can I get an estimate of when my files will be transferred?"  id="faq-10" %}}
Though the new Project storage system provides vastly improved performance, the overall transfer of files is limited by the degraded performance of the old system. This issue with the old storage system will remain a bottleneck regardless of the change in data transfer method. 

**However, you can facilitate the data transfer process by providing us with a narrowed down list of files that you need for your research over the next few months. This will allow us to deprioritize less urgently needed files.** 

See *“Can I pick which of my files are transferred first?"* for details.

All data will be migrated eventually, but this process is expected to take several months to complete. We will post weekly progress of data migration on this page. 

We will notify the PI of the storage allocation when all their folders have been copied over. **We will not purge any files on the old Project storage system until the PI has had an opportunity to verify that their files have been migrated to the new Project storage system.** 
{{% /accordion-item %}}

{{% accordion-item title="11. Why is the transfer of folders to the new Project storage system taking longer than expected?"  id="faq-11" %}}
The old Project storage hardware (GPFS) is in a degraded state. Due to this state, transferring data from the system is unusually slow even in otherwise ideal conditions. With a wide range of researchers and research workflows attempting to simultaneously access the system, the system becomes overloaded resulting in the “IO Error” and similar errors that researchers have been experiencing. As the system gets overloaded the transfer rates drop even further.  

By having RC manage the data transfer from the old to the new system we will be able to limit the load on the system and keep it closer to ideal conditions in order to maximize the transfer rate going forward. 
{{% /accordion-item %}}

{{% accordion-item title="12. What caused this issue with the old Project storage file system?"  id="faq-12" %}}
The old GPFS hardware was beyond its expected end-of-life and due to historical sporadic financial investment in RC the hardware was not replaced. That changed recently with substantial University investments in RC and replacement hardware was immediately purchased. Unfortunately, we were not able to get the new GPFS hardware up and running before we started to experience failures on the old GPFS hardware. Given that the hardware was already end-of-life, we prioritized completing installation of the new hardware quickly and transferring from the old hardware to the new. Because the old GPFS hardware is still experiencing failure, these transfers have been slow with ~35% of the data transferred to-date. 
{{% /accordion-item %}}

{{% accordion-item title="13. What is RC doing to ensure increased reliability and improved service?"  id="faq-13" %}}
With recent University investments in Research Computing we have planned annual purchases of new hardware with a model that allows for the seamless addition of new hardware and decommissioning of old hardware as it reaches its end-of-life. This will reduce the need for downtimes and manual data migrations as we ensure the integrity of our infrastructure. 

Research Computing is also working to improve its approach to user communications. If a major disruption occurs to an RC system, we will be using pages like this one to make sure there is a single location researchers can go to see both the current status and the history of the incident. 

Looking forward, Research Computing’s service roadmap includes filling in some services currently missing from our portfolio. Critically, there should be options available for researchers to elect for redundant access to their key datasets.  This means not only additional levels of protection in case of a disaster but also an alternate location where data can be retrieved. 
{{% /accordion-item %}}

{{% accordion-item title="14. How were files prioritized for transfer for the new system?"  id="faq-14" %}}
At this time, about 35% of files have been successfully migrated. These files were moved as part of prioritized research datasets or were transferred over by AFM when accessed by a researcher.  

The prioritized datasets were known to be actively used and were prime candidates to transfer when extra transfer capacity was available. 
{{% /accordion-item %}}

{{% accordion-item title="15. What are stub files and how can I find them?" id="faq-15" %}}
 
Stub files are "placeholders” for files that exist on the old project storage system but had not been copied over to the new project storage system. They are not needed for the new data migration process. We began with deletion of these empty placeholder stub files on February 26. This process is still ongoing. The original files are still intact and secure on the old system. 

You may create a list of stub files currently present in your /project folder by running this command: 

```
find /project/MY_SHARE -ls > regular-files.log 2> stubfiles.log
``` 

This produces two files, `regular-files.log` and `stubfiles.log`. The `stubfiles.log` contains all files that the system cannot list which is indicative of being stub files. 

{{% /accordion-item %}}

{{% accordion-item title="16. Why do I get File Not Found Errors when accessing some of my files in my /project subfolders?" id="faq-16" %}}

Stub files may be present which are placeholders that linked the new storage system to the legacy storage system. As a part of the data migration process, stub files linking to the legacy system were also attempted to be deleted. A subset of these stub files remains visible on the new system, but attempting to access them will result in File Not Found Errors, as they are no longer coupled with the old system. These files are scheduled for deletion through an automated process eventually.
{{% /accordion-item %}}

{{% accordion-item title="17. How can I verify that all my old project storage files are now in /stagedproject?" id="faq-17" %}}

To verify the list of files in `/stagedproject` you can run the following on the command line:

`check_stagedproject MYSHARE`

Replace MYSHARE with the name of your project's share. This will create `~/stagedproject-file-list.txt` which contains a list of files that have been copied from `/oldproject` to `/stagedproject`. This list is compared with `/stagedproject/MYSHARE/old-project-file-list.txt` to ensure that all files have been transferred from `/oldproject`.

`~/stagedproject-file-list.txt` will change if your data transfer is still in progress. The share's owner will be notified once all the data is transferred.

{{% /accordion-item %}}

{{% accordion-item title="18. How can I consolidate my files in /stagedproject and /project?" id="faq-18" %}}

To organize your files efficiently: 

1. If you relocated files to new folders to avoid issues with file access performance issues, or if you have duplicates in project storage, please put them back in their original folders using the "mv" command. This keeps things neat and prevents duplicates. Be cautious not to overwrite newer files with older ones while moving them.

2. Use the "rsync" command to copy files from the /stagedproject folder to the main project folder (/project). This ensures that all essential files are consolidated in one location (/project). 

If you require assistance with these steps, please contact us via our [support webform](<https://www.rc.virginia.edu/form/support-request/?category=Storage&amp;request_title=Project%20storage%20data%20migration&amp;description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:>) or during office hours for help. 

Submit the following script to copy large directories in bulk:

```
#!/bin/bash
#SBATCH -A your_allocation  # to find your allocation, type "allocations"
#SBATCH -t 12:00:00   # up to 7-00:00:00 (7 days)
#SBATCH -p standard


STAGEDPROJECTFOLDER=/stagedproject/MYSHARE/      #replace MYSHARE  with your share name
PROJECTFOLDER=/project/MYSHARE/                  #replace MYSHARE with your share name

rsync -uav ${STAGEDPROJECTFOLDER} ${PROJECTFOLDER} 1> ~/rsync.log 2> ~/rsync-error.log
```

The script will also be available through the Open OnDemand Job Composer: 

1. Go to Open OnDemand Job Composer 
2. Click: New Job -> From Template 
3. Select demo-copy-stagedproject
4. In the right panel, click “Create New Job” 
5. This will take you to the “Jobs” page. In the “Submit Script” panel at the bottom right, click “Open Editor” 
6. Enter your own allocation. Edit the MY_SHARE placeholder in the script as needed. Click “Save” when done. 
7. Going back to the “Jobs” page, select demo-copy-stagedproject and click the green “Submit” button. 

As we expect a high volume of data migration, please refrain from doing so directly on the login nodes but instead submit it as a job via the provided Slurm script as described above. 

{{% callout %}}
If you have problems with errors in the above rsync command you can try adding the following flags: --no-owner --no-group --no-perms --no-times. E.g.
```
rsync -uav  --no-owner --no-group --no-perms --no-times ${STAGEDPROJECTFOLDER} ${PROJECTFOLDER} 1> ~/rsync.log 2> ~/rsync-error.log
```
{{% /callout %}}

{{% /accordion-item %}}


{{% accordion-item title="19. How can I get help with the data migration process?"  id="faq-19" %}}
We have placed a list of your old Project storage files in the top-level folder of your new share on /stagedproject (i.e. /stagedproject/my_share/old-project-file-list.txt). You may use this list to prioritize folders and files for your data migration (see *“Can I pick which of my files are transferred first?”*).

Researchers with an urgent need to access files that have not been migrated to the new Project storage system yet may submit a support request through our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration&description=Please%20indicate%20as%20precisely%20as%20possible%20which%20directories%20or%20files%20should%20be%20transferred%20first:" target="_blank">webform</a>. **Please indicate as precisely as possible which folders or files should be transferred first so we can prioritize these items.**

All files will be transferred eventually. 

{{% highlight %}}

**Do you have additional questions?** 

Please contact our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>, or join us for our [virtual office hours](/support/#office-hours) every Tuesday, 3-5 p.m. and Thursday, 10-12 p.m. starting March 6.

{{% /highlight %}}

{{% /accordion-item %}}

{{% /accordion-group %}}

## Technical Details

On February 26, RC engineers will disconnect the Active File Management (AFM) tether, remount the old Project storage system (GPFS) separately, and purge all "stub files" (files that are staged on new storage system and appear in a directory listing, but have not yet been transferred from old Project). This will allow a clear differentiation between transferred and un-transferred data. Data already transferred to the new Project storage system are expected to perform optimally without any issues, while un-transferred data on the old system will need to be manually transferred by RC staff. Staff will continue to respond to data transfer requests on a first come, first serve basis. Once the transfer process has been stabilized, engineers will begin transferring any remaining files that users did not explicitly request to be moved.

# Incident Status Log

{{% scrollable height="500px" %}}

- **2024-02-27, 2:51 PM** The /stagedproject folder is now available read-only on Rivanna login nodes.

- **2024-02-27, 7:03 AM** About 33% of all stub files have been deleted on the new Project storage system. A subset of the stub files are still visible on the new system. Access of these stub files will produce File Not Found Errors since they don’t physically exist on the new storage system and are uncoupled from the old system now. All stub files will be deleted through an automated process eventually over the next days and weeks.

- **2024-02-26, 05:32 PM:** The new Project storage was remounted on all Rivanna nodes and the UVA Standard Security Storage data transfer node (DTN). Deletion of stub files was initiated.

- **2024-02-26, 04:15 PM:** The old and new Project storage systems were unmounted on all Rivanna nodes and the UVA Standard Security Storage data transfer node (DTN) to complete the disconnection process.

- **2024-02-26, 09:00 AM:** Engineers began to disconnect the old and new Project storage systems.


- **2024-02-19, 02:00 PM**
Project storage is currently unavailable on Open OnDemand. On 26 February at 9:00 am EST, RC engineers will switch to an alternate data transfer mechanism between the legacy Research Project Storage filesystem and the new Project Storage system. As a result, users will no longer have direct access to the legacy system. Files will be staged to an intermediate location for users to copy. To facilitate the migration process, please indicate which directories or files should be prioritized for transfer using our data transfer request form. Additional information about the file transfer efforts and Project Storage system status is available on our Data Migration status page. 

- **2024-02-16, 01:22 PM**
On 26 February at 9:00 am EST, RC engineers will switch to an alternate data transfer mechanism between the legacy Research Project Storage filesystem and the new Project Storage system. As a result, users will no longer have direct access to the legacy system. Files will be staged to an intermediate location for users to copy. To facilitate the migration process, please indicate which directories or files should be prioritized for transfer using our data transfer request form. Additional information about the file transfer efforts and Project Storage system status is available on our Data Migration status page. 

- **2024-02-09, 06:22 PM**
SMB/NFS exports have been enabled for new Project storage. Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is significantly slower than normal. Users may encounter on occasion “OSError: [Errno 5] Input/output errors” which should be reported through our support webform https://www.rc.virginia.edu/form/support-request/. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as possible. Directory listings and traversals in these new top level directories is expected to show better performance. 

- **2024-02-08, 08:05 AM**
Rivanna is back in service following maintenance. Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is significantly slower than normal. Users may encounter on occasion “OSError: [Errno 5] Input/output errors” which should be reported through our support webform https://www.rc.virginia.edu/form/support-request/. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as possible. Directory listings and traversals in these new top level directories is expected to show better performance.

- **2024-02-07, 06:00 AM**
Rivanna, Research Project storage, and Research Standard storage will be down for maintenance on Tuesday, February 6 beginning at 6 a.m. All systems are expected to return to service by 6 a.m. on Wednesday, February 7.

- **2024-02-05, 07:55 AM**
Data migration from old Project storage to new Project storage is ongoing. First-time access of old files and old directory listings is currently significantly slower than normal. For their ongoing work users should create new Project storage directories that are as close to the top level directory of their storage share as feasible. Directory listings and traversals in these new top level directories is expected to show better performance. NFS and SMB mounts for new Project storage will be enabled on February 6. new Project storage will be made available through the Open OnDemand file browser at the same time.

{{% /scrollable %}}