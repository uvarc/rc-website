+++
title = "Highly Sensitive Data Storage - Ivy and Rio"
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
Residing within the High Security Zone (HSZ), the [Ivy](/userinfo/ivy/) secure computing environment is designed to fit your [highly sensitive data](https://security.virginia.edu/definitions/highly-sensitive-data) (HSD) research computing needs and meets HIPAA, FERPA, CUI and ITAR compliance standards. Within the HSZ, researchers can store their highly sensitive research data in High-Security Research Standard Storage. 

# Ivy Central Storage {#ivy-central-storage}
Ivy Central Storage (ICS) was an HSD parking zone and central storage pool with a capacity greater than 1PB. This storage space was available for researchers with highly sensitive data and could be mounted on an Ivy Virtual Machine. 

As of 10/15/24, ICS will be upgraded to High-Security Research Standard Storage.

# High-Security Research Standard Storage {#hs-standard-storage}

High-Security Research Standard Storage is an HSD storage area within the HSZ with a capacity greater than 6PB. High-Security Research Standard Storage is similar to Research Standard Storage, however it is integrated with the High-Security Data Transfer Node and mounted on an [Ivy virtual machine](/userinfo/ivy/) (VM) to create a highly secure environment. For added security, files stored on High-Security Research Standard Storage are read & write only. Note: snapshots, backup, and replication are not provided. 

Researchers can request space on High-Security Research Standard Storage by first requesting an Ivy account using the [Ivy request form](https://services.rc.virginia.edu/ivyvm). Researchers are granted 1TB of space at no-cost, and additional space can be requested in 1TB increments using our [Storage Request](/form/storage/) form.

# High-Security Research Project Storage {#hs-project-storage}

High-Security Research Project Storage is a high-performance parallel HSD storage area within the HSZ with a capacity of approximately 1.6 PB. High-Security Research Research Storage is integrated with the High-Security Data Transfer Node and mounted on a [Rio virtual machine](/userinfo/ivy/) (VM) to create a highly secure environment. Note: daily snapshots are available with HSZ Research Project Storage for the preceding 7 days. 

Researchers can request space on High-Security Research Project Storage for an existing Rio HPC project in 1TB increments using our [Storage Request](/form/storage/) form.

# Data Transfer to HSZ (Ivy and Rio)

To ensure that files are always secure, data can only be transferred to Ivy and Rio through the High-Security Data Transfer Node using Globus Connect. <a href="https://www.globus.org/" target="_blank">Globus</a> provides access to data on local machines and HSZ storage. Data can then be moved between HSZ storage as needed. Globus is well suited for transferring both small files and large amounts of data. More information on Globus data transfer can be found [here](/userinfo/data-transfer).

<h3>
  Sensitive Storage Data Transfer
  <small class="text-muted">High level Overview</small>
</h3>

<img src="/images/hs_standard_schematic.png" />
