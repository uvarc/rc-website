+++
title = "Research Standard Storage"
description = ""
author = "RC Staff"
images = [""]
categories = ["userinfo"]
date = "2022-05-04T17:45:12-05:00"
tags = [
    "rivanna", 
    "public-data",
    "internal-use-data",
    "storage",
    "research"
]
draft = false
+++

# Overview

Research Computing offers several budget options for storing public and internal use research data. Information Security at UVA provides details about [data sensitivity 
classifications](https://security.virginia.edu/university-data-protection-standards).

The _Research Standard_ storage provides users with a solution for research data storage and collaboration. Members in the same group have access to a shared directory created by 
the team lead or PI. Group membership can be defined and managed through <a href="https://groups.identity.virginia.edu" target="_blank">Grouper</a> (requires VPN connection). Research Standard storage is mounted on the Rivanna HPC cluster and can also be accessed on a personal computer with an SMB 
mount, allowing for point-and-click file manipulation.

If you are not a researcher, UVA ITS offers Value storage for long-term storage of large scale data. More information about ITS's 
various storage options can be found <a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=2ca18093db7ac744f032f1f51d9619eb" style="font-weight:bold;" target="_blank">on their website</a>.

# Request Research Standard Storage

_Research Standard_ storage can be requested for $45/TB/YR through our [**Storage Request Form**](/form/storage/).
Users can specify the size and name of the Research Standard Storage directory and the name of an existing Grouper group that can access the space. If the Grouper group does not yet exist, please create one through the <a href="https://in.virginia.edu/how-to-request-group" style="font-weight:bold;" target="_blank">ITS Group Management System</a> before filling out the _Research Standard_ storage request form.

When your Research Standard Storage share is created, you will receive an email detailing your NFS mount `standard.hpc.virginia.edu:vol###`, where `###` refers to the specific volume number, and the SMB map `\\standard.hpc.virginia.edu\Grouper_group_name`.

# Drive Mapping with Research Standard Storage

_Research Standard_ storage can be drive mapped on a personal computer to enable drag-and-drop file manipulation and transfer between your PC and your value storage share. Detailed instructions for mapping network drives on Windows and Mac machines can be found on the UVa Research Computing [How To pages](/userinfo/howtos/storage/drive-mapping).


# Data transfer

### Public and Internal Use Data Transfer
<img src="/images/storage/storage-nonsecure.jpg" alt="nonsecure-storage-options-overview">

#### Secure Copy (scp)
`scp` uses secure shell (SSH) protocol to transfer files between your local machine and a remote host. `scp can be used with the following syntax:
```
scp SourceFile mst3k@rivanna.hpc.virginia.edu:/nv/vol123/Grouper_group_name
```
Detailed instructions and examples for using `scp` are provided [here](/userinfo/rivanna/logintools/cl-data-transfer).

#### Secure File Transfer Protocol (SFTP)
`sftp` is a network protocol for secure file management. Instructions and examples for using `sftp` are located [here](/userinfo/rivanna/logintools/cl-data-transfer).

#### Graphical Data Transfer Packages
Several packages such as [Filezilla](/userinfo/rivanna/logintools/filezilla), [Cyberduck](/userinfo/rivanna/logintools/cyberduck), and [MobaXterm](/userinfo/rivanna/logintools/mobaxterm) are available for users who want a graphical user interface for file transfers.  See [here](userinfo/rivanna/logintools/sftp-clients) for an overview.

#### Globus Connect (Large Data Transfers)
Globus provides access to data on local machines and Rivanna file systems, as well as external institutions and facilities. Globus is well suited for transferring both small files and large amounts of data. More information on Globus data transfer can be found [here](/userinfo/globus/).

# File Manipulation and Navigation with Research Standard Storage
 
_Research Standard_ storage is based on a Linux file system similar to storage spaces on the Rivanna cluster, including [/home](/userinfo/storage/non-sensitive-data/#home) and [/scratch](/userinfo/storage/non-sensitive-data/#scratch). Users can invoke generic Linux commands to manage files and directories (`mv`, `cp`, `mkdir`), manage permissions (`chmod`, `chown`) and navigate the file system (`cd`, `ls`, `pwd`).  If you or your collaborators are unfamiliar with some of these commands, we encourage you to take time to review some of the material below:

- <a href="https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855" target="_blank">A Gentle Introduction</a>
- <a href="https://www.lifewire.com/linux-commands-for-navigating-file-system-4027320" target="_blank">10 Essential Linux Commands</a>
- <a href="https://www.howtogeek.com/107808/how-to-manage-files-from-the-linux-terminal-11-commands-you-need-to-know/" target="_blank">How To Manage Files From The Linux Terminal</a>
- <a href="http://www.linuxplanet.com/linuxplanet/tutorials/6666/1" target="_blank">Navigating the Linux Filesystem</a>
- <a href="https://swcarpentry.github.io/shell-novice/" target="_blank">Shell Novice</a>

For more help, please feel free to contact RC to set up a consultation or visit us during office hours. 
