+++
title = "Preinstalled R on Ivy Linux VM"
description = ""
author = "SOMRC Staff"
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

R can be used for many statistical, modeling, and graphical solutions. It is very Object Oriented in nature and is 
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
	

## (Optional) Setting the repository

In order to avoid R from asking which repository it should use every time a package
is installed, you need to edit the ```.Rprofile``` file in your home directory. If 
it is not there, create a new file and call it ```.Rprofile```. Add the following code
to it

	
	r <- getOption("repos")             
	r["CRAN"] <- "http://cran.us.r-project.org"
	options(repos = r)
	rm(r)
	
## More Information

For more information, please visit the official [R website](https://www.r-project.org/)

