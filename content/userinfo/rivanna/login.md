+++
description = ""
title = "Login & File Transfer"
draft = false
date = "2019-05-28T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","supercomputer","allocations","queues","storage"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

# Logging in to Rivanna

Rivanna is accessible through a web portal, secure shell terminals, or a remote desktop environment.  For of all of these access points, your login is your UVA computing ID and your password is your Eservices password.  If you do not know your Eservices password you must change it through ITS.

All users who wish to access Rivanna while off Grounds, must use the UVA Anywhere VPN client.  Only Windows and Mac OSX operating systems are supported.  Linux users can find unsupported instructions to install and configure a VPN here.

## Web Portal Access

Open OnDemand is a graphical user interface that allows access to Rivanna via a web browser.  The Open OnDemand access point is rivanna-portal.hpc.virginia.edu.  Within the Open OnDemand environment users have access to a file explorer; interactive applications like JupyterLab, RStudio Server & FastX Web; a command line interface; and a job composer and job monitor to submit jobs to the Rivanna cluster.  Detailed instructions can be found on our Open OnDemand documentation page.

```
https://rivanna-portal.hpc.virginia.edu/
```

## Secure Shell Access

Rivanna is accessible through ssh (Secure Shell) connections using the hostname rivanna.hpc.virginia.edu.  

## Windows

Windows users must install an ssh client application.  We recommend MobXterm, but you may also use other clients such as SecureCRT or PuTTY. 

## Mac OSX and Linux

OSX and Linux users may connect through a terminal using the command

```
ssh -Y mst3k@rivanna.hpc.virginia.edu  
```

Mac users must install XQuartz in order to be able to run graphical (X11) applications.  Keep in mind that graphical X11 applications may be slow through a standard ssh login.  For extensive use of graphical applications you may prefer the FastX remote desktop environment.

For more details and for troubleshooting information, please see our ssh page.

## Remote Desktop Access

Users who wish to run X11 graphical applications may prefer the FastX remote desktop web interface.  The FastX web client is accessible at rivanna-desktop.hpc.virginia.edu.  Your login credentials are your UVA computing ID and your Eservices password.


# File Transfer

## Small files

Small files may be transferred using comand line tools like scp (secure copy), rsync (Linux & Mac OSX), or curl, with a connection to the host rivanna.hpc.virginia.edu.  

For Windows users, MobaXterm bundles an ssh client, an sftp/scp client, and an X11 server.  To transfer files, start a new session and select sftp.  Once you authenticate to Rivanna, two panes will appear.  You can drag and drop between them.

Mac users may use a graphical drag-and-drop application such as Cyberduck (also available for Windows) or Fugu. For Fugu be sure to choose the 1.21pre1 version.

## Large files

Globus is a browser-based file transfer tool optimized for fast, fault-tolerant file transfers that run in the background once started. To use Globus with Rivanna please follow the instructions at our Globus documentation page.
