+++
images = [""]
author = "Staff"
description = ""
date = "2018-06-06T15:18:25-05:00"
title = "LOLAweb"
draft = false
tags = ["projects","lolaweb"]
categories = ["post"]

+++

From his lab in the Center for Public Health Genomics at UVa, [Nathan Sheffield](http://databio.org/) seeks to develop a deeper understanding of functional genomics. Dr. Sheffield and his collaborators study epigenetic mechanisms, including DNA methylation, which can involve analyzing enrichment of genomic region set data. By identifying patterns of enriched genomic regions, one can differentiate between normal and diseased gene regulation. Dr. Sheffield builds on this research focus as well as a history of open-source software development with the publication of [LOLAweb: A containerized web server for interactive genomic locus overlap enrichment analysis](https://academic.oup.com/nar/advance-article/doi/10.1093/nar/gky464/5033529) as part of a special web server issue of *Nucleic Acids Research*. 

<!-- <img src="http://lolaweb.databio.org/LOLAweb-logo-cropped.png" style="max-width:50%;float:right;" />The paper introduces [LOLAweb](https://github.com/databio/LOLAweb), a web interface for genomic region or locus enrichment analysis. Dr. Sheffield collaborated with RC to conceptualize, develop and deploy the application. LOLAweb facilitates automated identification of enriched regions based on input regions of interest. Users upload the region data in BED format and specify the data for comparison, including the reference genome, a background region set and an annotation source. On the back-end the application scores the overlapping loci, and the results display regions of interest with significant overlap, along with annotated metadata. -->

The LOLAweb methodology for locus overlap analysis is derived from the LOLA R package, which was written and developed by Dr. Sheffield. Since its publication in 2016, LOLA has been cited in [several dozen publications](https://scholar.google.com/scholar?start=0&hl=en&as_sdt=0,47&sciodt=0,47&cites=17868268594021089948&scipsc=), and is currently in the top 20% of packages downloaded from the [Bioconductor repository](http://bioconductor.org/packages/stats/bioc/LOLA/). These citations and downloads demonstrate the variety of scientific use-cases for quantifying overlap and enrichment for regions of interest. 

According to Dr. Sheffield, restricting the locus overlap analysis methods to a purely programmatic interface may prove to be a barrier for some biologists. However, by teaming with RC to create LOLAweb, the functionality from LOLA will become more accessible to the research community, thus allowing more researchers to develop new hypotheses. LOLAweb closely mirrors LOLA, providing users graphical drop-downs and inputs to upload their data. The application also features data visualizations that are not available in the original package. RC has also helped design LOLAweb with a flexible deployment, which includes a feature to cache results so that users can bookmark or share output with colleagues. 

The collaboration between Dr. Sheffield and RC staff is not the first, nor will it be the last. In 2017, RC staff contributed to the simpleCache R package and co-authored a resulting publication in the [*Journal of Open Source Software*](http://joss.theoj.org/papers/ff76fd08aa8082e1e3e5e52ad2f44a47).  RC is also currently working with Sheffield Lab members to optimize [containerized data analysis pipelines](https://github.com/databio/pypiper) and develop new [software packages](https://github.com/databio/epihet). 

<div class="bd-callout bd-callout-warning">
<p>Read more: <a style="font-weight:bold;" href="https://academic.oup.com/nar/advance-article/doi/10.1093/nar/gky464/5033529" target="_new">LOLAweb: A containerized web server for interactive genomic locus overlap enrichment analysis</a>.</p>
<p>Visit LOLAweb: <a style="font-weight:bold;" href="https://github.com/databio/LOLAweb" target="_new">http://lolaweb.databio.org/</a></p>

</div>
