+++
title = "Sensitive Data Storage - Ivy"
description = ""
author = "RC Staff"
images = [""]
categories = ["userinfo"]
date = "2018-04-19T17:45:12-05:00"
tags = [
    "ivy", 
    "sensitive data",
    "storage",
]
draft = false
+++

# Overview
The [Ivy](/userinfo/ivy/overview) secure computing environment meets both HIPAA- and CUI-compliance standards and is ideal for storing highly sensitive research data. Ivy offers several storage options to fit your research computing needs.

# Ivy Central Storage {#ivy-central-storage}
Ivy Central Storage (ICS) is a highly sensitive data parking zone and central storage pool with a capacity greater than 1PB. This storage space is available for researchers with highly sensitive data and can be mounted on an [Ivy virtual machine](/userinfo/ivy/overview#virtual-machines) (VM). For added security, files stored on ICS are read & write only. Executable files can be moved from ICS to VM storage.

Researchers can request space on ICS by first requesting an Ivy account using the <a href="https://services.rc.virginia.edu/ivyvm" target="_blank">Ivy request form</a>. Users are granted 1TB of space for free, and additional space can be requested in 1TB increments.


# Data Transfer to Ivy

To ensure that files are always secure, data can only be transferred to Ivy through the Ivy secure data transfer node (DTN) using Globus Connect. <a href="https://www.globus.org/" target="_blank">Globus</a> provides access to data on local machines and Ivy Central Storage, Ivy's data parking zone. Data can then be moved between ICS and VM NAS or block storage as needed. Globus is well suited for transferring both small files and large amounts of data. More information on Globus data transfer can be found [here](/userinfo/data-transfer).

<h3>
  Sensitive Storage Data Transfer
  <small class="text-muted">High level Overview</small>
</h3>
<img src="https://s3.amazonaws.com/uvasom-assets/imgs/somrc-storage-secure-apr2018.png" alt="secure-storage-options-overview">
