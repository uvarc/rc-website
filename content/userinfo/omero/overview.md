+++
description = ""
title = "Image Data Management with OMERO"
draft = true
date = "2020-02-17T17:45:12-05:00"
tags = ["omero","image processing","storage","infrastructure"]
categories = ["userinfo"]
images = [""]
author = "Staff"  

+++

![Omero Status](https://img.shields.io/badge/dynamic/json?color=color&label=omero&query=message&url=https%3A%2F%2Ftja4lfp3da.execute-api.us-east-1.amazonaws.com%2Fapi%2Fbadge%2Fomero&style=for-the-badge)

{{% callout %}}
<img src="/images/omero/ome-main-nav.svg" alt="OMERO" style="float:right;max-width:35%;margin-left:1rem;" />

<p>OMERO is a database for management of imaging data. UVA is is hosting a centralized OMERO database instance backed by centralized storage that facilitates sharing, processing and annotating images for your research group and invited collaborators.</p>

{{% /callout %}}

# Overview

With the advent of high-throughput screening, the need for efficient image management tools is greater than ever. From the microscope to publication, [OMERO](https://www.openmicroscopy.org/omero/) is a database solution that handles all your images in a secure central repository. You can view, organize, analyze and share your data from anywhere you have internet access. Work with your images from a desktop app (Windows, Mac or Linux), on [UVA's high performance computing platform (Rivanna and Afton)](/userinfo/rivanna/overview), from the web, or through 3rd party software like Fiji and ImageJ, Python, and MATLAB. OMERO is able to read over 140 proprietary file formats, including all major microscope formats. 

- - -

# Getting Access

OMERO accounts can be requested by submitting a <a href="https://www.rc.virginia.edu/form/omero/" target="_blank">OMERO request form</a>. **Only faculty members may submit a request**.

By default, all group members will be able to view their own and others' 
data. Group members can make annotations on each other's data, but cannot modify or delete another member's data. For details on obtaining more restrictive or flexible permissions for your group members, please read the [Group/User Permissions section](#group-user-permissions).

**Pricing**: {{% storage-pricing omero %}} / TB per year.

 [<button class="btn btn-success">Request Access to OMERO</button>](/form/omero/)

- - -

# Connecting to the OMERO database

Once you have an OMERO account you can log in and begin importing images. You can log into your OMERO account on your computer using the [OMERO.insight desktop client](#logging-in-with-omero-insight), or you can use the [OMERO web interface](#logging-in-with-omero-web) through your web browser. 

<!-- You can also run OMERO directly on Rivanna and Afton using FastX using either OMERO.insight *or* the 
web client. Since images are imported into centralized storage that is mounted directly on 
the HPC system, large images and movie files are rendered more quickly when using OMERO on the HPC system. -->

<div class="alert alert-success">
<p>When off Grounds, you have to connect through the <a href="https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0" target="_blank">UVA VPN</a> in order to access the OMERO database. <b>We recommend to connect to the UVA More Secure Network if available.</b> The UVA Anywhere VPN should only be used if the UVA More Secure Network is not available.</p>
</div>

## Logging in with OMERO.insight

**Setup the Software on your Computer**

1. The UVA server is running OMERO 5.4.10.  In order to connect to that server you need to install the compatible Windows, Mac, or Linux client.

   * **Windows:** [OMERO.insight-5.4.10-ice36-b105-win.zip](https://downloads.openmicroscopy.org/omero/5.4.10/artifacts/OMERO.insight-5.4.10-ice36-b105-win.zip)
   * **Mac:** [OMERO.insight-5.4.10-ice36-b105-mac.zip](https://downloads.openmicroscopy.org/omero/5.4.10/artifacts/OMERO.insight-5.4.10-ice36-b105-mac.zip)
   * **Linux:** [OMERO.insight-5.4.10-ice36-b105-linux.zip](https://downloads.openmicroscopy.org/omero/5.4.10/artifacts/OMERO.insight-5.4.10-ice36-b105-linux.zip)

    <br>Please download the .zip file appropriate for your computer and install the client following these [installation instructions](https://help.openmicroscopy.org/getting-started-5.html#installing).

2. Open OMERO.insight and follow the [configuration instructions](https://help.openmicroscopy.org/getting-started-5.html#server) to setup the connection to the UVA OMERO server. Under step 3 of the instructions, enter `omero.hpc.virginia.edu` as the server address. The `port` address needs to be set to `4064`.

3. To log in, enter your computing ID (e.g. `mst3k`) in the *Username* field. For *Password*, enter the password emailed to you after your initial account request (you will be able to change this after logging in for the first time). **The OMERO database password is not the same as your Eservices or Netbadge password.** Click **Login**.


## Logging in with OMERO.web

1. Go to <a href="http://omero.hpc.virginia.edu" target="_blank">http://omero.hpc.virginia.edu</a>.

2. Log in with your computing ID (e.g. `mst3k`) and the password that was emailed to you 
upon your initial account request. **The OMERO database password is not the same as your Eservices or Netbadge password.**

**Important things to note when using the OMERO web client interface:**

* OMERO.web cannot be used to import images

* Tags cannot be created in OMERO.web

- - -

# Changing your OMERO Database Password

**The OMERO database password is not the same as your Eservices or Netbadge password.** After logging into OMERO for the first time, it is highly recommended that you change your 
password. You can manage your account settings using either OMERO.insight or OMERO.web. 

## Password Change in the OMERO.insight Desktop Client

1. After logging into OMERO using the desktop app, click the **Administration** tab in the side 
menu.
    
2. Click the arrow next to your lab/group account name, then click your own name to open 
the user account menu.

3. Enter your new password in the **New Password** field and click the **Change Password** 
button.

## Password Change in the OMERO Web Client

1. After logging in to OMERO in your web browser, click your name in the top right corner 
of the screen and then click **User settings**.

2. Click the **Change Password** button. Enter your current password and your desired new 
password. Click **OK** when complete.

If you cannot remember your password, please contact us through our [support request webform](https://www.rc.virginia.edu/form/support-request/). Our system administrators can reset the password for you.
 
- - -

# Group/User Permissions

OMERO users can have one of two user roles, **Group owner** or **Group member**.

As a Group owner of a lab/group account, you can edit the permissions of other 
users in your group. This can be done from the desktop app OMERO.insight.

1. In the **Administration** tab of the sidebar menu, click the name of your group. This 
will open the Group settings menu.

2. Select your desired permissions and click **Save**.

<br>

There are several different permissions settings, which are described below. By default, 
all group permissions are set to **Read-Annotate**.

<table class="table table-striped" id="moduleTable">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Permission Type</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Private</td>
      <td>The group owner can view data of all group members but cannot add annotations. Regular group members can only view and annotate their own data. This permissions setting does not allow for much collaboration.</td>
    </tr>  
    <tr>
      <td>Read-Only</td>
      <td>The group owner can view data of all group members but cannot add annotations. Regular group members can only view and annotate their own data. This permissions setting does not allow for much collaboration.</td>
    </tr>  
    <tr>
      <td>Read-Annotate</td>
      <td>The group owner and group members can view and annotate each other's data. Regular members cannot modify or remove other members' images. <b>[Default]</b></td>
    </tr>  
    <tr>
      <td>Read-Write</td>
      <td>The Group owner and Group members can view, annotate, modify, and delete each other's data.</td>
    </tr>  
  </tbody>
</table>

- - -

# Image Analysis with OMERO
OMERO is compatible with a variety of third-party image processing software packages. Using these OMERO-software bindings, you can import images from OMERO to your software such as Fiji or Python,and then process and analyze them as usual. You can then export any results or preprocessed images back to OMERO.

Using OMERO to serve images to your analysis software has many benefits over more traditional methods of reading imaging data. With OMERO, there is no need to download the images directly to your local machine. 

## ImageJ/Fiji
Images managed by OMERO can be imported using the ImageJ/Fiji plugin for OMERO. Detailed 
instructions for installing and using the plugin can be found in OMERO's online documentation: 
[https://help.openmicroscopy.org/imagej.html](https://help.openmicroscopy.org/imagej.html).

An introduction with example scripts that demonstrate the basic concepts of writing Fiji scripts to interact with the OMERO database are described in our [tutorial ](https://learning.rc.virginia.edu/workshops/fiji-omero/).

## MATLAB and Python
You can install packages to connect to OMERO with MATLAB or Python. These packages include 
functions for connecting to the OMERO server and reading and exporting data.

 
OMERO's online documentation for the OMERO MATLAB language bindings can be found here: 
[https://docs.openmicroscopy.org/omero/5.5.0/developers/Matlab.html](https://docs.openmicroscopy.org/omero/5.5.0/developers/Matlab.html)

More information on the OMERO Python language bindings can be found here: 
[https://docs.openmicroscopy.org/omero/5.5.0/developers/Python.html](https://docs.openmicroscopy.org/omero/5.5.0/developers/Python.html).

More in-depth tutorials and sample scripts will be available on our [workshop](https://learning.rc.virginia.edu) site soon!
