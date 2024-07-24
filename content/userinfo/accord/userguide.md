+++
title = "ACCORD User Guide"
draft = false
date = "2021-10-11"
images = [""]
author = "Staff"
+++

***

<a href="../" style="float:right;width:100%;text-align:right;margin-bottom:2rem;" class="small">Back to Overview</a>

# **Projects**

## Request Access

+ A PI can request access using an online form. Please include a description of the project data, level of sensitivity, the anticipated scope of computing for the project, and any supplemental information such as IRB approval.  

<a href="/form/accord/"><button class="btn btn-success">Request Access to ACCORD</button></a>
<br>

## Your Project

A new project creates the following:

+ 1TB project storage 
+ 50GB home directory

## Add or Remove Team Members

Additional team members can be added or removed by request using the following online form. Please include the researcher's full name, email, and home institution.

<a href="/form/accord/"><button class="btn btn-success">Add or remove researchers</button></a>
<br>

## Transfer Data

Details on Globus data transfer coming soon

***

# **Environments**

## Create an environment

{{< button button-class="primary" button-text="Open the ACCORD Platform" button-url="https://accord.uvarc.io/" >}}
<br>

From the ACCORD console, select the project you want to work with and the desired resource tier. We currently offer the following resource tier options:

+ Small (2 cores & 16 GB RAM)
+ Medium (4 cores & 32 GB RAM)
+ Large (8 cores, 64 GB RAM)
+ X-Large ( 16 cores & 64 GB RAM)

Next, select an environment. Your container should be running within a few seconds and will appear under "Running Environments" on the same page.

To learn more about your choices of environments, see [Environments](/userinfo/accord/environments)

## Connect to an environment

Once you have created an environment, click on the "CONNECT" button for the appropriate environment and a new browser tab will open.

## Terminate an environment

When you are finished with your envionment, please terminate it. Using the "Running Environments" section of the ACCORD console, find the environment you wish to terminate.
On the far right will be a red "Terminate" button. Clicking this will terminate your environment.
Note that your saved files and storage are never terminated or destroyed in this process. 

Terminated environments cannot be recovered. However, they can be replicated.

## Replicate an environment

To replicate an environment you used before, scroll down on the ACCORD console to see a list of
environments you have run before. Click the orange "Run" button next to an environment you want to reuse.

***

# **Software and data**

## Software requirements

+ A modern web browser such as Chrome, Firefox, Safari, or Edge.
+ Access to your intitution's VPN
+ Install and register OPSWAT, a posture-checking client.

{{< button button-class="primary" button-text="Learn More About OPSWAT" button-url="https://www.opswat.com/" >}}

## Data retention

PIs may suspend a project at any time using the console. Project data is stored for 6 months and then
automatically removed. Suspended projects can be reinstated by request before this time.
