+++
description = ""
title = "Ivy Secure Environment"
draft = false
date = "2017-02-26T17:45:12-05:00"
tags = ["hpc","ivy","hipaa","linux","windows"]
categories = ["userinfo"]
images = [""]
author = "SOMRC Staff"

+++

<div class="bd-callout bd-callout-warning">
<h4>Ivy</h4>
Ivy is a secure computing environment for researchers consisting of virtual machines (Linux and Windows), Domino Data Lab, and the Hadoop/Spark MapReduce environment.
Researchers can use Ivy to process and store sensitive data with the confidence that the environment is secure and meets HIPAA requirements.
</div>

# Overview

Ivy consists of three separate computing environments. Access to one environment does not automatically grant access to the others:

* [Virtual Machines](#virtual-machines)
* [Domino Data Lab](#domino-data-lab)
* [Hadoop](#hadoop)

- - -

# Requesting Access

Access to Ivy resources is project-based, limited to PIs and their designees, and requires approval. Costs for Ivy resources and storage must be funded by the PI.
Once a project is approved a PI and her/his researchers must sign a RUDA (one for every researcher on each project).

[<button class="btn btn-success">Request Access</button>](https://dev.cadre.virginia.edu/)

- - -

# Connecting and Signing In

## <span class="badge badge-default">1</span> Authentication

<div class="feature-box">

<p>You will sign in to all Ivy resources using your UVA computing ID and Eservices password. Because of Ivy's high security requirements, your Eservices password must be changed every 60 days.</p>

<p>Need help resetting your Eservices password?</p>

<a href="http://its.virginia.edu/accounts/wizard.html" target="_new"><button class="btn btn-sm btn-warning">Reset Password</button></a>

If you are working from a secure Health Systems workstation you are ready to connect. You need an Identity Token and JointVPN connection as described in the following if you are outside of the secure HS network.

</div>

## <span class="badge badge-default">2</span> Identity Token

<div class="feature-box">

<p>To connect to the Ivy environment with VPN you will need a physical USB identity token, issued to you by the <b><a href="http://www.virginia.edu/ispro/ispa/accessmanagement/" target="_new">ISPRO Access Management Office</a></b>. Tokens must be requested, approved, and may take 
from 1-2 weeks for delivery. You must pick up and activate your token in person, with proof of identification. Your token will have its own password in order to be used. </p>

<ul>
<li><a href="http://its.virginia.edu/identity/token/" target="_new">Read general information about identity tokens at UVA</a>.
<li>You should work with your LSP to submit a token request for you.
</ul>

<a href="http://its.virginia.edu/identity/token/distribution.html" target="_new"><button class="btn btn-sm btn-warning">Request a UVA Identity Token</button></a>

</div>

## <span class="badge badge-default">3</span> Joint VPN

<div class="feature-box">

<p>With your UVA computing ID, Eservices password, and USB identity token in hand, you must run the Cisco AnyConnect software to start a JointVPN connection every time you use any Ivy resource. AnyConnect
will authenticate to the UVA network using a digital certificate installed on your workstation. </p>

<p>More information on VPN from ITS:</p>

<ul>
<li><a href="http://its.virginia.edu/network/vpn/" target="_new">General VPN connection instructions</a>.
<li><a href="http://itc.virginia.edu/identity/certificate/" target="_new">How to create, install, and use digital certificates</a>..
</ul>

<a href="http://its.virginia.edu/vpn/" target="_new"><button class="btn btn-sm btn-warning">AnyConnect VPN Instructions</button></a>

</div>

- - -

# Virtual Machines

A virtual machine (VM) is a computing instance dedicated to your project. Multiple users can sign into a single VM.

Virtual machines come in two platforms, CentOS7 Linux and Windows Server 2012R2. Each platform is available in three instance types. Refer to the grid below for specifics.

<table class="table table-sm" style="width:50%;border:solid 1px #ccc;margin-left:4rem;">
  <thead class="thead-inverse">
    <tr>
      <th>Type</th>
      <th>CPU</th>
      <th>Memory</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Small</td>
      <td>2 cores</td>
      <td>4GB</td>
    </tr>
    <tr>
      <td>Medium</td>
      <td>8 cores</td>
      <td>16GB</td>
    </tr>
    <tr>
      <td>Large</td>
      <td>16 cores</td>
      <td>64GB</td>
    </tr>
  </tbody>
</table>

Once created, your instance will be assigned a private IP address that you will use to connect to it (in the format `10.xx.xx.xx`). VMs exist in a private, secure network and cannot
reach outside resources on the Internet. Most inbound and outbound data transfer is managed through the Data Transfer Node (see below). 

## Connecting to your VM

To connect to your VM, you must install either an SSH client to connect to your VM using the command-line interface (CentOS VMs only), or 
remote desktop software to connect to the desktop GUI of your VM. These options are outlined below.

**MacOSX Users:**

* Terminal (for SSH, built-in. Can be found in Applications -> Utilities -> Terminal)
* x2goclient (for remote desktop to CentOS VMs, [download here](http://wiki.x2go.org/doku.php/download:start))
* Other RDP clients (for remote desktop to Windows VMs, [download here](https://itunes.apple.com/us/app/microsoft-remote-desktop/id715768417?mt=12))

**Windows Users:**

* PuTTy (for SSH, [download here](http://www.chiark.greenend.org.uk/~sgtatham/putty/))
* x2goclient (for remote desktop to CentOS VMs, [download here](http://wiki.x2go.org/doku.php/download:start))
* Microsoft Remote Desktop (built-in)

**Linux Users:**

* Terminal / Command (for SSH, built-in)
* x2goclient (for remote desktop to CentOS VMs, [download here](http://wiki.x2go.org/doku.php/download:start))
* Other remote desktop clients can be used (for Windows VMs)

To connect to Ivy follow the platform-specific steps below:

<div class="row" style="margin-bottom:2rem;">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>CentOS 7 Linux</b>
      </div>
      <div class="card-block">
        <ul>
          <li>Open your JointVPN connection</li>
          <li>Reference the IP address of your Ivy VM.</li>
          <li>For SSH access:<br />&nbsp;&nbsp;<code>ssh uva-id@ip-address</code></li>
          <li>For Remote Desktop access: Start the x2goclient to the IP address of your VM and sign in.</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>Windows</b>
      </div>
      <div class="card-block">
        <ul>
          <li>Open your JointVPN connection</li>
          <li>Reference the IP address of your Ivy VM.</li>
          <li>For Remote Desktop access: Start an RDP client to the IP address of your VM and sign in.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

 
## Software

Every virtual machine (Linux or Windows) comes with a base installation of software by default. These help researchers by
providing the basic tools for data processing and manipulation. Additional software packages are pre-approved and available for installation
upon request. See the lists below for options.

If you require additional software not listed, you must submit a request. Requests are reviewed by the UVA ISPRO office for security
and regulatory compliance and, if approved, will be installed for you.

**Please note** that Anaconda Python and R packages are already available to users through the normal CRAN and Anaconda library installation methods.

<div class="row" style="margin-bottom:2rem;">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>PREINSTALLED Linux Software</b>
      </div>
      <div class="card-block">
        <p class="card-text">
          <ul>
            <li>R 3.2.3</li>
            <li>Perl 5.10</li>
            <li><a href="https://somrc.virginia.edu/userinfo/reference/anaconda/">Anaconda Python 2</a></li>
            <li><a href="https://somrc.virginia.edu/userinfo/reference/anaconda/">Anaconda Python 3</a></li>
            <li>Java SDK+JRE 1.8</li>
            <li>KNIME 2.11.3</li>
            <li>X2GO Server</li>
            <li>BioPerl 1.6</li>
            <li>Bowtie2 2.2.6</li>
            <li>Cufflinks 2.2.1</li>
            <li>Rodeo 1.1.21</li>
            <li>LibreOffice 4.2.8.2-11</li>
          </ul>
        </p>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>PREINSTALLED Windows Software</b>
      </div>
      <div class="card-block">
        <p class="card-text">
          <ul>
            <li>R 3.2.3</li>
            <li>Strawberry Perl 5.22.1.2</li>
            <li><a href="https://somrc.virginia.edu/userinfo/reference/anaconda/">Anaconda Python 2</a></li>
            <li><a href="https://somrc.virginia.edu/userinfo/reference/anaconda/">Anaconda Python 3</a></li>
            <li>Java SDK+JRE 1.8</li>
            <li>Axiovision 4.9.1</li>
            <li>ImageJ 1.49</li>
            <li>KNIME 2.11.3</li>
            <li>X2GO Client</li>
            <li>BioPerl 1.6</li>
            <li>Rodeo 1.1.21</li>
            <li>SumatraPDF 3.1.1</li>
            <li>Microsoft Office Professional Plus 2016</li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</div>
<div class="row" style="margin-bottom:2rem;">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>ADDITIONAL Linux Software</b>
      </div>
      <div class="card-block">
        <p class="card-text">
          <ul>
            <li>MATLAB</li>
            <li>SAS Teaching & Research</li>
            <li>SAS Admin</li>
            <li>IDL</li>
            <li>Stata IC/SE/MP</li>
            <li>OpenCV 2.x</li>
            <li>OpenCV 3.x</li>
            <li>PyCharm Community Edition</li>
            <li>MySQL (+Server)</li>
            <li>Apache</li>
          </ul>
        </p>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>ADDITIONAL Windows Software</b>
      </div>
      <div class="card-block">
        <p class="card-text">
          <ul>
            <li>MATLAB</li>
            <li>SAS Teaching & Research</li>
            <li>SAS Admin</li>
            <li>IDL</li>
            <li>SPSS Teaching & Research</li>
            <li>SPSS Admin</li>
            <li>Stata IC/SE/MP</li>
            <li>OpenCV 2.x</li>
            <li>OpenCV 3.x</li>
            <li>PyCharm Community Edition</li>
            <li>MySQL (+Server)</li>
            <li>Apache</li>
          </ul>
        </p>
      </div>
    </div>
  </div>
</div>

## Storage

Ivy VM has a pool of over 2 petabytes of Network Attached Storage shared amongst users. A PI specifies the storage space he’d like to have when requesting access to Ivy. Virtual machines do not come with disk storage of their own.  

- - -

# Domino Data Lab

<img src="https://somrc.virginia.edu/images/domino-data-lab.png" align="right" style="max-width:25%;" /> Domino Data Lab (DDL) provides a central environment for data science projects including project management, collaboration with team members, and setting up hardware configuration for a project.  

## Access

DDL is entirely browser-based and does not require any setup on your workstation. Once connected via JointVPN, point your browser to:

    https://domino.hpc.virginia.edu/

You will be prompted for Domino login credentials, which correspond to your UVa computing ID and Eservices password. Please remember that in order to maintain access to any platform on Ivy (including DDL), you will need to change your Eservices password every 60 days. 

## Storage

Each DDL node comes with 500 gigabytes of storage. Central storage is not visible to DDL nodes.  

## Features

### Project Structure

DDL is organized into projects, which automatically provision a folder hierarchy to store your code, data, and output. Individuals are able to create new projects, and can also invite other Ivy DDL users to collaboratively view, edit, or run files in an existing project. 

Collaborators can "fork" (copy the contents of) projects, leave comments, and use built-in version control utilities to store / revert changes to files as necessary.

### Uploading Files

To upload a script, dataset or other file, users can navigate to a project and select the "files" menu item. DDL includes a drag-and-drop interface for uploading files less than 550 MB.

<img class="img-fluid" src="/images/ivyddl_uploadfiles.png" alt="Uploading files via Domino Data Lab web interface" align="center">

### Running code

The DDL platform allows users to run Python and R scripts. To issue a run, navigate to the file you would like to execute and click `Run`. Alternatively you can can use the `Runs` window to start a run by entering the filename. Note that if code is associated with data, it should be written relative to the location of that dataset in the project directory. 

### Scheduling Jobs

### Using Notebook Sessions

### Selecting Hardware Tiers

### Using the Command Line Interface (CLI)

### Installing Packages

## Troubleshooting 

### Uploading Large files (> 550 MB)

### Resolving Resource Usage Issues

<img class="img-fluid" src="/images/ivyddl_resourceusage.png" alt="Resource usage on Domino Data Lab session" align="center">

### Updating Existing Packages

## Learn More

* [View upcoming in-person DDL training sessions](/education/workshops/)
* [Explore a Demo Version of DDL](https://trial.dominodatalab.com/u/domino/kaggle-titanic-solutions#console)
* [Data science resources from DDL](https://www.dominodatalab.com/resources)
* Watch a walkthrough of the main features of DDL:

<video width="730" height="460" controls>
  <source src="https://s3.amazonaws.com/uvasom-assets/video/product_tour_trimmed.mp4" type="video/mp4">
</video>



- - -

# Hadoop

Ivy Hadoop is an environment for distributed map/reduce computational analyses for Big Data applications.  

## Access

Access to Ivy Hadoop is through the Hue web interface.  

## Software

The platform comes with Spark, Hive, Impala, Pig, ZooKeeper, and Oozie. 


## Storage

Ivy Hadoop has 480 terabytes of HDFS storage shared amongst users. Each Hadoop node has 500 gigabytes of disk storage. Data can be uploaded through the Hue web interface. 

- - -

# Data Transfer In/Out of Ivy

Moving your data in and out of Ivy requires that it move through the [Data Transfer Node (DTN)](https://ivyxfer.hpc.virginia.edu). This node has 100TB of storage and a web interface for you to move your data.

- - -

# HIPAA Compliance

The entire Ivy platform is HIPAA compliant by default. 
