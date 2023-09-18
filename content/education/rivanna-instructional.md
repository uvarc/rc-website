+++
draft = false
date = "2023-09-13T10:55:28-05:00"
title = "Instructional Use of Rivanna"
description = ""
author = "RC Staff"
categories = ["education","workshops"]
tags = ["Rivanna","instructional","courses"]

+++

Instructors can request _instructional allocations_ on Rivanna for classes and extended workshops.  These allocations are time-limited and generally allow access to a restricted set of nodes and only one special Slurm partition, but are otherwise equivalent to any allocation.

- - -

# Resource Availability

## Hardware and Partition

Instructional allocations use a dedicated `instructional` partition.  The standard allocation is 100,000 SUs for the semester during which the course is conducted.  For workshops, the allocation will persist during the workshop and for two days afterwards.  Instructional allocations come with 1TB of temporary project storage space. Data kept in the temporary project storage space will be automatically purged 2 weeks after the class ends unless the instructor requests an extension. The standard number of cores is 20 on one node.

## Software

Instructors may submit requests to RC staff for help installing software.  Unless it is of general research interest, the software will be installed to the class shared storage space without a module.  Instructors must provide guidance to the students on how to use the software.  Instructors who are able to install software themselves should consider doing so; RC staff will attempt to fulfill requests quickly, but cannot guarantee as rapid a response as if the instructor installs it himself/herself.

## Interface

For most classes, we recommend the [Open OnDemand](https://www.rc.virginia.edu/userinfo/rivanna/ood/overview/) interface if it suits the expected usage.  This does not require knowledge of Unix and greatly reduces the training burden.  The Open OnDemand interface requires only Netbadge credentials and can be accessed without a VPN from off Grounds.

If Open OnDemand is not adequate, the other recommended interface is [FastX Web](https://www.rc.virginia.edu/userinfo/rivanna/logintools/fastx/).  This is a remote desktop application and requires the students to be able to navigate a Unix desktop system.  Access from off Grounds via FastX requires a VPN connection.

FastX connects only to a *frontend*.  We significantly restrict the time, memory, and cores available to frontend jobs.  If students are running anything but very short jobs, the Open OnDemand applications should be utilized.  These access the compute nodes and are far less limited.  Open OnDemand provides a remote desktop on compute nodes as well as direct access to JupyterLab, the Matlab Desktop, and Rstudio Server.

- - -

# How to Submit a Request

Instructors planning to use Rivanna should fill out the [form](https://www.rc.virginia.edu/form/allocation-instructional).  If this is the first use, we will create the MyGroups (requires VPN connection) allocation group.  We suggest a group name related to the course rubric and the instructor's name, e.g. `cs5014-mst3k`.  Once the group is created, the instructor or a designated group administrator will need to add the student IDs.  The instructor should empty the membership of the group after the class or workshop has terminated. Instructors are required to submit a fresh instructional allocation request—either a new request or a renewal request—at the start of each semester. 

- - -

# Using the Allocation

Prior to the first class use, instructors should test the allocation and the software applications required during class.  Please do not wait until multiple students are attempting to use it.  

## Passwords
Students, particularly undergraduates, frequently experience password difficulties.  Rivanna uses the Eservices password to authenticate, but few students know this password.  Instructors are urged to communicate to students that they should go to the ITS [password page](https://virginia.service-now.com/its?id=itsweb_services&category_id=869613f3db9fc7c0f032f1f51d9619ce) at least several hours in advance and change their Netbadge password before using the system.  Changing the Netbadge password will sync the Eservices password with it.

## Partition and Reservations

The allocation will have access to the `instructional` partition.  Students can enter this with the `-p` or `--partition` options to Slurm.
```
#SBATCH -p instructional
```
or
```
#SBATCH --partition=instructional
```
If students use the Open OnDemand interface, they will enter this into the appropriate textbox when starting their interactive job application.

Instructors are urged to request *reservations* for their classes.  The reservation will be created to coincide with the class meeting time.  Students must add an option `--reservation=your-reservation` in order to access the reserved resources.  Students may still use the instructional partition outside the reservation, but those jobs will wait like any other queued job. Outside the dedicated reservation window jobs should be submitted without the `--reservation` flag for immediate queueing; otherwise the job will be pending until the next reservation window opens.

For batch jobs, the reservation can be entered on the command line
```
sbatch --reservation=your-reservation myscript.slurm
```
or it can be added to the job script preamble
```
#SBATCH --reservation=your-reservation
```
For Open OnDemand interactive applications, it should be entered as an additional Slurm option.

## Training
Research Computing staff are available to come to a class session to provide training to the students.  This can be done in-person, when possible, or virtually through Zoom.  
