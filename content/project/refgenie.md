+++
title = "Refgenie: A Reference Genome Resource Manager"
description = ""
date = "2020-02-23T14:33:50-05:00"
author = "RC Staff"
images = "/images/projects/refgenie-project.png"
categories = ["projects"]
tags = [
  "bioinformatics",
  "containers",
  "docker",
  "cphg",
  "python"
]
draft = false
projecttype = ["basic-science", "tools"]
publications = [{authors = "Michal Stolarczyk, Vincent P. Reuter, Jason P. Smith, Neal E. Magee, Nathan C. Sheffield", title = "Refgenie: a reference genome resource manager", journal = "GigaScience", year = "2020", doi = "10.1093/gigascience/giz149"}]
+++

Reference genome assemblies are essential for high-throughput sequencing analysis projects. Typically, genome assemblies are stored on disk alongside related resources; e.g., many sequence aligners require the assembly to be indexed. The resulting indexes are broadly applicable for downstream analysis, so it makes sense to share them. However, there is no simple tool to do this.

Refgenie is a reference genome assembly asset manager. Refgenie makes it easier to organize, retrieve, and share genome analysis resources. In addition to genome indexes, refgenie can manage any files related to reference genomes, including sequences and annotation files. Refgenie includes a command line interface and a server application that provides a RESTful API, so it is useful for both tool development and analysis.

RC staff supported this project through its design phase, underlying infrastructure and final deployment of a Refgenie server within containers, which are attached to reference data in high performance storage.

<http://refgenie.databio.org/>

**PI: Nathan Sheffield ([Center for Public Health Genomics](https://med.virginia.edu/cphg/))**
