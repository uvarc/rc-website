+++
description = ""
title = "VPN on Linux"
draft = false
date = "2019-06-28T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","gpu","allocations","queues"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

Warning: Connecting to the UVA VPN on Linux is not supported by either Research Computing or ITS. The only supported platforms are Windows and Mac OSX. Please do not submit tickets about this if it does not work.

On Ubuntu you should install OpenConnect using ```sudo apt-get install network-manager-openconnect-gnome```.

Instructions for Fedora are similar but use ```sudo dnf install NetworkManager-openconnect-gnome```.

You must first manually download your personal digital certificate from the source for an "unknown" operating system [here](https://cloud.securew2.com/public/82116/limited/?device=Unknown).  You also need the Usher certificate from [here](https://download.its.virginia.edu/local-auth/universal/usher.cer).

Further instructions were prepared by the Physics Department and can be found [here](http://galileo.phys.virginia.edu/compfac/faq/linux-vpn.html).
