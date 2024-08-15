+++
author = "RC Staff"
description = ""
date = "2018-04-23T17:17:35-04:00"
title = "Basic Science Projects"
draft = true
tags = ["collaborations"]
categories = ["projects"]
images = ""
+++

<div class="bd-callout bd-callout-warning">
<p class=lead>School of Medicine Research Computing is engaged in multiple collaborative projects in support of basic science research. Below is a list of some recent collaborations in this area.</p>
</div>


# Microbiome Analysis of Hospital Sink Drains

Sink drains are notoriously characterized as reservoirs of pathogens causing nosocomial transmissions in hospitals worldwide. Outbreaks where sinks have been implicated as source of antibiotic resistant bacteria have upsurged over the last few years. To understand transmission dynamics University of Virginia School of Medicine has established a unique "Sink Lab" for this research. This one-of-the kind laboratory establishes UVa as worldwide frontrunners in investigating sink related antibiotic resistant bacteria and how they spread. RC is working with the UVa Sink Lab for genomic analysis of the sink biomass. 

RC is contributing to:

- Comparative genomic analysis of gram-negative bacterial isolates:
    The analysis aims at tracking the mobile genetic element blaKPC gene, which encodes for Klebsiella pneumoniae carbapenemase (KPC) enzyme that confers resistance to all beta lactam agents including penicillins, cephalosporins, monobactams and carbapenems. As a part of this project, whole-genome shotgun sequencing data for about 1500 bacterial isolates will be analyzed to assess the risk of acquisition of Carbapenemase producing Enterobacteriaceae from exposure to contaminated waste water premise plumbing.   
- Metagenomic analysis: 
    This project, under a contract for the Center for Disease Control and Prevention (CDC), aims at understanding the temporal dynamics of hospital sink microbiome. Taxonomic and functional analysis of whole metagenomic shotgun sequencing data from longitudinal sampling will shed light on the transfer and sustenance of high-risk antibiotic resistance genes in the hospital environments.

**PI: Amy Mathers ([Infectious Diseases](https://med.virginia.edu/infectious-diseases/) & [UVa Sink Lab](http://uvasinklab.org/))**

- - - 

# Genomic Locus Overlap Enrichment Analysis (LOLAweb)

The past few years have seen an explosion of interest in understanding the role of regulatory DNA. This interest has driven large-scale production of functional genomics data resources and analytical methods. One popular analysis is to test for enrichment of overlaps between a query set of genomic regions and a database of region sets. In this way, annotations from external data sources can be easily connected to new genomic data.

SOM Research Computing is working with faculty in the UVA Center for Public Health Genomics to implement LOLAweb, an online tool for performing genomic locus overlap annotations and analyses. This project, written in the statistical programming language R, allows users to specify region set data in BED format for automated enrichment analysis. LOLAweb provides interactive plots and annotated data based on specific reference genomes and region databases. 

*<http://lolaweb.databio.org/>*

*Manuscript under review*

**PI: Nathan Sheffield ([Center for Public Health Genomics](https://med.virginia.edu/cphg/))**

- - -

# PHACTR1 and Smooth Muscle Cell Behavior

Coronary artery disease (CAD) is the major cause of morbidity and mortality worldwide. Recent genome wide association studies (GWAS) have revealed more than 50 genomic loci that are associated with increased risk for CAD. However, the pathological mechanisms for the majority of the GWAS loci leading to increased susceptibility to this complex disorder are still unclear. RC is working with Redouane Aherrahrou (CPHG) who aims to study the impact of the CAD-associated genetic factors on the cellular and molecular SMC phenotypes. Support for this project has included preparation of scripts for programmatic data analyses, data visualization, statistical modeling, and assistance with use of the Rivanna high-performance computing cluster.

*Preliminary results were presented as a [poster at the 2016 International Vascular Biology Meeting](http://www.navbo.org/events/2-uncategorised/400-international-vascular-biology-meeting-2016).*

**PI: Redouane Aherrarou ([Center for Public Health Genomics](https://med.virginia.edu/cphg/))**

- - -

# Functional Connectome Fingerprinting

Functional magnetic resonance imaging (fMRI) can be used to assess functional activity in the brain and connectivity between different regions of interest (ROIs), and a functional connectome is a map of the interactions between ROIs. Previous research has shown that a functional connectome contains enough unique characteristics, not unlike a fingerprint, that it can be used for accurate identification of an individual subject from a large group. RC is working with the UVA Functional Neuroradiology Lab to perform this fingerprinting analysis for a wide variety of populations and to develop innovative ways to visualize the results.

**PI: Jason Druzgal ([Radiology and Medical Imaging](http://druzgallab.com))**

- - - 

# Sonomicrometry Signal Classification

Researchers are using sonomicrometry to study the biomechanics of the human brain. While at times the signals collected do not require any preprocessing, more frequently they do require some denoising or are too noisy to analyze. Currently, researchers are manually categorizing the quality of thousands of these sonomicrometry signals and preprocessing them individually. RC is helping researchers develop a machine learning model to classify the signals and to determine the necessary preprocessing steps.

Preliminary sonomicrometry data have been collected, and RC is working to classify, prepare, and normalize the data for use in a machine learning model. RC is currently developing preliminary models to classify the data by signal quality and preprocess automation techniques that will later be applied to noisy signals.

**PI: Matthew Panzer ([Center for Applied Biomechanics](http://www.centerforappliedbiomechanics.org/))**

- - -

# epihet

RC is working with researchers in the Center for Public Health Genomics to write an R package to calculate Relative Proportion of Sites with Intermediate Methylation (RPIM) scores, which represent the epigenetic heterogeneity in a bisulfite sequencing sample.

*<https://github.com/databio/epihet>*

**PI: Nathan Sheffield ([Center for Public Health Genomics](https://med.virginia.edu/cphg/))**

- - -

# Transcription factor-chromatin Binding Dynamics

Two important measures of the in vivo interaction of transcription factors with chromatin are the search time and the residence time. The former refers to the time it takes a factor to find its binding location, while the latter is the time the factor physically attaches to the chromatin. By quantifying the interaction dynamics of transcription factors, researchers hope to understand the role of these factors in basic cellular processes such as transcription and gene regulation. The RC team is working with collaborators from UVA and the NIH to understand the dynamics of the Gal4 protein in yeast. The project involves quantitatively analyzing ChIP-qPCR data, writing and running non-linear regression and statistical routines in Mathematica, and developing numerical simulations to determine the error bounds on the kinetic parameters. 

**PI: Stefan Bekiranov ([Biochemistry and Molecular Genetics](https://bmg.med.virginia.edu))**

