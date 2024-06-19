+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
  "bioinformatics"
]
date = "2019-06-23T08:37:46-05:00"
tags = ["bio"
]
draft = false
shorttitle = "Bioinformatics"
title = "Bioinformatics on Rivanna"
description = "Bioinformatics Software in Rivanna's HPC environment"
author = "RC Staff"

+++

# Overview

Many commonly used bioinformatics software packages on Rivanna are available as individual modules or as Python packages bundled in the bioconda modules. 

Please see our [HowTo](/userinfo/howtos/rivanna/bioinfo-on-rivanna) for more information about using this software on Rivanna.

# Software Availability 

If a particular package is not available, several options are available.  If it is sufficiently widely used, Research Computing staff will install it as a new module.  If we determine that it is too specialized, you can install it yourself. Please use permanent storage such as your home directory to install software.  If you have difficulty we can assist you to install the package.

Please see [below](#full-list-of-bioinformatics-software-modules) for a full listing of available bioinformatics software.  If you do not find it there, please check the [bioconda](/userinfo/hpc/software/bioconda) package before requesting that we install it.

# Reference Genomes

Research Computing makes some standard reference genomes available. For a listing and information about how to copy them, please see our [HowTo](/userinfo/howtos/rivanna/bioinfo-on-rivanna#reference-genomes-on-rivanna).

# Full List of Bioinformatics Software Modules

Below is a list of software installed as separate modules. Other packages that are based on Python are available in the [bioconda](/userinfo/hpc/software/bioconda) environment.  Please see the bioconda page for a listing of those packages.

{{< rivanna-software moduleclasses="bio" >}}

