+++
title = "BART Web"
author = "RC Staff"
categories = ["projects"]
tags = ["tools","containers","hpc","scripts","architecture","code","cphg","docker"]
images = "/images/projects/bart-web.png"
description = ""
date = "2021-10-22T17:18:27-04:00"
draft = false
audio = true
projecttype = ["basic-science", "tools", "containers"]
publications = [{authors = "Wenjing Ma, Zhenjia Wang, Yifan Zhang, Neal E Magee, Yayi Feng, Ruoyao Shi, Yang Chen, Chongzhi Zang", title = "BARTweb: a web server for transcriptional regulator association analysis", journal = "NAR Genomics and Bioinformatics", year = "2021", volume = 3, issue = 2, month = "June", doi = "10.1093/nargab/lqab022"}]
+++

## BART (Binding Analysis for Regulation of Transcription) Web

Working with researchers in the [Zang Lab](http://faculty.virginia.edu/zanglab/) in the Center for Public Health Genomics 
(CPHG), RC helped launch BARTweb,
an interactive web-based tool for users to analyze their Genelist or ChIP-seq datasets. BARTweb is a containerized
Flask front-end (written in Python) that ingests files and submits them to a more robust Python-based genomics pipeline 
running on Rivanna, UVA's high performance computing cluster (HPC). This architecture -- of a public web application that 
uses a supercomputer to process data -- is a new model for UVA, and one that eases the learning curve for researchers who 
may not have access to an HPC system or the expertise to run a BART pipeline in the command-line.

http://bartweb.org/

**PI: Chongzhi Zang ([Center for Public Health Genomics](https://med.virginia.edu/cphg/))**

