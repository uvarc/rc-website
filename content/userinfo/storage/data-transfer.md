+++
title = "Data Transfer"
description = ""
author = "RC Staff"
images = [""]
categories = ["userinfo"]
date = "2019-10-04T17:45:12-05:00"
tags = [
    "rivanna",
    "data-transfer",
    "storage",
    "ivy"
]
draft = false
+++

# Data transfer

## Public & Moderately Sensitive Data Transfer

![Non-Sensitive Data Transfer](/images/storage/storage-nonsecure.jpg)

## Secure Copy (`scp`)

`scp` uses secure shell (SSH) protocol to transfer files between your local machine and a remote host. <code>scp</code> can be used with the following syntax:

```scp [source] [destination]```

```scp SourceFile mst3k@login.hpc.virginia.edu:/scratch/mst3k```

```scp SourceFile mst3k@login.hpc.virginia.edu:/project/Grouper_group_name```

Detailed instructions and examples for using `scp` are listed <a href ="/userinfo/rivanna/logintools/cl-data-transfer" target="_blank">here</a>.

## Secure File Transfer Protocol (`sftp`)

`sftp` is a network protocol for secure file management. Instructions and examples for using <code>sftp</code> are located <a href = "/userinfo/rivanna/logintools/cl-data-transfer" target="_blank">here</a>.

## Graphical File-Transfer Applications

<a href="https://filezilla-project.org/" target="_blank">Filezilla</a> and <a href="https://cyberduck.io/" target="_blank">Cyberduck</a>, and <a ref="https://mobaxterm.mobatek.net">MobaXterm</a> are examples of open source SFTP client software for file management through an interactive graphical user interface. Instructions for using these SFTP clients can be found <a href ="/userinfo/rivanna/logintools/graphical-sftp" target="_blank">here</a>.

## Globus Connect (Large Data Transfer)
<p><a href="https://www.globus.org/" target="_blank">Globus</a> provides access to data on local machines and Rivanna file systems, as well as external institutions and facilities. Globus is well suited for transferring both small files and large amounts of data. More information on Globus data transfer can be found <a href ="/userinfo/globus" target="_blank">here</a>.</p>

# Public & Moderately Sensitive Data Storage Systems

`/home`, `/scratch`, and `/project` storage are based on a Linux file system. Users can invoke generic Linux commands to manage files and directories (`mv`, `cp`, `mkdir`), manage permissions (`chmod`, `chown`) and navigate the file system (`cd`, `ls`, `pwd`).  If you or your collaborators are unfamiliar with some of these commands, we encourage you to take time to review some of the material below:

- <a href="https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855" target="_blank">A Gentle Introduction</a>
- <a href="https://www.lifewire.com/linux-commands-for-navigating-file-system-4027320" target="_blank">10 Essential Linux Commands</a>
- <a href="https://www.howtogeek.com/107808/how-to-manage-files-from-the-linux-terminal-11-commands-you-need-to-know/" target="_blank">How To Manage Files From The Linux Terminal</a>
- <a href="http://www.linuxplanet.com/linuxplanet/tutorials/6666/1" target="_blank">Navigating the Linux Filesystem</a>
- <a href="https://swcarpentry.github.io/shell-novice/" target="_blank">Shell Novice</a>
