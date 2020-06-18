+++
images = [""]
author = "Staff"
description = ""
date = "2020-06-16T00:00:00-05:00"
title = "R Updates: June 17, 2020"
# url = "/maintenance"
draft = false
tags = ["Rivanna"]
categories = ["feature"]
+++

<br>
During the June maintenance, we made changes to R which <b>will</b> affect how your R programs run on Rivanna.  
<br>
A brief description of the changes is as follows:


<br>
* The gcc-built versions of R were updated to goolf-built versions. 
<br>


<br>
* The locations of the R libraries were updated. 
<br>


<br>
* The versions of R have been streamlined to 3.4.4, 3.5.3, 3.6.3, and 4.0.0. 
<br>


<br>
* ***************************
<br>




     For details, Read More:


* ***************************
* ***************************
<br>


<br>
<br>

# 1. The gcc-built versions of R have been updated to goolf-built versions.  
Instead of loading gcc before loading R, you will need to load `goolf` or `gcc openmpi`.  For example:  `module load goolf R/4.0.0`. 
Remember to update any SLURM scripts that have `module load gcc R` or `module load gcc R/3.x.x`.  

<br>
# 2. The locations of the R libraries have been updated.
We are changing the locations of the R libraries (i.e., the folders where local packages are installed).  This change will create separate folders for different compiler versions of R, which will prevent package corruption.
As a result, R will not see the packages that you had installed before the maintenance.  (The only exception would be `gcc openmpi R/4.0.0`, which already uses the new library location).  You will need to reinstall your R packages.  To help with this effort, we are providing a script that will scrape the list of packages installed in an older library and will attempt to install these packages in the new library. Details are provided at ["New Libraries"](/userinfo/transition_new_r_libraries).

<br>
# 3. The versions of R have been streamlined to 3.4.4, 3.5.3, 3.6.3, and 4.0.0.
If you had hard-coded another version of R in your scripts (e.g., R/3.6.1), you will need to update your scripts to specify one of these newer versions.
To see what modules would need to be loaded prior to loading R, you can use the `module spider` command (e.g.,`module spider R/3.6.3`).

