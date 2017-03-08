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
Ivy is a secure computing environment for researchers consisting of virtual machines (Linux and Windows), Domino Data Lab, and the Hadoop/Spark mapreduce environment.
Researchers with sensitive data can use Ivy to process and store that data with the confidence that th environment is secure and meets HIPAA requirements.
</div>

# Overview

Ivy consists of three separate computing environments. Access to one environment does not automatically grant access to the others:

* [Virtual Machines](#virtual-machines)
* [Domino Data Lab](#domino-data-lab)
* [MapReduce](#mapreduce)

- - -

# Requesting Access

Access to Ivy resources is project-based, limited to PIs and their designees, and must be approved by xxxxxxx. Costs for Ivy resources and storage must be funded by the PI.
Once a project is approved a PI and her/his researchers must sign a RUDA (one for every researcher, for each project).

[<button class="btn btn-success">Request Access</button>](https://dev.cadre.virginia.edu/)

- - -

# Connecting and Signing In

## <span class="badge badge-default">1</span> Authentication

<div class="feature-box">

<p>You will sign in to all Ivy resources using your UVA computing ID and Eservices password. Because of Ivy's high security requirements, your Eservices password must be changed every 60 days.</p>

<p>Need help resetting your Eservices password?</p>

<a href="http://its.virginia.edu/accounts/wizard.html" target="_new"><button class="btn btn-sm btn-warning">Reset Password</button></a>

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
reach outside resources on the Internet. 

## Connecting to your VM

To connect to your VM, you will need the right software. You must install either an SSH client to connect to your VM via the command-line (CentOS VMs only), or 
remote desktop software to connect to the desktop GUI of your VM.

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

For connecting follow the platform-specific steps below:

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

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

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

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.

## Storage

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.

- - -

# Domino Data Lab

<img src="https://somrc.virginia.edu/images/domino-data-lab.png" align="right" style="max-width:25%;" />Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

## Run R and Python on DDL

## Accessing DDL

DDL is entirely browser-based and does not require any setup on your workstation. Once connected via JointVPN, point your browser to

    https://domino.hpc.virginia.edu/

<a href="https://domino.hpc.virginia.edu/" target="_new"><button class="btn btn-sm btn-danger">Connect to DDL</button></a>

## Learn more about DDL

* [Explore a Demo Version of DDL](https://trial.dominodatalab.com/u/domino/kaggle-titanic-solutions#console)
* [Data science resources from DDL](https://www.dominodatalab.com/resources)
* Watch a walkthrough of the main features of DDL:

<video width="730" height="460" controls>
  <source src="https://s3.amazonaws.com/uvasom-assets/video/product_tour_trimmed.mp4" type="video/mp4">
</video>



- - -

# MapReduce

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

## Subtopic 1

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.

## Subtopic 2

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.

- - -

# Data Transfer In/Out of Ivy

Moving your data in and out of Ivy requires that it move through a Data Transfer Node (DTN). This node has 100TB of storage and a web interface for you to move your data.

- - -

# HIPAA Compliance

The entire Ivy platform is HIPAA compliant by default. 
