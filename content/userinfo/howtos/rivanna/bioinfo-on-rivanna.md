+++
type = "howto"
author = "Staff"
description = ""
title = "Bioinformatics Resources and UVA HPC"
date = "2020-11-17T09:48:06-05:00"
draft = false
tags = ["bioinformatics","genomics", "rivanna","tools"]
categories = ["howto"]
images = [""]
+++

{{% lead %}}
The UVA research community has access to numerous bioinformatics software installed directly or available through the [bioconda](/userinfo/hpc/software/bioconda) Python modules.
Click [here](/userinfo/hpc/software/bioinformatics#full-list-of-bioinformatics-software-modules) for a comprehensive list of currently-installed bioinformatics software.
{{% /lead %}}

# Popular Bioinformatics Software

Below are some popular tools and useful links for their documentation and usage:

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;}
.tg .tg-hy9w{background-color:#eceeef;border-color:inherit;vertical-align:middle;}
.tg .tg-dc35{background-color:#f9f9f9;border-color:inherit;vertical-align:middle;}
.tg .tg-hy9w-nw{background-color:#eceeef;border-color:inherit;vertical-align:middle;white-space:nowrap;}
.tg .tg-dc35-nw{background-color:#f9f9f9;border-color:inherit;vertical-align:middle;white-space:nowrap;}
.tg .tg-0qmj{font-weight:bold;background-color:#eceeef;border-color:inherit;vertical-align:middle;}

.scroll thead, .scroll tbody {display: block}
.scroll tbody {overflow-y: auto; height: 500px;}
.scroll thead tr:after {content: '';overflow-y: scroll; visibility: hidden; height: 0;}
</style>

<div class="input-group mb-3">
  <div class="input-group-prepend" style="padding:5px">
    <span><i class="fa fa-search fa-1x"></i></span>
  </div>
  <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for tools..">
</div>

<div>
<table id="myTable" class="tg scroll">
  <thead>
  <tr>
    <th class="tg-0qmj" style="width:65px">Tool</th>
    <th class="tg-0qmj" style="width:67px">Version</th>
    <th class="tg-0qmj" style="width:500px">Description</th>
    <th class="tg-0qmj" style="width:105px">Useful Links</th>
  </tr>
  </thead>

  <tbody>
  <tr>
    <td class="tg-dc35" style="width:65px"><font color="#bd4147">BEDTools</font></td>
    <td class="tg-dc35" style="width:67px">2.26.0</td>
    <td class="tg-dc35" style="width:500px">BEDTools utilities allow one to intersect, merge, count, complement, and shuffle genomic intervals from multiple files in widely-used genomic file formats such as BAM, BED, GFF/GTF, VCF.</td>
	<td class="tg-dc35-nw" style="width:105px">
      <a href="http://bedtools.readthedocs.io/en/latest/" target="blank" style="color:#0275d8">Homepage</a><br/>
      <a href="http://quinlanlab.org/tutorials/bedtools.html" target="blank" style="color:#0275d8">Tutorial</a><br/>
    </td>
  </tr>
  <tr>
    <td class="tg-hy9w" style="width:65px"><font color="#bd4147">BLAST+</font></td>
    <td class="tg-hy9w" style="width:67px">2.7.1</td>
    <td class="tg-hy9w" style="width:500px">BLAST+ is a suite of command-line tools that offers applications for BLAST search, BLAST database creation/examination, and sequence filtering.</td>
	<td class="tg-hy9w-nw" style="width:105px">
      <a href="https://blast.ncbi.nlm.nih.gov/Blast.cgi" target="blank" style="color:#0275d8">Web BLAST</a><br/>
      <a href="https://www.ncbi.nlm.nih.gov/books/NBK279690/" target="blank" style="color:#0275d8">Manual</a><br/>
    </td>
  </tr>
  <tr>
    <td class="tg-dc35" style="width:65px"><font color="#bd4147">BWA</font></td>
    <td class="tg-dc35" style="width:67px">0.7.17</td>
    <td class="tg-dc35" style="width:500px">BWA is a software package for mapping low-divergent sequences against a large reference genome, such as the human genome. It consists of three algorithms: BWA-backtrack, BWA-SW and BWA-MEM</td>
	<td class="tg-dc35-nw" style="width:105px">
      <a href="http://bio-bwa.sourceforge.net/" target="blank" style="color:#0275d8">Homepage</a><br/>
      <a href="http://bio-bwa.sourceforge.net/bwa.shtml" target="blank" style="color:#0275d8">Manual</a><br/>
    </td>
  </tr>
  <tr>
    <td class="tg-hy9w" style="width:65px"><font color="#bd4147">Bowtie2</font></td>
    <td class="tg-hy9w" style="width:67px">2.2.9</td>
    <td class="tg-hy9w" style="width:500px">Bowtie2 is a memory-efficient tool for aligning short sequences to long reference genomes.</td>
	<td class="tg-hy9w-nw" style="width:105px">
      <a href="http://bowtie-bio.sourceforge.net/index.shtml" target="blank" style="color:#0275d8">Homepage</a><br/>
      <a href="http://bowtie-bio.sourceforge.net/manual.shtml" target="blank" style="color:#0275d8">Manual</a><br/>
  </tr>
  <tr>
    <td class="tg-dc35" style="width:65px"><font color="#bd4147">FastQC</font></td>
    <td class="tg-dc35" style="width:67px">0.11.5</td>
    <td class="tg-dc35" style="width:500px">FastQC is a Java application that generates a comprehensive quality control report for raw sequencing data.</td>
	<td class="tg-dc35-nw" style="width:105px">
      <a href="https://www.bioinformatics.babraham.ac.uk/projects/fastqc/" target="blank" style="color:#0275d8">Homepage</a><br/>
      <a href="https://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/" target="blank" style="color:#0275d8">Documentation</a><br/>
    </td>
  </tr>
  <tr>
    <td class="tg-hy9w" style="width:65px"><font color="#bd4147">GATK</font></td>
    <td class="tg-hy9w" style="width:67px">4.0.0.0</td>
    <td class="tg-hy9w" style="width:500px">The Genome Analysis Toolkit provide tools for variant discovery. In addition to SNP and INDEL identification in germline DNA and RNAseq data, GATK tools include somatic short variant calling, as well as tackle copy number and structural variation.</td>
	<td class="tg-hy9w-nw" sytle="width:105px">
      <a href="https://software.broadinstitute.org/gatk/documentation/" target="blank" style="color:#0275d8">User Guide</a><br/>
  </tr>
  <tr>
    <td class="tg-dc35" style="width:65px"><font color="#bd4147">Picard</font></td>
    <td class="tg-dc35" style="width:67px">2.1.1</td>
    <td class="tg-dc35" style="width:500px">Picard is a set of command line tools for manipulating high-throughput sequencing (HTS) data and formats such as SAM/BAM/CRAM and VCF.</td>
	<td class="tg-dc35-nw" style="width:105px">
      <a href="https://broadinstitute.github.io/picard/" target="blank" style="color:#0275d8">Homepage</a><br/>
      <a href="https://broadinstitute.github.io/picard/command-line-overview.html" target="blank" style="color:#0275d8">Documentation</a><br/>
    </td>
  </tr>
  <tr>
    <td class="tg-hy9w" style="width:65px"><font color="#bd4147">SAMTools</font></td>
    <td class="tg-hy9w" style="width:67px">1.7</td>
    <td class="tg-hy9w" style="width:500px">SAMTools provide various utilities for manipulating alignments in the SAM format, including sorting, merging, indexing and generating alignments in a per-position format.</td>
	<td class="tg-hy9w-nw" style="width:105px">
      <a href="http://samtools.sourceforge.net/" target="blank" style="color:#0275d8">Homepage</a><br/>
      <a href="http://www.htslib.org/doc/samtools.html" target="blank" style="color:#0275d8">Manual</a><br/>
  </tr>
  <tr>
    <td class="tg-dc35" style="width:65px"><font color="#bd4147">SPAdes</font></td>
    <td class="tg-dc35" style="width:67px">3.10.1</td>
    <td class="tg-dc35" style="width:500px">SPAdes provide pipelines for assembling genomes from Illumina and IonTorrent reads, as well as hybrid assemblies using PacBio, Oxford Nanopore and Sanger reads. It supports paired-end reads, mate-pairs and unpaired reads. </td>
	<td class="tg-dc35-nw" style="width:105px">
      <a href="http://bioinf.spbau.ru/spades" target="blank" style="color:#0275d8">Homepage</a><br/>
      <a href="https://bioinf.spbau.ru/en/spadesmanual" target="blank" style="color:#0275d8">Manual</a><br/>
    </td>
  </tr>
  <tr>
    <td class="tg-hy9w" style="width:65px"><font color="#bd4147">STAR</font></td>
    <td class="tg-hy9w" style="width:67px">2.5.3a</td>
    <td class="tg-hy9w" style="width:500px">Spliced Transcripts Alignment to a Reference (STAR) is a RNA-seq aligner based on an algorithm that uses sequential maximum mappable seed search in uncompressed suffix arrays followed by seed clustering and stitching procedure.</td>
	<td class="tg-hy9w-nw" style="width:105px">
      <a href="https://github.com/alexdobin/STAR" target="blank" style="color:#0275d8">Homepage</a><br/>
  </tr>
  <tr>
    <td class="tg-dc35" style="width:65px"><font color="#bd4147">vsearch</font></td>
    <td class="tg-dc35" style="width:67px">2.7.1</td>
    <td class="tg-dc35" style="width:500px">VSEARCH (stands for Vectorized Search) is a toolkit for nucleotide sequence analyses, including database search and clustering algorithms. It supports clustering, chimera detection, database searching, merging of paired-end reads, and other sequence manipulation tools.</td>
	<td class="tg-dc35-nw" style="width:105px">
      <a href="https://github.com/torognes/vsearch" target="blank" style="color:#0275d8">Homepage</a><br/>
    </td>
  </tr>
  </tbody>
</table>
</div>

<script>
function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
</script>

# Bioinformatics Modules

To get an up-to-date list of the installed bioinformatics applications, log on to UVA HPC and run the following command in a terminal window:
```
module keyword bio
```

If you know which package you wish to use, you can look for it with
```
module spider <software>
```
For example,
```
module spider bcftools
```
This returns
```
----------------------------------------------------------------------------
  bcftools:
----------------------------------------------------------------------------
    Description:
      SAMtools is a suite of programs for interacting with high-throughput
      sequencing data. BCFtools - Reading/writing BCF2/VCF/gVCF files and
      calling/filtering/summarising SNP and short indel sequence variants

     Versions:
        bcftools/1.3.1
        bcftools/1.9

----------------------------------------------------------------------------
  For detailed information about a specific "bcftools" module (including how to
load the modules) use the module's full name.
  For example:

     $ module spider bcftools/1.9
----------------------------------------------------------------------------
```
Available versions may change, but the format should be the same.

To obtain more information about a specific module version, including a list of any prerequisite modules that must be loaded first, run the module spider command with the version specified; for example:
```
module spider bcftools/1.3.1
```

## Using a Specific Software Module

To use a specific software package, run the `module load` command. The `module load` command in itself does not execute any of the programs but only prepares the environment, i.e. it sets up variables needed to run specific applications and find libraries provided by the module.

After loading a module, you are ready to run the application(s) provided by the module. **For example:**
```
module load bcftools/1.3.1
bcftools --version
```
Output:
```
bcftools 1.3.1
Using htslib 1.3.1
Copyright (C) 2016 Genome Research Ltd.
License GPLv3+: GNU GPL version 3 or later
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

You will need to include the appropriate module load commands into your Slurm script.

# General Considerations for Slurm Jobs

Most bioinformatics software packages are designed to run on a single compute node with varying support for multi-threading and utilization of multiple cpu cores.  Many can run on only one core.  In that case, please request only a single task.

Some software is multi-threaded.  Usually it communicates the number of threads requested through a command-line option.  In this case the Slurm job scripts should contain the following two SBATCH directives:
```
#SBATCH -N 1                    # request single node
#SBATCH --cpus-per-task=<X>     # request multiple cpu cores
```
Replace `<X>` with the actual number of cpu cores to be requested. Requesting more than 8 cpu cores does not provide any significant performance gain for many bioinformatics packages. This is a limitation due to code design rather than a UVA HPC constraint.

Please be certain that the number of cores you request matches the number you communicate to the software.  To be certain, you can often use the environment variable `SLURM_CPUS_PER_TASK`.  For example,
```
biofoo -n ${SLURM_CPUS_PER_TASK}
```

You should only deviate from this general resource request format if you are absolutely certain that the software package supports execution on more than one compute node.

# Reference Genomes on the HPC system

Research Computing provides a set of ready-to-use reference sequences and annotations for commonly analyzed organisms in a convenient, accessible location on Rivanna: 

	/project/genomes/

The majority of files have been downloaded from Illumina's genomes repository (<a href="https://support.illumina.com/sequencing/sequencing_software/igenome.html" target="blank">iGenomes</a>), which contain assembly builds and corresponding annotations from Ensembl, NCBI and UCSC. Each genome directory contain index files of the whole genome for use with aligners like BWA and Bowtie2. In addition, STAR2 index files have been generated for each of *Homo Sapiens* (human) and *Mus musculus* (mouse) genomic builds. 

Click the radio button for the genome of your choice, then click the clipboard icon to copy it.  On Rivanna please use the right click method to paste.

{{% reference-genomes %}}

<hr size=1 />
