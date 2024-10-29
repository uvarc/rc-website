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

# Where can I learn more about the Globus file transfer tools?
Globus maintains a well documented [FAQ webpage](https://docs.globus.org/faq/) that answers common questions related to security, file transfer and sharing, Globus endpoints and the command line interface (CLI) tools.

# I keep getting a 'Permission Denied' error when trying to transfer my files through Globus. What can I do?
If you are certain that you have write permissions in the target directory and read permissions in the origin directory, you may be experiencing a common error with hidden files such as `.AppleDouble` or `Thumb.db`. You can resolve this issue by opening the `Transfer and Timer Options` menu at the center of the Globus screen (between the two blue "Start" buttons). Then check the box for `Skip files on source with errors` to tell Globus to ignore files that trigger a 'file not found' or 'permission denied' error.
