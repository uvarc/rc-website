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
For many groups and collaborations, data sharing is crucial. 
The <code>/project</code> storage option provides a flexible staging area for those data.
Where <code>/home</code> keeps your individual data safe and <code>/scratch</code> provides 
high-speed parallel computation space, <code>/project</code> reduces permissions headaches.

You can define a <code>MyGroup</code> that contains all of your collaborators, controlling 
access in a single convenient place. When you purchase <code>/project</code> space, you are
given a well-defined allocation in a pool of almost **2 PB**. Data can be moved in and out
via high-performance connections to the [Globus Data Transfer Node](https://discuss.rc.virginia.edu/t/globus-connect-data-transfer-introduction/345) 
or to the Rivanna cluster -- your access is unimpeded whether you use HPC resources or not.

The <code>/project</code> space is housed in a reliable and performant cluster of data servers. 
It is protected from the loss of several disks at a time by erasure coding and automatic rebuilds.
In the event of a disk failure, that disk becomes redundant in minutes. 
Your files are also protected on an individual basis. Regular snapshots of your work are taken automatically,
and can be restored either via convenient self-service or by a member of the admin team.

## Requesting <code>/project</code> Storage
UVA faculty can purchase <code</project</code> space by submitting [this form](https://cadre.virginia.edu/node/add/storage-request).