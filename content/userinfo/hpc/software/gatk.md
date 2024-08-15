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
modulename = "gatk"
softwarename = "GATK"
title = "GATK and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}

<br>

**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

For a GitHub reference, visit: https://github.com/broadinstitute/gatk

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


**Note**: Make sure to invoke GATK using the **`gatk`** wrapper script rather than calling the jar directly, because the wrapper will select the appropriate jar file (there are two!) and will set some parameters for you.

For help on using `gatk` itself, run 
```
gatk --help
```
To print a list of available tools, run 
```
gatk --list
```
To print help for a particular tool, run
```
gatk ToolName --help
```
# General Syntax 
To run a GATK tool locally, the syntax is:
```
gatk ToolName toolArguments
``` 

# Basic Usage Examples
Below are few trivial examples of using GATK4 tools in single-core mode.  

## 1. **[PrintReads](https://gatk.broadinstitute.org/hc/en-us/categories/360002369672)**
PrintReads is a generic utility tool for manipulating sequencing data in SAM/BAM format. 

In order to print all reads that have a mapping quality above zero in 2 input BAMs (say - `input1.bam` and `input2.bam`) and write the output to `output.bam`.
```
gatk PrintReads \
        -I input1.bam \
        -I input2.bam \
        -O output.bam \
        --read_filter MappingQualityZero
``` 

## 2. **[HaplotypeCaller](https://gatk.broadinstitute.org/hc/en-us/categories/360002369672)**
The HaplotypeCaller is capable of calling SNPs and indels simultaneously via local de-novo assembly of haplotypes in an active region.

Basic syntax for variant-only calling on DNAseq.
```
gatk --java-options "-Xmx4g" HaplotypeCaller \
        -R reference.fasta \
        -I sample1.bam [-I sample2.bam ...] \
        [--dbsnp dbSNP.vcf] \ 
        [-strand_call_conf 30] \
        [-L targets.interval_list] \ 
        -o output.raw.snps.indels.vcf
```
Note: Here, we are setting the maximum Java **heap** size to 4GB. This argument varies based on the volume of data at-hand. 

**Note:** If you are working with human reference genome, please refer the local genome repository on Rivanna at `/project/genomes/Homo_sapiens/` for the `reference.fasta`, as well as the corresponding GATK data bundle at `/project/genomes/Homo_sapiens/GATK_bundle/`, for resource files like the `dbSNP`, `hapmap`, `1000G`. No need to download them to your working directory. 

**For example:** if you were to run `HaplotypeCaller` on reference-aligned BAMs for 3 samples (say - `sample1-hg38.bam`, `sample2-hg38.bam` and `sample3-hg38.bam`), accessing files from the Rivanna genomes repository.
```
gatk --java-option "-Xmx4g" HaplotypeCaller \
        -R /project/genomes/Homo_sapiens/UCSC/hg38/Sequence/WholeGenomeFasta/genome.fa \
        -I sample1-hg38.bam \
        -I sample2-hg38.bam \
        -I sample3-hg38.bam \
        --dbsnp /project/genomes/Homo_sapiens/GATK_bundle/hg38/dbsnp_146.hg38.vcf.gz \ 
        -strand_call_conf 30 \
        -o output.raw.snps.indels.vcf
```
The output will be written to the file - `output.raw.snps.indels.vcf`, in the [Variant Call Format](https://samtools.github.io/hts-specs/VCFv4.2.pdf).

# Parallelism in GATK4 

The concepts involved and their application within GATK are well explained in this [article](https://gatk.broadinstitute.org/hc/en-us/articles/360035532012-Parallelism-Multithreading-Scatter-Gather9). 

+ In GATK3, there were two options for tools that supported multi-threading, controlled by  the arguments `-nt/--num_threads` and `-nct/--num_cpu_threads_per_data_thread`.
+ In GATK4, tools take advantage of an open-source industry-standard [Apache Spark](https://spark.apache.org/) software library.  

## Spark-enabled GATK tools

**Not all GATK tools use Spark.** Check the respective Tool Doc to make sure of Spark-capabilities.

Briefly; Spark is a piece of software that GATK4 uses to do multithreading, which is a form of parallelization that allows a computer (or cluster of computers) to finish executing a task sooner. You can read more about multithreading and parallelism in GATK [here](https://gatk.broadinstitute.org/hc/en-us/articles/360035532012).

The "sparkified" versions have the suffix "Spark" at the end of their names. Many of these are still experimental; please carefully check for expected output, and validate against non-spark tools.

**You DO NOT need a Spark cluster to run Spark-enabled GATK tools!** 

While working on a compute node (with multiple CPU cores), the GATK engine can use Spark to create a virtual standalone cluster in place, for its multithreaded processing. 

## "local"-Spark Usage Example: 
The `PrintReads` tool we explored above has a Spark version called: `PrintReadsSpark`. In order to set up a local Spark environment to run the same job using 8 threads, we can use the `--spark-master` argument. 
```
gatk PrintReadsSpark \
    --spark-master local[8] \
    -I input1.bam \
    -I input2.bam \
    -O output.bam \
    --read_filter MappingQualityZero
```
**Note:** Make sure to request for 8 CPU cores before executing the above command, either by starting an interactive session using `ijob` or by submitting the job via a Slurm batch submission script. 

Below is an example `gatk-printReadsSpark.slurm.sh` batch submission script for the above job. 

{{< pull-code file="/static/scripts/gatk.slurm" lang="no-highlight" >}}

**Note:** replace `<YOUR_ALLOCATION>` with your allocation group.

To submit the job.
```
sbatch gatk-printReadsSpark.slurm.sh
```
To monitor the progress of the job.
```
jobq 
OR
squeue -u <mst3k> # replace <mst3k> with your computing ID.
```
 
