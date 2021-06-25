+++
description = ""
title = "ACCORD"
draft = false
date = "2020-06-25T17:45:12-05:00"
tags = ["supercomputer","storage","infrastructure"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "accord"
+++

# User Guide

* [Request Access](#request-access)
* [Your Project](#your-project)
* [Add/Remove Team Members](#add-or-remove-team-members)
* [Transfer Data](#transfer-data)
* [Create an Environment](#create-an-environment)
* [View the Status of an Environment](#view-the-status-of-an-environment)
* [Connect to an Environment](#connect-to-an-environment)
* [Terminate an Environment](#terminate-an-environment)
* [Replicate an Environment](#replicate-an-environment)
* [Software Requirements](#software-requirements)

### Request Access

User onboarding is a multi-step process:

1.) A PI requests access using an online form. Required documentation includes a description of the project data, level of sensitivity, the anticipated scope of computing for the project, and any supplemental information such as IRB approval.  

[<button class="btn btn-success">Request Access to ACCORD</button>](/form/omero/)

2.) The project application will be reviewed and approved/declined.  
3.) If approved and a PI is from an institution that is new to ACCORD, an MOU/contract between their home institution and UVA will need to be established.  
4.) The approved project, under institutional contract, can now be fulfilled.  
5.) The PI will confirm their email and complete final registration steps.  
6.) When registration is complete the user will be notified by email. Their project will now be created.  


### Your Project

A new project creates the following:

1. System group with the PI as both a member and owner
2. 1TB project storage 
3. Home directory for the PI 

PIs may suspend a project at any time using the console. Project data is stored for ~6 months and then
automatically removed. Suspended projects can be reinstated by request before this time.

[<button class="btn btn-success">Manage a Project</button>](/form/omero/)

### Add or Remove Team Members

Once additional researchers have requested access to ACCORD and have been approved (following the onboarding
steps above), the owner of a project can add or remove those individuals at any time. 

Because user authentication is handled through single sign-on from each user's home institution, PIs should
be aware of the `eppn` for their colleagues. An `eppn` looks similar to most institutional email
addresses, in the form of `userid` + `domain`, such as `mst3k@mit.edu` or `abc5y@virginia.edu`.


### Transfer Data

Details on Globus data transfer coming soon


### Create an Environment

[<button class="btn btn-success">Open the ACCORD Console</button>](/form/omero/)

From the ACCORD console, select the project you want to work with. Next select an environment. Your container should be running within a few seconds and will appear under "Running Environments" on the same page.

To learn more about your choices of environments, see [Environments](/userinfo/accord/environments)

### View the status of an environment

Check the "Running Environments" section of the ACCORD console. This will tell you the type of environment,
when you created it, how long it has been running, and how to connect or terminate it.


### Connect to an Environment

Once you have created an environment, the console will display all of your running environments. Click on 
the "CONNECT" button for the appropriate environment and a new browser tab will open.


### Terminate an environment

Using the "Running Environments" section of the ACCORD console, find the environment you wish to terminate.
On the far right will be a red "Terminate" button. Clicking this will terminate your environment.
Note that your saved files and storage are never terminated or destroyed in this process. 

Terminated environments cannot be recovered. However, they can be replicated (see below).

### Replicate an environment

To replicate or repeat an environment you used before, scroll down on the ACCORD console to see a list of
environments you have run before. Click the orange "Run" button next to an environment you want to reuse.


## Software Requirements


- A modern web browser such as Chrome, Firefox, Safari, or Edge.
- Install and register OPSWAT, a posture-checking client.

[<button class="btn btn-success">Learn More About OPSWAT</button>](/form/omero/)

