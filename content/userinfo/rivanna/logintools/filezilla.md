+++
date = "2022-02-14T11:45:12-05:00"
tags = [
        "data-transfer",
        "sftp",
        "filezilla",
        "rivanna"
        ]
categories = ["userinfo"]
images = [""]
author = "Staff"
description = ""
title = "Filezilla"
draft = false

+++

<p class=lead><a href="https://filezilla-project.org">Filezilla</a> is a cross-platform data transfer tool.  The free version supports FTP, FTPS, and SFTP.  Only SFTP can be used with Rivanna.</p>

# Download 

[<button class="btn btn-primary">Download Filezilla</button>](https://filezilla-project.org/download.php?type=client)

# Connecting to Rivanna and File Transfer

1. Launch FileZilla. After launching FileZilla, the user interface will open. In the left panel, you should see your local file system and files listed in the left side panels. You will enter your login credentials in the fields highlighted in the figure below.
<img src="/images/rivanna/filezilla-login-page.png" alt="login" height="550" width="700">

2. Enter Your Credentials. Fill in the Host, Username, Password, and Port fields.
```
    Host: login.hpc.virginia.edu
    Username: your computing ID
    Password: your Eservices password
    Port: 22
```
When completed, click Quickconnect.

3. Click OK on Warning. When connecting for the first time, a warning like the one shown below. Check the box next to “Always trust this host, add this key to the cache”, and then click OK.
<img src="/images/rivanna/filezilla-warning-popup.png" alt="warning" height="550" width="700">

4. After successfully connecting, your home directory and files on Rivanna should appear in the right-side panels, as shown below. To transfer a file, simply double-click the filename in the panel or right-click on the file and select the Upload option. To transfer a folder, right-click on the folder and select Upload.
<img src="/images/rivanna/filezilla-panes.png" alt="file-transfer" height="550" width="700">

# Access from Off Grounds

{{< off-campus >}}

