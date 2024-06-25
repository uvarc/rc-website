+++
type = "howto"
date = "2024-02-15T00:00:00-05:00"
tags = [
  "rivanna", "software", "jupyter", "rstudio"
]
categories = ["howto"]
draft = false
title = "Clear OOD Files"
description = "How to clear your Open on Demand session files."
author = "RC Staff"

+++
To clear OOD Session files, the HPC system will need to be accessed via a terminal. See [documentation](/userinfo/hpc/login/) for information on how to access via SSH. 

You can find the session files and logs for all Open on Demand apps at:

```
~/ondemand/data/sys/dashboard/batch_connect/sys
```
Under this directory you will see subdirectories for the Open on Demand applications that you have used before. Under each sub directory you can find the files that are created when you launch a new session. 

To quickly clear all session files for OnDemand from your /home directory run:

```
rm -rf ondemand
```

Other directories related to Open on Demand such as .jupyter and .rstudio-desktop can be removed in the same fashion:
```
rm -rf .jupyter #removes JupyterLab session files
rm -rf .rstudio-desktop #removes RStudio session files
```
