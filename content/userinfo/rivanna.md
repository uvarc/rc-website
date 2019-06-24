+++
description = ""
title = "Rivanna"
draft = false
date = "2019-05-28T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","supercomputer","allocations","queues","storage"]
categories = ["userinfo"]
images = [""]
author = "Staff"  

+++

<div class="bd-callout bd-callout-warning">
<h4>Rivanna</h4>
Rivanna is the University of Virginia's High-Performance Computing (HPC) system.  Rivanna is open to all faculty, research staff, and graduate students of the University.   All faculty and research staff are eligible for a standard free allocation.  Larger allocations may be requested through the College of Arts and Sciences, the School of Engineering and Applied Science, or the Data Science Institute.
</div>

# Summary

<div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" style="text-decoration:none;color:black;font-weight:bold;font-size:110%;">
          Hardware Configuration
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Queuing Policies
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">

Rivanna is a managed resource; users must submit jobs to queues controlled by a resource manager, also known as a queueing system.  The manager in use on Rivanna is SLURM.  SLURM refers to queues as partitions because they divide the machine into sets of resources.  There is no default partition and each job must request a specific partition.  Partitions and access policies are subject to change, but the following table shows the current structure.  Note that memory may be requested per core or for the overall job.  If the total memory required for the job is greater than the number of cores requested multiplied by the maximum memory per core, the job will be charged for the additional cores whether they are used or not.  In addition, jobs running on more than one core may still require a request of total memory rather than memory per core, since memory per core is enforced by the system but some multicore software packages (ANSYS, for example) may exceed that for a short time even though they never exceed cores x memory/core.

      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Storage Options
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>


# Connecting and Signing In

## <span class="badge badge-default">1</span> Authentication

<div class="feature-box">
<p>You will sign in to all Ivy resources using your UVA computing ID and Eservices password. Because of Ivy's high security requirements, your Eservices password must be changed every 60 days.</p>
<p>Need help resetting your Eservices password?</p>
<p><a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=2f47ff87dbf6c744f032f1f51d961967" target="_new"><button class="btn btn-sm btn-warning">Reset Your Password</button></a></p>
<p>If you are working from a secure Health Systems workstation you are ready to connect. You need an Identity Token and JointVPN connection as described in the following if you are outside of the secure HS network.</p>
</div>

## <span class="badge badge-default">2</span> Identity Token

<div class="feature-box">
<p>To connect to the Ivy environment with VPN you will need a physical USB identity token, issued to you by the <b><a href="https://security.virginia.edu/access" target="_new">ISPRO Access Management Office</a></b>. Tokens must be requested, approved, and may take 
from 1-2 weeks for delivery. You must pick up and activate your token in person, with proof of identification. Your token will have its own password in order to be used. </p>
<ul>
  <li><a href="https://virginia.service-now.com/its?id=kb_article&sys_id=21155845db49d7084f32fb671d9619bf" target="_new">Read general information about identity tokens at UVA</a>.
  <li>You may also work with your LSP to submit a token request for you.
</ul>
<a href="https://virginia.service-now.com/nav_to.do?uri=%2Fcom.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3Df73c300b13d9db40602dbcaf3244b0ec" target="_new"><button class="btn btn-sm btn-warning">Request a UVA Identity Token</button></a>
</div>

## <span class="badge badge-default">3</span> Joint VPN

<div class="feature-box">
<p>With your UVA computing ID, Eservices password, and USB identity token in hand, you must run the Cisco AnyConnect software to start a JointVPN connection every time you use any Ivy resource. AnyConnect
will authenticate to the UVA network using a digital certificate installed on your workstation. </p>
<p>More information on VPN from ITS:</p>
<ul>
  <li><a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0" target="_new">General VPN connection instructions</a>.
  <li><a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=58aafbcfdbf6c744f032f1f51d961927" target="_new">How to create, install, and use digital certificates</a>..
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
* Microsoft Remote Desktop (for remote desktop to Windows or CentOS VMs, [download here](https://itunes.apple.com/us/app/microsoft-remote-desktop/id715768417?mt=12))

**Windows Users:**

* PuTTy (for SSH, [download here](http://www.chiark.greenend.org.uk/~sgtatham/putty/))
* Microsoft Remote Desktop (built-in, for remote desktop to Windows or CentOS VMs)

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
          <li>For Remote Desktop access: Start the RDP client and point to the IP address of your VM and sign in.</li>
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
          <li>For Remote Desktop access: Start an RDP client and point to the IP address of your VM and sign in with your Eservices password and your computing ID prefixed by <em>ESERVICES</em> as the user name (i.e. <code>ESERVICES\mst3k</code>)</li>
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
            <li><a href="/userinfo/ivy-linux-sw/data-analysis/sw-list" style="color: #0275d8;">Data Analysis</a></li>
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
            <li><a href="/userinfo/ivy-win-sw/data-analysis/sw-list" style="color: #0275d8;">Data Analysis</a></li>
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

* [Data science resources from DDL](https://www.dominodatalab.com/resources)
* Watch a walkthrough of the main features of DDL:

<video width="730" height="460" controls>
  <source src="https://s3.amazonaws.com/uvasom-assets/video/product_tour_trimmed.mp4" type="video/mp4">
</video>


[<button class="btn btn-success">Read more about Ivy DDL</button>](https://discuss.rc.virginia.edu/c/ivy/ddl)

- - -

# Coming Soon - Secure HPC

<img src="https://pbs.twimg.com/media/DRQcamFX0AA9tmU.jpg" style="float:right;max-width:40%;" />

In 2019 we will launch a secure high performance computing system. This will support computationally-intensive research for sensitive data, within the Ivy secure environment.

<br clear=all />
