+++
date = "2020-02-21T15:12:46-05:00"
tags = [
	"data-transfer",
	"globus",
	"sftp"
	]
categories = ["userinfo"]
images = [""]
author = "Staff"
description = ""
title = "Data Transfer"
draft = false
+++

<p class="lead">Efficient and reliable data transfer is a critical component of research computing. A variety of useful tools is available for rapid data transfer, whether you are transferring data from an external site or within different computing environments at UVA. </p>

---

# Common Scenarios

* Transfer public or internal use data between local workstation/laptop and UVA storage
* Transfer sensitive or highly sensitive data to Ivy storage
* Transfer data between external institutions/supercomputing centers and UVA 
* [Transfer between UVA HPC and Cloud storage](#transfering-data-to-cloud-storage)

The data transfer method you choose heavily relies on the [data sensitivity classification](https://security.virginia.edu/university-data-protection-standards), where the data are currently located and to where you want to transfer the data. Click on a row in the table below to learn more about the data transfer methods available for a specific scenario.

<div>
<table table table-hover">
	<col width="25%">
	<col width="25%">
	<col width="50%">
	<thead>
		<tr>
			<th class="text-center">System 1</th>
			<th class="text-center">System 2</th>
			<th class="text-center">Example Scenario</th>
		</tr>	
	</thead>
	<tbody style="font-size:14px">
		<tr data-toggle="collapse" data-target="#accordion1" class="clickable">
			<td align="center" valign="top">
				<i class="fas fa-laptop fa-4x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br>
				<b>Lab Workstation</b>
			</td>
			<td align="center" valign="top">
				<i class="fas fa-database fa-4x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br>
				<b>Storage for Public, Internal Use, and Sensitive Data</b>
			</td>
			<td vertical-align="middle" style="padding:25px 10px">
				<ul>
					<li>Copy data from a lab workstation to a <code>/project</code> storage share.</li>
					<br>
					<li>Copy result files from a <code>/scratch</code> directory on Rivanna or Afton.</li>
				</ul>
				<span style="float:right;font-size:85%;margin-bottom:-8px;margin-right:-4px;"><i class="fas fa-angle-double-down"></i> Expand</span>
			</td>
		</tr>
		<tr id="accordion1" valign="top" class="collapse">
			<td>
				<p align="center"><b>Local Computer</b></p>
				<ul>
					<li>Laptop</li>
					<li>Lab Workstation</li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Remote System</b></p>
				<ul>
					<li>/home on Rivanna or Afton</li>
					<li>/scratch on Rivanna or Afton</li>
					<li>Research Project Storage</li>
					<li><a href="/userinfo/storage/research-standard/">Research Standard Storage</a></li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Data Transfer Methods</b></p>
				<ul>
					<li><a href="#globus">Globus Connect</a></li>
					<li><a href="#sftp">Graphical SFTP Clients</a></li>
					<li><a href="#command-line">Command Line Tools</a></li>
				</ul>
			</td>
		</tr>
	</tbody>
</table>
</div>

---

<div>
<table table table-hover">
	<col width="25%">
	<col width="25%">
	<col width="50%">
	<thead>
		<tr>
			<th class="text-center">System 1</th>
			<th class="text-center">System 2</th>
			<th class="text-center">Example Scenario</th>
		</tr>	
	</thead>
	<tbody style="font-size:14px">
		<tr data-toggle="collapse" data-target="#accordion2" class="clickable">
			<td align="center" valign="top">
				<i class="fas fa-laptop fa-4x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br>
				<b>Secure Lab Workstation</b>
			</td>
			<td align="center" valign="top">
				<i class="fas fa-lock fa-4x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br>
				<b>Storage for Highly-Sensitive Data</b>
			</td>
			<td vertical-align="middle" style="padding:25px 10px">
				<ul>
					<li>Transfer highly-sensitive data from a secure workstation to High-Security Research Standard Storage.</li>
				</ul>
				<p>&nbsp;</p>
				<span style="float:right;font-size:85%;margin-bottom:-8px;"><i class="fas fa-angle-double-down"></i> Expand</span>
			</td>
		</tr>
		<tr id="accordion2" valign="top" class="collapse">
			<td>
				<p align="center"><b>Sources</b></p>
				<ul>
					<li>Secure Lab Workstation</li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Destination</b></p>
				<ul>
					<li><a href="/userinfo/storage/sensitive-data/#ivy-central-storage">High-Security Research Standard Storage</a></li>
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

---

<div>
<table table table-hover">
	<col width="25%">
	<col width="25%">
	<col width="50%">
	<thead>
		<tr>
			<th class="text-center">System 1</th>
			<th class="text-center">System 2</th>
			<th class="text-center">Example Scenario</th>
		</tr>	
	</thead>
	<tbody style="font-size:14px">	
		<tr data-toggle="collapse" data-target="#accordion3" class="clickable">
			<td align="center" valign="top">
				<i class="fas fa-building fa-4x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br>
				<b>External Institution</b>
			</td>
			<td align="center" valign="top">
				<i class="fas fa-home fa-4x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br>
				<b>University of Virginia</b>
			</td>
			<td vertical-align="middle" style="padding:25px 10px">
				<ul>
					<li>Transfer public or not-highly sensitive data collected at another institution to UVA storage.</li>
					<br>
					<li>Transfer results from an analysis carried out on a remote supercomputer at a national lab or supercomputing center.</li>
				</ul>
				<span style="float:right;font-size:85%;margin-bottom:-8px;"><i class="fas fa-angle-double-down"></i> Expand</span>
			</td><br><br>
		</tr>
		<tr id="accordion3" valign="top" class="collapse">
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
					<li>/home</li>
					<li>/scratch</li>
					<li>Research Project Storage</li>
					<li><a href="/userinfo/storage/research-standard/">Research Standard Storage</a></li>
					<li><a href="/userinfo/storage/sensitive-data/#ivy-central-storage">High-Security Research Standard Storage</a></li>
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

---

<div>
<table table table-hover">
	<col width="25%">
	<col width="25%">
	<col width="50%">
	<thead>
		<tr>
			<th class="text-center">System 1</th>
			<th class="text-center">System 2</th>
			<th class="text-center">Example Scenario</th>
		</tr>	
	</thead>
	<tbody style="font-size:14px">	
		<tr data-toggle="collapse" data-target="#accordion4" class="clickable">
			<td align="center" valign="top">
				<i class="fas fa-building fa-4x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br>
				<b>Rivanna/Afton Storage</b>
			</td>
			<td align="center" valign="top">
				<i class="fas fa-cloud fa-4x" aria-hidden="true" style="padding:20px 5px;"></i>
				<br>
				<b>Cloud Storage</b>
			</td>
			<td vertical-align="middle" style="padding:25px 10px">
				<ul>
					<li>Transfer public or not-highly sensitive data from <i>Research Project<i> & <i>Research Standard</i> storage or Rivanna/Afton home & scratch directories to AWS cloud storage.</li>
				</ul>
				<span style="float:right;font-size:85%;margin-bottom:-8px;"><i class="fas fa-angle-double-down"></i> Expand</span>
			</td><br><br>
		</tr>
		<tr id="accordion4" valign="top" class="collapse">
			<td>
				<p align="center"><b>Sources</b></p>
				Any institution that uses Globus, such as:
				<ul>
					<li>/home</li>
					<li>/scratch</li>
					<li>Research Project Storage</li>
					<li><a href="/userinfo/storage/research-standard/">Research Standard Storage</a></li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Destinations</b></p>
				<ul>
					<li>AWS S3</li>
					<li>AWS S3 Deep Glacier</li>
				</ul>
			</td>
			<td>
				<p align="center"><b>Data Transfer Methods</b></p>
				<ul>
					<li><a href="/userinfo/howtos/storage/aws-s3/">AWS command line tools</a></li>
				</ul>
			</td>
		</tr>	
	</tbody>	
</table>
</div>

---

# Data Transfer Methods

<a id="globus"></a>
<div class="card-group">
	<div class="card">
		<div class="card-block">
			<h4 class="card-title">Globus Connect</h4>
			<h6 class="card-subtitle mb-2 text-muted">Large-scale research data transfer</h6>
                        <img src="/images/globus-logo.png" alt="Globus" style="max-width:30%; float:right; margin-left:2rem; margin-bottom:2rem;" />
				<p class="card-text">
					Transferring large amounts of research data is fast and simple with Globus Connect. Globus gives researchers unified access to their data through an easy-to-use web interface, and can be used to transfer data between your laptop and storage systems mounted on the HPC system. Globus can also be used to transfer data from other universities or supercomputing facilities.
				</p>
			<a href="/userinfo/globus" class="card-link"><button class="btn btn-warning">Learn more</button></a> &nbsp;
			<a href="https://www.globus.org/" class="card-link" target="_blank"><button class="btn btn-primary">Access Globus</button></a>
				<br></br>
				<p class="card-text">	
					For transferring highly sensitive data such as HIPAA or CUI data to the Ivy secure computing environment, researchers <b>must</b> use the secure Globus data transfer node (DTN).
				</p>
			<a href="/userinfo/ivy/#data-transfer-in-out-of-ivy" class="card-link" 1target="_blank"><button class="btn btn-warning">Learn more</button></a>
		</div>
	</div>
</div>

<a id="sftp"></a>
<div class="card-group">
	<div class="card">
		<div class="card-block">
			<h4 class="card-title">Graphical SFTP Clients</h4>
                <img src="/images/graphical-sftp.png" alt="Graphical-SFTP" style="max-width:25%; margin-left:2rem; float:right;" />
			<h6 class="card-subtitle mb-2 text-muted">Secure file transfer protocol (SFTP)</h6>
				<p class="card-text">
					Programs such as MobaXterm, Filezilla, and Cyberduck provide a graphical user interface to transfer data between a local computer and a remote storage location that permits <code>scp</code> or <code>sftp</code>. These applications allow drag-and-drop file manipulation.
				</p>
			<a href="/userinfo/hpc/logintools/graphical-sftp" class="card-link" target="_blank"><button class="btn btn-warning">Learn more</button></a>
		</div>
	</div>
</div>

<a id="command-line"></a>
<div class="card-group">
	<div class="card">
		<div class="card-block">
			<h4 class="card-title">Command Line Tools</h4>
                <div style="float:right; margin-left:2rem;"><i class="fas fa-6x fa-laptop-code"></i></div>
			<h6 class="card-subtitle mb-2 text-muted">Transferring Files from a Terminal</h6>
				<p class="card-text">
					Researchers who are comfortable with the command line can use a variety of command line tools to transfer their data between their laptops and storage systems. Programs such as <code>scp</code>, <code>sftp</code>, <code>rsync</code> and <code>aws cli</code> can be used to quickly transfer files.
				</p>
			<a href="/userinfo/hpc/logintools/cl-data-transfer" class="card-link" target="_blank"><button class="btn btn-warning">Learn more</button></a>
		</div>
	</div>
</div>

# Local Data Transfer with the Command Line
 
When using a Linux file system, users can invoke generic Linux commands to manage files and directories (`mv`, `cp`, `mkdir`), manage permissions (`chmod`) and navigate the file system (`cd`, `ls`, `pwd`).  If you or your collaborators are unfamiliar with some of these commands, we encourage you to take time to review some of the material below:

<ul>
    <li><a href="https://www.lifewire.com/linux-commands-for-navigating-file-system-4027320" target="_blank">10 Essential Linux Commands</a></li>
    <li><a href="https://www.howtogeek.com/107808/how-to-manage-files-from-the-linux-terminal-11-commands-you-need-to-know/" target="_blank">How To Manage Files From The Linux Terminal</a></li>
    <!-- No Longer Active -->
    <!-- <li><a href="http://www.linuxplanet.com/linuxplanet/tutorials/6666/1" target="_blank">Navigating the Linux Filesystem</a></li> -->
    <li><a href="https://swcarpentry.github.io/shell-novice/" target="_blank">Shell Novice</a></li>
</ul>


# Transfering Data to Cloud Storage
 
Several command line tools are available to transfer data from your UVA storage locations to the cloud. On the HPC system we provide the `rsync` and `aws cli` tools to transfer files from _Research Project_, _Research Standard_ and Rivanna/Afton home & scratch directories to AWS storage.

[Learn more about the AWS CLI tools](/userinfo/howtos/storage/aws-s3/)

{{% callout %}}
For more help, please feel free to contact RC staff to set up a consultation or visit us during [office hours](/support/#office-hours). 
{{% /callout %}}
