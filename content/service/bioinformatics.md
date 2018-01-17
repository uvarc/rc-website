+++
author = "SOMRC Staff"
description = ""
title = "Genomics"
date = "2017-01-31T09:48:06-05:00"
draft = false
tags = ["bioinformatics","genomics"]
categories = ["services"]
images = [""]

+++

<p class=lead>School of Medicine Research Computing (SOMRC) provides state-of-the-art resources and expertise in handling and analyzing genomics and bioinformatics data. Bioinformatics is a quickly evolving field with new biological and computational techniques being formalized and adopted at a fast pace. Hence, the following is only a brief cross-section of the ways researchers can use SOMRC’s expertise and computing resources for their bioinformatics research. Please contact SOMRC with your computational questions and needs.</p>

<hr size=1 />

# Next-generation sequence data analyis

SOMRC can support in-depth analysis of various next-generation sequencing experiment datasets on your desktop/Rivanna/Ivy/AWS. Typical analyses include (but not limited to) – 
  <ul>
   <li>Genome assembly, reference-based and/or de-novo</li>
   <li>Whole Genome/Exome Sequence analysis for variant calling/annotation</li>
   <li>RNA-Seq data analysis to quantify, discover and profile RNAs</li>
   <li>Mircobiome data analysis, including 16S rRNA surveys, OTU clustering, microbial profiling, taxonomic and functional analysis from whole shotgun metagenomic/metatranscriptomic datasets</li>
   <li>Epigenetic analysis from BSAS/ChIP-Seq/ATAC-Seq</li>
  </ul>

In addition to above-mentioned generic cookie cutter analyses, SOMRC can work with you to provide customized bioinformatics solutions for specific research goals.

We can advise and collaborate on the various experimental stages, from experimental design, to data processing/analysis/visualization/exploration, as well as downstream statistical modeling for biological insights.  

For a comprehensive list of bioinformatics tools pre-installed on Rivanna [click here](https://arcs.virginia.edu/software-list). We can work with you, and the [ARCS  team](https://arcs.virginia.edu/), to install additional project-specific applications. 

# AWS Cloud

AWS cloud infrastructure provides a few benefits over desktop computing for genomics and bioinformatics research. In the simplest form, a computing node and storage can be rented from Amazon for your analysis instead of maintaining a desktop. Diving a little deeper, [AWS](https://aws.amazon.com/health/genomics/) provides capabilities to setup clusters of nodes for fast processing of data, scaling up or down the computing resources according to your analysis needs, using the latest machine learning tools, and working on data from widely-accessed public repositories including TCGA. New analysis and computational tools designed specifically for genomics and bioinformatics are quickly being built around the AWS architecture including the [StarCluster](http://www.oliverelliott.org/article/computing/tut_bio_aws/) (cluster computing), [Omics Pipe](http://omics-pipe.readthedocs.io/en/latest/about.html) (RNA-Seq, ChIP-Seq), and [Bcbio-nextgen](http://bcbio-nextgen.readthedocs.io/en/latest/contents/pipelines.html) (RNA-Seq, cancer variant calling, and ChIp-Seq). The SOMRC team can help you explore the benefits and uses of AWS cloud, export your data, set up bioinformatics pipelines, and devise computational strategies for downstream analyses.

# Ivy and Rivanna High Performance Computing

Ivy is a HIPAA compliant cluster at UVA with Domino Data Lab, Hadoop, R, Python, and other computational software. Rivanna is a large cluster of CPUs and GPUs with extensive bioinformatics, image analysis, and data analysis tools. Like AWS, Rivanna and Ivy can be used either for multithreading on a single node, or for creating a cluster of nodes. This parallelism leads to faster genomic analyses, especially with large data sets. Some of the most widely used bioinformatics tools, e.g., the [GATK](https://software.broadinstitute.org/gatk/guide/article.php?id=1988) can employ multithreading and scatter-gather for fast SNP variant calling. In addition, Ivy’s Hadoop installation can be used for Big Data genomics research when the problem and analysis can be setup to fully take advantage of Hadoop. The access and billing structures for Ivy, Rivanna, and AWS are different, and we can help you choose the best solution for your research goals and budget. 


# Long-term collaborations
We warmly welcome long-term collaborations with experimentalists and computational biologists. Working with biologists we can chart out experimental design, come up with controls, and think about statistical and computational analyses so the experiment is designed to extract the most value from the data. We can also build and maintain code and pipelines, as well as test new algorithms on multi-core and multi-node machines.


# New Research Lines
We are actively exploring and researching new computational techniques that can reap big rewards in genomics and bioinformatics. Our particular focus is on machine learning, especially deep learning, and big data architectures, especially Hadoop and Spark.
