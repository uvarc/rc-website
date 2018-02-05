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

<script>
 var compute_prices = new Array();
 compute_prices["small"]=1594;
 compute_prices["medium"]=3209;
 compute_prices["large"]=8156;
	 
function getComputePrice()
{  
    var computePrice=0;
    var theForm = document.forms["vmcalc"];
    var selectedTier = theForm.elements["selectedtier"];

    for(var i = 0; i < selectedTier.length; i++)
    {
        if(selectedTier[i].checked)
        {
            computePrice = compute_prices[selectedTier[i].value];
            
            break;
        }
    }

    return computePrice;
}


function getStoragePrice()
{
    var storagePrice=0;

    var theForm = document.forms["vmcalc"];
    var selectedStorage = theForm.elements["storageamount"]; 
	storagePrice = selectedStorage.value*360;
    return storagePrice;
}


function calculateTotal()
{

    var totalPrice = getComputePrice() + getStoragePrice();
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='block';
    divobj.innerHTML = "Estimated cost for VM is $"+totalPrice+" per year";

}

function hideTotal()
{
    var divobj = document.getElementById('totalPrice');
    divobj.style.display='none';
}
</script>

<div class="bd-callout bd-callout-warning">
<h4>Ivy</h4>
Ivy is a secure computing environment for researchers consisting of virtual machines (Linux and Windows), Domino Data Lab, and the Apache Spark environment.
Researchers can use Ivy to process and store sensitive data with the confidence that the environment is secure and meets HIPAA requirements.
</div>

# Overview

Ivy consists of three separate computing environments. Access to one environment does not automatically grant access to the others:

* [Virtual Machines](#virtual-machines)
* [Domino Data Lab](#domino-data-lab)
* [Apache Spark](#apache-spark)

- - -

# Requesting Access

Access to Ivy resources is project-based, limited to PIs and their designees, and requires approval. Once a project is approved a PI and her/his researchers must sign a RUDA (one for every researcher on each project).

[<button class="btn btn-success">Request an Ivy Account</button>](https://cadre.virginia.edu/node/add/account-request)

- - -

# Pricing

Ivy resources will be provided without a fee for approved projects. Please note that the pricing model is still under evaluation. A valid PTAO is required as part of the account request process, although no charges will be made without advanced notice to the PI.

# Connecting and Signing In

## <span class="badge badge-default">1</span> Authentication

<div class="feature-box">

<p>You will sign in to all Ivy resources using your UVA computing ID and Eservices password. Because of Ivy's high security requirements, your Eservices password must be changed every 60 days.</p>

<p>Need help resetting your Eservices password?</p>

<a href="http://its.virginia.edu/accounts/wizard.html" target="_new"><button class="btn btn-sm btn-warning">Reset Your Password</button></a>

If you are working from a secure Health Systems workstation you are ready to connect. You need an Identity Token and JointVPN connection as described in the following if you are outside of the secure HS network.

</div>

## <span class="badge badge-default">2</span> Identity Token

<div class="feature-box">

<p>To connect to the Ivy environment with VPN you will need a physical USB identity token, issued to you by the <b><a href="https://security.virginia.edu/access" target="_new">ISPRO Access Management Office</a></b>. Tokens must be requested, approved, and may take 
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
      <td>4 cores</td>
      <td>16GB</td>
    </tr>
    <tr>
      <td>Medium</td>
      <td>8 cores</td>
      <td>32GB</td>
    </tr>
    <tr>
      <td>Large</td>
      <td>16 cores</td>
      <td>128GB</td>
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

**Python/R Packages** - Anaconda Python and R packages are available to users through the normal `pip`, `conda`, and `CRAN` and library installation methods.

<div class="row" style="margin-bottom:2rem;">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>PREINSTALLED Linux Software</b>
      </div>
      <div class="card-block">
        <i>Click on each for details:</i>
        <p class="card-text">
            <li><a href="/userinfo/ivy-linux-sw/r" style="color: #0275d8;">R 3.2.3</a></li>
            <li><a href="/userinfo/ivy-linux-sw/perl" style="color: #0275d8;">Perl 5.10</a></li>
            <li><a href="/userinfo/ivy-linux-sw/anaconda" style="color: #0275d8;">Anaconda Python 2 and 3</a></li>
            <li><a href="/userinfo/ivy-linux-sw/java-sdk-jre" style="color: #0275d8;">Java SDK+JRE 1.8</a></li>
            <li><a href="/userinfo/ivy-linux-sw/rodeo" style="color: #0275d8;">Rodeo 2.5</a></li>
            <li><a href="/userinfo/ivy-linux-sw/libre-office" style="color: #0275d8;">LibreOffice 5</a></li>
          
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
        <i>Click on each for details:</i>
        <p class="card-text">
          <ul>
            <li><a href="/userinfo/ivy-win-sw/rstudio" style="color: #0275d8;">R 3.2.3</a></li>
            <li><a href="/userinfo/ivy-win-sw/strawberry-perl" style="color: #0275d8;">Strawberry Perl 5.24</a></li>
            <li><a href="/userinfo/ivy-win-sw/anaconda" style="color: #0275d8;">Anaconda Python 2 and 3</a></li>
            <li><a href="/userinfo/ivy-win-sw/java-sdk-jre" style="color: #0275d8;">Java SDK+JRE 1.8</a></li>
            <li><a href="/userinfo/ivy-win-sw/rodeo" style="color: #0275d8;">Rodeo 1.3</a></li>
            <li><a href="/userinfo/ivy-win-sw/sumatra-pdf" style="color: #0275d8;">SumatraPDF 3.1.1</a></li>
            <li><a href="/userinfo/ivy-win-sw/ms-office" style="color: #0275d8;">Microsoft Office Professional Plus 2016</a></li>
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
        <b>ADDITIONAL Linux Groups</b>
      </div>
      <div class="card-block">
        <i>Click on each for details:</i>
        <p class="card-text">
          <ul>
            <li><a href="/userinfo/ivy-linux-sw/bioinformatics/sw-list" style="color: #0275d8;">Bioinformatics</a></li>
            <li>Data Analysis</li>
            <li>Data / Database</li>	
            <li><a href="/userinfo/ivy-linux-sw/image-processing" style="color: #0275d8;">Image Processing</a></li>
          </ul>
        </p>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>ADDITIONAL Windows Groups</b>
      </div>
      <div class="card-block">
        <i>Click on each for details:</i>
        <p class="card-text">
          <ul>
            <li><a href="/userinfo/ivy-win-sw/bioinformatics/sw-list" style="color: #0275d8;">Bioinformatics</a></li>
            <li>Data Analysis</li>
            <li>Data / Database</li>
            <li><a href="/userinfo/ivy-win-sw/image-processing" style="color: #0275d8;">Image Processing</a></li>
<!--             <li>[<a href="https://s3.amazonaws.com/uvasom-resources/ivy/ivy-package-groups.pdf">See packages by group</a>]</li>
 -->          </ul>
        </p>
      </div>
    </div>
  </div>
</div>


## Storage

Ivy VM has a pool of over 2 petabytes of Network Attached Storage shared amongst users. A PI specifies the storage space s/he would like to have when requesting access to Ivy. Virtual machines do not come with any significant disk storage of their own.  

## Learn More

[<button class="btn btn-success">Read more about Ivy Virtual Machines</button>](https://discuss.rc.virginia.edu/c/ivy/vm)

- - -

# Domino Data Lab

<img src="https://somrc.virginia.edu/images/domino-data-lab.png" align="right" style="max-width:25%;" /> [Domino Data Lab (DDL)](https://www.dominodatalab.com/) provides a central environment for data science projects including project management, collaboration with team members, and setting up hardware configuration for a project.  

## Access

DDL is entirely browser-based and does not require any setup on your workstation. Once connected via JointVPN, point your browser to:

    https://domino.hpc.virginia.edu/

You will be prompted for Domino login credentials, which correspond to your UVa computing ID and Eservices password. Please remember that in order to maintain access to any platform on Ivy (including DDL), you will need to change your Eservices password every 60 days. 

## Storage

Each DDL project can accommodate up to 500 gigabytes of storage. Central storage is not visible to DDL. 

## Features

DDL is organized in a project structure, which is ideal for collaborative data analyses. Scripts written in Python and R can be edited, scheduled and run from within the web interface, both inside and outside of interactive notebook sessions (i.e. RStudio or Jupyter). 

For specifics about these features and more, refer to the [Ivy DDL User Guide](/userinfo/ivy-ddl/).

## Learn More

* [View upcoming in-person DDL training sessions](/education/workshops/)
* [Explore a Demo Version of DDL](https://trial.dominodatalab.com/u/domino/kaggle-titanic-solutions#console)
* [Data science resources from DDL](https://www.dominodatalab.com/resources)
* Watch a walkthrough of the main features of DDL:

<video width="730" height="460" controls>
  <source src="https://s3.amazonaws.com/uvasom-assets/video/product_tour_trimmed.mp4" type="video/mp4">
</video>


[<button class="btn btn-success">Read more about Ivy DDL</button>](https://discuss.rc.virginia.edu/c/ivy/ddl)

- - -

# Apache Spark

Ivy Spark is an environment for distributed map/reduce computational analyses for Big Data applications.  

## Access

The Apache Spark installation on Ivy is under active development. If you have questions about access to this recourse, please email ivy-support@virginia.edu with information about your use-case.

## Software

The platform comes with Cloudera Hadoop, Spark, YARN, Hive, Impala, Piig, ZooKeeper, and Oozie. 

## Storage

Ivy Spark has 480 terabytes of HDFS storage shared amongst users. Each node has 500 gigabytes of local disk storage. Data can be uploaded through the Hue web interface. 

- - -

# Data Transfer In/Out of Ivy

Moving your data in and out of Ivy requires that it move through the **Data Transfer Node (DTN)**. This server has 100TB of storage and can be accessed via a web interface as well as via SFTP, SCP, or FTPS in the command-line.

<img src="https://uvarc-discourse.s3.amazonaws.com/original/1X/408a13704cd919580a83065ea1e52da41c0cd653.png" />

## Learn More

[<button class="btn btn-success">Read more about the Ivy DTN</button>](https://discuss.rc.virginia.edu/t/about-the-ivy-data-transfer-node-dtn/123)

- - -

# HIPAA Compliance

The Ivy platform is HIPAA compliant by default.
