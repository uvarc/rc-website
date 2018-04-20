+++
title = "Sensitive Data Storage - Ivy"
description = ""
author = "SOMRC Staff"
images = [""]
categories = ["userinfo"]
date = "2018-04-19T17:45:12-05:00"
tags = [
    "rivanna", 
    "non-sensitive data",
    "storage",
    "qumulo",
    "lustre"
]
draft = false
+++

# Overview
The [Ivy](/userinfo/ivy) secure computing environment meets both HIPAA- and CUI-compliance standards and is ideal for storing sensitive research data. Ivy offers several storage options to fit your research computing needs.

# Ivy Central Storage
Ivy Central Storage (ICS) is a sensitive data parking zone and central storage pool with a capacity greater than 1PB. This storage space is available for researchers with highly sensitive data and can be mounted on an [Ivy virtual machine](/userinfo/ivy/#virtual-machines) (VM). For added security, files stored on ICS are read & write only. Executable files can be moved from ICS to VM storage.

Researchers can request space on ICS by first requesting an Ivy account using the form on the CADRE [website](https://cadre.virginia.edu/node/add/account-request). Users are granted 1TB of space for free, and additional space can be requested in 500GB increments.

# VM Storage
In addition to ICS space, researchers can also request network attached storage (NAS). Unlike ICS, files stored here can be executable. NAS space is accessible via an [Ivy VM](/userinfo/ivy/#virtual-machines). Data can be transferred from NAS to ICS for long-term data storage.

VM NAS space can be requested with an Ivy account using the form on the CADRE [website](https://cadre.virginia.edu/node/add/account-request). Users are granted 1TB for free and may request additional space in 500GB increments.

Additionally, Ivy VMs have 100GB of block storage. All software and applications installed on the VM take up some of this block storage space.

# DDL Storage
DDL storage is available for researchers who choose to manage their projects in [Domino Data Lab](https://somrc.virginia.edu/userinfo/ivy/#domino-data-lab) (DDL). Data stored here can only be manipulated within DDL and is not visible to an Ivy VM. Data can be transferred to DDL storage using DDL's [drag-and-drop](https://somrc.virginia.edu/userinfo/ivy-ddl/#uploading-files) interface or [command-line tools](https://discuss.rc.virginia.edu/t/how-do-i-upload-large-files-to-domino-data-lab-through-the-cli/74).

Each DDL project is granted 500GB of storage space. Access to DDL can be requested using the Ivy account request [form](https://cadre.virginia.edu/node/add/account-request).

# Data Transfer to Ivy

<p>To ensure that files are always secure, data can only be transferred to Ivy through the Ivy secure data transfer node (DTN) using Globus Connect. <a href="https://www.globus.org/">Globus</a> provides access to data on local machines and Ivy Central Storage, Ivy's data parking zone. Data can then be moved between ICS and VM NAS or block storage as needed. Globus is well suited for transferring both small files and large amounts of data. More information on Globus data transfer can be found on the UVa Research Computing <a href="https://discuss.rc.virginia.edu/t/ivy-secure-dtn-transfer-sensitive-data/771">FAQ knowledgebase</a>.</p>

<h3>
  Sensitive Storage Data Transfer
  <small class="text-muted">High level Overview</small>
</h3>
<img src="https://s3.amazonaws.com/uvasom-assets/imgs/somrc-storage-secure-apr2018.png" alt="secure-storage-options-overview">



For more help, please feel free to contact SOMRC to set up a consultation or visit us during office hours. We also provide in-person training opportunities and more through the [CADRE Academy portal](https://education.cadre.virginia.edu/#/home).