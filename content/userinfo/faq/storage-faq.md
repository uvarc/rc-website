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

* [Accidental File Deletions](#help-i-deleted-my-files-accidentally-what-can-i-do)
* [Why Lease Storage](#why-should-i-lease-storage)
* [Leased Storage Options](#what-are-my-options-for-leased-storage)
* [Where to Run Slurm Jobs](#where-should-i-run-my-slurm-jobs)
* [How Do I Transfer Between Shares](#how-do-i-transfer-data-from-standard-or-other-storage-shares)
* [File Transfer with Globus](#where-can-i-learn-more-about-the-globus-file-transfer-tools)
* [Permission Denied Error with Globus](#i-keep-getting-a-permission-denied-error-when-trying-to-transfer-my-files-through-globus-what-can-i-do)

- - -

# Help! I deleted my files accidentally! What can I do?
* For your home storage, the directory is `/home/.snapshots` . Snapshots are created once per day. Find the date you wish to find the snapshot for and navigate to your computing id. 
* For GPFS _Research Project_ (leased) storage, the directory is `/gpfs/gpfs0/project/.snapshots`.
* Neither _Research Standard_ (leased) nor scratch storage is backed up in any way.

# Why should I lease storage?
Leasing storage from Research Computing means that you do not have to run your own data server or backup system.  You can lease storage for lab data without using any of the Research Computing computational resources, or you can lease storage for use with our computing facilities.

# What are my options for leased storage?
Research Computing offers two tiers of leased storage, _Research Standard_ and _Research Project_. Please see our [storage page](/userinfo/storage) for details.

# Where should I run my slurm jobs?
The best place to run your slurm jobs is out of `/scratch` storage. `/scratch` is a fast, robust filesystem best suited for running slurm jobs. `/home` and `/project` are also appropriate. We ask that users do not run jobs out of `/standard`, as `/standard` is not intended for file I/O. If your workflow specifies a "workdir" make sure that the directory is set to the appropriate file space and not in `/standard`.

# How do I transfer data from /standard or other storage shares?
To transfer files out of `/standard` into another storage space or otherwise move files between storage shares you can use [Globus](userinfo/globus/) or one of many command line options such as `cp` `mv` or `rsync`.

- `mv` is best suited for transfering 1 file or a small collection of files to a new location. ie `mv /standard/share/file.txt /scratch/mst3k` will move file.txt into scratch
- `cp` will copy a file to a new location, keeping a copy in the original location. ie `cp /standard/share/file.txt /scratch/mst3k` will copy  file.txt into scratch, and keep it in /standard
- `rsync` is best for transferring large amounts of data. `rsync` has extensive documentation which can be found [here](https://linux.die.net/man/1/rsync). `rsync -av /standard/share/directory /scratch/mst3k` will transfer the entire directory in `/standard` to `/scratch`.

If running these commands on large amounts of data, they may time out on the compute nodes. We reccomend in that instance to run them through a simple Slurm job.

# Where can I learn more about the Globus file transfer tools?
Globus maintains a well documented [FAQ webpage](https://docs.globus.org/faq/) that answers common questions related to security, file transfer and sharing, Globus endpoints and the command line interface (CLI) tools.

# I keep getting a 'Permission Denied' error when trying to transfer my files through Globus. What can I do?
If you are certain that you have write permissions in the target directory and read permissions in the origin directory, you may be experiencing a common error with hidden files such as `.AppleDouble` or `Thumb.db`. You can resolve this issue by opening the `Transfer and Timer Options` menu at the center of the Globus screen (between the two blue "Start" buttons). Then check the box for `Skip files on source with errors` to tell Globus to ignore files that trigger a 'file not found' or 'permission denied' error.
