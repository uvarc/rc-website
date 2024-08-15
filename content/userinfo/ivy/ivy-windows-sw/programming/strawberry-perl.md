+++
title = "Preinstalled Strawberry Perl on Ivy Windows VM"
description = ""
author = "RC Staff"
date = "2023-02-23T15:45:12-05:00"
images = [""]
categories = ["userinfo"]
tags = [
    "Perl", 
    "windows",
    "ivy"
]
draft = false
+++

# Perl

Our VMs have Strawberry Perl 5.24 available as part of the Windows 
VM, as of the last writing. Licensed as open source under the GPL, it is most often used 
to develop mission critical software, and has excellent integration
with markup languages such as HTML, XML, amongst others. Since it is both Object-Oriented and procedural, it could be used within a multitude
of programming projects. It includes built in database integration via
its DBI module. Other than DBI, it has thousands of modules, making it
one of the most extensible languages. Due to its interpreted nature, 
Perl is similar to Python and would be easy to understand for those 
familiar with Python.

## Running Perl code

Strawberry Perl has an interactive interpreter, available under Start>
All Programs> Strawberry Perl. Perl commands could be executed by simply typing
```perl -e <perl_code_goes here>```. E.g. to print a number:
	perl -e 'print 10'
the ```-e``` flag is simply to denote that the code is not a file, but code
itself. To run a Perl script, do the following:
	perl <script_name_goes_here>

## Installing modules 

Since Ivy VM's do not allow outward connections to CPAN's website, you would have to
install perl modules using the procedure below:

1. Check if ```CPAN``` is installed and configured on your VM by typing ```cpan``` into a terminal
window:
	cpan
+ If it asks you if CPAN needs to be configured, type ```yes```
+ Once it is configured, type ```cpan``` to enter the CPAN shell
+ In a browser from outside the Ivy VM, search for the proper name of the Perl module you wish to download
	search.cpan.org
+ E.g. if you want to install the MySQL driver for Perl, type 
	install DBD::MySQL
This would start the installation of the module. Ivy is able to download modules from CPAN using this method. 

&#42; *You could manually install a module from its compressed file, once you have transferred the file 
into Ivy. However, using the process above downloads the module's dependencies as well.*  

## Verifying if a module is installed

Run the following command after installing your module :
	
	perldoc -l DBD::mysql
(e.g. if you installed ```DBD::mysql```)
It should output a path to the installed module. 

## More Information
For more information on Strawberry Perl, please visit the [**official website**](http://strawberryperl.com/support.html).
