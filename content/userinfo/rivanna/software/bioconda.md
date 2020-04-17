+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
  "bioinformatics"
]
date = "2020-04-03T14:27:46-05:00"
tags = ["bio"
]
draft = false
modulename = "bioconda"
softwarename = "Bioconda"
shorttitle = "Bioconda"
title = "The Bioconda Environment on Rivanna"
description = "Bioconda Software in Rivanna's HPC environment"
author = "RC Staff"

+++

# Bioconda Python packages

Many bioinformatics Python packages are now maintained and available for the popular Anaconda Python distribution. Python packages for the Anaconda distribution are distributed through a variety of different bundles, called channels. The bioconda channel is specifically set up for the maintenance and distribution of popular bioinformatics packages. On Rivanna, we offer two bioconda modules, one using Python 2.7 and the other using Python 3.6.

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}



The `bioconda/py2.7` and `bioconda/py3.6` modules are backed by Anaconda distributions using Python 2.7 and Python 3.6, respectively.

To view an up-to-date list of the Python packages provided by a particular bioconda module, load the bioconda module and run the conda list command. For example:
```
module load bioconda/py3.6
conda list | grep bioconda
```
Each environment contains a large number of packages, most of them to support the software of interest in bioinformatics; the grep command filters the Python package list to only show the Bioconda channel packages. The output may look like this:

```
# packages in environment at /apps/software/standard/core/bioconda/py3.6:
bcftools                  1.9                  h5c2b69b_6    bioconda
cyvcf2                    0.10.0           py36h355e19c_0    bioconda
deeptools                 3.1.2            py36h470a237_0    bioconda
hisat2                    2.1.0            py36h2d50403_1    bioconda
hmmer                     3.2.1                hf484d3e_1    bioconda
homer                     4.9.1           pl526h2d50403_6    bioconda
htseq                     0.9.1            py36h7eb728f_2    bioconda
htslib                    1.9                  ha228f0b_7    bioconda
kallisto                  0.44.0               h7d86c95_2    bioconda
libdeflate                1.0                  h14c3975_1    bioconda
minimap2                  2.17                 h84994c4_0    bioconda
multiqc                   1.6              py36h24bf2e0_0    bioconda
ngmlr                     0.2.7                he860b03_1    bioconda
perl-archive-tar          2.32                    pl526_0    bioconda
perl-carp                 1.38                    pl526_3    bioconda
perl-compress-raw-bzip2   2.087           pl526he1b5a44_0    bioconda
perl-compress-raw-zlib    2.087           pl526hc9558a2_0    bioconda
perl-exporter             5.72                    pl526_1    bioconda
perl-exporter-tiny        1.002001                pl526_0    bioconda
perl-extutils-makemaker   7.36                    pl526_1    bioconda
perl-io-compress          2.087           pl526he1b5a44_0    bioconda
perl-io-zlib              1.10                    pl526_2    bioconda
perl-list-moreutils       0.428                   pl526_1    bioconda
perl-list-moreutils-xs    0.428                   pl526_0    bioconda
perl-pathtools            3.75            pl526h14c3975_1    bioconda
perl-scalar-list-utils    1.52            pl526h516909a_0    bioconda
perl-xsloader             0.24                    pl526_0    bioconda
py2bit                    0.3.0            py36h14c3975_2    bioconda
pybigwig                  0.3.12           py36hdfb72b2_0    bioconda
pysam                     0.15.3           py36hda2845c_1    bioconda
recon                     1.08                 h470a237_1    bioconda
repeatmasker              4.0.7                  pl526_13    bioconda
repeatmodeler             1.0.11                  pl526_1    bioconda
repeatscout               1.0.5                h470a237_1    bioconda
rmblast                   2.6.0                h4422958_0    bioconda
salmon                    0.11.2               h445c947_0    bioconda
samtools                  1.9                 h8571acd_11    bioconda
simplejson                3.8.1                    py36_0    bioconda
stringtie                 1.3.4                    py36_0    bioconda
svim                      0.4.4                      py_0    bioconda
trf                       4.09                          1    bioconda
twobitreader              3.1.7                      py_0    bioconda
```
Note that not all bioinformatics packages have been ported from Python 2.7 to Python 3 yet.  So if you cannot find a specific Python Package in the `bioconda/py3.6` module, it is worthwhile to check the `bioconda/py2.7` module.
