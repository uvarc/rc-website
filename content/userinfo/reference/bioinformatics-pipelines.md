+++

date = "2017-02-22T15:28:51-05:00"
description = ""
title = “Data Processing Trends in Genomics and Bioinformatics"
draft = false
tags = ["bioinformatics”,”genomics”,”pipeline”]
categories = ["reference"]
images = [""]
author = "SOMRC Staff"
type = "reference"

+++


The fast pace of innovation, data generation, and collaboration in genomics and bioinformatics has necessitated in new data processing frameworks. The innovations span from new experimental techniques and quantifying best practices for genomic experiments, to translational databases. Collaborative projects range from TCGA, 1000 Genomes, to 100,000 Genomes. Given the litany of questions that can be asked with each new dataset, the ever-increasing size of new data being generated, and the ever-increasing sizes of multidisciplinary teams working on a project, new computational tools aimed at streamlining pipeline building, collaboration, and analyzing are being built at a torrential pace. This tutorial is aimed at introducing bioinformatics researchers to some of the latest innovations in building pipelines on desktops, laptops, AWS, and HPC systems. The SOMRC team is glad to help researchers plan and setup their pipelines. 

For an overview of pipeline development and scripting innovations, see [here](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bib/PAP/10.1093_bib_bbw020/2/bbw020.pdf?Expires=1488129445&Signature=MBYVRsDIcB1Ytg3hcXjORfkK60hZbmbrSlF-SPaIHDaEHQtr4EGdrzjrey8Ql9q0pAHtP1yN8suduXS9SKzDAzhXd5Nz-kwjb7vVTFIlheRk35pYccLxBMM7Y9Lg2pw99ey2lCvpXrnJfuPGue8GJZg2QyavPSxjPWrvJph7pFWlaib6LxWMNqgj-swWhM1HmtBFV5ZGNPe7Ix9fYA1f6MckWlP47M5k2kBH0k79o6~ndnWeiEJPzj-K8L20beDLfgLVFfSOqGMOV7yVErJ7K4GGldLrs8GGoCQ5t3jZyATtrLJ3alUmy2uLn9B9~77O3kVsDWsRg6Q2hzLdCTavAw__&Key-Pair-Id=APKAIUCZBIA4LVPAVW3Q)

A number of tools are being built around the [StarCluster](http://star.mit.edu/cluster/) architecture. The StarCluster is an open-source framework that makes setting up computing clusters on AWS quite painless and efficient. The documentation is quite excellent with quick start guides and tutorials to get familiar with the architecture.

If a researcher wants to run an almost-set pipeline for RNA-Seq, ChIP-Seq, bcbio-nextgen and Omics Pipe are two solutions that provide easy setup, automated analysis, and easy maintenance of a pipeline. The pipeline can be set to take advantage of cluster resources by running on top of StarCluster. 

On the other hand, these pipelines are not easily customizable. The standard solution has been to write scripts stringing different programs together to develop a custom pipeline. With the explosion of analyses, there was a need to come up with new scripting frameworks. One such framework is the [bpipe](https://github.com/ssadedin/bpipe), that solves a bunch of problems involved in traditional scripting, including pinpointing failures, cleaning up failed runs, … The other development that is quite exciting is [BigDataScript](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4271142/) where the same script can be used for a pipeline on a desktop, HPC cluster, or AWS. That takes the work out of parallelizing and using multiple nodes and makes it very easy to migrate pipelines to new computing resources.

An exhaustive list of data processing pipelines being developed is available [here](https://github.com/pditommaso/awesome-pipeline).
