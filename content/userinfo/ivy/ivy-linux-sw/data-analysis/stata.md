+++
title = "User Licensed Stata on Ivy Linux VMs"
description = ""
author = "RC Staff"
images = [""]
date = "2018-02-01T00:45:12-05:00"
categories = ["userinfo"]
tags = [
    "Ivy", 
    "Linux",
    "Software",
    "Data Analysis"
]
draft = false
+++

# Stata Overview

Stata is a graphical data analysis tool developed by StataCorp, and is short for *Statistics and Data*. It 
is used in various disciplines, including biomedicine, economics, epidemiology, among others. It is capable
of performing statistical analysis, simulations, regression, and data management. Besides the standard version
Stata also ships with the *MP* version (multi=processing), and *SE* for large databases. 

{{% callout %}}
<b>Users requesting an installation of Stata are required to provide their own license.</b> Please consult with us before
requesting an installation. 
{{% /callout %}}

You may also request a Stata license from the [UVa Software Gateway](http://its.virginia.edu/software/displayPackages.php?tId=18)

## Installing programs from SSC

Please first run the following commands to use the proxy:

```
set httpproxy on
set httpproxyhost "figgis-s.hpc.virginia.edu"
set httpproxyport 8080
```

You can now install new packages with the `ssc install` command.
