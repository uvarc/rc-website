+++
images = [""]
author = "Staff"
description = ""
date = "2020-06-16T00:00:00-05:00"
title = "Transitioning to New R Modules: June 17, 2020"
draft = false
tags = ["Rivanna"]
categories = ["userinfo"]
+++

<br>
The recommended steps for transitioning your R programs after the June maintenance are as follows:

1. Determine which version of R you will be using (e.g., R/3.6.3).
2. Open a terminal window on the HPC system and load the version of R that you chose in step #1 (e.g., `module load goolf R/3.6.3`).
3. (Optional) Run our script to rebuild your existing R library for the newer version of R.  For example, if you had been using R/3.5.1 and are switching to R/3.6.3, type the following in the terminal window:  ` updateRlib 3.5.1 ` .  Make sure that you have loaded any other modules (e.g., curl, gdal) that your packages may need.
4. Update your Slurm scripts to load the newer version of R.


We at Research Computing understand that you may have some issues during the transition.  To help with the transition, we will have additional office hours specifically for your R questions:

__________________________
<div>
<b>Thursday, 18 June,  3:00-5:00pm </b>  <br /> <a href="https://virginia.zoom.us/j/99170950007?pwd=RWh4UWZ4clRiVE10ejNFUXMxWjBVUT09"><button class="btn btn-primary btn-sm">Join us via Zoom</button></a>
</div>

__________________________
<div>
<b>Friday, 19 June,  3:00-5:00pm</b> <br><a href="https://virginia.zoom.us/j/97782392459?pwd=N2c5YUFIQmkxRm16WHJlN3l3bDlvQT09"><button class="btn btn-primary btn-sm">Join us via Zoom</button></a>
</div>

__________________________





