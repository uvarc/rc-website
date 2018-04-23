+++
author = "SOMRC Staff"
description = ""
title = "Bioinformatics Software on Rivanna"
date = "2017-01-31T09:48:06-05:00"
draft = false
tags = ["bioinformatics","genomics","rivanna", "bwa"]
categories = ["services"]
images = [""]
+++

# BWA
<p class=lead>
BWA is a software package for mapping low-divergent sequences against a large reference genome, such as the human genome. It consists of three algorithms: BWA-backtrack, BWA-SW and BWA-MEM. The first algorithm is designed for Illumina sequence reads up to 100bp, while the rest two for longer sequences ranged from 70bp to 1Mbp. BWA-MEM and BWA-SW share similar features such as long-read support and split alignment, but BWA-MEM, which is the latest, is generally recommended for high-quality queries as it is faster and more accurate. BWA-MEM also has better performance than BWA-backtrack for 70-100bp Illumina reads.
</p>

**[Homepage](http://bio-bwa.sourceforge.net/)**
<hr size=1 />


# Usage

Set the environment to make bwa executables available to you - 

	########
	# load #
	########
	# load bwa in your environment
	[~]$ module load bwa

	# check PATH of executable
	[~]$ which bwa
<details>
  <summary>output</summary>
  <pre><code>
		/apps/software/standard/compiler/gcc/7.1.0/bwa/0.7.17/bin/bwa
  </code></pre>
</details>

	###########
	# options #
	###########
	# view bwa options
	[~]$ bwa 
<details>
  <summary>output</summary>
  <pre><code>
		Program: bwa (alignment via Burrows-Wheeler transformation)
		Version: 0.7.17-r1188
		Contact: Heng Li \<lh3@sanger.ac.uk\>
		
		Usage:   bwa <command> [options]
		
		Command: index         index sequences in the FASTA format
		         mem           BWA-MEM algorithm
		         fastmap       identify super-maximal exact matches
		         pemerge       merge overlapping paired ends (EXPERIMENTAL)
		         aln           gapped/ungapped alignment
		         samse         generate alignment (single ended)
		         sampe         generate alignment (paired ended)
		         bwasw         BWA-SW for long queries
		
		         shm           manage indices in shared memory
		         fa2pac        convert FASTA to PAC format
		         pac2bwt       generate BWT from PAC
		         pac2bwtgen    alternative algorithm for generating BWT
		         bwtupdate     update .bwt to the new format
		         bwt2sa        generate SA from BWT and Occ
		
		Note: To use BWA, you need to first index the genome with `bwa index'.
		      There are three alignment algorithms in BWA: `mem', `bwasw', and
		      `aln/samse/sampe'. If you are not sure which to use, try `bwa mem'
		      first. Please `man ./bwa.1' for the manual.
  </code></pre>
</details>

	# View individual command options 
	[~]$ bwa mem
<details>
  <summary>output</summary>
  <pre><code>
	Usage: bwa mem [options] \<idxbase\> \<in1.fq\> [in2.fq]
	
	Algorithm options:
	
	       -t INT        number of threads [1]
	       -k INT        minimum seed length [19]
	       -w INT        band width for banded alignment [100]
	       -d INT        off-diagonal X-dropoff [100]
	       -r FLOAT      look for internal seeds inside a seed longer than {-k} * FLOAT [1.5]
	       -y INT        seed occurrence for the 3rd round seeding [20]
	       -c INT        skip seeds with more than INT occurrences [500]
	       -D FLOAT      drop chains shorter than FLOAT fraction of the longest overlapping chain [0.50]
	       -W INT        discard a chain if seeded bases shorter than INT [0]
	       -m INT        perform at most INT rounds of mate rescues for each read [50]
	       -S            skip mate rescue
	       -P            skip pairing; mate rescue performed unless -S also in use
	
	Scoring options:
	
	       -A INT        score for a sequence match, which scales options -TdBOELU unless overridden [1]
	       -B INT        penalty for a mismatch [4]
	       -O INT[,INT]  gap open penalties for deletions and insertions [6,6]
	       -E INT[,INT]  gap extension penalty; a gap of size k cost '{-O} + {-E}*k' [1,1]
	       -L INT[,INT]  penalty for 5'- and 3'-end clipping [5,5]
	       -U INT        penalty for an unpaired read pair [17]
	
	       -x STR        read type. Setting -x changes multiple parameters unless overridden [null]
	                     pacbio: -k17 -W40 -r10 -A1 -B1 -O1 -E1 -L0  (PacBio reads to ref)
	                     ont2d: -k14 -W20 -r10 -A1 -B1 -O1 -E1 -L0  (Oxford Nanopore 2D-reads to ref)
	                     intractg: -B9 -O16 -L5  (intra-species contigs to ref)
	
	Input/output options:
	
	       -p            smart pairing (ignoring in2.fq)
	       -R STR        read group header line such as '@RG\tID:foo\tSM:bar' [null]
	       -H STR/FILE   insert STR to header if it starts with @; or insert lines in FILE [null]
	       -o FILE       sam file to output results to [stdout]
	       -j            treat ALT contigs as part of the primary assembly (i.e. ignore <idxbase>.alt file)
	       -5            for split alignment, take the alignment with the smallest coordinate as primary
	       -q            don't modify mapQ of supplementary alignments
	       -K INT        process INT input bases in each batch regardless of nThreads (for reproducibility) []
	
	       -v INT        verbosity level: 1=error, 2=warning, 3=message, 4+=debugging [3]
	       -T INT        minimum score to output [30]
	       -h INT[,INT]  if there are <INT hits with score >80% of the max score, output all in XA [5,200]
	       -a            output all alignments for SE or unpaired PE
	       -C            append FASTA/FASTQ comment to SAM output
	       -V            output the reference FASTA header in the XR tag
	       -Y            use soft clipping for supplementary alignments
	       -M            mark shorter split hits as secondary
	
	       -I FLOAT[,FLOAT[,INT[,INT]]]
	                     specify the mean, standard deviation (10% of the mean if absent), max
	                     (4 sigma from the mean if absent) and min of the insert size distribution.
	                     FR orientation only. [inferred]
	
	Note: Please read the man page for detailed description of the command line and options.
  </code></pre>
</details>


## Align

Alignment using bwa is a 2-step process -  
i) indexing the reference genome, followed by  
ii) aligning the sequence data.

**Step1**  
Create indexes of your reference genome of interest stored in `reference.fasta` file:  
	
	#############
	# index ref #
	#############
	[~]$ bwa index [option(s)] <reference.fasta>

This will create new files with the extensions `.amb`, `.ann`, `.bwt`, `.pac`, `.sa`, within the same directory as `reference.fasta`. These files constitute the index.

**Step2**  
Align paired-end reads `sample_R1.fq` and `sample_R2.fq` to the reference genome indexed in the previous step, using `bwa mem` algorithm and `N` cores: 

	#############
	# aln reads #
	#############
	[~]$ bwa mem [options] reference.fasta sample_R1.fq sample_R2.fq > output.sam

The alignment results in SAM format are written to the file `output.sam`.

# Example SLURM Script
This is an example SLURM submission script for bwa alignment. In this example, we will align paired-end reads to (previously indexed) reference genome using 10 cores of a single node.

	[~]$ cat bwa-mem.slurm.sh

	 	 #!/bin/bash
		
		 #SBATCH -J bwa-mem			# Job name
		 #SBATCH -c 10				# Number of cores
		 #SBATCH --mem=10gb			# Job Memory
		 #SBATCH -t 12:00:00		# Time limit hrs:min:sec
		 #SBATCH -o bwa-mem_%A.out	# Standard output log
		 #SBATCH -e bwa-mem_%A.err	# Standard error log
		 #SBATCH -A MYGROUP			# allocation groups
		 #SBATCH -p standard		# slurm queue
		 pwd; hostname; date
		
		 # load module
		 module load bwa
		
		 # input/output files
		 REF_GENOME="/scratch/$USER/PATH/TO/REF/INDEX/BASENAME"
		 FOR_FILE="/scratch/$USER/PATH/TO/SAMPLE/FORWARD/FASTQ"
		 REV_FILE="/scratch/$USER/PATH/TO/SAMPLE/REVERSE/FASTQ"
		 OUTSAM="/scratch/$USER/PATH/TO/OUTPUT/SAM"
		
		 # align command
		 bwa mem -t 10 $REF_GENOME $FOR_FILE $REV_FILE > $OUTSAM
		
		 echo "Done!"
		 date
		
To submit the job - 

	[~]$ sbatch bwa-mem.slurm.sh


# Manual

For detailed information, please refer to the BWA [manual](http://bio-bwa.sourceforge.net/bwa.shtml).

# Citation  
The short read alignment component (bwa-short) has been published:  
Li H. and Durbin R. (2009) Fast and accurate short read alignment with Burrows-Wheeler Transform. Bioinformatics, 25:1754-60. [PMID: 19451168]  

If you use BWA-SW, please cite:  
Li H. and Durbin R. (2010) Fast and accurate long-read alignment with Burrows-Wheeler Transform. Bioinformatics, Epub. [PMID: 20080505]  

If you use BWA-MEM, please cite:  
Li H. (2013) Aligning sequence reads, clone sequences and assembly contigs with BWA-MEM. arXiv:1303.3997v1 [q-bio.GN].
