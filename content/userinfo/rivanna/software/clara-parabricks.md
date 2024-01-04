+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
  "bioinformatics"
]
date = "2024-01-02T00:00:00-05:00"
tags = [
  "lang",
  "programming",
]
draft = false
modulename = "clara-parabricks"
softwarename = "clara-parabricks"
shorttitle = "Clara Parabricks"
title = "Nvidia Clara Parabricks"
description = "GPU-enabled bioinformatics on Rivanna"
author = "RC Staff"
+++

# Overview

[Nvidia Clara Parabricks](https://docs.nvidia.com/clara/) is a GPU-accelerated software suite for performing secondary analysis of next generation sequencing (NGS) DNA and RNA data. It contains GPU-enabled versions of popular bioinformatics tools such as the aligners [BWA-Mem](https://www.rc.virginia.edu/userinfo/rivanna/software/bwa/) and STAR.

# Loading the container
On Rivanna, Clara Parabricks is available as an Apptainer container.  To load the `clara-parabricks` container module, you can type:

```
module load apptainer clara-parabricks
```

The load command will load a default version of Clara Parabricks, unless another version is specified.  To see the available versions, type:

```
module spider clara-parabricks
```


# Running Clara Parabricks tools

The Clara Parabricks container on Rivanna includes many bioinformatics tools for genomics and transcriptomics. Each tool must be accessed using the Apptainer `run` command to activate the container, followed by the Clara Parabricks `pbrun` command to call the designated tool, followed by arguments specific to each tool. See below for an example using the `fq2bam` pipeline tool, which does a `BWA-Mem` alignment, sorts reads by coordinates, marks duplicate reads with `GATK MarkDuplicates`, and optionally generates a `BQSR` report. 


{{< pull-code file="/static/scripts/parabricks_fq2bam.slurm" lang="no-highlight" >}}


## Notes on `fq2bam` Slurm script:
- Replace `<allocation>` with your allocation name.
- The apptainer flag `--nv` enables Nvidia GPU support inside the container.
- The apptainer flag `-B` binds a directory into the container. 
	+ In this case, we are binding the present working directory (`$PWD`) into both `/workdir` and `/outputdir` inside the container.
- The variable `$CONTAINERDIR` is defined by the container module - you do not need to assign it a value. This line in the script points the apptainer `run` command to the appropriate `.sif` file to call the desired container.
- The `pbrun` command tells Clara Parabricks you want to run the subsequent tool (in this case, `fq2bam`).
- The arguments following `pbrun fq2bam` are specific to the Clara Parabricks tool being used. See the `fq2bam` [reference](https://docs.nvidia.com/clara/parabricks/documentation/tooldocs/man_fq2bam.html) for more detailed information on these arguments.
	+ In this case, the reference fasta file (`Homo_sapiens_assembly38.fasta`) and fastq data files (`sample_1.fq.gz` and `sample_2.fq.gz`) were downloaded ahead of time and stored in the referenced subdirectories. You should change these paths and file names as needed to point to your specific reference fasta and data files.
- This script should be saved in a file, called (for example) `job.slurm`.  To run your job, you would submit the script by typing `sbatch job.slurm`.


