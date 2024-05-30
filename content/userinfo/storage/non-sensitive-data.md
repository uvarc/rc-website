+++
title = "Public and Moderately Sensitive Data Storage"
description = ""
author = "RC Staff"
images = [""]
categories = ["userinfo"]
date = "2019-10-04T17:45:12-05:00"
tags = [
    "rivanna",
    "research",
    "storage"
]
draft = false
+++

# `/home`

`/home` is a free 50GB space provided to users of the Rivanna HPC system and is visible from the Rivanna login and compute nodes. `/home` is the default working directory when logging on to Rivanna. Users can also access their home directory at `/home/$USER`, where `$USER` is an individual's UVa computing ID.

# `/scratch`

`/scratch` is a Lustre high performance parallel filesystem accessible via the Rivanna login and compute nodes.

{{% callout %}}
{{% scratch-policy %}}
{{% /callout %}}


**How to request `/home` and `/scratch` space**

`/home` and `/scratch` space can be obtained by requesting an allocation on Rivanna. The process of getting access to Rivanna is described [here](/userinfo/rivanna/overview/).

# Research Project Storage

The **Research Project Storage** file system provides users with a collaborative space for data storage and sharing. Members in the same group have access to a shared directory created by the team lead or PI. Group membership can be defined and managed through the <a href="https://groups.identity.virginia.edu" target="_blank">Grouper</a> (requires VPN connection). `/project` storage is mounted on the Rivanna HPC cluster and runs on a new <a href="http://whatis.techtarget.com/definition/scale-out-storage" target="_blank">scale-out</a> NAS file system.

**How to request `/project` storage space**

`/project` storage can be purchased for {{% storage-pricing project %}}/TB/YR by using [this form](/form/storage/). When filling out the form, the PI can specify the size of the `/project` directory and the name of an existing or new Grouper group that can access this space. We recommend choosing a Grouper group name specific to your group or collaboration for the `/project` directory. This will reduce confusion in the future if you manage multiple Grouper groups and directories on other storage systems.

Once the request has been submitted, the PI will receive a notification that the `/project` space has been provisioned within 24 hours. Once the space becomes available, the PI can grant access to lab members by adding them to the Grouper group. Users in the Grouper group will see the directory (`/project/Grouper_group_name`) after logging into Rivanna. Addition and removal of users is managed by the PI of the group.

{{% callout %}}
Note for PI's creating a new Grouper group:

* Specify "This group will be used for Rivanna access" in the description section of the Service Now request form to expedite group creation.

{{% /callout %}}

# Public & Moderately Sensitive Data Storage Systems

`/home`, `/scratch`, and `/project` storage are based on a Linux file system. Users can invoke generic Linux commands to manage files and directories (`mv`, `cp`, `mkdir`), manage permissions (`chmod`, `chown`) and navigate the file system (`cd`, `ls`, `pwd`).  If you or your collaborators are unfamiliar with some of these commands, we encourage you to take time to review some of the material below:

- <a href="https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855" target="_blank">A Gentle Introduction</a>
- <a href="https://www.lifewire.com/linux-commands-for-navigating-file-system-4027320" target="_blank">10 Essential Linux Commands</a>
- <a href="https://www.howtogeek.com/107808/how-to-manage-files-from-the-linux-terminal-11-commands-you-need-to-know/" target="_blank">How To Manage Files From The Linux Terminal</a>
- <a href="http://www.linuxplanet.com/linuxplanet/tutorials/6666/1" target="_blank">Navigating the Linux Filesystem</a>
- <a href="https://swcarpentry.github.io/shell-novice/" target="_blank">Shell Novice</a>
