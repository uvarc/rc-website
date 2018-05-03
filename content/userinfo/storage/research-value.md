+++
title = "Research Value Storage"
description = ""
author = "SOMRC Staff"
images = [""]
categories = ["userinfo"]
date = "2018-04-19T17:45:12-05:00"
tags = [
    "rivanna", 
    "non-sensitive data",
    "storage",
    "research"
]
draft = false
+++

# Overview

UVa ITS offers several budget options for storing non-sensitive data. The Research Value NAS storage system provides users with a solution for research data storage and collaboration. Members in the same group have access to a shared directory created by the team lead or PI. Group membership can be defined and managed through <a href="http://its.virginia.edu/mygroups/" target="_blank">ITS MyGroups system</a>. Value storage is mounted on the Rivanna HPC cluster and can also be accessed on a personal computer with an SMB mount, allowing for point-and-click file manipulation.

If you are not a researcher, UVa ITS also offers Academic Value storage for long-term storage of large scale data. More information about the ITS's various storage options can be found on the ITS <a href="http://its.virginia.edu/hosting/storage/value.html" target="_blank">website</a>.

# How to Request Research Value Storage

Research Value Storage can be requested for $45/TB/YR through UVa <a href="https://virginia.service-now.com/" target="_blank">ServiceNow</a>. After logging into ServiceNow, click the Service Request Catalog > Hosting > Storage - Research Value Storage to access the request form. Users can specify the size and name of the Research Value Storage directory and the name of an existing MyGroups group that can access the space. If the MyGroups group does not yet exist, please create one through the <a href="http://its.virginia.edu/mygroups/" target="_blank">ITS MyGroups system</a> before filling out the value storage request form.

When your Research Value Storage share is created, you will receive an email an from uvaprod@service-now containing the NFS mount `sammas.storage.virginia.edu:vol###`, where ### refers to the specific volume number, and the SMB map `\\sammas.storage.virginia.edu\MyGroup_name`.

# Drive Mapping with Research Value Storage

Research Value Storage can be drive mapped on a personal computer to enable drag-and-drop file manipulation and transfer between your PC and your value storage share. Detailed instructions for mapping network drives on Windows and Mac machines can be found on the UVa Research Computing <a href="https://discuss.rc.virginia.edu/t/research-value-storage-drive-mapping/838" target="_blank">FAQ knowledgebase</a>.

# Data transfer


<h3>
  Non-Sensitive Storage Data Transfer
  <small class="text-muted">High level Overview</small>
</h3>
<img src="https://s3.amazonaws.com/uvasom-assets/imgs/somrc-storage-nonsecure-apr2018.png" alt="nonsecure-storage-options-overview">

<div class="bd-callout bd-callout-warning">
<b>Secure Copy (scp)</b> 
<p><code>scp</code> uses secure shell (SSH) protocol to transfer files between your local machine and a remote host. <code>scp</code> can be used with the following syntax:</p>
<p><code>scp SourceFile mst3k@rivanna.hpc.virginia.edu:/nv/vol123/MyGroup_name</code></p>
<p>Detailed instructions and examples for using <code>scp</code> are listed <a href ="https://discuss.rc.virginia.edu/t/secure-copy-scp/740" target="_blank">here</a>.</p>
</div>

<div class="bd-callout bd-callout-warning">
<b>Secure File Transfer Protocol (sftp)</b> 
<p><code>sftp</code> is a network protocol for secure file management. Instructions and examples for using <code>sftp</code> are located <a href = "https://discuss.rc.virginia.edu/t/secure-file-transfer-protocol-sftp/741" target="_blank">here</a>.</p>
</div>

<div class="bd-callout bd-callout-warning">
<b>Filezilla & Cyberduck</b> 
<p><a href="https://filezilla-project.org/" target="_blank">Filezilla</a> and <a href="https://cyberduck.io/" target="_blank">Cyberduck</a> are open source FTP client software for file management through an interactive graphical user interface. Instructions for using these FTP clients can be found <a href ="https://discuss.rc.virginia.edu/t/file-management-with-an-ftp-client/742" target="_blank">here</a>.</p>
</div>

<div class="bd-callout bd-callout-warning">
<b>Globus Connect (Large Data Transfer)</b>
<p><a href="https://www.globus.org/" target="_blank">Globus</a> provides access to data on local machines and Rivanna file systems, as well as external institutions and facilities. Globus is well suited for transferring both small files and large amounts of data. More information on Globus data transfer can be found <a href ="https://discuss.rc.virginia.edu/t/globus-connect-data-transfer-introduction/345" target="_blank">here</a>.</p>
</div>

# File Manipulation and Navigation with Value Storage
 
Research Value Storage is based on a Linux file system similar to storage spaces on the Rivanna cluster, including [/home](/userinfo/storage/non-sensitive-data/#home) and [/scratch](/userinfo/storage/non-sensitive-data/#scratch). Users can invoke generic Linux commands to manage files and directories (`mv`, `cp`, `mkdir`), manage permissions (`chmod`, `chown`) and navigate the file system (`cd`, `ls`, `pwd`).  If you or your collaborators are unfamiliar with some of these commands, we encourage you to take time to review some of the material below:

- <a href="https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855" target="_blank">A Gentle Introduction</a>
- <a href="https://www.lifewire.com/linux-commands-for-navigating-file-system-4027320" target="_blank">10 Essential Linux Commands</a>
- <a href="https://www.howtogeek.com/107808/how-to-manage-files-from-the-linux-terminal-11-commands-you-need-to-know/" target="_blank">How To Manage Files From The Linux Terminal</a>
- <a href="http://www.linuxplanet.com/linuxplanet/tutorials/6666/1" target="_blank">Navigating the Linux Filesystem</a>
- <a href="https://swcarpentry.github.io/shell-novice/" target="_blank">Shell Novice</a>

For more help, please feel free to contact SOMRC to set up a consultation or visit us during office hours. We also provide in-person training opportunities around basic command line skills and more through the <a href="https://education.cadre.virginia.edu/#/home" target="_blank">CADRE Academy portal</a>.