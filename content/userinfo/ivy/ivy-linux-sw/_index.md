+++
title = "Software on Ivy Linux Virtual Machines"
description = ""
author = "RC Staff"
images = [""]
categories = ["userinfo"]
tags = [
    "Ivy", 
    "Linux",
    "Software",
]
date = "2026-04-03T00:00:00-05:00"
draft = false
layout = "single"
+++

A software stack is built for each architecture (x86-64, Arm) in the high-security zone. The complete list of modules is shown in each link:
    - [x86-64](/userinfo/ivy/ivy-linux-sw/complete-list): virtual machines (VMs), non-GH200 compute nodes in Rio
    - [Arm](/userinfo/ivy/ivy-linux-sw/complete-list-arm): GH200 compute nodes in Rio 

## Running software on GH200

The Arm software stack is automatically mounted to `/apps` when you are on a GH200 node. You cannot use modules from this stack elsewhere.

To create a Conda environments, load the miniforge module on a GH200 node. (This is different from the miniforge on your VM or other compute nodes.)

Prebuilt binaries must be Arm-based. Look for `arm`, `arm64`, `aarch64`, etc. in the options.

Containers must be Arm-based. In your pull command add `--arch arm64` or else it will default to x86. (You can pull on an x86 machine.)

To build from source for Arm, load the compiler of choice (gcc or nvhpc) on a GH200 node with compiler flags `-mcpu=neoverse-v2` (gcc) or `-tp=neoverse-v2` (nvhpc) for optimization. If you get errors related to ld, also load binutils.
