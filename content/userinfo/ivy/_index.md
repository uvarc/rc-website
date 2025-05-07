+++
description = ""
title = "Ivy and Rio Secure Environment"
draft = false
date = "2025-01-15T11:45:12-05:00"
tags = ["ivy","vm","hipaa","linux","windows","security","jupyter","infrastructure"]
categories = ["userinfo"]
images = [""]
author = "RC Staff"  
aliases = [ "/ivy" ]
layout = "single"
BookToC = 2
+++



![Ivy Secure Computing](https://img.shields.io/badge/dynamic/json?color=color&label=Ivy&query=message&url=https%3A%2F%2Ftja4lfp3da.execute-api.us-east-1.amazonaws.com%2Fapi%2Fbadge%2Fivy&style=for-the-badge)

<p class=lead>The UVA secure environment consists of Ivy virtual machines (Linux and Windows) and Rio HPC. Researchers can use Ivy and Rio to process and store sensitive data with the confidence that the environment is secure and meets requirements for HIPAA, FERPA, and certain controlled-access data (e.g. dbGaP, NIMH NDA, etc.). However, projects involving CUI or ITAR data cannot access Rio at this time. To access the High security Rio HPC, researchers need to request an Ivy Linux VM which serves as a login node.</p>

{{< systems-boilerplate >}}

# Overview

Ivy provides virtual computing environments (virtual machines) specifically designed for interactive and small-scale analysis of highly sensitive data. Ivy Linux VMs can also act as a frontend for accessing the Rio HPC environment, which is optimized for large-scale analysis of sensitive data. Project-specific storage volumes are seamlessly mounted to the VMs and made accessible on the HPC system, facilitating smooth transitions between tasks performed on the VM and the HPC environment. In order to obtain access to either system, users must 

1. **Submit an account request,**
2. **Complete the Information Security Awareness Training, and**
3. **Ensure their personal computer meets all High Security VPN requirements.**

* [Requesting Access](#requesting-access)
* [Security Training](#training)
* [High Security VPN](#high-security-vpn)
* [Storage](#storage)
* [Virtual Machines](#virtual-machines)
* [Using the Rio HPC System](#using-the-rio-hpc-system)
* [Data Transfer In/Out of Ivy](#data-transfer-in-out-of-ivy)
<!-- * [HIPAA Compliance](#hipaa-compliance)-->

- - -

# Requesting Access

<!-- University of Virginia tenure stream and academic general faculty, research faculty, research scientists, and postdoctoral associates may request an account on Ivy. UVA graduate and undergraduate students are not permitted to request accounts—this must be done by their faculty advisor(s). -->
{{% highlight %}}
  {{% pi-eligibility %}}
{{% /highlight %}}

Access to Ivy resources is project-based, limited to PIs and their designees, and requires approval. Once a project is approved a PI and her/his researchers must sign a RUDA (one for every researcher on each project).

[<button class="btn btn-success">Request an Ivy Account</button>](https://services.rc.virginia.edu/ivyvm)

- - -

# Security Training {#training}

In order to use Ivy, researchers must complete the High Security Awareness Training (HSAT). This training takes approximately 10 minutes to complete.

Please complete the training at the following link: <a href="https://in.virginia.edu/hsat-training" target="_blank">https://in.virginia.edu/hsat-training</a>.

- - -

# High Security VPN

The High Security VPN (HSVPN) allows researchers to connect to Ivy securely both on and off grounds. In order to use the HSVPN, users must ensure that their personal machines meet the following requirements. More information on HSVPN compliance can be found on the ITS website: <a href="https://in.virginia.edu/vpncheck" target="_blank">https://in.virginia.edu/vpncheck</a>

1. **Install the Cisco AnyConnect Secure Mobility Client.**
    This can be found at the <a href="https://virginia.service-now.com/its?id=sg_catalog&sys_id=d66f4fd4db29274c2192e665059619d6&sysparm_category=06d7db5bdbfcab00cebc550a48961963" target="_blank">UVA ITS Software Gateway</a>. Be sure to install the version of VPN Client HS 4.6 that is compatible with your personal computer's operating system. More detailed instructions for installing the VPN client can be found on the <a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0" target="_blank">ITS website</a>.
    
2. **Install Opswat.**
    Opswat checks if your computer is compliant with HSVPN requirements. Opswat can be downloaded from the <a href="https://virginia.service-now.com/its?id=sg_catalog&sys_id=a2bf4d91db716f402192e665059619fa" target="_blank">UVA ITS Software Gateway</a>.

{{% callout %}}
If your personal machine's operating system is no longer supported and does not allow for disk encryption, having OPSWAT installed will not resolve the issue. The recommended solution is to upgrade the operating system or acquire a device with an updated OS that meets these security requirements.
{{% /callout %}}


3. **Install Anti-malware software (Windows Defender recommended)**.
    Anti-malware software must be installed on your machine. Windows Defender is behavioral-based antimalware software and meets UVA's HSVPN requirements. Windows Defender can be downloaded from the <a href="https://virginia.service-now.com/its/?id=itsweb_kb_article&sys_id=2bee0fd3dbc4a4d005fff49eae9619ee" target="_blank">UVA ITS Software Gateway</a>.
    

<!-- 
# Pricing

Ivy resources will be provided without a fee for approved projects. Please note that the pricing model is still under evaluation. A valid FDM is required as part of the account request process, although no charges will be made without advanced notice to the PI.

{{< ivy-pricing >}}
 -->

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
  <p>With your UVA computing ID, Eservices password, and Duo Mobile in hand, you must run the Cisco AnyConnect software to start a UVA High Security VPN connection every time you use any Ivy resource. AnyConnect will authenticate to the UVA network using a digital certificate installed on your workstation. </p>
  <p>More information on VPN from ITS:</p>
  <ul>
    <li><a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=9a5c088c6f59ee400a017f512e3ee4e2" target="_new">High Security VPN installation and connection instructions</a>.
    <li><a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=58aafbcfdbf6c744f032f1f51d961927" target="_new">How to create, install, and use digital certificates</a>.
  </ul>
  <a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0" target="_new"><button class="btn btn-sm btn-warning">Learn More about UVA VPN</button></a>
</div>

Once you have completed these three steps, you will be connected to the secure Ivy network. From there you can connect to a Virtual Machine, or use a web browser to access JupyterLab.

- - -

# Storage

Ivy VM and Rio HPC have a pool of over 2 petabytes of Network Attached Storage shared amongst users. A PI specifies the storage space s/he would like to have when requesting access to either of these environments. Virtual machines do not come with any significant disk storage of their own. 

# Virtual Machines

A virtual machine (VM) is a computing instance dedicated to your project. Multiple users can sign in to a single VM.

Virtual machines come in two platforms, *Rocky 8 Linux* and *Windows Server 2019*. Each platform is available in numerous instance types. Refer to the grid below for specifics.


{{< pricing ivy >}}

Once created, your instance will be assigned a private IP address that you will use to connect to it (in the format `10.xx.xx.xx`). VMs exist in a private, secure network and cannot
reach outside resources on the Internet. Most inbound and outbound data transfer is managed through the Data Transfer Node (see below).


## Connecting to your VM

**Before connecting to your VM, you must run the High Security VPN. Make sure that you have the VPN client installed on your laptop/desktop.**

Next, you will need to know two pieces of information:
* The **type of VM** that you have, either Windows or Linux;
* The **IP address** of your VM (e.g., 10.xxx.xxx.xxx).

The steps for connecting to the VM will depend on the type of VM and, to a lesser extent, the operating system of your laptop/desktop (i.e., MacOS or Windows).

To connect to a Windows VM from a **Mac**, you will need the Microsoft Remote Destop application which you can  [download here](https://apps.apple.com/us/app/microsoft-remote-desktop/id1295203466?mt=12) .  
Windows laptops/desktops already have the Remote Desktop Connection application installed.


**Steps to connect to your VM**

Follow the steps below for the **type of VM** that you have:


<div class="row" style="margin-bottom:2rem;">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>Connecting to a Windows VM</b>
      </div>
      <div class="card-block">
        <ul>
          <li> Start the High Security VPN
          <li> Run the Remote Desktop application (see comment above for installing this application on Macs)
          <li> Enter the IP address for your VM
          <li> Sign in with your Eservices password and your computing ID prefixed by <em>ESERVICES</em> as the username (i.e. <code>ESERVICES\mst3k</code>)</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>Connecting to a Linux VM</b>
      </div>
      <div class="card-block">
        <ul>
          <li> Start the High Security VPN
          <li> Open a web browser and enter the IP address for your VM (e.g., https://10.xxx.xxx.xxx) 
          <li> If you get a warning message, you may need to click on Advanced Settings and/or a Connent Anyway option, depending on your web browser
          <li> Use your Netbadge credentials to log in
        </ul>
      </div>
    </div>
  </div>
</div>

In addition to connecting to a Linux VM through a web browser, you have the option of connecting with an ssh client. To do this, follow these steps:

1. Start the High Security VPN
2. Open the ssh client on your laptop/desktop (Terminal application on a Mac or Command Prompt on a Windows PC) and type:  `ssh mst3k@10.xxx.xxx.xxx`, where mst3k is replaced with your user ID.
3. When prompted for a password, use your Eservices password.



## Software

Every virtual machine (Linux or Windows) comes with a base installation of software by default. These help researchers by providing the basic tools for data processing and manipulation. Additional software packages are pre-approved and available for installation upon request. See the lists below for options.

**Preinstalled Software**

{{< rawhtml >}}
<div class="row" style="margin-bottom:2rem;">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>PREINSTALLED Linux Software</b>
      </div>
      <div class="card-block">
        <i>Click on each for details:</i>
        <p class="card-text">
			{{% ivy-approved-software os="Linux" installation="preinstalled" category="all" %}}
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
			{{% ivy-approved-software os="Windows" installation="preinstalled" category="all" %}}
        </p>
      </div>
    </div>
  </div>
</div>
{{< /rawhtml >}}

**Python/R Packages** - Anaconda Python and R packages are available to users through the normal `pip`, `conda`, and `CRAN` and library installation methods.

### Additional Approved Software (Available by Request)

If you require additional software not listed, you must submit a request. Requests are reviewed by the UVA ISPRO office for security and regulatory compliance and, if approved, will be installed for you.


<div class="row" style="margin-bottom:2rem;">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>ADDITIONAL Linux Groups</b>
      </div>
      <div class="card-block">
        <i>Click on each for more information:</i>
        <p class="card-text">
          <ul>
            <li><a href="/userinfo/ivy/ivy-linux-sw" style="color: #0275d8;">All Packages</a></li>
            <li><a href="/userinfo/ivy/ivy-linux-sw/#bioinformatics" style="color: #0275d8;">Bioinformatics</a></li>
            <li><a href="/userinfo/ivy/ivy-linux-sw/#data-analysis" style="color: #0275d8;">Data Analysis</a></li>
            <li><a href="/userinfo/ivy/ivy-linux-sw/#database-software" style="color: #0275d8;">Database Software</a></li>
            <li><a href="/userinfo/ivy/ivy-linux-sw/#image-processing" style="color: #0275d8;">Image Processing</a></li>
          </ul>
        </p>
        <button type="button" class="btn btn-success" onclick="window.location.href='/userinfo/ivy/ivy-linux-sw';"">Software Details for Linux</button>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>ADDITIONAL Windows Groups</b>
      </div>
      <div class="card-block">
        <i>Click on each for more information:</i>
        <p class="card-text">
          <ul>
            <li><a href="/userinfo/ivy/ivy-windows-sw" style="color: #0275d8;">All Packages</a></li>
            <li><a href="/userinfo/ivy/ivy-windows-sw/#bioinformatics" style="color: #0275d8;">Bioinformatics</a></li>
            <li><a href="/userinfo/ivy/ivy-windows-sw/#data-analysis" style="color: #0275d8;">Data Analysis</a></li>
            <li><a href="/userinfo/ivy/ivy-windows-sw/#database-software" style="color: #0275d8;">Database Software</a></li>
            <li><a href="/userinfo/ivy/ivy-windows-sw/#image-processing" style="color: #0275d8;">Image Processing</a></li>
         </ul>
        </p>
        <button type="button" class="btn btn-success" onclick="window.location.href='/userinfo/ivy/ivy-windows-sw';"">Software Details for Windows</button>
      </div>
    </div>
  </div>
</div>

To request installation of optional software packages, please use the web request form provided through this link:

[<button class="btn btn-success">Request Ivy Software</button>](https://www.rc.virginia.edu/form/support-request)


## Installing Python Packages on Your VM

### Creating a Conda Environment

Researchers often require Python packages that are not included in the base installation of Anaconda. Users can install additional Python packages on their VMs using conda environments. Conda environments allows users to install packages in isolated environments to avoid version conflicts with other users on the VM.

#### Windows

1. Launch "Anaconda Prompt" from the Start Menu.

2. From the prompt, issue the command:

    `conda create -n my_env package1 package2`
    
    where `my_env` is the name you wish to give your new conda environment, and `package1` and `package2` are the names of the Python packages you want to install.
    
3. To activate and use your new environment, issue the command:

    `conda activate my_env`
    

#### Linux

1. Log into your VM via SSH or log in through your web browser and launch the Terminal.

2. From the prompt, issue the command:

    `conda create -n my_env package1 package2`
    
    where `my_env` is the name you wish to give your new conda environment, and `package1` and `package2` are the names of the Python packages you want to install.
    
3. To activate and use your new environment, issue the command:

    `conda activate my_env`
    
#### Creating a Conda Environment with a Specific Python Version

If you require a specific version of Python, you can create a new conda environment with:

`conda create -n my_env python=2.7`

### Installing Packages

After creating your conda environment, you can install additional libraries with `pip` and `conda`.

#### Installing Packages with `pip`

* Use `pip` from the command line to install individual packages:

    `pip install numpy`

* You can search for a package:

     `pip search panda`
     
* To see which packages you have installed already:

    `pip list`
    
* You can install packages listed in a `requirements.txt` file (one package per line): 

    `pip -r requirements.txt`
    
* To save a list of your currently installed packages in a `requirements.txt` file:

    `pip freeze > requirements.txt`
    
#### Installing packages with `conda`

`conda` works similarly to `pip`.

* To install a package:

    `conda install scipy`
    
* To search for a package:

    `conda search scipy`
    
* And to list all packages in your environment:

    `conda list`
    
Once installed on your VM, packages will persist and you will not need to install them again. You will only need to import them again in your code.

 
## Scheduled Maintenance

Beginning Sunday, April 14, your Ivy virtual machine (VM) will be rebooted on the 2nd Sunday of each month between 5:00 a.m. and 6:00 a.m. EST while RC engineers install security updates. Any sessions running during this period will be terminated. Windows and Linux VMs will be rebooted at the same time.

If you have any questions or problems with your software applications after the security updates have been installed, you may [contact our user services team](https://www.rc.virginia.edu/form/support-request/?category=Ivy).
- - -

## JupyterLab Notebooks

{{% callout %}}
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Jupyter_logo.svg/1200px-Jupyter_logo.svg.png" align="right" style="max-width:20%;" />
JupyterLab is a web-based interactive development environment for Jupyter notebooks, code, and data. JupyterLab is flexible: configure and arrange the user interface to support a wide range of workflows in data science, scientific computing, and machine learning. JupyterLab is extensible and modular: write plugins that add new components and integrate with existing ones.
<br clear=all />
<a href="https://jupyter.org/" target="_new"><button class="btn btn-success">Learn more about Jupyter</button></a>
{{% /callout %}}

- - -

# Using the Rio HPC System

## Access

Access to the Rio HPC requires an Ivy Linux VM to serve as a login node. Similar to other Ivy VMs, access to the Rio HPC is project-based. For details on requesting an Ivy Linux VM and accessing it, please refer to the instructions provided above. Please note that PIs must specifically request for their associated Linux VM to be provisioned as a frontend to Rio. Access to Rio from the VM is not granted by default.

As outlined above, VMs are available in various sizes. Please request a VM that is appropriately sized for your specific workflow. For larger groups or projects involving computationally intensive tasks, we recommend selecting a larger VM, with a preference for Small or above. 

[<button class="btn btn-success">Request Ivy VM for Rio</button>](https://services.rc.virginia.edu/ivyvm)
  
## System Details

### Hardware Configuration

Currently, Rio comprises 39 compute nodes, providing a total of 1,560 x86 64-bit compute cores. Each HPC node is equipped with 375 GB of RAM to accommodate memory-intensive applications. Rio also includes an NVIDIA HGX H200 GPU, and additional GPU nodes designed to support AI and machine learning workloads will be integrated in the near future.

### Job Queues

Similar to our clusters Rivanna and Afton in standard security zone, Rio is a managed resource. Users must submit jobs to queues controlled by a resource manager, also known as a queueing system. The manager in use on Rio is Slurm. Slurm refers to queues as partitions because they divide the machine into sets of resources. There is no default partition and each job must request a specific partition. Partitions and access policies are subject to change, but the following table shows the current structure. Detailed information on Slurm and instructions for submitting jobs to the HPC can be found [here](https://www.rc.virginia.edu/userinfo/hpc/slurm/). 

For an introduction to the Rio HPC system, please see our [tutorial](https://learning.rc.virginia.edu/tutorials/rio-intro/).

# Data Transfer In/Out of Ivy/Rio {#data-transfer-in-out-of-ivy}

Moving sensitive data into the Ivy VM platform (and Rio) is possible through a secure Globus DTN (data transfer node). The Ivy DTN is connected to a pool of secure storage called “High-Security Research Standard Storage”, which in turn is connected to Ivy VMs. Only active research projects using Ivy virtual machines can use this service.

<img style="max-width:100%;" alt="Ivy Secure DTN Flow" src="/images/ivy-dtn-flow.png" />

## How to Connect to the DTN and Transfer Files

Before transferring files to Ivy, you will need Globus installed on the computer you are transferring data from. Globus can be downloaded from [https://www.globus.org/globus-connect-personal](https://www.globus.org/globus-connect-personal).

1. Ensure that you are **NOT** connected to the HSVPN. Data transfer will not work if you are connected to the HSVPN.

2. Open Globus in your web browser: [https://app.globus.org/file-manager](https://app.globus.org/file-manager). When logging in, select **University of Virginia** and log in with Netbadge.

3. Once you are in the Globus **File Manager**, select the two-panel view by clicking the two-panel button beside the **Panels** button in the top-right corner of the page. This should open a second panel on the page, so that you have two side by side.

4. In one panel, click on the **Collections** field and select your computer. You can then click to the directory that contains the data you want to move, or type the path to the directory in the **Path** field. Click the files or folders you want to transfer to select them.

5. In the remaining panel, click on the **Collections** field and search for and select the **UVA IVY-DTN**. Select the storage share to which you want to transfer data. (Unless you are part of multiple Ivy projects, you should only see one storage folder.)

6. Click the **Start** button beneath the first panel (should be highlighted) to begin the data transfer.

7. Once the data transfer is complete, you will be able to access the data in your VM by clicking the **High-Security Research Standard Storage** shortcut on your VM's desktop.

- - -
<!--
# HIPAA Compliance

The Ivy platform is HIPAA-compliant by design. From the <a href="https://research.virginia.edu/irb-hsr/protected-health-information-hipaa-regulations-and-research" target="_new">UVA Institutional Review Board for Health Sciences Research</a> (IRB-HSR):

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

All data imported into Ivy must be treated as highly sensitive data. Data and results exported from Ivy must be protected and managed appropriately according to UVA's [data classification guidelines](https://security.virginia.edu/university-data-protection-standards). Guidance regarding these guidelines and data types is available from UVA Information Security, Policy, and Records Office (ISPRO) by emailing [it-security@virginia.edu](mailto:it-security@virginia.edu).

<button onclick="topFunction()" id="scrollBtn" title="Go to top"><i class="fas fa-2x fa-angle-double-up"></i></button>


# Coming Soon - Secure HPC

<img src="https://pbs.twimg.com/media/DRQcamFX0AA9tmU.jpg" style="float:right;max-width:40%;" />

In 2020 we will launch a secure high performance computing system. This will support computationally-intensive research for sensitive data, within the Ivy secure environment.

-->

<br clear=all />
