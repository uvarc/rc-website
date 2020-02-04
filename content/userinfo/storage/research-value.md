+++
title = "Research Value Storage"
description = ""
author = "SOMRC Staff"
images = [""]
categories = ["userinfo"]
date = "2019-10-08T17:45:12-05:00"
tags = [
    "rivanna", 
    "moderately-sensitive data",
    "storage",
    "research"
]
draft = false
+++

# Overview

Research Computing offers several budget options for storing public and moderately sensitive research data. Information Security at UVA provides details about [data sensitivity classifications](https://security.virginia.edu/university-data-protection-standards).

The Research Value Storage provides users 
with a solution for research data storage and collaboration. Members in the same group have access to a shared directory created by 
the team lead or PI. Group membership can be defined and managed through <a href="http://its.virginia.edu/mygroups/" target="_blank">ITS 
MyGroups system</a>. Value storage is mounted on the Rivanna HPC cluster and can also be accessed on a personal computer with an SMB 
mount, allowing for point-and-click file manipulation.

If you are not a researcher, UVA ITS offers Academic Value storage for long-term storage of large scale data. More information about ITS's 
various storage options can be found <a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=2ca18093db7ac744f032f1f51d9619eb" style="font-weight:bold;" target="_blank">on their website</a>.

# Request Research Value Storage

Research Value Storage can be requested for $45/TB/YR through our [**Storage Request Form**](https://auth.uvasomrc.io/site/storage.php).
Users can specify the size and name of the Research Value Storage directory and the name of an existing MyGroups group that can access the space. If the MyGroups group does not yet exist, please create one through the <a href="https://mygroups.virginia.edu/" style="font-weight:bold;" target="_blank">ITS MyGroups system</a> before filling out the value storage request form.

When your Research Value Storage share is created, you will receive an email detailing your NFS mount `sammas.storage.virginia.edu:vol###`, where `###` refers to the specific volume number, and the SMB map `\\sammas.storage.virginia.edu\MyGroup_name`.

# Drive Mapping with Research Value Storage

Research Value Storage can be drive mapped on a personal computer to enable drag-and-drop file manipulation and transfer between your PC and your value storage share. Detailed instructions for mapping network drives on Windows and Mac machines can be found on the UVa Research Computing <a href="https://discuss.rc.virginia.edu/t/research-value-storage-drive-mapping/838" target="_blank">FAQ knowledgebase</a>.

# Data transfer


<h3>
  Public and Moderately Sensitive Storage Data Transfer
  <small class="text-muted">High level Overview</small>
</h3>
<img src="https://s3.amazonaws.com/uvasom-assets/imgs/somrc-storage-nonsecure-apr2018.png" alt="nonsecure-storage-options-overview">

{{% callout %}}
#### Secure Copy (scp)
<p><code>scp</code> uses secure shell (SSH) protocol to transfer files between your local machine and a remote host. <code>scp</code> can be used with the following syntax:</p>
<p><code>scp SourceFile mst3k@rivanna.hpc.virginia.edu:/nv/vol123/MyGroup_name</code></p>
<p>Detailed instructions and examples for using <code>scp</code> are listed <a href ="https://discuss.rc.virginia.edu/t/secure-copy-scp/740" target="_blank">here</a>.</p>
{{% /callout %}}

{{% callout %}}
#### Secure File Transfer Protocol (SFTP)
<p><code>sftp</code> is a network protocol for secure file management. Instructions and examples for using <code>sftp</code> are located <a href = "https://discuss.rc.virginia.edu/t/secure-file-transfer-protocol-sftp/741" target="_blank">here</a>.</p>
{{% /callout %}}

{{% callout %}}
#### Filezilla & Cyberduck
<p><a href="https://filezilla-project.org/" target="_blank">Filezilla</a> and <a href="https://cyberduck.io/" target="_blank">Cyberduck</a> are open source SFTP client software for file management through an interactive graphical user interface. Instructions for using these SFTP clients can be found <a href ="https://discuss.rc.virginia.edu/t/file-management-with-an-ftp-client/742" target="_blank">here</a>.</p>
{{% /callout %}}

{{% callout %}}
#### Globus Connect (Large Data Transfers)
Globus provides access to data on local machines and Rivanna file systems, as well as external institutions and facilities. Globus is well suited for transferring both small files and large amounts of data. More information on Globus data transfer can be found [here](/userinfo/globus/).
{{% /callout %}}

# File Manipulation and Navigation with Value Storage
 
Research Value Storage is based on a Linux file system similar to storage spaces on the Rivanna cluster, including [/home](/userinfo/storage/non-sensitive-data/#home) and [/scratch](/userinfo/storage/non-sensitive-data/#scratch). Users can invoke generic Linux commands to manage files and directories (`mv`, `cp`, `mkdir`), manage permissions (`chmod`, `chown`) and navigate the file system (`cd`, `ls`, `pwd`).  If you or your collaborators are unfamiliar with some of these commands, we encourage you to take time to review some of the material below:

- <a href="https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855" target="_blank">A Gentle Introduction</a>
- <a href="https://www.lifewire.com/linux-commands-for-navigating-file-system-4027320" target="_blank">10 Essential Linux Commands</a>
- <a href="https://www.howtogeek.com/107808/how-to-manage-files-from-the-linux-terminal-11-commands-you-need-to-know/" target="_blank">How To Manage Files From The Linux Terminal</a>
- <a href="http://www.linuxplanet.com/linuxplanet/tutorials/6666/1" target="_blank">Navigating the Linux Filesystem</a>
- <a href="https://swcarpentry.github.io/shell-novice/" target="_blank">Shell Novice</a>

For more help, please feel free to contact RC to set up a consultation or visit us during office hours. 