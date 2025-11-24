+++
title = "Drosophila Evolution through Space and Time 2.0"
description = ""
author = "RC Staff"
date = "2025-03-11"
images = "/images/projects/dest.jpg"
caption = "Artwork by Roberto Torres, CC BY"
categories = ["projects"]
tags = [
  "bioinformatics",
  "data",
  "hpc",
  "parallel-computing"
]
draft = false
projecttype = ["hpc-computing", "tools", "basic-science", "dac"]
publications = [{authors = "Martin Kapun, Joaquin C B Nunez, María Bogaerts-Márquez, Jesús Murga-Moreno, Margot Paris, Joseph Outten, …, Alan O Bergland", title = "Drosophila Evolution over Space and Time (DEST): A New Population Genomics Resource", journal = "Molecular Biology and Evolution", volume = "38", issue = "12", month="December", year = "2021", pages = "5782–5805", doi = "10.1093/molbev/msab259"}, 
{authors = "Joaquin C B Nunez, Marta Coronado-Zamora, Mathieu Gautier, Martin Kapun, Sonja Steindl, Lino Ometto, …, Alan O Bergland, Josefa Gonzalez", title = "Footprints of Worldwide Adaptation in Structured Populations of Drosophila melanogaster Through the Expanded DEST 2.0 Genomic Resource", journal = "Molecular Biology and Evolution", volume = "42", issue = "8", month="August", year = "2025", pages = "1-28", doi = "10.1093/molbev/msaf132"}]
+++

Evolutionary biologists use population-based DNA sequencing to gain insight into the nature of adaptation, genetic diversity, and organismal form and function.  When collecting DNA data, scientists are often sample limited because of the logistical challenges of collecting DNA from wild individuals across large portions of a species range.  This can be mitigated when groups of scientists work together to create data and then share it with the larger community.  [The Bergland Lab](https://www.bergland-lab.org/) has been a central participant in developing and maintaining [DEST](https://dest.bio/) (“Drosophila Evolution through Space and Time”), a large (~10TB) repository of Drosophila melanogaster population genomic data which has been processed and standardized.  The DEST dataset is a unique, spatially resolved, genomic time-series dataset for one of the premier model organisms in genetics. 

UVA’s Research Computing has been the primary host for the DEST dataset and bioinformatics pipeline since 2020.  Users access data through a combination of an http-passthrough, Globus, and a [website](https://dest.bio/).  The website has been viewed nearly 5,000 times by over 2,500 unique visitors since its launch in 2020 and has been used by members of the broader research community in dozens of published research projects.

The Bergland Lab is working on a new version of the DEST dataset (DEST 2.0) that includes genomic data for over 50,000 flies from 500 population-based samples collected at ~100 localities throughout the world, with many localities sampled through time for upwards of a decade.  Research Computing’s Data Analytics Center supported this work by debugging and streamlining one of the main parallel processes in the bioinformatics pipeline to efficiently use UVA HPC. 
  
**PI: Alan Bergland, PhD (Department of Biology)**

