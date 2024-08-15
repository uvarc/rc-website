+++

date = "2017-02-22T15:28:51-05:00"
description = ""
title = "Data Processing Trends in Genomics and Bioinformatics"
draft = true
tags = ["bioinformatics","genomics"]
categories = ["reference"]
images = [""]
author = "RC Staff"
type = "reference"

+++


The fast pace of innovation, data generation, and collaboration in genomics and bioinformatics has necessitated in new data processing frameworks. This guide is aimed at introducing bioinformatics researchers to some of the latest innovations in pipeline development on desktops, AWS, and HPC systems. The number of tools available to researchers and the pros and cons of each can be somewhat daunting. This post is a minimalistic introduction that serves as a quick reference to the state-of-the-art. 

There are three major categories of data processing innovations happening in the bioinformatics community. One is to string together known tools and best practices in packages that can be run with little programming from the researcher. The other is to come up with scripting languages that can be used to develop a fully custom pipeline. Scripting languages provide advantages that range from determining failure points in the pipeline to automating resource management. The third is in a way a hybrid of the two, where the pipelines can be customized to an extent, but also don't need significant programming from the researcher.

As an important aside, a number of pipeline packages are being built around the [StarCluster](http://star.mit.edu/cluster/) architecture. StarCluster is an open-source library that makes setting up computing clusters on AWS quite painless and efficient. The documentation is quite excellent with quick start guides and tutorials to get familiar with the architecture.  

# Prebuilt Pipelines

Most of the Next-Gen analyses revolve around conducting analyses using the best practices codified over time. For RNA-Seq, ChIP-Seq, cancer variant calling, etc. bcbio-nextgen and Omics Pipe are two solutions that provide easy setup, automated analysis, and easy maintenance of a pipeline. The pipeline can be set to take advantage of cluster resources by running on the StarCluster. 

# Scripting Languages

Packaged pipelines such as bcbio-nextgen and Omic Pipe are not fully customizable without significant coding. The standard solution has been to write scripts (such as using Shell) stringing programs together to develop a custom pipeline. Producing production quality pipelines through Shell scripting, again, requires significant coding, and hence, the need for new scripting frameworks. One such framework is [bpipe](https://github.com/ssadedin/bpipe) which solves a few problems involved in traditional scripting, including pinpointing failures, cleaning up failed runs, and the difficulties associated with modifying a pipeline. One other development framework that attempts to simplify the process of writing pipelines for different computing architectures is [BigDataScript](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4271142/). Scripts written in BigDataScripts can be used on a desktop, HPC cluster, or AWS without material modifications. This simplifies the task of running pipelines on multiple computing resources.

# "Hybrid" Pipelines

The poster child for hybrid pipelines is the [Galaxy toolkit](https://galaxyproject.org). Galaxy is a web-based interface that lets researchers combine genomic tools in a flexible graphical way without programming the dependencies and failure conditions themselves. The learning curve for Galaxy is short, and the toolkit covers a wide range of cases where no more programming would be required, but is not geared for researchers looking for a fully-customizable solution.

# Further Resources

For an overview of pipeline development and scripting innovations, see [here](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bib/PAP/10.1093_bib_bbw020/2/bbw020.pdf?Expires=1488129445&Signature=MBYVRsDIcB1Ytg3hcXjORfkK60hZbmbrSlF-SPaIHDaEHQtr4EGdrzjrey8Ql9q0pAHtP1yN8suduXS9SKzDAzhXd5Nz-kwjb7vVTFIlheRk35pYccLxBMM7Y9Lg2pw99ey2lCvpXrnJfuPGue8GJZg2QyavPSxjPWrvJph7pFWlaib6LxWMNqgj-swWhM1HmtBFV5ZGNPe7Ix9fYA1f6MckWlP47M5k2kBH0k79o6~ndnWeiEJPzj-K8L20beDLfgLVFfSOqGMOV7yVErJ7K4GGldLrs8GGoCQ5t3jZyATtrLJ3alUmy2uLn9B9~77O3kVsDWsRg6Q2hzLdCTavAw__&Key-Pair-Id=APKAIUCZBIA4LVPAVW3Q).

An exhaustive list of data processing pipelines being developed is available [here](https://github.com/pditommaso/awesome-pipeline).

