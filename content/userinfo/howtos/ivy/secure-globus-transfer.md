+++
type = "howto"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "ivy",
  "data",
  "globus",
  "howto"
]
date = "2020-03-26T08:37:46-05:00"
tags = ['howtos']
draft = false
shorttitle = "Secure DTN"
title = "Highly Sensitive Data Transfer with Globus"
description = "Using the secure DTN to transfer data to Ivy"
author = "RC Staff"

+++


1. Login In to Globus and Choose Ivy Collection 

   * Disconnect your High Security VPN – it will interfere with the high security network that Globus uses.
   * Open https://www.globus.org/ and sign in through the University of Virginia using NetBadge.
   * Once you are on the Transfer Files page, at the first "Collection" type `ivy` to search.  Find the uva#ivy-DTN collection and select it.
   * You will then be asked to authenticate.
   * Once signed in, simply click through the names of your shares until you find the source or destination for your file transfers.


2. Navigate to Your Personal Collection

   * In another pane repeat the process of searching for a collection, but use the name of your personal collection.
  _NOTE: Ivy is designed for security for research on sensitive data. Sensitive data should **never** be stored on or transmitted from personal laptops._
   * Once you have moved your data to High-Security Research Standard Storage using Globus, you may need to copy it to your Ivy VM Storage. Double-click the Desktop icon labeled “High-Security Research Standard Storage” to see the files you transferred with Globus (a file explorer window will appear). Double-click the Desktop icon labeled “VM Storage” to see the files that currently exist in your VM storage. To copy data from High-Security Research Standard Storage to the VM, you can drag files from the High-Security Research Standard Storage file explorer window to the VM storage file explorer window, or you can use traditional copy+paste functions. The decision to work off of your data on the local hard drive versus on the High-Security Research Standard Storage drive should be driven by the size of your data, and how much your research needs to read from and write to it.


**For More Information**

To learn more about setting up and using a Globus personal collection, please see our [documentation](/userinfo/globus).


