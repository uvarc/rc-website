+++
title = "Preinstalled R on Ivy Linux VM"
description = ""
author = "RC Staff"
images = [""]
categories = ["userinfo"]
tags = [
    "Ivy", 
    "Software",
    "R"
]
date = "2018-01-19T17:45:12-05:00"
draft = false
+++

# R Overview

R is an open source programming language, used by Data Miners, Scientists, Data Analysts, 
and Statisticians. It is available under the GNU GPL V2 license from the [Comprehensive R 
Archive Network](https://www.r-project.org/)

R can be used for many statistical, modeling, and graphical solutions. It is very Object-Oriented in nature and is 
easily extensible. 

## Running the command line R console

Type ```R``` at the terminal to launch the R console. 

## Installing packages

Our Linux VMs come equipped with R preinstalled. Most major R packages are also installed
and further could be installed from CRAN using (from within the R console)

	
	install.packages("your_package_name")
	

Once the package is loaded, you could start it using

	
	library(your_package_name)
	

## Running R Scripts from the command line 

Simply type in the following 

	
	Rscript /path/to/script/your_script_file.R
	
## More Information

For more information, please visit the official [R website](https://www.r-project.org/)

