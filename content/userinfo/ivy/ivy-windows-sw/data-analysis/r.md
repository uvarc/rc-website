+++
title = "Preinstalled R on Ivy Windows VM"
description = ""
author = "RC Staff"
images = [""]
date = "2018-01-19T17:45:12-05:00"
categories = ["userinfo"]
tags = [
    "Ivy", 
    "Windows",
    "R"
]
draft = false
+++

# R Overview
R is an open source programming language, used by Data Miners, Scientists, Data Analysts, 
and Statisticians. It is available under the GNU GPL V2 license from the [Comprehensive R 
Archive Network](https://www.r-project.org/)

R can be used for many statistical, modeling, and graphical solutions. It is very Object-Oriented in nature and is 
easily extensible. 

## Running Rstudio from the desktop

You can start R in a Graphical interface using the RStudio application from the desktop

## Running the command line R console

Type ```R``` at the command prompt to launch the R console. 

## Installing packages

Our Windows VMs come equipped with R preinstalled. Most major R packages are also installed
and further could be installed from CRAN using (from within the R console) 

	install.packages("your_package_name")

Once the package is loaded, you could start it using

	library(your_package_name)

## Running R Scripts from the command line 

Simply type the following on Command Prompt 

	Rscript path\\to\\script\\your_script_file.R
	
## More Information

For more information, please visit the official [R Studio website](https://www.rstudio.com/).


