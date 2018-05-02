+++
date = "2018-05-01T10:08:34-05:00"
tags = [
	"data transfer",
	"globus",
	"ftp"
	]
categories = ["userinfo"]
images = [""]
author = "SOMRC Staff"
description = ""
title = "Data Transfer"
draft = false
+++

<p class="lead">Efficient and reliable data transfer is a critical component of scientific research computing. There are a variety of useful tools available for expedient data transfer, whether you are transferring data from an external site or within different computing environments at UVa. </p>

<div class="card-group">
	<div class="card">
		<div class="card-block">
			<h4 class="card-title">Globus Connect</h4>
			<h6 class="card-subtitle mb-2 text-muted">Large-scale research data transfer</h6>
				<p class="card-text">
					Transferring large amounts of research data is fast and simple with Globus Connect. Globus gives researchers unified access to their data through an easy-to-use web interface, and can be used to transfer data between your laptop and storage systems mounted on the Rivanna HPC system. Globus can also be used to transfer data from other universities or supercomputing facilities.
					<br></br>
					For transferring highly sensitive data such as HIPAA or CUI data to the Ivy secure computing environment, researchers must use the secure Globus data transfer node (DTN).
				</p>
			<a href="https://discuss.rc.virginia.edu/tags/globus" class="card-link" target="_blank"><button class="btn btn-warning">Learn more</button></a>
		</div>
	</div>
</div>

<br></br>

<div class="card-group">
	<div class="card">
		<div class="card-block">
			<h4 class="card-title">Filezilla & Cyberduck</h4>
			<h6 class="card-subtitle mb-2 text-muted">File transfer protocol (FTP) solutions</h6>
				<p class="card-text">
					FTP clients such as Filezilla and Cyberduck give researchers a graphical user interface to transfer data between their lab computers and a remote storage location. These apps allow for drag-and-drop file manipulation.
				</p>
			<a href="https://discuss.rc.virginia.edu/t/file-management-with-an-ftp-client/742" class="card-link" target="_blank"><button class="btn btn-warning">Learn more</button></a>
		</div>
	</div>
</div>

<div class="card-group">
	<div class="card">
		<div class="card-block">
			<h4 class="card-title">Command Line Tools</h4>
			<h6 class="card-subtitle mb-2 text-muted">Small-scale file transfer</h6>
				<p class="card-text">
					Researchers who are comfortable with using the command line can use a variety of command line tools to transfer their data between their laptops and storage systems. Tools such as `scp`, `sftp`, and `rsync` can be used to quickly transfer a small number of files.
				</p>
			<a href="https://discuss.rc.virginia.edu/c/rivanna/storage" class="card-link" target="_blank"><button class="btn btn-warning">Learn more</button></a>
		</div>
	</div>
</div>
- - -

# More Resources for Data Transfer with the Command Line
 
Many of the UVa storage options are based on a Linux file system. Users can invoke generic Linux commands to manage files and directories (`mv`, `cp`, `mkdir`), manage permissions (`chmod`, `chown`) and navigate the file system (`cd`, `ls`, `pwd`).  If you or your collaborators are unfamiliar with some of these commands, we encourage you to take time to review some of the material below:

- <a href="https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855" target="_blank">A Gentle Introduction</a>
- <a href="https://www.lifewire.com/linux-commands-for-navigating-file-system-4027320" target="_blank">10 Essential Linux Commands</a>
- <a href="https://www.howtogeek.com/107808/how-to-manage-files-from-the-linux-terminal-11-commands-you-need-to-know/" target="_blank">How To Manage Files From The Linux Terminal</a>
- <a href="http://www.linuxplanet.com/linuxplanet/tutorials/6666/1" target="_blank">Navigating the Linux Filesystem</a>
- <a href="https://swcarpentry.github.io/shell-novice/" target="_blank">Shell Novice</a>

For more help, please feel free to contact SOMRC to set up a consultation or visit us during office hours. We also provide in-person training opportunities around basic command line skills and more through the <a href="https://education.cadre.virginia.edu/#/home" target="_blank">CADRE Academy portal</a>.