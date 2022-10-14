+++
images = [""]
author = "Staff"
description = ""
date = "2022-09-28T10:18:25-05:00"
title = "Scratch Recovery with Globus"
draft = false
tags = ["rivanna","scratch","globus","data-transfer"]
categories = ["feature"]
+++

Globus is a simple, reliable, and fast way to access and move your research data between systems. Researchers can transfer data from their old scratch directories to new scratch via a single web interface - no software download or installation is necessary.
<!--more-->
**Old scratch (/oldscratch) directories are now read-only. You will not be able to write new files to /oldscratch or copy files from /scratch to /oldscratch.**

{{% callout %}}

Users who need help using Globus to transfer their /scratch files are invited to attend one of the following online tutorial sessions:

- [Thursday, September 29 (2 to 4 p.m.)](https://virginia.zoom.us/j/97870810412?pwd=WXd1WVUxbGNYbFhUMjVGS0Q1ajVkUT09)

- [Friday, September 30 (10 to 11 a.m.)](https://virginia.zoom.us/j/97500880191?pwd=cXUxREx5eEFqVUtGNnF5ZjBHMVgvdz09)

- [Monday, October 3 (10 to 11 a.m.)](https://virginia.zoom.us/j/97500880191?pwd=cXUxREx5eEFqVUtGNnF5ZjBHMVgvdz09)

- [Friday, October 7 (10 to 11 a.m.)](https://virginia.zoom.us/j/97500880191?pwd=cXUxREx5eEFqVUtGNnF5ZjBHMVgvdz09)

**The old scratch system will be permanently retired on October 31.**

{{% /callout %}}

# Transferring Data

## Selecting data from old scratch

1. Go to https://app.globus.org/file-manager.

2. Choose "University of Virginia" as your institution and log in using Netbadge.

    <img src="/images/globus-scratch-1-choose-institution.png">

3. Click the "Collection" field.

4. Search for and select "UVA Main-DTN".

    <img src="/images/globus-scratch-2-main-dtn.png">

5. Double-click the "/oldscratch" folder and then double-click the folder with your computing ID (only your own computing ID will be visible).

    <img src="/images/globus-scratch-3-oldscratch.png">

6. Select the files and folders you want to transfer.

    <img src="/images/globus-scratch-4-select-files.png">

## Select destination for files on /scratch

7. Click "Transfer or Sync to..." in the menu to open up the second collection panel. You can also do this by clicking the two-panel icon in the Panels menu in the top right-hand corner of the app.

    <img src="/images/globus-scratch-5-transfer-button.png">

8. Click the "Collection" field in the newly opened panel.

9. Search for and select "UVA Main-DTN". It should now be in your "Recent" collections since you selected it previously.

10. Double-click the "scratch" folder and then double-click the folder with your computing ID.

    <img src="/images/globus-scratch-6-new-scratch.png">

11. If you have already created new scratch folders you can double-click them to select them as a destination for your old scratch files. If you want the files in the top level of your scratch folder then do not select anything.

## Transfer

12. Click the highlighted "Start" button to begin the transfer. This should be the "Start" button on the /oldscratch Panel.

    <img src="/images/globus-scratch-7-start-transfer.png">

13. Your transfer will begin. You can monitor your transfer in the "Activity" tab of the Globus app. You will receive an email when the transfer is complete. 

{{% callout %}}

To transfer data from /oldscratch to local storage like your laptop or lab/departmental storage, you will need to install Globus on your workstation. Please see our <a href="/userinfo/globus/">documentation</a> for Globus installation and data transfer between systems.

{{% /callout %}}
