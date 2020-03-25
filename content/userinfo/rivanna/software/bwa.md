 +++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "bio"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
]
draft = false
modulename = "bwa"
softwarename = "BWA"
title = "BWA on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
BWA provides three alignment algorithms:

+ BWA-backtrack
+ BWA-SW
+ BWA-MEM

The BWA-backtrack algorithm is exclusively used for short sequence reads up to 100bp, the latter two can be used for sequence reads of up to 1MB.  The BWA-MEM algorithm can also be used for high-quality short Illumina sequence reads (< 100bp) in many cases with better performance compared to the original BWA-backtrack algorithm.  Therefore, the more universal BWA-MEM algorithm is recommended as a starting point for most alignment scenarios.

Before any of the alignment algorithms can be used, a FM-index needs to be constructed for the reference genome (see below).

<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions and learn how to load them, run:
<pre>module spider {{% module-name %}}</pre>

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
<pre>module spider {{% module-firstversion %}}</pre>

{{% module-versions %}}

# SLURM Script Examples

## Creating a BWA Index for a Reference Genome
Index files are created with the `bwa index` command. A reference genome sequence in FASTA format needs to be provided, e.g. `/scratch/$USER/bwaanalysis/refgenome.fa`

```
#!/bin/bash
#SBATCH -A YOUR_ACCOUNT
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --mem=64000
#SBATCH -p standard

#Run program
module purge
module load bwa
module list

cd /scratch/$USER/bwaanalysis

# reference in FASTA format
bwa index refgenome.fa
```

## Alignment of Sequence Reads to a Reference Genome
BWA provides three basic alignment algorithms to align sequence reads to a reference genome, BWA-backtrack, BWA-SW, and BWA-MEM.  Below we show an example for using the BWA-MEM algorithm (command bwa mem), which can process short Illumina reads as well as longer reads up to 1 MB.  The alignment output is saved in SAM file format.  The use of SAMtools on Rivanna is documented [here](/userinfo/rivanna/software/samtools).  

**Specification of files**

+ Reference genome file: `/scratch/$USER/bwaanalysis/refgenome.fa`
+ Sequence read file 1: `/scratch/$USER/bwaanalysis/read1.fq`
+ Sequence read file 2: `/scratch/$USER/bwaanalysis/read2.fq`
+ Output Alignment (SAM file): `/scratch/$USER/bwaanalysis/aln-pe.sam`

```
#!/bin/bash
#SBATCH -A YOUR_ACCOUNT
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=16
#SBATCH --mem-per-cpu=6000
#SBATCH -p standard

#Run program
module purge
module load bwa
module list

cd /scratch/$USER/bwaanalysis

# using paired-ends reads from two .fq sequence files
bwa mem refgenome.fa read1.fq read2.fq -t $SLURM_CPUS_PER_TASK > aln-pe.sam
```
Note the use of `-t $SLURM_CPUS_PER_TASK` to define the numbe of processing threads based on the numbe of requested cpu core (1 thread / cpu core). Follow the online [{{% software-name %}} documentation]({{< module-homepage >}}) to adjust parameters for aligning single-end reads.

### Start an interactive session 
You should **_NOT_** do your computational processing on the head node. In order to obtain a login shell on a compute node, use the `ijob` command - 
```
ijob -A <ACCOUNT> -p standard -c 20 --mem=20gb
```
replace `<ACCOUNT>` with your account name to charge SUs. The arguments for `-c` and `--mem` options depend on the resources you will use for the alignment step!

### Load module
First, lets make bwa executable available to you:
```
module load bwa
```
In order to check all available `bwa` commands: 
```
bwa
```
If you wish to check various options for each command: 
```
bwa index
```
```
bwa mem 
```






















