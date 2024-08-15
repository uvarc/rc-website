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
title = "BWA and UVA HPC"
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

For a GitHub reference, visit: https://github.com/lh3/bwa

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}


# Slurm Script Examples

## Creating a BWA Index for a Reference Genome
Index files are created with the `bwa index` command. A reference genome sequence in [FASTA format](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp) needs to be provided, e.g. `/scratch/$USER/bwaanalysis/refgenome.fa`

{{< pull-code file="/static/scripts/bwa.slurm" lang="no-highlight" >}}

## Alignment of Sequence Reads to a Reference Genome
BWA provides three basic alignment algorithms to align sequence reads to a reference genome, BWA-backtrack, BWA-SW, and BWA-MEM.  Below we show an example for using the BWA-MEM algorithm (command `bwa mem`), which can process short Illumina reads (70bp) as well as longer reads up to 1 MB.  The alignment output is saved in SAM file format.  The use of SAMtools on the HPC system is documented [here](/userinfo/hpc/software/samtools).  

**Specification of files**

+ Reference genome file: `/scratch/$USER/bwaanalysis/refgenome.fa`
+ Sequence read file 1: `/scratch/$USER/bwaanalysis/read1.fq`
+ Sequence read file 2: `/scratch/$USER/bwaanalysis/read2.fq`
+ Output Alignment (SAM file): `/scratch/$USER/bwaanalysis/aln-pe.sam`

```
#!/bin/bash
#SBATCH -A YOUR_ALLOCATION
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=16
#SBATCH --mem-per-cpu=9000
#SBATCH -p standard

# Run program
module purge
module load bwa
module list

cd /scratch/$USER/bwaanalysis

# using paired-ends reads from two .fq sequence files
bwa mem refgenome.fa read1.fq read2.fq -t $SLURM_CPUS_PER_TASK > aln-pe.sam
```
Notes:

+ The use of `-t $SLURM_CPUS_PER_TASK` to define the numbe of processing threads based on the numbe of requested cpu core (1 thread / cpu core). Follow the online [{{% software-name %}} documentation]({{< module-homepage >}}) to adjust parameters for aligning single-end reads.
+ The use of `--mem` and `--mem-per-cpu` options are mutually exclusive. Job scripts should specify one or the other but not both.

## **Using an Interactive Session to run BWA**
You should **_NOT_** do your computational processing on the head node. In order to obtain a login shell on a compute node, use the `ijob` command. 
```
ijob -N 1 -n 1 -A <YOUR_ALLOCATION> -p standard -c 20 --mem=20000
```
Replace `<YOUR_ALLOCATION>` with your account name to charge SUs. The arguments for `-c` and `--mem` options depend on the resources you will use for the alignment step. For more details about submitting interactive jobs please see [here](/userinfo/hpc/slurm).

### Load module
First, let us load the bwa module:
```
module load bwa
```
In order to check all available `bwa` commands run: 
```
bwa
```
If you wish to check various options for each command run: 
```
bwa index
```
```
bwa mem 
```






















