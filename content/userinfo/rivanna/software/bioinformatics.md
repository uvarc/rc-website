+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2019-06-23T08:37:46-05:00"
tags = ["bio"
]
draft = false
shorttitle = "Bioinformatics"
title = "Bioinformatics on Rivanna"
description = "Bioinformatics Software in Rivanna's HPC environment"
author = "RC Staff"

+++
# Overview

Many commonly used bioinformatics software packages on Rivanna are available as individual modules or as Python packages bundled in the bioconda modules.


# General considerations

Most bioinformatics software packages are designed to run on a single compute node with varying support for multi-threading and utilization of multiple cpu cores. Accordingly, the SLURM job scripts should contain the following two SBATCH directives:
```
#SBATCH -N 1                    # request single node
#SBATCH --cpus-per-task=<X>     # request multiple cpu cores
```
Replace `<X>` with the actual number of cpu cores to be requested. Requesting more than 8 cpu cores does not provide any significant performance gain for many bioinformatics packages. This is a limitation due to code design rather than a Rivanna constraint.

You should only deviate from this general resource request format if you are absolutely certain that the software package supports execution on more than one compute node.  


# Available Bioinformatics Software

To get an up-to-date list of the installed bioinformatics applications, log on to Rivanna and run the following command in a terminal window:
```
module keyword bio
```

To get more information about a specific module version, run the module spider command, for example:
```
module spider bcftools/1.3.1
```

<br>

**List of Bioinformatics Software Modules**

{{< rivanna-software tags="bio" >}}

# Using a Specific Software Module

To use a specific software package, run the `module load` command. The `module load` command in itself does not execute any of the programs but only prepares the environment, i.e. it sets up variables needed to run specific applications and find libraries provided by the module.

After loading a module, you are ready to run the application(s) provided by the module. **For example:**
```
module load bcftools/1.3.1
bcftools --version
```
Output:
```
bcftools 1.3.1
Using htslib 1.3.1
Copyright (C) 2016 Genome Research Ltd.
License GPLv3+: GNU GPL version 3 or later
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

# Bioconda Python packages

Many bioinformatics Python packages are now maintained and available for the popular Anaconda Python distribution. Python packages for the Anaconda distribution are maintained in a variety of different bundles, called channels. The bioconda channel is specifically set up for the maintenance and distribution of  popular bioinformatics packages. On Rivanna, we offer two bioconda modules, one using Python 2.7 and the other using Python 3.6.

To see the list of available bioconda modules, run the module spider command:
```
module spider bioconda
```
Output:
```
-------------------------------------------------------------------------
bioconda:
-------------------------------------------------------------------------
    Description:
      Bioconda is a channel for the conda package manager specializing in bioinformatics software.

     Versions:
        bioconda/py2.7
        bioconda/py3.6
```


The `bioconda/py2.7` and `bioconda/py3.6` modules are backed by Anaconda distributions using Python 2.7 and Python 3.6, respectively.  To view an up-to-date list of the Python packages provided by a particular bioconda module, load the bioconda module and run the conda list command. For example:
```
module load bioconda/py2.7
conda list | grep bioconda
```
The grep command filters the Python package list to only show the Bioconda channel packages. The output may look like this:

```
# packages in environment at /apps/software/standard/core/bioconda/py2.7:
bcftools                  1.9                  h4da6232_0    bioconda
biopython                 1.68                np110py27_1    bioconda
htslib                    1.9                  hc238db4_4    bioconda
kallisto                  0.44.0               h7d86c95_2    bioconda
libdeflate                1.0                  h470a237_0    bioconda
macs2                     2.1.1.20160309   py27h7eb728f_3    bioconda
mmtf-python               1.0.2                    py27_0    bioconda
pybigwig                  0.3.12           py27hdfb72b2_0    bioconda
salmon                    0.11.2               h445c947_0    bioconda
samtools                  1.9                  h46bd0b3_0    bioconda
```
Note that not all bioinformatics packages have been ported from Python 2.7 to Python 3 yet.  So if you cannot find a specific Python Package in the `bioconda/py3.6` module, it is worthwhile checking the `bioconda/py2.7` module.

# Reference Genomes on Rivanna

Research Computing maintains a set of ready-to-use reference sequences and annotations for commonly analyzed organisms in a convenient, shared storage location on Rivanna.

The majority of files have been downloaded from Illumina's genomes repository (<a href="https://support.illumina.com/sequencing/sequencing_software/igenome.html" target="blank">iGenomes</a>), which contain assembly builds and corresponding annotations from Ensembl, NCBI and UCSC. Each genome directory contain index files of the whole genome for use with aligners like BWA and Bowtie2. In addition, STAR2 index files have been generated for each of *Homo Sapiens* (human) and *Mus musculus* (mouse) genomic builds.


**Rivanna storage PATH for your genome and index files of interest:**

Select a genome of interest and view location of its reference sequence and index files on Rivanna.
{{% reference-genomes %}}
