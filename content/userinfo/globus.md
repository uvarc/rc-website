+++
author = "SOMRC Staff"
description = ""
title = "Globus Data Transfer"
date = "2017-02-24T10:08:29-05:00"
draft = false
tags = ["globus", "storage","rivanna", "s3"]
categories = ["userinfo"]
images = [""]

+++

<p class=lead>**Globus** - Unified access to your research data, across all systems, using any existing identity. Systems such as:</p>

* Laptops
* HPC clusters
* Lab / departmental storage
* Tape archives and Cloud storage
 
Access them all using just a web browser. This can help you share research data with colleagues, co-investigators, or to move data back and forth between a lab workstation and Rivanna or your personal computer.

Data stored at a different institution? At a supercomputing facility? All you need is your campus login.

**Globus Connect is NOT for secure or sensitive data.**

# Set Up Globus Connect Personal
<img class="img-right" src="//uvarc-discourse.s3.amazonaws.com/original/1X/e173debd0e4ab4497f7a799cbe864258f3482e5a.png" width="390" height="129">

1. Download the [Globus Connect Personal application](https://www.globus.org/globus-connect-personal) for your laptop or workstation. 
2. Run the installer as directed. 
    * This will ask you to name your local endpoint - we suggest something very descriptive, such as `mstk3-laptop` or `smith-genlab-workstation`.
    * The installer will also generate a unique key for your computer. Copy that to your clipboard once created, you will need it in the steps below.
3. This will leave the agent running on your laptop or workstation. Click on the agent icon (in the tray for Windows users, in the toolbar for MacOS users) to change your preferences or to see the web console.
4. Your local workstation (or laptop) is now a Globus Endpoint.

# Log into the Web Interface

* Open a browser window to **https://www.globus.org/** and click on **Log In**.
* Select "University of Virginia" from the drop-down list of organizations.

<img src="//uvarc-discourse.s3.amazonaws.com/original/1X/ae36ef36d8dc39b431f83e67a2961889e3fd8721.png" width="700" height="550">

* Next to you will be directed to sign in using **UVA NetBadge**. Once logged in you will see the Transfer management page:

<img src="//uvarc-discourse.s3.amazonaws.com/original/1X/4e8df9905f1ea63fcbc79ea8bea022f036b37b84.png" width="700" height="538">

# Connect to Endpoints

> **What is an endpoint?** - A Globus "endpoint" is any other computer running the Globus Connect software. An endpoint can be:
>
>* Your local workstation
>* A department server
>* A "DTN" (Data Transfer Node) connected to Rivanna or elsewhere on the UVA campus, or
>* Your own laptop.
>
>You can even connect to remote endpoints at other universities, if you have been given permission.

It is important to remember that you can connect to any two endpoints for file transfers. **One endpoint does not necessarily have to be your local computer**. You could connect your lab/departmental server with the Rivanna DTN, for example, begin a large transfer, and then close the browser window.

If one of your endpoints is managed by UVA, see **Request Access to Existing UVA Endpoints** below.

Select endpoints by clicking on the "Endpoint" box for each side of the transfer pane:

<img src="//uvarc-discourse.s3.amazonaws.com/original/1X/859a9231163ad62c3a4407ec7113ef2d18c51068.png" width="700" height="537">

# Access Existing UVA Endpoints

To use and access UVA Managed Endpoints via Globus, please contact hpc-support@virginia.edu. Your account must have a Globus profile set up by UVA system administrators. The official UVA managed endpoints are:

* `uva#main-DTN` - generally available; maps to Rivanna home directories, scratch, etc.
* `uva#portable-DTN` - by arrangement with RCI

# Transfer Files

Once you have connected to two endpoints, you are ready to transfer files. Think of your two panes as a "source" and a "destination". To do this, select a file or folder from your "source" pane, then select the `<` or `>` button at the top to start the transfer into the "destination" pane.

<img src="//uvarc-discourse.s3.amazonaws.com/original/1X/d1dd6b54f94f40556abd41568a035135c058d005.png" width="700" height="622">

After you initiate a transfer, it will be assigned a `Task ID` that you can use to reference that specific transfer. This is a useful way of identifying transfers when checking on the status of a job or viewing your past Globus activity.

**A note about asynchronous file transfers** - Once initiated, your transfer will begin, and may take several minutes or hours to complete depending upon the size of the transfer. Globus transfers are persistent, which means that if there is a network interruption, or one endpoint were turned off, the transfer will resume whenever the connection is restored. If you are transferring files between two remote endpoints, you can close your browser window without consequence.

# Monitor Transfer Activity

With the `Task ID` for your job, you can check on the status of your transfer.

From the **Manage Data** tab of the Globus Connect manager, click on "Activity". Or visit https://www.globus.org/app/activity

<img src="//uvarc-discourse.s3.amazonaws.com/original/1X/44e6d6a72db40a615cc2a0d39eb1ec25949ae9f4.png" width="700" height="364">

Here you will see a list of your current and past transfer jobs. Click on a job and you will get details and status:

<img src="//uvarc-discourse.s3.amazonaws.com/original/1X/07fabed14008b07da70e3661efdb7b4c24b7da1a.png" width="700" height="499">

# Notifications

Users are notified via email for both successful and failed transfers. The email looks something like this, and gives you a URL for more information:

    TASK DETAILS
    Task ID: 4460c25c-72d1-11e7-aa08-22000bf2d287
    Task Type: TRANSFER
    Status: SUCCEEDED
    Source: mst3k Lab MacBook (39e0bf8a-3037-11e7-bcae-22000b9a448b)
    Destination: uva#portable-DTN (67b9cb38-301c-11e7-bcac-22000b9a448b)
    Label: n/a
    
    https://www.globus.org/app/activity/4460c25c-72d1-11e7-aa08-22000bf2d287

# More Information

* Post a reply below, or reach out to hpc-support@virginiai.edu
* Globus has a [command-line interface](https://docs.globus.org/cli/).
* Globus also has an [API](https://docs.globus.org/api/transfer/) and [Python SDK](http://globus-sdk-python.readthedocs.io/en/latest/).
* For other technical details, see [**Globus Documentation**](https://docs.globus.org/how-to/).
