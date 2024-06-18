+++
title = "Bowtie2 on Ivy Windows VM"
description = ""
date = "2018-02-01T17:45:12-05:00"
author = "RC Staff"
images = [""]
categories = ["userinfo"]
tags = [
    "windows", 
    "bioinformatics",
    "software"
]
draft = false
+++

Bowtie2 is a memory-efficient tool for aligning short sequences to long reference genomes.
It indexes the genome using FM Index, which is based on Burrows-Wheeler Transform algorithm,
to keep its memory footprint small. Bowtie2 supports gapped, local and paired-end alignment modes.
Alignment to a known reference using Bowtie2 is often an essential first step in a myriad of NGS analyses workflows. 

## Bowtie2 Usage 

**Alignment** using bowtie2 is a 2-step process - indexing the reference genome, followed by aligning the sequence data.

1. Create indexes of your reference genome of interest stored in ```reference.fasta``` file:

		bowtie2-build [option(s)] <reference.fasta> <bt2-index-basename>

	This will create new files with the provided basename and extensions ```.1.bt2```, ```.2.bt2```, ```.3.bt2``` and 
```.4.bt2```, ```.rev.1.bt2``` and ```.rev.2.bt2```. 

	These files constitute the index.

2. Align paired-end reads ```sampleR1.fq``` and ```sampleR2.fq``` to the reference genome indexed in the previous step, using ```N``` cores:

		bowtie2 -x <bt2-index-basename> -1 <sampleR1.fq> -2 \

		<sampleR2.fq> -p <N> -S <output.sam>

The alignment results in SAM format are written to the file ```output.sam```

# More Information 

For more information, please refer to the Bowtie2 [manual](https://bowtie-bio.sourceforge.net/bowtie2/manual.shtml).


# Citation

If you use ```bowtie2``` for your work, please cite:

*Langmead B, Salzberg S. Fast gapped-read alignment with Bowtie 2. Nature Methods. 2012, 9:357-359*