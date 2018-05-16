+++
date = "2018-05-01T10:08:34-05:00"
tags = [
	"data-transfer",
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

# Use Cases

<p>The data transfer method you choose heavily relies on where the data are currently located and to where you want to transfer the data. Click on a row in the table below to learn more about the data transfer methods available for a specific use case.</p>

<div>
<table class="table table-hover">
	<col width="25%">
	<col width="25%">
	<col width="50%">
	<thead>
		<tr>
			<th class="text-center">Source</th>
			<th class="text-center">Destination</th>
			<th class="text-center">Example Use Cases</th>
		</tr>	
	</thead>
	<tbody style="font-size:14px">
		<tr data-toggle="collapse" data-target="#accordion1" class="clickable">
			<td align="center" vertical-align="middle">
				<i class="fas fa-laptop fa-3x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br></br>
				<b>Lab Workstation</b>
			</td>
			<td align="center" vertical-align="middle">
				<i class="fas fa-database fa-3x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br></br>
				<b>Non-Sensitive Data Storage</b>
			</td>
			<td vertical-align="middle" style="padding:25px 10px">
				<ul>
					<li>A research scientist wants to copy data from her lab workstation to her lab's /project storage share.</li>
					<br>
					<li>A graduate student needs to copy scripts he wrote to his /scratch directory on Rivanna.</li>
				</ul>
			</td>
		</tr>
		<tr id="accordion1" class="collapse">
			<td>
				<p align="center"><b>Sources</b></p>
				<ul>
					<li>Laptop</li>
					<li>Lab Workstation</li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Destinations</b></p>
				<ul>
					<li><a href="/userinfo/storage/non-sensitive-data/#home/">/home</a></li>
					<li><a href="/userinfo/storage/non-sensitive-data/#scratch/">/scratch</a></li>
					<li><a href="/userinfo/storage/non-sensitive-data/#project/">/project</a></li>
					<li><a href="/userinfo/storage/research-value/">Value Storage</a></li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Data Transfer Methods</b></p>
				<ul>
					<li><a href="#globus">Globus Connect</a></li>
					<li><a href="#ftp">FTP Client</a></li>
					<li><a href="#command-line">Command Line Tools</a></li>
				</ul>
			</td>
		</tr>
		<tr data-toggle="collapse" data-target="#accordion2" class="clickable">
			<td align="center" vertical-align="middle">
				<i class="fas fa-laptop fa-3x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br></br>
				<b>Secure Lab Workstation</b>
			</td>
			<td align="center" vertical-align="middle">
				<i class="fas fa-lock fa-3x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br></br>
				<b>Sensitive Data Storage</b>
			</td>
			<td vertical-align="middle" style="padding:25px 10px">
				<ul>
					<li>A clinician wants to transfer HIPAA data from his Health Systems workstation to Ivy Central Storage.</li>
				</ul>
			</td>
		</tr>
		<tr id="accordion2" class="collapse">
			<td>
				<p align="center"><b>Sources</b></p>
				<ul>
					<li>Laptop</li>
					<li>Lab Workstation</li>
					<li>Health Systems Workstation</li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Destinations</b></p>
				<ul>
					<li><a href="/userinfo/storage/sensitive-data/#ivy-central-storage/">Ivy Central Storage</a></li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Data Transfer Methods</b></p>
				<ul>
					<li><a href="#globus">Globus Connect</a></li>
				</ul>
			</td>			
		</tr>
		<tr data-toggle="collapse" data-target="#accordion3" class="clickable">
			<td align="center" vertical-align="middle">
				<i class="fas fa-database fa-3x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br></br>
				<b>Non-Sensitive Data Storage</b>
			</td>
			<td align="center" vertical-align="middle">
				<i class="fas fa-laptop fa-3x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br></br>
				<b>Lab Workstation</b>
			</td>
			<td vertical-align="middle" style="padding:25px 10px">
				<ul>
					<li>An undergraduate student needs to move results from his /home directory on Rivanna to his personal laptop.</li>
					<br>
					<li>A postdoc wants to copy imaging data from Research Value storage to her lab workstation.</li>
				</ul>
			</td>
		</tr>
		<tr id="accordion3" class="collapse">
			<td>
				<p align="center"><b>Sources</b></p>
				<ul>
					<li><a href="/userinfo/storage/non-sensitive-data/#home/">/home</a></li>
					<li><a href="/userinfo/storage/non-sensitive-data/#scratch/">/scratch</a></li>
					<li><a href="/userinfo/storage/non-sensitive-data/#project/">/project</a></li>
					<li><a href="/userinfo/storage/research-value/">Value Storage</a></li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Destinations</b></p>
				<ul>
					<li>Laptop</li>
					<li>Lab Workstation</li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Data Transfer Methods</b></p>
				<ul>
					<li><a href="#globus">Globus Connect</a></li>
					<li><a href="#ftp">FTP Client</a></li>
					<li><a href="#command-line">Command Line Tools</a></li>
				</ul>
			</td>
		</tr>
		<tr data-toggle="collapse" data-target="#accordion4" class="clickable">
			<td align="center" vertical-align="middle">
				<i class="fas fa-building fa-3x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br></br>
				<b>External Institution</b>
			</td>
			<td align="center" vertical-align="middle">
				<i class="fas fa-home fa-3x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br></br>
				<b>University of Virginia</b>
			</td>
			<td vertical-align="middle" style="padding:25px 10px">
				<ul>
					<li>A new faculty member wants to transfer data she collected at another university to her Ivy Central Storage share at UVa.</li>
					<br>
					<li>A researcher needs to transfer results from the analysis he ran using ORNL's Titan supercomputer.</li>
				</ul>
			</td>
		</tr>
		<tr id="accordion4" class="collapse">
			<td>
				<p align="center"><b>Sources</b></p>
				Any institution that uses Globus, such as:
				<ul>
					<li>Other universities</li>
					<li>Supercomputing facilities</li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Destinations</b></p>
				<ul>
					<li><a href="/userinfo/storage/non-sensitive-data/#home/">/home</a></li>
					<li><a href="/userinfo/storage/non-sensitive-data/#scratch/">/scratch</a></li>
					<li><a href="/userinfo/storage/non-sensitive-data/#project/">/project</a></li>
					<li><a href="/userinfo/storage/research-value/">Value Storage</a></li>
					<li><a href="/userinfo/storage/sensitive-data/#ivy-central-storage/">Ivy Central Storage</a></li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Data Transfer Methods</b></p>
				<ul>
					<li><a href="#globus">Globus Connect</a></li>
				</ul>
			</td>
		</tr>	
	</tbody>	
</table>
</div>

<br></br>

# Data Transfer Methods

<a id="globus"></a>
<div class="card-group">
	<div class="card">
		<div class="card-block">
			<h4 class="card-title">Globus Connect</h4>
			<h6 class="card-subtitle mb-2 text-muted">Large-scale research data transfer</h6>
				<p class="card-text">
					Transferring large amounts of research data is fast and simple with Globus Connect. Globus gives researchers unified access to their data through an easy-to-use web interface, and can be used to transfer data between your laptop and storage systems mounted on the Rivanna HPC system. Globus can also be used to transfer data from other universities or supercomputing facilities.
				</p>
			<a href="https://discuss.rc.virginia.edu/t/globus-connect-data-transfer-introduction/345" class="card-link" target="_blank"><button class="btn btn-warning">Learn more</button></a>
				<br></br>
				<p class="card-text">	
					For transferring highly sensitive data such as HIPAA or CUI data to the Ivy secure computing environment, researchers must use the secure Globus data transfer node (DTN).
				</p>
			<a href="https://discuss.rc.virginia.edu/t/ivy-secure-dtn-transfer-sensitive-data/771" class="card-link" target="_blank"><button class="btn btn-warning">Learn more</button></a>
		</div>
	</div>
</div>

<br></br>

<a id="ftp"></a>
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

<br></br>

<a id="command-line"></a>
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
