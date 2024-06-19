+++
title = "LOLAweb"
author = "RC Staff"
categories = ["projects"]
tags = [
  "bioinformatics",
  "containers",
  "docker",
  "r",
  "cphg",
  "shiny"]
images = "/images/projects/LOLAweb-logo-square.png"
description = ""
date = "2020-02-23T14:33:50-05:00"
draft = false
audio = true
projecttype = ["basic-science", "tools", "containers"]
publications = [{authors = "Nagraj VP, Magee NE, Sheffield NC", title = "LOLAweb: a containerized web server for interactive genomic locus overlap enrichment analysis", journal = "Nucleic Acids Research", year = "2018", doi = "10.1093/nar/gky464"}]

+++

The past few years have seen an explosion of interest in understanding the role of regulatory DNA. This interest has driven large-scale production of functional genomics data resources and analytical methods. One popular analysis is to test for enrichment of overlaps between a query set of genomic regions and a database of region sets. In this way, annotations from external data sources can be easily connected to new genomic data.

SOM Research Computing is working with faculty in the UVA Center for Public Health Genomics to implement LOLAweb, an online tool for performing genomic locus overlap annotations and analyses. This project, written in the statistical programming language R, allows users to specify region set data in BED format for automated enrichment analysis. LOLAweb provides interactive plots and annotated data based on specific reference genomes and region databases. 

<!-- <http://lolaweb.databio.org/> -->
<https://github.com/databio/LOLAweb/>

**PI: Nathan Sheffield ([Center for Public Health Genomics](https://med.virginia.edu/cphg/))**
