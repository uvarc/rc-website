+++
date = "2022-02-14T11:45:12-05:00"
tags = [
        "data-transfer",
        "sftp",
        "cyberduck",
        "rivanna"
        ]
categories = ["userinfo"]
images = [""]
author = "Staff"
description = ""
title = "Cyberduck"
draft = false
+++

<p class=lead><a href="https://cyberduck.io">Cyberduck</a> is a transfer tool for Windows and Mac. It supports a large number of transfer targets and protocols.  Only SFTP can be used with Rivanna/Afton.  The free version will pop up donation requests.</p>

- - -

# Download 

[<button class="btn btn-primary">Download Cyberduck</button>](https://cyberduck.io/download)

# Connecting to the HPC System and File Transfer

1. Launch Cyberduck. After launching Cyberduck, the user interface will open. To initiate a connection to UVA HPC, click the Open Connection button.
<img src="/images/rivanna/cyberduck-login-page.png" alt="login" height="550" width="700">

2. Enter Your Credentials. From the drop-down menu, select SFTP (SSH File Transfer Protocol. Then enter the appropriate information in the following fields:

```
    Host: login.hpc.virginia.edu
    Username: your computing ID
    Password: your UVA HPC password
    Port: 22
```
When completed, click Connect.
<img src="/images/rivanna/cyberduck-credentials-popup.png" alt="credentials" height="550" width="700">

3. After successfully connecting to UVA HPC, the contents of your UVA HPC home directory will appear in the user interface.

4.  Navigate to the directory to which you would like to transfer the files.To move to the higher level directories, use the highlighted drop-down menu. Transfer your local file or directory to Rivanna/Afton by dragging and dropping it to the Cyberduck user interface.
<img src="/images/rivanna/cyberduck-file-transfer.png" alt="file-transfer" height="550" width="700">

5. There are two ways to transfer files from Rivanna/Afton to your local host.
--Method 1: Drag and Drop
Simply drag your desired file or directory from the Cyberduck user interface to the target directory on your local machine. 
--Method 2: Download To…
    Right-click on the file or directory that you want to transfer.
    Select the Download To… option.
    Select the target directory on your machine where you want to download the file. 

Once your transfer is initiated, a pop-up window will then appear to inform you of the status of your transfer.

# Access from Off Grounds

{{< off-campus >}}

