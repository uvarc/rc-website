+++
title = "HISAT2 on Ivy Windows VM"
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
&#42; *Please note that HISAT2 requires approval prior to installation on the VM*



HISAT2 is a fast and sensitive tool for aligning short reads against the general human population 
(as well as single reference genome). It indexes the genome using a Hierarchical Graph FM Index 
(HGFM) strategy, i.e. a large set of small indexes that collectively cover the whole genome
(each index representing a genomic region of 56 Kbp).

# HISAT2 Usage: 

Alignment using ```HISAT2``` is a 2-step process - indexing the reference genome, followed by aligning the sequence data.

1. Create indexes of your reference genome of interest stored in ```reference.fasta``` file: 
		hisat2-build [option(s)] <reference.fasta> <ht2-index-basename>
	This will create new files with the provided basename and extensions `*.ht2`. These files constitute the index.

2. Align paired-end reads ```sampleR1.fq``` and ```sampleR2.fq``` to the reference genome indexed in the previous step, using ```N``` cores:
		hisat2 -x <ht2-index-basename> -1 <sampleR1.fq> -2 <sampleR2.fq> -p <N> -S <output.sam>
	The alignment results in SAM format are written to the file ```output.sam```

## Note on using the ```--sra-acc``` option

Since Ivy VM’s do not allow outside connections, ```--sra-acc``` option will not work with HISAT2. 
If users plan to use SRA data, they will have to download it and move into Ivy prior to alignment.
Please refer to our [Globus user guide](/userinfo/globus) for help on how to do that.  

# More information

For detailed information, please refer to HISAT2 [manual](https://daehwankimlab.github.io/hisat2/manual/).


# Citation

If you use ```HISAT2``` for your work, please cite:
*Kim D, Langmead B and Salzberg SL. HISAT: a fast spliced aligner with low memory requirements. Nature Methods 2015*
