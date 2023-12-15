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
date = "2023-12-15T00:00:00-05:00"
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

Many bioinformatics Python packages are now maintained and available for the popular Anaconda Python distribution. Python packages for the Anaconda distribution are distributed through a variety of different bundles, called channels. The bioconda channel is specifically set up for the maintenance and distribution of popular bioinformatics packages.

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

To view an up-to-date list of the Python packages provided by a particular bioconda module, load the bioconda module and run the conda list command. For example:
```
module load bioconda
conda list | grep bioconda
```
The environment contains a large number of packages, most of them to support the software of interest in bioinformatics. The `grep` command filters the Python package list to only show the Bioconda channel packages. The output may look like this:

```
# packages in environment at /apps/software/standard/core/bioconda/py3.10:
bcftools                  1.17                 h3cc50cf_1    bioconda
cyvcf2                    0.30.22         py310hcf1fb4a_0    bioconda
deeptools                 3.5.2              pyhdfd78af_1    bioconda
deeptoolsintervals        0.1.9           py310h8472f5a_5    bioconda
entrez-direct             16.2                 he881be0_1    bioconda
hisat2                    2.2.1                hdbdd923_6    bioconda
hmmer                     3.3.2                hdbdd923_4    bioconda
homer                     4.11            pl5262h9f5acd7_8    bioconda
htseq                     2.0.3           py310h5aa3a86_1    bioconda
htslib                    1.17                 h81da01d_2    bioconda
k8                        0.2.5                hdcf5f25_4    bioconda
kallisto                  0.50.0               hc877fd6_0    bioconda
minimap2                  2.26                 he4a0461_1    bioconda
multiqc                   1.15               pyhdfd78af_0    bioconda
munkres                   1.0.7                      py_1    bioconda
ngmlr                     0.2.7                hdcf5f25_6    bioconda
nseg                      1.0.1                h031d066_4    bioconda
perl-...
py2bit                    0.3.0           py310h4b81fae_8    bioconda
pybigwig                  0.3.22          py310h79000e5_1    bioconda
pysam                     0.21.0          py310h41dec4a_1    bioconda
pyspoa                    0.0.10          py310h0dbaff4_0    bioconda
python-edlib              1.3.9           py310h0dbaff4_4    bioconda
recon                     1.08                 h031d066_6    bioconda
repeatmasker              4.1.5           pl5321hdfd78af_0    bioconda
repeatmodeler             1.0.8                         0    bioconda
repeatscout               1.0.6                hec16e2b_3    bioconda
rmblast                   2.14.0               h4565617_2    bioconda
salmon                    1.10.2               hecfa306_0    bioconda
samtools                  1.17                 hd87286a_1    bioconda
stringtie                 2.2.1                h6b7c446_4    bioconda
subread                   2.0.6                he4a0461_0    bioconda
svim                      2.0.0              pyhdfd78af_0    bioconda
trf                       4.09.1               h031d066_4    bioconda
twobitreader              3.1.7              pyh864c0ab_1    bioconda
```
