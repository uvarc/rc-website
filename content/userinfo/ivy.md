+++
description = ""
title = "Ivy Secure Environment"
draft = false
date = "2019-11-14T17:45:12-05:00"
tags = ["ivy","vm","hipaa","linux","windows","security","jupyter","infrastructure"]
categories = ["userinfo"]
images = [""]
author = "RC Staff"  

+++

{{% callout %}}
<h4>Ivy</h4>

<p>Ivy is a secure computing environment for researchers consisting of virtual machines (Linux and Windows) and Jupyter Notebooks.
Researchers can use Ivy to process and store sensitive data with the confidence that the environment is secure and meets <a href="#hipaa-compliance">HIPAA requirements</a>.</p>

{{% /callout %}}

# Overview

Ivy consists of two separate computing environments. Access to one environment does not automatically grant access to the others:

* [Virtual Machines](#virtual-machines)
* [JupyterLab Notebooks](#jupyterlab-notebooks) - Coming Soon!
* [Data Transfer In/Out of Ivy](#data-transfer-in-out-of-ivy)
* [HIPAA Compliance](#hipaa-compliance)
* [Coming Soon - Secure HPC](#coming-soon-secure-hpc)

- - -

# Requesting Access

University of Virginia tenure stream and academic general faculty, research faculty, research scientists, and postdoctoral associates may request an account on Ivy. UVA graduate and undergraduate students are not permitted to request accounts—this must be done by their faculty advisor(s).

Access to Ivy resources is project-based, limited to PIs and their designees, and requires approval. Once a project is approved a PI and her/his researchers must sign a RUDA (one for every researcher on each project).

[<button class="btn btn-success">Request an Ivy Account</button>](https://services.rc.virginia.edu/ivyvm)

- - -

# Pricing

Ivy resources will be provided without a fee for approved projects. Please note that the pricing model is still under evaluation. A valid PTAO is required as part of the account request process, although no charges will be made without advanced notice to the PI.

{{< ivy-pricing >}}

- - -

# Connecting and Signing In

## <span class="badge badge-default">1</span> Authentication

<div class="feature-box box">
  <p>You will sign in to all Ivy resources using your UVA computing ID and Eservices password. Because of Ivy's high security requirements, <b>your Eservices password must be changed every 60 days.</b></p>
  <p>Need help resetting your Eservices password?</p>
  <p><a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=2f47ff87dbf6c744f032f1f51d961967" target="_new"><button class="btn btn-sm btn-warning">Reset Your Password</button></a></p>
  <p>If you are working from a secure Health Systems workstation you are ready to connect. If you are working from elsewhere on or off Grounds you will need Duo MFA and a High Security VPN connection.</p>
  </div>

## <span class="badge badge-default">2</span> Duo MFA

<div class="feature-box box">
  <div class="ribbon ribbon-top-right"><span>Updated!</span></div>
  <img style="float:right;max-width:30%;" src="/images/duo-auth.png" alt="Duo 2-Factor Authentication" />
  <p>To connect to the Ivy environment with VPN you will need to install the Duo Mobile multi-factor authentication (MFA) app on your smartphone.</p> 
  <ul>
    <li><a href="https://apps.apple.com/us/app/duo-mobile/id422663827" target="_new">Get Duo for iPhone in the App Store</a></li>
    <li><a href="https://play.google.com/store/apps/details?id=com.duosecurity.duomobile&hl=en_US" target="_new">Get Duo for Android on Google Play</a></li>
  </ul>
  <p>In the context of Ivy, Duo allows you two ways to provide a second factor of authentication beyond your password: via a random 6-digit key, or via a push message direct to your phone.</p>
  <a href="https://virginia.service-now.com/its?id=kb_article&sys_id=3c95c8d0dbc06f00f032f1f51d96191a" target="_new"><button class="btn btn-sm btn-warning">Set Up Duo</button></a>
</div>

## <span class="badge badge-default">3</span> High Security VPN

<div class="feature-box box">
  <div class="ribbon ribbon-top-right"><span>Updated!</span></div>
  <p>With your UVA computing ID, Eservices password, and Duo Mobile in hand, you must run the Cisco AnyConnect software to start a UVA High Security VPN connection every time you use any Ivy resource. AnyConnect will authenticate to the UVA network using a digital certificate installed on your workstation. </p>
  <p>More information on VPN from ITS:</p>
  <ul>
    <li><a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=9a5c088c6f59ee400a017f512e3ee4e2" target="_new">High Security VPN installation and connection instructions</a>.
    <li><a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=58aafbcfdbf6c744f032f1f51d961927" target="_new">How to create, install, and use digital certificates</a>.
  </ul>
  <a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0" target="_new"><button class="btn btn-sm btn-warning">Learn More about UVA VPN</button></a>
</div>

Once you have completed these three steps, you will be connected to the secure Ivy network. From there you can connect to a Virtual Machine, or use a web browser to access JupyterHub.

- - -

# Virtual Machines

A virtual machine (VM) is a computing instance dedicated to your project. Multiple users can sign into a single VM.

Virtual machines come in two platforms, CentOS7 Linux and Windows Server 2012R2. Each platform is available in three instance types. Refer to the grid below for specifics.

{{< ivy-pricing >}}

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
          <li>Open your High Security VPN connection</li>
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
          <li>Open your High Security VPN connection</li>
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
            <li><a href="/userinfo/ivy-win-sw/r" style="color: #0275d8;">R 3.2.3</a></li>
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

# JupyterLab Notebooks

<div class="alert alert-danger">
  As of August 31, 2019 Domino Data Lab will no longer be available within Ivy. Existing projects should be migrated to a virtual machine.
  Interactive data sessions will be available using Jupyter Notebooks (coming soon!)
</div>

{{% callout %}}
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/1200px-Jupyter_logo.svg.png" align="right" style="max-width:20%;" />
JupyterLab is a web-based interactive development environment for Jupyter notebooks, code, and data. JupyterLab is flexible: configure and arrange the user interface to support a wide range of workflows in data science, scientific computing, and machine learning. JupyterLab is extensible and modular: write plugins that add new components and integrate with existing ones.
<br clear=all />
[<button class="btn btn-success">Learn more about Jupyter</button>](https://jupyter.org/)
{{% /callout %}}

- - -

# Data Transfer In/Out of Ivy

Moving sensitive data into the Ivy VMware platform is possible through a secure Globus DTN (data transfer node). The Ivy DTN is connected to a pool of secure storage called “Ivy Central Storage” (ICS), which in turn is connected to Ivy VMs. Only active research projects using Ivy virtual machines can use this service.

<img style="max-width:100%;" alt="Ivy Secure DTN Flow" src="https://uvarc-discourse.s3.amazonaws.com/original/1X/95f8dfa70374a538d3e940dc69cf960d9e5ac9a6.png" />

## Learn More

[<button class="btn btn-success">Read more about using Globus</button>](/userinfo/globus/)
 &nbsp; [<button class="btn btn-success">Read more about the Ivy Secure DTN</button>](https://discuss.rc.virginia.edu/t/ivy-secure-dtn-transfer-sensitive-data/771)

- - -

# HIPAA Compliance

The Ivy platform is HIPAA compliant by design. From the <a href="https://research.virginia.edu/irb-hsr/protected-health-information-hipaa-regulations-and-research" target="_new">UVA Institutional Review Board for Health Sciences Research</a> (IRB-HSR):

<div class="bd-callout bd-callout-warning">
<p>HIPAA affects only that research which uses, creates, or discloses PHI. Researchers have legitimate needs to use, access, and disclose PHI to carry out a wide range of health research studies.</p>
<p>The Privacy Rule protects PHI while providing ways for researchers to access and use PHI when necessary to conduct research.</p>
<p>In general, there are two types of human research that would involve PHI:</p>

<ul>
<li>Studies involving review of existing medical records as a source of research information. Retrospective studies, such as chart reviews, often do this. Sometimes prospective studies do it also, for example, when they contact a participant's physician to obtain or verify some aspect of the participant's health history.
<li>Studies that create new medical information because a health care service is being performed as part of the research, such as testing of a new way of diagnosing a health condition or a new drug or device for treating a health condition. Virtually all sponsored clinical trials that submit data to the U.S. Food and Drug Administration (FDA) will involve PHI.
</ul>

</div>

Researchers must understand that, in general, the more difficult parts of HIPAA compliance are less technical (networks, computers, and data) than they are human and how users interact with these systems and data. The mishandling of data -- such as storing them on insecure devices or in insecure places -- jeopardizes confidential patient data and UVA's ability to remain a trusted keeper of those data.

All data imported into Ivy must be treated as highly sensitive data. Data and results exported from Ivy must be protected and managed appropriately according to UVA's [data classification guidelines](https://security.virginia.edu/university-data-protection-standards). Guidance regarding these guidelines and data types is available from UVA Information Security, Policy, and Records Office (ISPRO) by emailing it-security@virginia.edu.

<button onclick="topFunction()" id="scrollBtn" title="Go to top"><i class="fas fa-2x fa-angle-double-up"></i></button>


<!--

# Coming Soon - Secure HPC

<img src="https://pbs.twimg.com/media/DRQcamFX0AA9tmU.jpg" style="float:right;max-width:40%;" />

In 2019 we will launch a secure high performance computing system. This will support computationally-intensive research for sensitive data, within the Ivy secure environment.

-->

<br clear=all />
