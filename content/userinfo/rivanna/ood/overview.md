+++
description = ""
title = "Open OnDemand"
draft = false
date = "2019-06-28T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","gpu","allocations","queues"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

# Overview
Open OnDemand is a graphical user interface that allows access to Rivanna via a web browser. Within the Open OnDemand environment users have access to a file explorer; interactive applications like [JupyterLab](/userinfo/rivanna/software/jupyterlab), [RStudio Server](/userinfo/rivanna/software/r) & [FastX Web](/userinfo/rivanna/logintools/fastx); a command line interface; and a job composer and job monitor.


# Logging in to Rivanna
Rivanna is accessible through the Open OnDemand web client at https://rivanna-portal.hpc.virginia.edu. Your login is your UVA computing ID and your password is your Netbadge password. Some services, such as FastX Web, require the Eservices password. If you do not know your Eservices password you must change it through ITS by changing your Netbadge password.

Open OnDemand can be accessed from off Grounds without the [UVA Anywhere](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0) VPN client, but FastX Web requires it. Only Windows and Mac OSX operating systems are supported by ITS for UVA Anywhere. Linux users should refer to these <a href="https://discuss.rc.virginia.edu/t/configuring-the-uva-anywhere-vpn-on-linux/1190" target="_new">unsupported instructions</a> to install and configure a VPN.

# The Dashboard
Once you log in, you are automatically redirected to the Open OnDemand dashboard. The dashboard may contain information about upcoming changes and maintenance work that can affect your jobs, so please read all announcements carefully. Keep the dashboard tab open until you are ready to end your session and log out.

<img src="/images/rivanna/openondemand-dash.png" alt="Open OnDemand Dashboard" class="project-inset" style="float:right;max-width:100%;" />

The dashboard provides access to all Open OnDemand services and applications. These include

+ File Explorer
+ Interactive Applications
+ Command Line Interface (Shell)
+ Job Composer & Job Monitor

These services and applications are accessible through drop-down boxes on the menu bar. When you click on any of the drop-down options, a new tab will open in your browser.


# File Explorer
File Explorer makes browsing and managing small files easy. Rivanna has multiple locations to store your files with different limits and policies. Specifically, each user has a relatively small amount of permanent storage in his/her home directory and a large amount of temporary storage (/scratch) where large data sets can be staged for job processing. Users can also lease storage that is accessible on Rivanna. [Contact Research Computing](/support) or visit the [storage page](/userinfo/storage) for more information.

The file explorer provides these basic functions:

+ Renaming of files
+ Viewing of text and small image files
+ Editing of text files
+ Downloading & uploading of small files

Visit our [File Explorer](/userinfo/rivanna/ood/fileexplorer) guide for detailed instructions.

# Interactive Applications
Open OnDemand provides access to interactive applications that provide a full graphical Rivanna desktop environment (FastX Web), as well as a website where you can check your current allocation and storage usage, JupyterLab for running Jupyter notebooks, RStudio Server for the execution of R scripts, and a simple terminal shell.


## FastX Web
FastX Web enables users to start an X11 desktop environment on a remote system. When launched through Open OnDemand, FastX Web provides access to a Rivanna frontend. The FastX Web desktop environment can be used to open conventional shell terminals or launch applications with a graphical user interface.

Please read our [FastX Web documentation](/userinfo/rivanna/logintools/fastx) for a detailed description of this remote desktop environment.

## My Rivanna Status
To see an overview of your current allocations and scratch directory usage, click on the `Interactive Apps` drop-down and select `My Rivanna Status`. The data shown reflect the output obtained when running the `allocations` and `sfsq` commands in a command line terminal.

## JupyterLab
JupyerLab provides an environment that has become popular for interactive code development and debugging. JupyterLab sessions run on user-specified allocated hardware resources which may include compute nodes equipped with graphical processing units (GPUs).

Please read the [JupyterLab documentation](/userinfo/rivanna/software/jupyterlab) for detailed instructions on how to start JupyerLab sessions and specify hardware resource requests.

After starting a JupyterLab session, you're taken to the My Interactive Sessions page. To return to the Open OnDemand dashboard, click on the Home link in the top left corner of the site just below the Research Computing banner.

## RStudio Server
RStudio provides an environment specifically designed for interactive R script development and debugging.

Please read the [RStudio documentation](/userinfo/rivanna/software/r) for detailed instructions on how to start RStudio sessions and specify hardware resource requests.

After starting an RStudio session, you are automatically taken to the My Interactive Sessions page. To return to the Open OnDemand dashboard, click on the Home link in the top left corner of the site just below the Research Computing banner.

## Matlab
The Matlab interface provides an environment for interactive Matlab script development and debugging.

Please read the [Matlab documentation](/userinfo/rivanna/software/matlab) for detailed instructions on how to start Matlab sessions and specify hardware resource requests.

After starting an interactive Matlab session, you are automatically taken to the My Interactive Sessions page. To return to the Open OnDemand dashboard, click on the Home link in the top left corner of the site just below the Research Computing banner.

## Blender
Through this interface users can run interactive Blender sessions on a dedicated GPU node.

Please read the [Blender documentation](/userinfo/rivanna/software/blender) for detailed instructions on how to start Blender sessions and specify hardware resource requests.

After starting an interactive Blender session, you are automatically taken to the My Interactive Sessions page. To return to the Open OnDemand dashboard, click on the Home link in the top left corner of the site just below the Research Computing banner.

## ParaView
Through this interface users can run interactive ParaView sessions on a dedicated GPU node.

Please read the [ParaView documentation](/userinfo/rivanna/software/paraview) for detailed instructions on how to start ParaView sessions and specify hardware resource requests.

After starting an interactive ParaView session, you are automatically taken to the My Interactive Sessions page. To return to the Open OnDemand dashboard, click on the Home link in the top left corner of the site just below the Research Computing banner.

## Command Line Interface (Shell)
To open a conventional command line terminal window, click on the `Clusters` drop-down menu and select `Rivanna Shell Access`. A new tab opens that provides a Bash command line environment.  This is similar to logging in through ssh but with the limitation that it cannot start graphical (X11) applications.  You must use [FastX](/userinfo/rivanna/logintools/fastx) for X11 applications such as the Matlab desktop.

# Job Composer
The Job Composer is an easy way to submit general-purpose jobs.  You can copy pre-existing templates and modify them for your application, then submit a job at the click of a few buttons.  It works with the File Explorer to allow you to upload or move files you need for your job, and to download your results.

Visit our [Job Composer](/userinfo/rivanna/ood/jobcomposer) documentation for details.
