+++
description = ""
title = "Ivy and Rio FAQs"
draft = false
date = "2026-01-221T01:45:12-05:00"
tags = ["hpc","ivy","faqs","supercomputer"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "rivanna"

+++

* [General Usage](#general-usage)
* [Research Software](#research-software)
* [Data and Storage](#data-and-storage)
* [Rio](#rio)

 - - -

# General Usage

## What are Ivy and Rio?
Ivy and Rio are located in Research Computing’s high-security environment, allowing researchers to compute and store highly sensitive data. Ivy refers to isolated Virtual Machines (VMs) that are provisioned per requested project. Rio refers to a high-performance computing cluster that is usable within the high security environment.

## How do I gain access to Ivy/Rio?
Access is granted and managed at the project level. PIs may request a new project by filling out our [Project Request Form](https://www.rc.virginia.edu/userinfo/ivy/#requesting-access). PIs can add new members or remove members to existing projects via the [Ivy Services Application](https://services.rc.virginia.edu/).

## Who is eligible to request a project?
All UVA faculty are eligible to serve as PI and request access to Ivy and Rio for their research group. Staff and students are not eligible to serve as PI.

## How do I manage the members of my project?
User access is granted through a project’s individual page within our [Ivy Services Application](https://services.rc.virginia.edu/). The PI will have an option to add and remove members. The PI will also need to verify membership status annually. 

## My PI wants to add me to their project. What do I need to do?
When you are added to a project, you will receive an email to review and sign the Research Use Data Agreement (RUDA), which outlines the policies and procedures required to maintain the integrity and security of the environment. Alongside this, you need to complete the following:

* Complete the [High Security Awareness Training](https://in.virginia.edu/hsat-training) (HSAT). This training needs to be completed annually. 
* Set up your workstation for access to the High Security VPN (HSVPN) by installing:
  * [Cisco AnyConnect Secure Mobility Client](https://in.virginia.edu/vpn)
  * [Opswat](https://in.virginia.edu/vpncheck)
  * [ITS-configured anti-malware software](https://in.virginia.edu/mde)

Note: You do not need to request an HSVPN filter. Our team submits the request when provisioning you as a new user. 

## Can I access the Internet from my VM?
VMs run on a private, secure network and cannot reach outside Internet sources by default. PIs may request access to specific sites required for the project, subject to a security review by our team by submitting an [Ivy support ticket](https://www.rc.virginia.edu/form/support-request/). We cannot guarantee that all domains can be accessed.

 - - -

# Research Software

## How do I install software on my Ivy VM? 
When requesting a new project, PIs can specify any additional software needed beyond what is installed by default. See our list of [installed software](https://www.rc.virginia.edu/userinfo/ivy/#software). Users cannot install software locally on their VM. All additional software must be requested by the PI and is subject to a security review by our team by submitting an [Ivy support ticket](https://www.rc.virginia.edu/form/support-request/). We cannot guarantee that all software can be installed. 

## How do I use software on my Ivy VM?
On Linux VMs, any software application you want to load will need to be loaded using the lmod modules system. See instructions on [using lmod](https://www.rc.virginia.edu/userinfo/hpc/software/modules/). On Windows VMs, software can be found in the Start menu.

## How do I create conda environments?
Python packages within the conda-forge, PyPi, and Bioconda repositories are allowed to be installed. Users may use whatever installation method is normal for these repositories. See instructions on [creating conda environments](https://www.rc.virginia.edu/userinfo/ivy/#virtual-machines) for Rio users.

## How do I install R packages?
R libraries within the CRAN repository are allowed to be installed. Users may use whatever installation method is normal for this repository. See instructions on [installing R libraries](https://www.rc.virginia.edu/userinfo/hpc/software/r/#submitting-jobs-to-rio) for Rio users.
 - - -

# Data and Storage

## What kind of data is permitted?
Ivy and Rio support the transfer, storage, and processing of highly sensitive data, including data governed by external regulations. Refer to the [data sensitivity matrix](https://www.rc.virginia.edu/userinfo/storage/data-sensitivity/) to determine which data types are permitted on RC systems, or reach out to RC-DAC@virginia.edu for a consultation. 

## What storage options are available?
VMs are provisioned with 1TB of High Security Research Standard Storage that all users of the VM have access to. PIs may increase this storage and request additional High Security Research Project Storage. Details can be found [here](https://www.rc.virginia.edu/userinfo/storage/sensitive-data/#hs-standard-storage).

## How do I access my High Security Research Standard or Research Project Storage? 
After SSH login on a Linux VM:  

 * Project Storage: cd ../../project/ivy-proj-name 
 * Standard Storage: cd ../../standard/ivy-proj-name 

Replace ivy-proj-name with your Ivy project’s Grouper group name.
Storage may also be accessed via the Open OnDemand (OOD) file manager or Windows File Explorer for Windows VMs. 

## How do I manage storage internally?
Windows VM users may use the Windows File Explorer application to move and manage their data within the VM. Linux VM users may use the OOD file manager or command line commands to manage their data within the VM.

## How do I access regulated research data from an external repository?
Access to regulated research data can be granted following a security review by our team by submitting an [Ivy support ticket](https://www.rc.virginia.edu/form/support-request/).

## How do I transfer data to and from my VM?
Globus is the only approved method for data transfer to and from high security storage via the UVA IVY-DTN. See [here](https://learning.rc.virginia.edu/notes/globus-data-transfer/) on how to set up the application.

## I am receiving the error "This endpoint is configured as High Assurance...” when trying to transfer data using Globus.
This error indicates that your Personal Globus Collection was configured as a High Assurance endpoint. Our subscription does not allow personal collections to have this feature. To fix the error, you will have to delete your personal collection and recreate it by rerunning the Globus Connect Personal Application.

## Globus is unable to connect, and I can’t transfer my data.
Ensure that you are not connected to the HSVPN. Globus does not work while the HSVPN is turned on and must be turned off before transferring your data. If you are still experiencing difficulties, submit an [Ivy support ticket](https://www.rc.virginia.edu/form/support-request/).

 - - -

# Rio

## How do I use Rio?
Rio is a high-performance computing cluster that is accessible from Linux VMs. Your Linux VM acts as a login server to interface with Rio. Running computations on Rio requires submitting jobs using the Slurm resource manager. A detailed [Introduction to Rio](https://learning.rc.virginia.edu/tutorials/rio-intro/) tutorial is available.

## How do I perform computations and submit jobs on Rio? 
Rio can be used by submitting jobs rather than running a program directly on your Ivy VM. Jobs can be submitted via the terminal using Slurm or Open OnDemand through interactive sessions. 

## What partitions are available on Rio?
The partitions currently available are standard and gpu. Standard is for CPU-based jobs while gpu is for GPU jobs. 

## From what folder should I submit my Slurm jobs?
Rio hardware only has Research Standard and Research Project storage mounted. A user’s home folder is not visible on Rio compute nodes. No files necessary to perform a job should reside in /home. This includes job scripts, which must be submitted within either standard or project storage.

## What extra information does my job script need? 
Slurm requires that you input an account using the `–A` or `--account` option. Your account name is the group name depicted on your project’s page. 

## What data is permitted for use with Rio?
Refer to the [data sensitivity matrix](https://www.rc.virginia.edu/userinfo/storage/data-sensitivity/) to determine which data types are permitted on Rio, or reach out to RC-DAC@virginia.edu for a consultation. 

## How do I request access to Rio?
All new Linux VMs are provisioned with Rio access by default, excluding VMs that are working with CUI data. Existing Linux VMs can be granted access to Rio upon request from the PI.

## What VMs are eligible for Rio?
Only Linux VMs are configured to utilize Rio. Since Rio can be used to perform computations instead of your Ivy VM environment, we suggest requesting the Small VM size.

## Can my Windows VM use Rio?
Only Linux VMs have the functionality to access the Rio cluster. Windows VMs cannot use Rio.

 - - - 

# Other Questions
What if my question doesn't appear here? Take a look at our User Guide.  If your answer isn't there, contact us.
