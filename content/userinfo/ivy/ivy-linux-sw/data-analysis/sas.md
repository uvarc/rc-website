+++
title = "UVa Licensed SAS on the Ivy Linux VM"
description = ""
author = "RC Staff"
images = [""]
categories = ["userinfo"]
date = "2018-02-01T00:45:12-05:00"
tags = [
    "ivy", 
    "software",
    "data analysis",
    "linux"
]
draft = false
+++

# SAS Overview

SAS is a command-driven software package used for statistical analysis
and data visualization. It is available in .
It is one of the most widely used statistical software packages in both industry and academia.
You may use it if you have a large number of statistical algorithms. It is not limited to an industry,
and could be used in both scientific and non-scientific contexts. We only offer the Teaching & Research version
at the moment. 

## Common Usage

For this example we will use a common scenario from SAS Clinical Standards Toolkit, which is used for supporting clinical
research activities. The SAS Clinical Standards Toolkit initially focuses on standards defined by the Clinical Data 
Interchange Standards Consortium (CDISC). CDISC is a global, open, multidisciplinary, nonprofit organization that 
has established standards to support the acquisition, exchange, submission, and archival of clinical research data and metadata. 

### Starting SAS

Open a terminal window and type ```sas```.

### Getting a list of all installed standards
	
	%cst_getregisteredstandards(
	_cstOutputDS=work.regStds
	);

### Creating Data Sets Used by the Framework

	%cst_createdsfromtemplate(
    _cstStandard=CST-FRAMEWORK,
    _cstType=control,
    _cstSubType=reference,
    _cstOutputDS=work.sasrefs
    );


## Licensing

We have a limited number of SAS Licenses available, which are provided on a first-come-first-serve basis. 
As a consequence, availability of SAS on your VM is not always guaranteed once a VM request is submitted.
Please consult with us before requesting SAS. 

## More information

For more information on SAS, please consult its official documentation [here](http://support.sas.com/documentation/)
You may obtain the Administration version of SAS from the UVA Software Gateway portal [here](http://its.virginia.edu/software/displayPackages.php?tId=12)



