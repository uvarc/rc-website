+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2019-06-23T08:37:46-05:00"
tags = [
  "lang",
]
draft = false
shorttitle = "RStudio Server"
title = "RStudio Server on Rivanna"
description = "RStudio Server in Rivanna's HPC environment"
author = "RC Staff"

+++

# Overview
RStudio Server is a web-based interface to RStudio -- a development environment for R programming.

Research Computing provides a web portal where RStudio Server can be accessed on Rivanna. However, to use RStudio Server, you must have an account on Rivanna. Instructions for setting up an acccount can be found [here](/userinfo/rivanna/overview/#get-started).



# Accessing RStudio Server
To access RStudio Server, you will begin by connecting to our Open OnDemand portal:

1. Open a web browser and go to URL:  https://rivanna-portal.hpc.virginia.edu.
2. Use your “Netbadge” credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on “Interactive Apps”.
4. In the drop-down box, click on “RStudio Server”.


# Requesting an Instance
Your instance (or copy) of RStudio will run on a Rivanna compute node. So, it will need a list of resources, such as partition, time, and allocation. If you are new to Rivanna, you may want to read the [Getting Started Guide](http://localhost:1313/userinfo/rivanna/queues/) to learn more about the partitions.

1. After connecting to RStudio through Open OnDemand, a form will appear where you can fill in the resources for RStudio.
2. When done filling in the resources, click on the blue “Launch” button at the bottom of the form.

It will take a few minutes for the system to gather the resources for your instance of JupyterLab. When the resources are ready a “Connect to RStudio Server” button will appear. Click on the button.


# Using RStudio
When RStudio opens in your web browser, it will appear just like the RStudio that you have on your laptop or desktop.  You can use it just as you always have, including installing packages.  (If you have not used RStudio in the past, you may wish to review this [tutorial](https://dss.princeton.edu/training/RStudio101.pdf).)
