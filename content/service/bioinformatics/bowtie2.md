+++
author = "SOMRC Staff"
description = ""
title = "Bioinformatics Software on Rivanna"
date = "2017-01-31T09:48:06-05:00"
draft = false
tags = ["bioinformatics","genomics","rivanna", "bowtie2"]
categories = ["services"]
images = [""]
+++

# Bowtie2
<p class=lead>
Bowtie2 is a memory-efficient tool for aligning short sequences to long reference genomes. It indexes the genome using FM Index, which is based on Burrows-Wheeler Transform algorithm, to keep its memory footprint small. Bowtie2 supports gapped, local and paired-end alignment modes. Alignment to a known reference using Bowtie2 is often an essential first step in a myriad of NGS analyses workflows.
</p>

**[Homepage](http://bowtie-bio.sourceforge.net/bowtie2/index.shtml)**
<hr size=1 />


# Usage

Set the environment to make bowtie2, bowtie2-build, bowtie2-inspect executables available to you - 

	########
	# load #
	########
	# load bowtie2 in your environment
	[~]$ module load bowtie2

	# check PATH of executable
	[~]$ which bowtie2
<details>
  <summary>output</summary>
  <pre><code>
        /apps/software/standard/compiler/gcc/7.1.0/bowtie2/2.2.9/bin/bowtie2
  </code></pre>
</details>

	# check bowtie2 version
	[~]$ bowtie2 --version
<details>
  <summary>output</summary>
  <pre><code>
        /apps/software/standard/compiler/gcc/7.1.0/bowtie2/2.2.9/bin/bowtie2-align-s version 2.2.9
        64-bit
        Built on udc-ba33-37
        Thu Jul  6 23:37:30 EDT 2017
        Compiler: gcc version 7.1.0 (GCC) 
        Options: -O3 -march=native -fPIC -std=c++11 -DPOPCNT_CAPABILITY
        Sizeof {int, long, long long, void*, size_t, off_t}: {4, 8, 8, 8, 8, 8}
  </code></pre>
</details>

	###########
	# options #
	###########
	# view bowtie2 options
	[~]$ bowtie2 

<details>
  <summary>output</summary>
  <pre><code>
	No index, query, or output file specified!
	Bowtie 2 version 2.2.9 by Ben Langmead (langmea@cs.jhu.edu, www.cs.jhu.edu/~langmea)
	Usage: 
	  bowtie2 [options]* -x \<bt2-idx\> {-1 \<m1\> -2 \<m2\> | -U \<r\>} [-S \<sam\>]
	
	  <bt2-idx>  Index filename prefix (minus trailing .X.bt2).
	             NOTE: Bowtie 1 and Bowtie 2 indexes are not compatible.
	  <m1>       Files with #1 mates, paired with files in <m2>.
	             Could be gzip'ed (extension: .gz) or bzip2'ed (extension: .bz2).
	  <m2>       Files with #2 mates, paired with files in <m1>.
	             Could be gzip'ed (extension: .gz) or bzip2'ed (extension: .bz2).
	  <r>        Files with unpaired reads.
	             Could be gzip'ed (extension: .gz) or bzip2'ed (extension: .bz2).
	  <sam>      File for SAM output (default: stdout)
	
	  <m1>, <m2>, <r> can be comma-separated lists (no whitespace) and can be
	  specified many times.  E.g. '-U file1.fq,file2.fq -U file3.fq'.
	
	Options (defaults in parentheses):
	
	 Input:
	  -q                 query input files are FASTQ .fq/.fastq (default)
	  --qseq             query input files are in Illumina's qseq format
	  -f                 query input files are (multi-)FASTA .fa/.mfa
	  -r                 query input files are raw one-sequence-per-line
	  -c                 <m1>, <m2>, <r> are sequences themselves, not files
	  -s/--skip <int>    skip the first <int> reads/pairs in the input (none)
	  -u/--upto <int>    stop after first <int> reads/pairs (no limit)
	  -5/--trim5 <int>   trim <int> bases from 5'/left end of reads (0)
	  -3/--trim3 <int>   trim <int> bases from 3'/right end of reads (0)
	  --phred33          qualities are Phred+33 (default)
	  --phred64          qualities are Phred+64
	  --int-quals        qualities encoded as space-delimited integers
	
	 Presets:                 Same as:
	  For --end-to-end:
	   --very-fast            -D 5 -R 1 -N 0 -L 22 -i S,0,2.50
	   --fast                 -D 10 -R 2 -N 0 -L 22 -i S,0,2.50
	   --sensitive            -D 15 -R 2 -N 0 -L 22 -i S,1,1.15 (default)
	   --very-sensitive       -D 20 -R 3 -N 0 -L 20 -i S,1,0.50
	
	  For --local:
	   --very-fast-local      -D 5 -R 1 -N 0 -L 25 -i S,1,2.00
	   --fast-local           -D 10 -R 2 -N 0 -L 22 -i S,1,1.75
	   --sensitive-local      -D 15 -R 2 -N 0 -L 20 -i S,1,0.75 (default)
	   --very-sensitive-local -D 20 -R 3 -N 0 -L 20 -i S,1,0.50
	
	 Alignment:
	  -N <int>           max # mismatches in seed alignment; can be 0 or 1 (0)
	  -L <int>           length of seed substrings; must be >3, <32 (22)
	  -i <func>          interval between seed substrings w/r/t read len (S,1,1.15)
	  --n-ceil <func>    func for max # non-A/C/G/Ts permitted in aln (L,0,0.15)
	  --dpad <int>       include <int> extra ref chars on sides of DP table (15)
	  --gbar <int>       disallow gaps within <int> nucs of read extremes (4)
	  --ignore-quals     treat all quality values as 30 on Phred scale (off)
	  --nofw             do not align forward (original) version of read (off)
	  --norc             do not align reverse-complement version of read (off)
	  --no-1mm-upfront   do not allow 1 mismatch alignments before attempting to
	                     scan for the optimal seeded alignments
	  --end-to-end       entire read must align; no clipping (on)
	   OR
	  --local            local alignment; ends might be soft clipped (off)
	
	 Scoring:
	  --ma <int>         match bonus (0 for --end-to-end, 2 for --local) 
	  --mp <int>         max penalty for mismatch; lower qual = lower penalty (6)
	  --np <int>         penalty for non-A/C/G/Ts in read/ref (1)
	  --rdg <int>,<int>  read gap open, extend penalties (5,3)
	  --rfg <int>,<int>  reference gap open, extend penalties (5,3)
	  --score-min <func> min acceptable alignment score w/r/t read length
	                     (G,20,8 for local, L,-0.6,-0.6 for end-to-end)
	
	 Reporting:
	  (default)          look for multiple alignments, report best, with MAPQ
	   OR
	  -k <int>           report up to <int> alns per read; MAPQ not meaningful
	   OR
	  -a/--all           report all alignments; very slow, MAPQ not meaningful
	
	 Effort:
	  -D <int>           give up extending after <int> failed extends in a row (15)
	  -R <int>           for reads w/ repetitive seeds, try <int> sets of seeds (2)
	
	 Paired-end:
	  -I/--minins <int>  minimum fragment length (0)
	  -X/--maxins <int>  maximum fragment length (500)
	  --fr/--rf/--ff     -1, -2 mates align fw/rev, rev/fw, fw/fw (--fr)
	  --no-mixed         suppress unpaired alignments for paired reads
	  --no-discordant    suppress discordant alignments for paired reads
	  --no-dovetail      not concordant when mates extend past each other
	  --no-contain       not concordant when one mate alignment contains other
	  --no-overlap       not concordant when mates overlap at all
	
	 Output:
	  -t/--time          print wall-clock time taken by search phases
	  --un <path>           write unpaired reads that didn't align to <path>
	  --al <path>           write unpaired reads that aligned at least once to <path>
	  --un-conc <path>      write pairs that didn't align concordantly to <path>
	  --al-conc <path>      write pairs that aligned concordantly at least once to <path>
	  (Note: for --un, --al, --un-conc, or --al-conc, add '-gz' to the option name, e.g.
	  --un-gz <path>, to gzip compress output, or add '-bz2' to bzip2 compress output.)
	  --quiet            print nothing to stderr except serious errors
	  --met-file <path>  send metrics to file at <path> (off)
	  --met-stderr       send metrics to stderr (off)
	  --met <int>        report internal counters & metrics every <int> secs (1)
	  --no-unal          suppress SAM records for unaligned reads
	  --no-head          suppress header lines, i.e. lines starting with @
	  --no-sq            suppress @SQ header lines
	  --rg-id <text>     set read group id, reflected in @RG line and RG:Z: opt field
	  --rg <text>        add <text> ("lab:value") to @RG line of SAM header.
	                     Note: @RG line only printed when --rg-id is set.
	  --omit-sec-seq     put '*' in SEQ and QUAL fields for secondary alignments.
	
	 Performance:
	  -p/--threads <int> number of alignment threads to launch (1)
	  --reorder          force SAM output order to match order of input reads
	  --mm               use memory-mapped I/O for index; many 'bowtie's can share
	
	 Other:
	  --qc-filter        filter out reads that are bad according to QSEQ filter
	  --seed <int>       seed for random number generator (0)
	  --non-deterministic seed rand. gen. arbitrarily instead of using read attributes
	  --version          print version information and quit
	  -h/--help          print this usage message
	(ERR): bowtie2-align exited with value 1
  </code></pre>
</details>
	

## Align

Alignment using bowtie2 is a 2-step process -  
i) indexing the reference genome, followed by  
ii) aligning the sequence data.

**Step1**  
Create indexes of your reference genome of interest stored in `reference.fasta` file:  
	
	#############
	# index ref #
	#############
	[~]$ bowtie2-build [option(s)] <reference.fasta> <bt2-index-basename>

This will create new files with the provided basename and extensions `.1.bt2`, `.2.bt2`, `.3.bt2` and `.4.bt2`, `.rev.1.bt2` and `.rev.2.bt2`. These files constitute the index.

**Step2**  
Align paired-end reads `sample_R1.fq` and `sample_R2.fq` to the reference genome indexed in the previous step, using `N` cores:  

	#############
	# aln reads #
	#############
	[~]$ bowtie2 -x <bt2-index-basename> -1 <sample_R1.fq> -2 <sample_R2.fq> -p <N> -S <output.sam>

The alignment results in SAM format are written to the file `output.sam`.

# Example SLURM Script
This is an example SLURM submission script for bowtie2 alignment. In this example, we will align paired-end reads to (previously indexed) reference genome using 10 cores of a single node.

	[~]$ cat bowtie2-aln.slurm.sh

	 	 #!/bin/bash
		
		 #SBATCH -J bowtie2-aln			# Job name
		 #SBATCH -c 10					# Number of cores
		 #SBATCH --mem=10gb				# Job Memory
		 #SBATCH -t 12:00:00			# Time limit hrs:min:sec
		 #SBATCH -o bowtie2-aln_%A.out	# Standard output log
		 #SBATCH -e bowtie2-aln_%A.err	# Standard error log
		 #SBATCH -A MYGROUP				# allocation groups
		 #SBATCH -p standard			# slurm queue
		 pwd; hostname; date
		
		 # load module
		 module load bowtie2
		
		 # input/output files
		 REF_GENOME="/scratch/$USER/PATH/TO/REF/INDEX/BASENAME"
		 FOR_FILE="/scratch/$USER/PATH/TO/SAMPLE/FORWARD/FASTQ"
		 REV_FILE="/scratch/$USER/PATH/TO/SAMPLE/REVERSE/FASTQ"
		 OUTSAM="/scratch/$USER/PATH/TO/OUTPUT/SAM"
		
		 # align command
		 bowtie2 -x $REF_GENOME -1 $FOR_FILE -2 $REV_FILE -p 10 -S $OUTSAM
		
		 echo "Done!"
		 date
		
To submit the job - 

	[~]$ sbatch bowtie2-aln.slurm.sh


# Manual

For detailed information, please refer to the Bowtie2 [manual](http://bowtie-bio.sourceforge.net/bowtie2/manual.shtml).

# Citation  

If you use `bowtie2` for your work, please cite:  
Langmead B, Salzberg S. Fast gapped-read alignment with Bowtie 2. Nature Methods. 2012, 9:357-359.
