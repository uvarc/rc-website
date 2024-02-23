+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2024-02-14T00:00:00-05:00"
tags = [
  "programming"
]
draft = false
modulename = "perl"
softwarename = "Perl"
shorttitle = "Perl"
title = "Perl on Rivanna"
description = "Perl in Rivanna's HPC environment"
author = "RC Staff"

+++
# Overview
Perl is a general-purpose interpreted programming language, originally developed for text manipulation and now used for a wide range of tasks including system administration, web development, network programming, GUI development, and bioinformatics.

# Available Versions
The default Perl is required for system purposes and is generally too old for applications. We offer more recent versions of Perl as modules. To find the available versions and learn how to load them, run:
```
module spider {{% module-name %}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# CPAN Modules

Users can install their own Perl modules from CPAN via the `cpanm` command. For instance:

```
cpanm Test::More
```

Run `cpanm --help` for further help.

# Example Slurm Script
```
#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -t 01:00:00
#SBATCH -o output_filename
#SBATCH -p standard
#SBATCH -A mygroup

module load gcc perl

perl myscript.pl
```
