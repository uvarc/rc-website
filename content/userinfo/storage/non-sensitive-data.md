+++
title = "Non-Sensitive Data Storage"
description = ""
author = "SOMRC Staff"
images = [""]
categories = ["userinfo"]
date = "2019-07-19T17:45:12-05:00"
tags = [
    "rivanna",
    "sensitive data",
    "storage",
    "ivy"
]
draft = false
+++

# `/home`

`/home` is a free 50GB space provided to users of the Rivanna HPC system and is visible from the Rivanna login and compute nodes. `/home` is the default working directory when logging on to Rivanna. Users can also access their home directory at `/home/$USER`, where `$USER` is an individual's UVa computing ID.

# `/scratch`

`/scratch` is a Lustre high performance parallel filesystem accessible via the Rivanna login and compute nodes. All Rivanna HPC users are granted 10TB for free and can access this space within Rivanna at `/scratch/$USER`, where `$USER` is an individual's UVa computing ID. **The `/scratch` directory is not intended for long-term data storage. Files are flagged for removal 90 days after last modification timestamp.**

**How to request /home and /scratch space**

`/home` and `/scratch` space can be obtained by requesting an allocation on Rivanna. The process of getting access to Rivanna is described [here](/userinfo/rivanna/overview/).

# `/project`

The `/project` file system provides users with a collaborative space for data storage and sharing. Members in the same group have access to a shared directory created by the team lead or PI. Group membership can be defined and managed through the <a href="http://its.virginia.edu/mygroups/" target="_blank">ITS MyGroups system</a>. `/project` storage is mounted on the Rivanna HPC cluster and runs on a new <a href="http://whatis.techtarget.com/definition/scale-out-storage" target="_blank">scale-out</a> NAS file system.

**How to request `/project` storage space**

`/project` storage can be purchased for {{% storage-pricing project %}}/TB/YR by using [this form](https://auth.uvasomrc.io/site/storage.php). When filling out the form, the PI can specify the size of the `/project` directory and the name of an existing or new MyGroup that can access this space. We recommend choosing a MyGroup name specific to your group or collaboration for the `/project` directory. This will reduce confusion in the future if you manage multiple MyGroups and directories on other storage systems.

Once the request has been submitted, the PI will receive a notification that the `/project` space has been provisioned within 24 hours. Once the space becomes available, the PI can grant access to lab members by adding them to the MyGroup. Users in the MyGroup will see the directory (`~/project/MyGroup_name`) after logging into Rivanna. Addition and removal of users is managed by the PI of the group.


# Data transfer

<h3>
  Non-Sensitive Storage Data Transfer
  <small class="text-muted">High level Overview</small>
</h3>
<img src="https://s3.amazonaws.com/uvasom-assets/imgs/somrc-storage-nonsecure-apr2018.png" alt="nonsecure-storage-options-overview">

<div class="bd-callout bd-callout-warning">
<b>Secure Copy (scp)</b>
<p><code>scp</code> uses secure shell (SSH) protocol to transfer files between your local machine and a remote host. <code>scp</code> can be used with the following syntax:</p>
<p><code>scp SourceFile mst3k@rivanna.hpc.virginia.edu:/scratch/mst3k</code></p>
<p><code>scp SourceFile mst3k@rivanna.hpc.virginia.edu:/project/MyGroup_name</code></p>
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

# Non-sensitive Data Storage Systems

`/home`, `/scratch`, and `/project` storage are based on a Linux file system. Users can invoke generic Linux commands to manage files and directories (`mv`, `cp`, `mkdir`), manage permissions (`chmod`, `chown`) and navigate the file system (`cd`, `ls`, `pwd`).  If you or your collaborators are unfamiliar with some of these commands, we encourage you to take time to review some of the material below:

- <a href="https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855" target="_blank">A Gentle Introduction</a>
- <a href="https://www.lifewire.com/linux-commands-for-navigating-file-system-4027320" target="_blank">10 Essential Linux Commands</a>
- <a href="https://www.howtogeek.com/107808/how-to-manage-files-from-the-linux-terminal-11-commands-you-need-to-know/" target="_blank">How To Manage Files From The Linux Terminal</a>
- <a href="http://www.linuxplanet.com/linuxplanet/tutorials/6666/1" target="_blank">Navigating the Linux Filesystem</a>
- <a href="https://swcarpentry.github.io/shell-novice/" target="_blank">Shell Novice</a>

For more help, please feel free to contact SOMRC to set up a consultation or visit us during office hours. We also provide in-person training opportunities around basic command line skills and more through the <a href="https://education.cadre.virginia.edu/#/home" target="_blank">CADRE Academy portal</a>.
