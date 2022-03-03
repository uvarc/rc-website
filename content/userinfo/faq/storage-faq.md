+++
description = ""
title = "Storage FAQs"
draft = false
date = "2020-02-14T15:15:12-05:00"
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

- - -

# Help! I deleted my files accidentally!  What can I do?
* Your home directory contains a hidden directory `.snapshot` which is not visible even with `ls -a`.  Change into that directory to find timestamped versions of your home directory.  Snapshots are created once per day.  
* _Research Project_ (leased) storage also has a `.snapshot` directory.
* Neither _Research Standard_ (leased) nor Rivanna scratch storage is backed up in any way.

# Why should I lease storage?
Leasing storage from Research Computing means that you do not have to run your own data server or backup system.  You can lease storage for lab data without using any of the Research Computing computational resources, or you can lease storage for use with our computing facilities.

# What are my options for leased storage?
Research Computing offers two tiers of leased storage, _Research Standard_ and _Research Project_. Please see our [storage page](/userinfo/storage) for details.

# Where can I learn more about the Globus file transfer tools?
Globus maintains a well documented [FAQ webpage](https://docs.globus.org/faq/) that answers common questions related to security, file transfer and sharing, Globus endpoints and the command line interface (CLI) tools.
