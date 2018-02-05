+++
title = ""
description = ""
author = "SOMRC Staff"
images = [""]
categories = ["userinfo"]
tags = [
    "rivanna", 
    "project",
    "storage",
    "qumulo"
]
draft = false
+++
# <code>/project</code> Storage Overview

For many groups and collaborations, data sharing is crucial, and therefore common data storage
repository is often one of the most important parts of any group project. Team needs to share 
results and data, while keeping their master copies in a secure, readily accessible, and robust
location. In order to allow group members to freely, yet privately, collaborate, the <code>/project</code>
storage option provides a flexible staging area.

<code>/project</code> removes any permissions issues, by allowing group members to freely share files without 
explicitly ensuring read permissions. Like other storage options, data can be moved in and out
via high-performance connections to the [Globus Data Transfer Node](https://discuss.rc.virginia.edu/t/globus-connect-data-transfer-introduction/345).

Your files are also protected on an individual basis. Regular snapshots of your work are taken automatically,
and can be restored either via convenient self-service or by a member of the admin team.

## Using <code>/project</code>

Once your group has purchased a space on <code>/project</code>, a dedicated directory is created for your group
under <code>/project</code> directory on the Rivanna HPC cluster. <code>cd</code> into your group's dedicated
directory and any files or sub-directories you place and/or create here would be visible only to your project members. 

## Transferring data into <code>/project</code>

Transferring files into </project> within Rivanna (e.g. to <code>/home</code> directory) or to your personal laptop
is fairly simple. You can use the <code>cp</code> command, e.g. to transfer a file to your <code>/home</code> directory:

	cp <your_file_name> /home/<your_id> 

And to copy a file from another directory to your <code>/project</code> directory, use
	cp <your_file_name> /project/<your_group_name>

To transfer a file from your laptop into <code>/project</code>, use <code>scp</code> or the [Globus DTN]
(https://discuss.rc.virginia.edu/t/globus-connect-data-transfer-introduction/345). Here we show you how to 
use <code>scp</code> to transfer a file from your laptop into <code>/project</code>
	scp <path_to_directory>/<your_file_name> <your_id>@rivanna.hpc.virginia.edu:/project/<your_group_name>

Once a successful transfer would occur, <code>scp</code> will show you the rate of transfer, total transfer percentage,
total bytes transferred, and time taken to transfer the file(s). 

## More Information about NFS (Network File System)

<code>/project</code> is based on the NFS protocol version 3. For more information, please view the following links:

1. [NFS v3 protocol](https://tools.ietf.org/html/rfc1813)
+. [IBM Presentation on NFS](https://researcher.watson.ibm.com/researcher/files/il-AVISHAY/03-nfs.pdf)
+. [Excellent FAQs on NFS usage, transfer limits, and storage] (http://nfs.sourceforge.net/)

+. 








## Requesting <code>/project</code> Storage
UVA faculty can purchase <code</project</code> space by submitting [this form](https://cadre.virginia.edu/node/add/storage-request).