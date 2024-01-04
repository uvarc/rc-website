+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2024-01-02T00:00:00-05:00"
tags = [
  "statistics",
  "math"
]
draft = false
shorttitle = "Math & Statistics"
title = "Math & Statistics on Rivanna"
description = "Math & Statistics Software in Rivanna's HPC environment"
author = "RC Staff"

+++
# Overview
Many popular math and statistics software packages are available on Rivanna.

# General considerations



# Available Math & Statistics Software

To get an up-to-date list of the installed math applications, log on to Rivanna and run the following command in a terminal window:
```
module keyword math
```

To get more information about a specific module version, run the module spider command, for example:
```
module spider mathematica
```

<br>

**List of Math & Statistics Software Modules**

{{< rivanna-software moduleclasses="math" >}}

# Using a Specific Software Module

To use a specific software package, run the `module load` command. The `module load` command in itself does not execute any of the programs but only prepares the environment, i.e. it sets up variables needed to run specific applications and find libraries provided by the module.

After loading a module, you are ready to run the application(s) provided by the module. **For example:**
```
module load mathematica
```
