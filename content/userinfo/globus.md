+++
description = ""
title = "Globus Data Transfer"
draft = false
date = "2019-11-12T17:45:12-05:00"
tags = ["data-transfer","rivanna","storage","ivy","globus","dtn"]
categories = ["userinfo"]
images = [""]
author = "Staff"

+++

{{% callout %}}
<h4>Globus Data Transfer</h4>

<img align="right" alt="Globus DTN" src="https://uvarc-discourse.s3.amazonaws.com/original/1X/e173debd0e4ab4497f7a799cbe864258f3482e5a.png" style="max-width:35%;" />

<p>Is a simplified way to access and move your research data, across all systems, using any existing identity. Transfer data to and from systems such as:</p>

<ul>
<li>Laptops
<li>HPC clusters (Rivanna)
<li>Secure computing (Ivy)
<li>Lab / departmental storage
<li>Tape archives
<li>Cloud storage
<li>Off-campus resources (XSEDE, National Labs)
</ul>

<p>Access them all using just a web browser. This can help you share research data with colleagues, co-investigators, or to move data back and forth between a lab workstation and Rivanna or your personal computer.</p>
<p>Data stored at a different institution? At a supercomputing facility? All you need is your campus login.</p>
<p><b>Globus Connect CAN now be used for transferring sensitive data. (See Ivy, below)</b></p>

{{% /callout %}}


# Getting Started

Globus transfers data between endpoints, also now called "collections".  You must log in to the Globus website to initiate any transfers.

1. Open a browser window to [**https://www.globus.org/**](https://www.globus.org/) and click on **Log In**.
2. Select “University of Virginia” from the drop-down list of organizations.
  <img src="//uvarc-discourse.s3.amazonaws.com/original/1X/ae36ef36d8dc39b431f83e67a2961889e3fd8721.png" width="700" height="550">

3. Next to you will be directed to sign in using **UVA NetBadge**. Once logged in you will see the Transfer management page:
  <img src="https://uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/14de2df745ffa49ce009fb8caec08fa0685d0df0.png" width="700" height="550">

# Create a Personal Collection

1. Download the [Globus Connect Personal application](https://www.globus.org/globus-connect-personal) for your laptop or workstation.
2. Run the installer as directed.
    - This will ask you to name your local endpoint - we suggest something very descriptive, such as `mstk3-laptop` or `smith-genlab-workstation`.
    - The installer will also generate a unique key for your computer. Copy that to your clipboard once created, you will need it in the steps below.
3. This will leave the agent running on your laptop or workstation. Click on the agent icon (in the tray for Windows users, in the toolbar for MacOS users) to change your preferences or to see the web console.
4. Your local workstation (or laptop) is now a Globus Collection.

# Connect to Other Collections

{{% callout %}}
**What is a collection?** - A Globus "collection" is any other computer running the Globus Connect software. A collection can be:

* Your local workstation
* A department server
* A "DTN" (Data Transfer Node) connected to Rivanna or elsewhere on the UVA campus, or
* Your own laptop.

You can even connect to remote collections at other universities, if you have been given permission.
{{% /callout %}}

It is important to remember that *you can connect to any two collections for file transfers*. **One collection does not necessarily have to be your local computer**. You could connect your lab/departmental server with the Rivanna DTN, for example, begin a large transfer, and then close the browser window.

If one of your collections is managed by UVA, see **Request Access to Existing UVA Collections** below.

Select an endpoint by clicking on the "Collection" box near the top of the screen (that says "Start here..."):

<img src="https://uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/575b1aad2634c7c536c373d89c3d08022a860609.png" alt="endpoints" height="550" width="700">

## Access Existing UVA Collections

To use and access UVA Managed Collections via Globus, please sign into Globus using your Netbadge credentials and search for UVA collections. The official UVA managed collections are:

* `uva#main-DTN` - generally available; maps to Rivanna home directories, scratch, etc.
* `uva#ivy-DTN` - available to Ivy secure platform users, for moving files into secure storage.
* `uva#portable-DTN` - by arrangement with RC.

# Transferring Files

![Transfer-Files-Using-Globus|432x323](//uvarc-discourse.s3.amazonaws.com/original/1X/1372b76279ceb3fefe822e6e44ae819b50ea0336.png)

Once you have connected to an collection, you need to select an action from the right-hand menu. So transfer or sync data select that link. This will open a second pane to the right to select a destination collection. Think of these two panes as a "source" and a "destination". 

![03%20AM|700x430](//uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/3fa5f74f5cf330b050790e5966e55a21768d4e55.png) 

To transfer a file:

1. select a file or folder from your "source" pane, then
2. select the `Start > ` or ` < Start ` button at the bottom of the pane to begin the transfer into the "destination" pane.

![Screen_Shot_2018-12-04_at_11_45_19_AM|700x430](//uvarc-discourse.s3.dualstack.us-east-1.amazonaws.com/original/1X/40151abe640abf363f93837e2028cf7b5f34b4f7.png)

After you initiate a transfer, it will be assigned a `Task ID` that you can use to reference that specific transfer. This is a useful way of identifying transfers when checking on the status of a job or viewing your past Globus activity.

**A note about asynchronous file transfers** - Once initiated, your transfer will begin, and may take several minutes or hours to complete depending upon the size of the transfer. Globus transfers are persistent, which means that if there is a network interruption, or one collection were turned off, the transfer will resume whenever the connection is restored. If you are transferring files between two remote collection, you can close your browser window without consequence.

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

## Key Concepts

- **Globus Collection** - A Globus “collection” is any other computer running the Globus Connect software, whether a server, laptop, or an HPC cluster.
- **Shared Collection** - A folder containing the files/folders you want to share. To grant access to other users, you create a "shared collection" from this folder.
- **Globus ID** - The unique 'handle' or user ID for the person you want to share with. This is typically in the form of `username@institution.edu`.
- **Globus Groups** - You can share folders or files to either specific individuals, or to groups that you create and manage within Globus. A group must be populated with at least one user.

## How To Share

1. Open the [Globus web interface](https://www.globus.org/) and log in using UVA Netbadge. If you are coming for the first time, visit [these instructions](https://discuss.rc.virginia.edu/t/globus-connect-data-transfer-introduction/345).
2. Go to the [**Transfer Files**](https://www.globus.org/app/transfer) interface in Globus, under the "Manage Data" tab.
3. Select an collection that contains the files you'd like to share. It can be in either the left or right pane.
4. Click into the folder structure of that collection until you can see the folder you want to share. Highlight it with one click. 
  <img src="https://uvarc-discourse.s3.amazonaws.com/original/1X/d0a0ae06df12b48d8f11460927c39f92a42cbdf0.png" height="383" width="619">

5. Next, select the SHARE link near the top of the files window. (Where the red arrow points in the image above).
6. The next window allows you to create a "Shared Collection." You can only create and manage shared collections for directories or files that you own and have access to. Provide a Display Share Name (required) and a description (optional).
  <img src="https://uvarc-discourse.s3.amazonaws.com/original/1X/65f92d7f15f2f97ad8cfb537375bc8e37b50c4c5.png" width="700" height="443" alt="manage-collections">
7. Click CREATE. Your new share will be created, and you will be taken to the sharing details for that collection.
  <img src="https://uvarc-discourse.s3.amazonaws.com/original/1X/4b94f56673a7cc0cd782460415b7d659e6b859a2.png" alt="create-share" width="700" height="536">
8. Here you will set the details for how you share your data with others:
    - **Path** - Leave this set to `/` since it only means the path relative to the directory you are sharing from.
    - **Share With** - Decide whether you want to share with individual users or with a group. **Please do not** set this to "All Users" or "Public". If you share with an individual user, follow the instructions below. If you choose to share with a group, you will first need to create that and add users to it by using the GROUPS tab at the top of the page.
    - **Identity/E-mail** - You can look up other Globus users by searching for a part of their name or institution. If you cannot find the individual, you should contact them to make sure they have signed into Globus at least once. Generally, users at other colleges and universities can be identified with the simple form of their email address, like `mst3k@virginia.edu` or `jdoe@mit.edu`, etc. Users who are unaffiliated with a university can still sign into Globus using Google (identified as `username@gmail.com`) or by creating a username and password in Globus (identified as `userid@globusid.org`)
    - **Permissions** - You can specify whether this user has access to read or write to your share.
  <img src="https://uvarc-discourse.s3.amazonaws.com/original/1X/736b778f617c5b155227f62a1d2fdd2bc600fc38.png" alt="manage-permissions" height="322" width="700">
9. Once you have set these details -- and regardless of whether you are sharing to a user or a group -- the pane will prepare to send an email to those you have shared with. We highly recommend sending this email, since it will contain a link directly to your share within the Globus Transfer tool. Add a message if you wish, then click "Add Permission".

## Managing Shares

You can always go back to see your shared collections, or other collections that have been shared with you, by clicking on the [Endpoints submenu](https://www.globus.org/app/endpoints) on the "Manage Data" page. 

<img src="https://uvarc-discourse.s3.amazonaws.com/original/1X/a0eebd56b6e3730c3df3c1b0ad6b445f90b68cee.png" alt="manage-shares" width="700" height="319">

Note that from this page you can see endpoints

- That are shared with you
- That are shareable by you
- That are administered by you

Clicking on the name of each collection will allow you to review or modify settings, if you have permission to do so.

## Security

UVA is empowering faculty and researchers to manage sharing with colleagues and collaborators on their own, as they need. However, with this ability comes the responsibility to share wisely and carefully. Therefore, we ask that you follow a few basic principles as you share data using Globus:

1. **Grant the least permissions necessary, not the most**. If a colleague needs to retrieve your data files, then grant read-only permissions.
2. **Grant access to specific individuals only, not to "all users" or to the public**. These settings risk your information going to people and places that you have not designated, or being used in ways that you have no knowledge of.
3. **Remove shared collections after they have done their job**. If you are no longer collaborating with a group or individual, and the share has done its job, delete it. It is a good practice to revisit your endpoints page periodically to clean and cull unused resources.
4. **Finally, monitor and track your large file transfers**. When someone is transferring large data sets to you, or you to them, monitor their progress and keep in touch with the person or group on the other end. This helps identify any unusual behavior.

# More Information

* For **general questions**, search our [Discourse FAQ site](https://discuss.rc.virginia.edu/) or post a question yourself.
* Learn how to [**share files with other users** at UVA or other institutions](https://discuss.rc.virginia.edu/t/globus-connect-how-to-share-files/579) using Globus.
* [**Transfer highly sensitive data**](https://discuss.rc.virginia.edu/t/ivy-secure-dtn-transfer-sensitive-data/771/2) into Ivy using Globus.
* Globus has a [command-line interface](https://docs.globus.org/cli/).
* Globus also has an [API](https://docs.globus.org/api/transfer/) and [Python SDK](http://globus-sdk-python.readthedocs.io/en/latest/).
* For other technical details, see [**Globus Documentation**](https://docs.globus.org/how-to/).
