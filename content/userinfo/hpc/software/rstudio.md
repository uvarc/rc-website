+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2023-12-20T00:00:00-05:00"
tags = [
  "lang",
]
draft = false
shorttitle = "RStudio Server"
title = "RStudio Server and UVA HPC"
description = "RStudio Server in the HPC environment"
author = "RC Staff"

+++

# Overview
RStudio Server is a web-based interface to RStudio -- a development environment for R programming.

Research Computing provides a web portal where RStudio Server can be accessed on the HPC system. However, to use RStudio Server, you must have an account on UVA HPC. Instructions for setting up an account can be found [here](/userinfo/hpc/#get-started).


# Accessing RStudio Server
To access RStudio Server, you will begin by connecting to our Open OnDemand portal:

1. Open a web browser and go to URL:  https://ood.hpc.virginia.edu.
2. Use your “Netbadge” credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on “Interactive Apps”.
4. In the drop-down box, click on “RStudio Server”.

Note that if you want to use your local R packages installed through the R module, you need to run
```
echo "R_LIBS_USER=~/R/goolf/x.y" > ~/.Renviron
```
before launching the instance. Here `x.y` is the major-minor version of R, e.g. `4.3`. Alternatively, you may run inside RStudio:
```
.libPaths('~/R/goolf/x.y')
```

# Requesting an Instance
Your instance (or copy) of RStudio will run on a compute node. So, it will need a list of resources, such as partition, time, and allocation. If you are new to UVA HPC, you may want to read the [Getting Started Guide](/userinfo/hpc/#job-queues) to learn more about the partitions.

1. After connecting to RStudio through Open OnDemand, a form will appear where you can fill in the resources for RStudio.
2. When done filling in the resources, click on the blue “Launch” button at the bottom of the form.

It will take a few minutes for the system to gather the resources for your instance of RStudio. When the resources are ready a “Connect to RStudio Server” button will appear. Click on the button.


# Using RStudio
When RStudio opens in your web browser, it will appear just like the RStudio that you have on your laptop or desktop.  You can use it just as you always have, including installing packages.  (If you have not used RStudio in the past, you may wish to review this [tutorial](https://dss.princeton.edu/training/RStudio101.pdf).)

# Closing the Interactive Session
When you are done, quit the RStudio Server application and terminate the session. The interactive session will be closed and the allocated resources will be released. If you leave the session open, your allocation will continue to be charged until the specified time limit is reached.
