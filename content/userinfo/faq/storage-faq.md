+++
description = ""
title = "Storage FAQs"
draft = false
date = "2020-02-20T15:15:12-05:00"
tags = ["storage","faqs","data"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "storage"
toc = true

+++

* [General](#general)
* [Storage Management](#storage-management)
* [Data Transfer](#data-transfer)
* [Downloading Files](#downloading-files)

- - -

# General

## What storage options are available to me to use on Rivanna/Afton?
All users are provided a 200-GB home directory for longer-term storage.  This directory provides "snapshots" though it is not backed up.  Each user also is provided 10TB of temporary "scratch" storage accessible as `/scratch/$USER` where `$USER` will stand for your ID.  Scratch storage is fast but is not backed up in any way.

If the free storage is not sufficient, you need snapshots of your files, or you wish to share space among a research group, the group should lease storage.

## What are my options for leased storage?
Research Computing offers two tiers of leased storage, _Research Standard_ and _Research Project_. Please see our [storage page](/userinfo/storage) for details.

## How do I obtain leased storage?
Eligible PIs may request leased storage using our [storage request form](https://www.rc.virginia.edu/form/storage/). Permission to leased storage shares is managed through a Grouper group.

## Help! I deleted my files accidentally! What can I do?
* For your home storage, the directory is `/home/.snapshots` . Snapshots are created once per day. Find the date you wish to find the snapshot for and navigate to your computing id. 
* For GPFS _Research Project_ (leased) storage, the directory is `/gpfs/gpfs0/project/.snapshots`.
* Neither _Research Standard_ (leased) nor scratch storage is backed up in any way.

## Where should I run my slurm jobs?
The best place to run your slurm jobs is out of `/scratch` storage. `/scratch` is a fast, robust filesystem best suited for running slurm jobs. `/home` and `/project` are also appropriate. We ask that users do not run jobs out of `/standard`, as `/standard` is not intended for file I/O. If your workflow specifies a "workdir" make sure that the directory is set to the appropriate file space and not in `/standard`.

## Why should I use /scratch storage?
Scratch storage is fast and provides a large quantity of free space.  However, there are limits on the number of files and the amount of space you may use.  This is to maintain the stability and performance of the system.  [Please review our scratch filesystem policy for details](/userinfo/hpc/#scratch-directory). If you use or expect to use a large number of files please contact us.

- - -

# Storage Management

## How do I check my disk usage?
Run `hdquota` on a HPC frontend.

## How do I check my `/scratch` usage on Rivanna/Afton?
Run the command `hdquota -s`:

```
hdquota -s
```

If you have used up too much space, created too many files, or have "old" files you may be regarded as "overallocated". Please note that if you are overallocated, you won't be able to submit any new jobs until you clean up your `/scratch` folder.

## If I'm over my disk quota in either in my `/home` directory or my `/scratch` directory, how can I determine my disk usage?
You can run the following command from your `/home` or `/scratch` directory to see how your disk usage is distributed
across subdirectories, and where you need to remove files. You can increase `max-depth` to go further down in the directory structure.

```
du . -h  --max-depth=1|sort -h -r
```

## If I'm over my file limit in `/scratch`, how can I determine where all the files are located?
From your `/scratch` directory, run the following command to determine where you need to remove files.

```
find . -type f | cut -d/ -f2 | sort | uniq -c
```

## How long can I store files in `/scratch`?
`/scratch` is designed to serve as fast, temporary storage for running jobs, and is not long-term storage. For this reason, files are periodically marked for deletion from all `/scratch` directories. [Please review the /scratch filesystem policy for more details](/userinfo/hpc/#scratch-directory).  Store longer-term files in your home directory or [purchased storage](/userinfo/hpc/storage).

## How do I share data in my `/scratch` or leased storage with a colleague?
To share data from your `/scratch` directly with any other user, use [Globus](/userinfo/globus) sharing.  If your colleague also has an account on UVA HPC, he or she does not need to set up a personal endpoint but can simply log into the uva#main-DTN endpoint and navigate to his or her `/scratch` directory to transfer the files.

If you wish to share data in leased space with a member of your group, be sure that permissions are set so that the group member can access your subdirectory.  The college can then simply use the data directly, or copy it elsewhere.  If you wish to share data from your leased storage to a colleague who is not a member of the group, use Globus sharing in the same manner as sharing `/scratch`.

- - -

# Data Transfer

## How do I transfer data from UVA Box to my /scratch directory on Rivanna/Afton?

Log into UVA HPC using the web-based FastX and launch the MATE Desktop interface. Then from the top menu bar, open firefox through the FastX desktop, in the upper right hand corner of the browser window you should see 3 horizontal bars. Click on that and then select Preferences from the drop-down window. In the new window scroll down until you see Downloads and select ‘Always ask you where to save files’.  Then when you go to Box to download, a new window will pop up and if you click on ‘Other locations’, you can navigate to your scratch directory.

## How do I transfer data from my /scratch directory on Rivanna/Afton to my UVA Box account?

Log into UVA HPC using the web-based FastX and launch the MATE Desktop interface. Then from the top menu bar, open firefox through the FastX desktop and log into your UVA Box account. Once logged in to box, click on the New + button (upper right) to upload a file/folder. In the left sidebar of the new window, select Other Locations/Computer/scratch/<yourid> to navigate to your scratch directory and select the files/folders you want to upload to your box account.

## What Linux commands can I use to transfer files to/from Rivanna/Afton?

Smaller files can be transferred to/from Rivanna/Afton using `scp`, `sftp`, and `rsync` as well as standard FTP tools.

Larger files should be moved using [Globus](/userinfo/globus/).

[Read more](/userinfo/data-transfer/) about data transfer.

## I need to push and commit code changes from Rivanna/Afton to my GitHub account. How do I set that up?

You must first generate an ssh key and then copy it to your git repository. Here are the instructions for generating the ssh key and what to do on your git page:

1. To generate an ssh key, see the following link: [ssh key generation](https://www.rc.virginia.edu/userinfo/howtos/general/sshkeys/)

2. Click on the drop-down menu next to my Git profile picture in the upper right corner; Select Settings; Click on SSH and GPG keys in the left column; Click on the New SSH Key button and followed the directions to upload your ssh key.
Make sure that the ssh key is in your authorized_keys file in your .ssh directory on Rivanna/Afton.

3. The next step is to clone the repository using the ssh link. If you have already cloned the repository using the http link and made a number of changes to your files, you won’t want to redo them.  Rename the directory that was created when you first cloned the repository. Then, re-clone the repository using the ssh link and copy all of the files you had changed to the new directory. Finally, push those changes back to the repository.

## How do I transfer data from /standard or other storage shares?
To transfer files out of `/standard` into another storage space or otherwise move files between storage shares you can use [Globus](/userinfo/globus/) or one of many command line options such as `cp` `mv` or `rsync`.

- `mv` is best suited for transfering 1 file or a small collection of files to a new location. ie `mv /standard/share/file.txt /scratch/mst3k` will move file.txt into scratch
- `cp` will copy a file to a new location, keeping a copy in the original location. ie `cp /standard/share/file.txt /scratch/mst3k` will copy  file.txt into scratch, and keep it in /standard
- `rsync` is best for transferring large amounts of data. `rsync` has extensive documentation which can be found [here](https://linux.die.net/man/1/rsync). `rsync -av /standard/share/directory /scratch/mst3k` will transfer the entire directory in `/standard` to `/scratch`.

If running these commands on large amounts of data, they may time out on the compute nodes. We reccomend in that instance to run them through a simple Slurm job.

## Where can I learn more about the Globus file transfer tools?
Globus maintains a well documented [FAQ webpage](https://docs.globus.org/faq/) that answers common questions related to security, file transfer and sharing, Globus endpoints and the command line interface (CLI) tools.

## I keep getting a 'Permission Denied' error when trying to transfer my files through Globus. What can I do?
If you are certain that you have write permissions in the target directory and read permissions in the origin directory, you may be experiencing a common error with hidden files such as `.AppleDouble` or `Thumb.db`. You can resolve this issue by opening the `Transfer and Timer Options` menu at the center of the Globus screen (between the two blue "Start" buttons). Then check the box for `Skip files on source with errors` to tell Globus to ignore files that trigger a 'file not found' or 'permission denied' error.

## How do I add external or mapped network drives onto the Globus Path
When you first set up Globus, it only has access to certain folders of your local drive. You can add additional locations such as mapped network drives or external hard drives in the Globus Options/Preferences menu.

Windows: Right click the Globus icon > Options > + to add a new folder

Mac: Globus icon > Preferences > Access > + to add a new folder

Click the Up button in the Globus File Manager to navigate to higher level folders.

- - -

# <span style="text-decoration: underline;">Downloading Files</span>

## What command-line tools are available on Rivanna/Afton for downloading files from web?

#### wget

wget can be used to download files over HTTP,HTTPS and FTP protocols. You can use wget to download files from a single URL or multiple URLs. For example to download a file from a website you can use the following command:
```bash
wget https://example.com/file.zip
```
#### curl

In addition to what mentioned for wget, curl can be used to upload files to a server as well. To download a file from a website, you can use the following command:
```bash
curl -O https://example.com/file.zip
```

#### axel

axel not only downloads files over different protocols, but accelerates the process by using multiple connections to retrieve files from the destination. Axel is available on Rivanna/Afton through `module load axel`.
The syntax for using axel over 10 connections is as follows:
```bash
axel -n 10 http://example.com/file.zip
```

## wget, curl or axel?

For rather small files of size <1GB, it might be easier to use `wget` or `curl` since module loading is not necessary. For large files it is recommended to use axel on a compute node. Below is a simple comparison between the download rate of these tools on a single core compute node on Rivanna/Afton:


| tool | 100MB | 1GB |
|------|------|------|
| wget | ~5s | 36s |
| curl | ~5s | 35s |
| axel | ~2s | 8s |  

- - -

# Other Questions
What if my question doesn't appear here? Take a look at our User Guide.  If your answer isn't there, contact us.