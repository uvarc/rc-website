+++
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2019-06-23T08:37:46-05:00"
tags = [
  "programming"
]
draft = false
modulename = "perl"
softwarename = "Perl"
shorttitle = "Perl"
title = "Perl on Rivanna"
description = "Python in Rivanna's HPC environment"
author = "RC Staff"

+++
# Overview
Perl is a general-purpose interpreted programming language, originally developed for text manipulation and now used for a wide range of tasks including system administration, web development, network programming, GUI development, and bioinformatics.

# Perl on Rivanna
The default Perl is required for system purposes and is generally too old for applications. We offer more recent versions of Perl as modules. To see all available versions, run
```
module spider perl
```

{{% module-versions tags="lang" %}}

To load the {{< module-firstversion >}} module, run this command:
```
module load {{< module-firstversion >}}
```

# Example SLURM Script
```
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -t 01:00:00
#SBATCH -o output_filename
#SBATCH -p standard
#SBATCH -A mygroup

module load perl

perl myscript.pl
```
