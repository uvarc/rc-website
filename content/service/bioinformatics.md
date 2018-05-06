+++
author = "SOMRC Staff"
description = ""
title = "Bioinformatics & Genomics"
date = "2017-01-31T09:48:06-05:00"
draft = false
tags = ["bioinformatics","genomics"]
categories = ["services"]
images = [""]
+++

<p class=lead>School of Medicine Research Computing (SOMRC) provides state-of-the-art resources and expertise in handling and analyzing genomics and metagenomics data. Bioinformatics is a quickly evolving field with new biological and computational techniques being formalized and adopted at a fast pace. Hence, the following is only a brief cross-section of the ways researchers can use SOMRC’s expertise and computing resources for their bioinformatics research.</p>

<hr size=1 style="padding-bottom:10px;" />


# Next-generation sequence data analyis

SOMRC can support in-depth analysis of various next-generation sequencing experiment datasets on your desktop/[Rivanna](https://arcs.virginia.edu/rivanna)/[Ivy](/userinfo/ivy/)/[Cloud](/service/cloud/). Typical analyses include (but not limited to) – 

* Genome assembly, reference-based and/or de-novo
* Whole-Genome/Exome sequence analysis for variant calling/annotation
* RNA-Seq data analysis to quantify, discover and profile RNAs
* Mircobiome data analysis, including 16S rRNA surveys, OTU clustering, microbial profiling, taxonomic and functional analysis from whole shotgun metagenomic/metatranscriptomic datasets
* Epigenetic analysis from BSAS/ChIP-Seq/ATAC-Seq

In addition to above-mentioned generic cookie cutter analyses, SOMRC can work with you to provide customized bioinformatics solutions for specific research goals.

We can advise and collaborate on the various experimental stages, from experimental design, to data processing/analysis/visualization/exploration, as well as downstream statistical modeling for biological insights.  

<hr size=1 style="padding-bottom:10px;" />


# Computing Platforms

UVA has two local HPC facilities available to researchers: **Rivanna** and **Ivy**. In addition, **Cloud**-based services offer computing enviroment for running flexible, scalable on-demand applications. SOMRC can work with your team to determine the computing platform best suited for your research project.  

<div class="card">
  <div class="card-block">
    <h4 class="card-title">Rivanna</h4>
    <h6 class="card-subtitle mb-2 text-muted">High-performance Computing Cluster</h6>
    <p class="card-text">
	All faculty, research staff and graduate students of UVA have access to Rivanna, university's high-performance computing system with 290+ compute nodes (6500+ cores) for high-throughput multithreaded jobs, parallel jobs as well as memmory intensive large-scale data analyses. The architecture is specifically suited for large scale distributed genomic data analysis, with <a href="https://arcs.virginia.edu/software-list" style="color:#0275d8";>100+</a> bioinformatics software packages installed and ready to use.   
    </p>
	<a href="https://arcs.virginia.edu/rivanna" class="card-link" target="_blank"><button class="btn  btn-primary">Learn more</button></a>
  </div>
</div>

<div style="height:40px;"></div>

<div class="card">
  <div class="card-block">
    <h4 class="card-title">Ivy</h4>
    <h6 class="card-subtitle mb-2 text-muted">High-Security / HIPAA Computing</h6>
    <p class="card-text">
	Ivy is a HIPAA compliant cluster at UVA with Domino Data Lab, Hadoop, R, Python, and other computational software to work with sensitive data. Researchers have access to a group of bioinformatics software on Ivy Linux VM.  
    </p>
	<a href="/userinfo/ivy/" class="card-link"><button class="btn  btn-primary">Learn more</button></a>
  </div>
</div>

<div style="height:40px;"></div>

<div class="card">
  <div class="card-block">
    <h4 class="card-title">Cloud Computing</h4>
    <p class="card-text">
	We can explore the possibility of using cloud infrastucture (AWS/GCP) for your bioinformatics analysis and data storage. For certain applications, the 'elasticity' of cloud computing may prove beneficial for saving time and reducing costs of data analysis and sharing. The SOMRC team is available for consultation on your project needs.      
    </p>
	<a href="/service/cloud/" class="card-link"><button class="btn  btn-primary">Learn more</button></a>
  </div>
</div>

<div style="height:40px;"></div>

<hr size=1 style="padding-bottom:10px;" />


# Workflow Development

Bioinformatics analyses invariably involve chaining a series of tools/processes/functions etc. across many input samples to go from raw data to biologically interpretable results. Using a workflow management system to setup, execute and monitor pipelines makes it simpler to put together such complex scientific workflow. SOMRC is using [WDL](https://gatkforums.broadinstitute.org/wdl/) (pronounced *widdle*), a workflow definition language for describing tasks and workflows, and [Cromwell](http://cromwell.readthedocs.io/en/develop/), the execution engine that can run the WDL scripts locally or on the cloud. Cromwell provides an abstraction layer between the pipeline's logic and execution, so that it can be executed on multiple platforms with minimal configuration changes. We are using the built-in scatter-gather parallelism features to develop variant calling WDL workflows, adhering to [GATK Best Practices](https://software.broadinstitute.org/gatk/best-practices/), and executing them on Rivanna using Cromwell. In the future, we also plan to transition these pipelines to Google Cloud Platform, for more cost-effective execution solutions. 

<a href="https://discuss.rc.virginia.edu/tags/c/rivanna/software/bioinformatics" class="card-link"><button class="btn  btn-primary">WDL/Cromwell on Rivanna</button></a>

<hr size=1 style="padding-bottom:10px;" />


# Long-term collaborations

We warmly welcome long-term collaborations with experimentalists and computational biologists. Working with biologists we can chart out experimental design, come up with controls, and think about statistical and computational analyses so the experiment is designed to extract the most value from the data. We can also build and maintain code and pipelines, as well as test new algorithms on multi-core and multi-node architectures.

<hr size=1 style="padding-bottom:10px;" />


# Consulting

If you have a bioinformatics project and would like to discuss potential solutions and implementation locally, or on the cloud, SOMRC is available for consultation. 

[<button class="btn  btn-primary">Request a Consultation</button>](/service/consult/)

<hr size=1 style="padding-bottom:10px;" />


# Training

SOMRC offers interactive workshops that focus on various aspects of bioinformatics. We typically make use of Rivanna to teach participants how to analyze large amounts of high-throughput sequencing data. To learn more and register for workshops, please visit the CADRE Academy education platform.

[<button class="btn  btn-primary">Find a Workshop</button>](/education/workshops/)
