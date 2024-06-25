+++
title = "Research Project Storage"
description = ""
author = "RC Staff"
images = [""]
categories = ["userinfo"]
date = "2019-10-04T17:45:12-05:00"
tags = [
    "rivanna",
    "public-data",
    "internal-use-data",
    "storage",
    "research",
    "research-project"
]
draft = false
+++

# Overview

The **Research Project Storage** file system provides users with a collaborative space for data storage and sharing. Members in the same group have access to a shared directory created by the team lead or PI. Group membership can be defined and managed through the <a href="https://groups.identity.virginia.edu" target="_blank">Grouper</a> (requires VPN connection). `/project` storage is mounted on the HPC cluster and runs on a new <a href="http://whatis.techtarget.com/definition/scale-out-storage" target="_blank">scale-out</a> NAS file system.

**How to request `/project` storage space**

`/project` storage can be purchased for {{% storage-pricing project %}}/TB/YR by using [this form](/form/storage/). When filling out the form, the PI can specify the size of the `/project` directory and the name of an existing or new Grouper group that can access this space. We recommend choosing a Grouper group name specific to your group or collaboration for the `/project` directory. This will reduce confusion in the future if you manage multiple Grouper groups and directories on other storage systems.

Once the request has been submitted, the PI will receive a notification that the `/project` space has been provisioned within 24 hours. Once the space becomes available, the PI can grant access to lab members by adding them to the Grouper group. Users in the Grouper group will see the directory (`/project/Grouper_group_name`) after logging into UVA HPC. Addition and removal of users is managed by the PI of the group.

{{% group_creation_tip %}}

# Public & Moderately Sensitive Data Storage Systems

`/home`, `/scratch`, and `/project` storage are based on a Linux file system. Users can invoke generic Linux commands to manage files and directories (`mv`, `cp`, `mkdir`), manage permissions (`chmod`, `chown`) and navigate the file system (`cd`, `ls`, `pwd`).  If you or your collaborators are unfamiliar with some of these commands, we encourage you to take time to review some of the material below:

- <a href="https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855" target="_blank">A Gentle Introduction</a>
- <a href="https://www.lifewire.com/linux-commands-for-navigating-file-system-4027320" target="_blank">10 Essential Linux Commands</a>
- <a href="https://www.howtogeek.com/107808/how-to-manage-files-from-the-linux-terminal-11-commands-you-need-to-know/" target="_blank">How To Manage Files From The Linux Terminal</a>
<!-- <No longer available> -->
<!-- - <a href="http://www.linuxplanet.com/linuxplanet/tutorials/6666/1" target="_blank">Navigating the Linux Filesystem</a> -->
- <a href="https://swcarpentry.github.io/shell-novice/" target="_blank">Shell Novice</a>
