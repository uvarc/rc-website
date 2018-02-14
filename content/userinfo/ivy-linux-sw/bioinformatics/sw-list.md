+++
title = "Bioinformatics Packages on Ivy Linux VM"
description = ""
author = "SOMRC Staff"
images = [""]
categories = ["userinfo"]
tags = [
    "linux", 
    "ivy",
    "bioinformatics"
]
draft = false
date = "2018-02-01T17:45:12-05:00"
+++
# Available Packages
The following bioinformatics packages are available on the Ivy Linux Virtual Machines

## [Bowtie2](/userinfo/ivy-linux-sw/bioinformatics/bowtie2)
Bowtie 2 is an ultrafast and memory-efficient tool for aligning sequencing reads to long
reference sequences. It is particularly good at aligning reads of about 50 up to 100s or 1,000s
of characters, and particularly good at aligning to relatively long (e.g. mammalian) genomes. Bowtie 2 
indexes the genome with an FM Index to keep its memory footprint small: for the human genome,
its memory footprint is typically around 3.2 GB. Bowtie 2 supports gapped, local, and paired-end alignment modes.
[(source)](http://bowtie-bio.sourceforge.net/bowtie2/index.shtml)

For more information on bowtie2, please click [here] (/userinfo/ivy-linux-sw/bioinformatics/bowtie2)

## [HISAT2](/userinfo/ivy-linux-sw/bioinformatics/hisat2)


HISAT2 is a fast and sensitive alignment program for mapping next-generation sequencing reads (both DNA and
RNA) to a population of human genomes (as well as to a single reference genome). Based on an extension of BWT
for graphs [Sirén et al. 2014], we designed and implemented a graph FM index (GFM), an original approach and
its first implementation to the best of our knowledge. In addition to using one global GFM index that represents 
a population of human genomes, HISAT2 uses a large set of small GFM indexes that collectively cover the whole genome
(each index representing a genomic region of 56 Kbp, with 55,000 indexes needed to cover the human population).
These small indexes (called local indexes), combined with several alignment strategies, enable rapid and accurate
alignment of sequencing reads. This new indexing scheme is called a Hierarchical Graph FM index (HGFM). 
[(source)](https://ccb.jhu.edu/software/hisat2/index.shtml)

**NB**: Requires approval before installation. 

For more information on HISAT2, please click [here](/userinfo/ivy-linux-sw/bioinformatics/hisat2)

// ## [Cufflinks](/userinfo/ivy-linux-sw/bioinformatics/cufflinks)

// Cufflinks assembles transcripts, estimates their abundances, and tests for differential expression
// and regulation in RNA-Seq samples. It accepts aligned RNA-Seq reads and assembles the alignments 
// into a parsimonious set of transcripts. Cufflinks then estimates the relative abundances of these
// transcripts based on how many reads support each one, taking into account biases in library preparation protocols.
// [(source)](http://cole-trapnell-lab.github.io/cufflinks/)

// For more information on Cufflinks, please click [here](/userinfo/ivy-linux-sw/bioinformatics/cufflinks)