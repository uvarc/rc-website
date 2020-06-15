+++
images = [""]
author = "Staff"
description = ""
date = "2020-15-02T00:00:00-05:00"
title = "R Updates: June 17, 2020"
# url = "/maintenance"
draft = false
tags = ["Rivanna"]
categories = ["feature"]
+++


## R Updates
During the June maintenance, we will make changes to R which **will** affect how your R programs run on Rivanna.  Below is a list of the changes and how they will affect your code.

#### 1. The gcc-built versions of R will be updated to goolf-built versions.  
> Instead of loading gcc before loading R, you will need to load `goolf` or `gcc openmpi`.  For example:  `module load goolf R/4.0.0`. 
Remember to update any SLURM scripts that have `module load gcc R` or `module load gcc R/3.x.x`.  

#### 2. The locations of the R libraries will be updated.
> We are changing the locations of the R libraries (i.e., the folders where local packages are installed).  This change will create separate folders for different compiler versions of R, which will prevent package corruption.
As a result, R will not see the packages that you installed before the maintenance (with the exception of R/4.0.0 which already uses the new library location).  You may need to reinstall your R packages.  After the maintenance, we will provide a script that will scrape the list of packages you have installed previously and will attempt to install these packages in the new library.


#### 3. The versions of R will be streamlined to 3.4.4, 3.5.3, 3.6.3, and 4.0.0.
> If you have hard-coded another version of R in your scripts (e.g., R/3.6.1), you will need to update your scripts to specify one of these newer versions.
To see what modules would need to be loaded prior to loading R, you can use the `module spider` command (e.g.,`module spider R/3.6.3`).

