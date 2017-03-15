+++
author = "SOMRC Staff"
description = ""
title = "Storage for Researchers"
date = "2017-02-24T10:08:29-05:00"
draft = false
tags = ["storage","rivanna","swift","osf","lustre","backup","s3"]
categories = ["userinfo"]
images = [""]

+++

<p class=lead>The following storage options are available through CADRE, UVA's Computation and Data Resource Exchange.</a>

- - -

# Free Storage Services

## UVA Box

Every faculty and staff member, as well as degree-seeking students, has access to 1TB of storage via UVA Box, a free cloud-based storage system offered by ITS.  This storage can be accessed from all internet-enabled devices and allows for easy sharing of files both inside and outside the University.  The security meets the needs of higher education, allows for control over access to shared content, and utilizes NetBadge to sign in.

UVA Box offers features found in Google Drive and Dropbox (collaboration, automatic syncing of folders, etc), but 
is owned by the University.

To see if you have access to UVA Box, please [try the login page](https://virginia.account.box.com/login).


## Lustre (UVA Rivanna Scratch)

Lustre is an extreme-performance, high-capacity parallel and shared storage system available for research computing at UVA. Lustre is accessible to all researchers on the Rivanna cluster as a personal /scratch folder which can be accessed from anywhere on the cluster. A default quota is defined per user which can be changed upon request. A technical description of the storage system is available on the specifications page. 

The storage is available to all users on Rivanna; to request a startup allocation on Rivanna please complete a request form. To learn more about how this system can support your research, please see the ARCS webpage or contact [ARCS](http://arcs.virginia.edu/) for more information.


- - -

## Value Storage (UVA)

Value Storage is a low-cost, moderate-performance version of the Enterprise Storage offered by ITS. It can be mounted from the central network by clients on local laptops and workstations running Linux, Windows, or Mac OSX. Although not as fast as other UVA storage solutions, Value Storage offers a familiar format which is easy to understand and use.  It is differentiated from Enterprise Storage by the lack of higher-level features and services that are available on the Enterprise tiers.

To learn more about how this system can support your research, see the [ARCS webpage](http://arcs.virginia.edu/) or contact one of ARCS computational scientists.


## Swift Object Storage (UVA)

<img src="https://somrc.virginia.edu/images/swift-logo.png" alt="Center for Open Science" align="right" style="max-width:120px;padding-left:10px;padding-bottom:10px;" />
The Swift Data Cloud is directly accessible from any device connected to the UVA network, including individual workstations and HPC Clusters (excluding Ivy).  Access to the Swift Data Cloud is possible online or through a downloadable client.  Intended as a high-performance, high-capacity, long-term, storage solution, the Swift Data Cloud is set up in a similar way to UVA Box, but with more storage space, faster transfer rates, and access from HPC Clusters.  Researchers may wish to use the Swift Data Cloud as an affordable place to store large datasets long-term.
Contact [ARCS webpage](http://arcs.virginia.edu/) to purchase space on the Swift Data Cloud, or see the corresponding webpage (link) for more information.


## Enterprise Storage (UVA)

For the highest possible level of data protection for critical and small quantities of research data, ITS offers enterprise-class storage services.  The different tiers of this service offer standard service, replication, and/or backups.

This storage may be ordered from the [ITS Service-Now Catalog](https://uvaprod.service-now.com/).


## Value + Swift Data Cloud Backup

By using the Value Storage (link) and the Swift Data Cloud (link), effective backups can be created of your data.  A simple script would need to be created to automatically backup data on Value Storage to the Swift Data Cloud for long-term backups.  This is a more involved option than the Enterprise (link) solution, requiring more initial setup and careful management, whereas Enterprise is managed by ITS for you.

Contact [ARCS](http://arcs.virginia.edu/) to purchase both Value Storage and Swift Data Cloud access, and to setup a backup script.


## Amazon S3 (Cloud)

<img src="https://somrc.virginia.edu/images/aws-s3-icon.png" alt="Amazon S3" align="right" style="max-width:200px;" />
S3 (Simple Storage Service) is a cloud-based, object storage. Files and archives can be stored in S3 securely and privately, as well as shared with specific users or the general
public if so desired. S3 can be accessed via web UI, command-line tools, SDKs, and other common tools that use S3's public API. S3 storage costs approximately $0.03 per GB per month.

For help setting up S3 storage, please contact the SOMRC team <somrc@virginia.edu>.

For more information on working with S3, see our [reference page](https://somrc.virginia.edu/userinfo/reference/s3/).
