+++
date = "2017-03-03T10:08:34-05:00"
tags = [
	"data transfer",
	"globus",

	]
categories = ["userinfo"]
images = [""]
author = "SOMRC Staff"
description = ""
title = "Data Transfer"
draft = true
+++

<p class="lead">Many resources are available to ensure that Laboratory Research data is being stored in proper locations, organized correctly with help of Records Management suggestions and is being stored in appropriate environments.</p>

- - -

#  Data Storage

Part of the job of the LINC Data Management team is to ensure that data is accurately moved, transferred or replicated to a managed data source; taking the risk for data loss out of the hands of researchers and lab engineers.

Depending on the type of data and amount, LINC Engineers can evaluate the situation and equipment, then make a recommendation for appropriate data migration or storage option.

Many such options that are available for UVA Laboratory data include but are not limited to:

* **Value Storage** - Our Top Choice!
* **ES1** - Non Sensitive data that may not be Laboratory Materials
* **ES3** -  Sensitive Data including Medical Record ID’s, SSN and patient information
* **UVA Box** - Ideal for laptops and portable data for presentations, papers, etc.


- - -

# Software & Tools

To help in migrating data to Value Storage, ES1, ES3 and other network resources, we use many tested tools that can include items such as:


* [**Globus Connect**](https://www.globus.org) - Globus is a large "peer-to-peer" style infrastructure for transfering files. It can be used to transfer research data between laptops, servers, or any kind of desktop workstation. The basic idea behind data sharing in Globus is an "Endpoint". Endpoints serve as the starting point for your data transfer needs. It can be something as simple as a directory/folder on your laptop or the root directory on a remote server. <br/></br/>Using your favorite browser or command line interface, you can easily transfer large-sized files from endpoint to another endpoint. Globus calls it their *"fire and forget"* model. The figure below (courtesy of Globus.org) shows how simple and convenient it can be to send big amounts of data from your personal laptop to the research teams' server, for instance. <br/><br/>Let's say you ran into an issue while transferring the large data file, e.g., disk space runs out on destination endpoint or a network issue, Globus automatically takes care of that. It also removes the burden from you to do integrity or MD5 checksums before/after sending the data, and does it all by itself. <br/><br/> For more information on Globus, please refer to our detailed guides on how to set up your own personal Globus Connect endpoint and send data to UVa endpoint: <br/>-[Setting up your personal Globus Connect Endpoint](https://discuss.rc.virginia.edu/t/globus-connect-data-transfer-introduction/345)<br/>-[How to Share Files using Globus](https://discuss.rc.virginia.edu/t/globus-connect-how-to-share-files/579)


<img src="/images/how-globus-works.png" alt="Globus.org how Globus works image">


* [**Retrospect!**](https://www.retrospect.com) - A multi-platform data backup utility that has the flexibility to back up to many stationary and Cloud Based architectures.  Ideal for local data that needs to be reliably backed up regularly.
* [**Free File Sync**](https://www.freefilesync.org) - A cross platform utility that allows a one time sync between locations to ensure that both the source and target of a backup have identical copies of data.  Free File Sync also has the capability to near-live sync of data for sites that require to keep using their data target while it is migrated off their PC or Mac.
* [**Rich Copy 4.0**](https://technet.microsoft.com/en-us/library/2009.04.utilityspotlight.aspx) - A Microsoft Technet provided solution that is a multi-threaded product.  It allows the simultaneous copying of multiple files at the same time between target and source locations.  Super ideal for moving data that is composed of hundreds or thousands of smaller sized files.

There are many other resources available for use.  Many times it will take a consultation of the location in order to identify the sources of data, hardware types, data speeds to make a choice on the proper software that is used.  As new resources become available, we will constantly keep on top of changing technologies to update and increase our software resources to handle data correctly.

