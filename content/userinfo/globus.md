+++
description = ""
title = "Globus Data Transfer"
draft = false
date = "2019-06-28T17:45:12-05:00"
tags = ["data-transfer","rivanna","storage","ivy","globus","dtn"]
categories = ["userinfo"]
images = [""]
author = "Staff"

+++

<div class="bd-callout bd-callout-warning">
<h4>Globus Data Transfer</h4>
<img align="right" alt="Globus DTN" src="https://uvarc-discourse.s3.amazonaws.com/original/1X/e173debd0e4ab4497f7a799cbe864258f3482e5a.png" style="max-width:30%;" />
Is a simplified way to access and move your research data, across all systems, using any existing identity. Transfer data to and from systems such as:
<ul>
  <li>Laptops
  <li>HPC clusters (Rivanna)
  <li>Secure computing (Ivy)
  <li>Lab / departmental storage
  <li>Tape archives
  <li>Cloud storage
  <li>Off-campus resources (XSEDE, National Labs)
</ul>

<p>Access them all using just a web browser. This can help you share research data with colleagues, co-investigators, or to move data back and forth between a lab workstation and Rivanna or your personal computer.

<p>Data stored at a different institution? At a supercomputing facility? All you need is your campus login.

<p><b>Globus Connect CAN now be used for transferring sensitive data. (See Ivy, below)</b></p>
</div>

# Getting Started

Globus transfers data between endpoints, also now called collections.  You must log in to the Globus website to initiate any transfers.

1. Open a browser window to [**https://www.globus.org/**](https://www.globus.org/) and click on **Log In**.
2. Select “University of Virginia” from the drop-down list of organizations.

<img src="//uvarc-discourse.s3.amazonaws.com/original/1X/ae36ef36d8dc39b431f83e67a2961889e3fd8721.png" width="700" height="550">

3. Next to you will be directed to sign in using **UVA NetBadge**. Once logged in you will see the Transfer management page:

<img src="https://uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/14de2df745ffa49ce009fb8caec08fa0685d0df0.png" width="700" height="550">


# Create a Personal Endpoint

1. Download the [Globus Connect Personal application](https://www.globus.org/globus-connect-personal) for your laptop or workstation.
2. Run the installer as directed.
    - This will ask you to name your local endpoint - we suggest something very descriptive, such as `mstk3-laptop` or `smith-genlab-workstation`.
    - The installer will also generate a unique key for your computer. Copy that to your clipboard once created, you will need it in the steps below.
3. This will leave the agent running on your laptop or workstation. Click on the agent icon (in the tray for Windows users, in the toolbar for MacOS users) to change your preferences or to see the web console.
4. Your local workstation (or laptop) is now a Globus Endpoint.

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

Select endpoints by clicking on the "Collection" box near the top of the screen (that says "Start here..."):

<img src="https://uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/575b1aad2634c7c536c373d89c3d08022a860609.png" alt="endpoints" height="550" width="700">

## Access Existing UVA Endpoints

To use and access UVA Managed Endpoints via Globus, please contact hpc-support@virginia.edu. Your account must have a Globus profile set up by UVA system administrators. The official UVA managed endpoints are:

* `uva#main-DTN` - generally available; maps to Rivanna home directories, scratch, etc.
* `uva#ivy-DTN` - available to Ivy secure platform users, for moving files into secure storage.
* `uva#portable-DTN` - by arrangement with RCI

# Transferring Files

![Transfer-Files-Using-Globus|432x323](//uvarc-discourse.s3.amazonaws.com/original/1X/1372b76279ceb3fefe822e6e44ae819b50ea0336.png)

Once you have connected to an endpoint, you need to select an action from the right-hand menu. So transfer or sync data select that link. This will open a second pane to the right to select a destination endpoint. Think of these two panes as a "source" and a "destination". 

![03%20AM|700x430](//uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/3fa5f74f5cf330b050790e5966e55a21768d4e55.png) 

To transfer a file:

1. select a file or folder from your "source" pane, then
2. select the `Start > ` or ` < Start ` button at the bottom of the pane to begin the transfer into the "destination" pane.

![Screen_Shot_2018-12-04_at_11_45_19_AM|700x430](//uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/40151abe640abf363f93837e2028cf7b5f34b4f7.png)

After you initiate a transfer, it will be assigned a `Task ID` that you can use to reference that specific transfer. This is a useful way of identifying transfers when checking on the status of a job or viewing your past Globus activity.

**A note about asynchronous file transfers** - Once initiated, your transfer will begin, and may take several minutes or hours to complete depending upon the size of the transfer. Globus transfers are persistent, which means that if there is a network interruption, or one endpoint were turned off, the transfer will resume whenever the connection is restored. If you are transferring files between two remote endpoints, you can close your browser window without consequence.

## Monitor Transfer Activity

With the `Task ID` for your job, you can check on the status of your transfer.

From the lefthand navigation bar of the Globus Connect manager, click on "Activity". Or visit https://app.globus.org/activity

<img alt="activity" width="354" height="508" src="//uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/d322d26f7c9b05c2d9276883c91e5bd886099e93.png">

Here you will see a list of your current and past transfer jobs:

![35%20AM|700x365](//uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/33390f95e041cd65e87860d9f476a2988d58ed90.png) 

Click on a job and you will get details and status:

![27%20AM|700x285](//uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/6cd96b990a5cb03c904c1a6677ea423673bf5566.jpeg)

## Notifications

Users are notified via email for both successful and failed transfers. The email looks something like this, and gives you a URL for more information:

    TASK DETAILS
    Task ID: 4460c25c-72d1-11e7-aa08-22000bf2d287
    Task Type: TRANSFER
    Status: SUCCEEDED
    Source: mst3k Lab MacBook (39e0bf8a-3037-11e7-bcae-22000b9a448b)
    Destination: uva#portable-DTN (67b9cb38-301c-11e7-bcac-22000b9a448b)
    Label: n/a
    
    https://www.globus.org/app/activity/4460c25c-72d1-11e7-aa08-22000bf2d287

# File Sharing


# More Information

* For **general questions**, search our [Discourse FAQ site](https://discuss.rc.virginia.edu/) or post a question yourself.
* Learn how to [**share files with other users** at UVA or other institutions](https://discuss.rc.virginia.edu/t/globus-connect-how-to-share-files/579) using Globus.
* [**Transfer highly sensitive data**](https://discuss.rc.virginia.edu/t/ivy-secure-dtn-transfer-sensitive-data/771/2) into Ivy using Globus.
* Globus has a [command-line interface](https://docs.globus.org/cli/).
* Globus also has an [API](https://docs.globus.org/api/transfer/) and [Python SDK](http://globus-sdk-python.readthedocs.io/en/latest/).
* For other technical details, see [**Globus Documentation**](https://docs.globus.org/how-to/).
