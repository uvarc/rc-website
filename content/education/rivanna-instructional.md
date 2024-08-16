+++
draft = false
date = "2023-09-13T10:55:28-05:00"
title = "Instructional Use of High Performance Computing"
description = ""
author = "RC Staff"
categories = ["education","workshops"]
tags = ["Rivanna","instructional","courses"]

+++

Instructors can request _instructional allocations_ on Rivanna and Afton for classes and extended workshops.  These allocations are time-limited and generally allow access to a restricted set of nodes and only one special Slurm partition, but are otherwise equivalent to any allocation.

- - -

# Resource Availability

## Hardware and Partition

Instructional allocations may use `interactive` partition.  The standard allocation is 100,000 SUs for the semester during which the course is conducted.  For workshops, the allocation will persist during the workshop and for two days afterwards. RC offers several low-cost storage options to researchers, including 10TB of Research Standard storage for each eligible PI at no charge. Instructors are encouraged to utilize this 10TB of storage for both research and teaching activities. For more detailed descriptions of our storage options, visit https://www.rc.virginia.edu/userinfo/storage/. 

## Software & Storage Environment

Research Computing's primary focus is supporting the direct research mission of the University. Instructional allocations are provided in recognition of the many areas where the educational and research missions of the University meet, and in recognition that there is value in providing UVA's diverse communities with experience in an HPC environment. However, staff time is a highly limited resource and instructional use of RC systems as a largely 'as-is' service with standardized software and storage environments. We are unable to provide customization of the environment for specific classes.

## Interface

For most classes, we recommend the [Open OnDemand](/userinfo/hpc/ood) interface if it suits the expected usage.  This does not require knowledge of Unix and greatly reduces the training burden.  The Open OnDemand interface requires only Netbadge credentials and can be accessed without a VPN from off Grounds.

If Open OnDemand is not adequate, the other recommended interface is [FastX Web](https://www.rc.virginia.edu/userinfo/rivanna/logintools/fastx/).  This is a remote desktop application and requires the students to be able to navigate a Unix desktop system.  Access from off Grounds via FastX requires a VPN connection.

FastX connects only to a *frontend*.  We significantly restrict the time, memory, and cores available to frontend jobs.  If students are running anything but very short jobs, the Open OnDemand applications should be utilized.  These access the compute nodes and are far less limited.  Open OnDemand provides a remote desktop on compute nodes as well as direct access to JupyterLab, the Matlab Desktop, and Rstudio Server.

- - -

# How to Submit a Request

Instructors planning to use HPC should fill out the [form](https://www.rc.virginia.edu/form/allocation-instructional).  You will need to create the Grouper (requires VPN connection) allocation group.  We suggest a group name related to the course rubric and the instructor's name, e.g. `cs5014-mst3k`.  Once the group is created, the instructor or a designated group administrator will need to add the student IDs.  The instructor should empty the membership of the group after the class or workshop has terminated. Instructors are required to submit a fresh instructional allocation request—either a new request or a renewal request—at the start of each semester. 

- - -

# Using the Allocation

Prior to the first class use, instructors should test the allocation and the software applications required during class.  Please do not wait until multiple students are attempting to use it.  

## Passwords
Students, particularly undergraduates, frequently experience password difficulties.  Rivanna and Afton use the Eservices password to authenticate, but few students know this password.  Instructors are urged to communicate to students that they should go to the ITS [password page](https://virginia.service-now.com/its?id=itsweb_services&category_id=869613f3db9fc7c0f032f1f51d9619ce) at least several hours in advance and change their Netbadge password before using the system.  Changing the Netbadge password will sync the Eservices password with it.

## Partition and Reservations

The allocation will have access to the `interactive` partition.  Students can enter this with the `-p` or `--partition` options to Slurm.
```
#SBATCH -p interactive
```
or
```
#SBATCH --partition=interactive
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
