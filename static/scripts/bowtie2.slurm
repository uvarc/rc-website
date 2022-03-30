#!/bin/bash
#SBATCH --job-name=bowtie2_example
#SBATCH --cpus-per-task=8
#SBATCH --time=00:10:00
#SBATCH -o Bowtie_test.o%j
#SBATCH --partition=standard
#SBATCH --account=<YOUR_ALLOCATION>

#Load the Bowtie Module
module load gcc
module load bowtie2

# Change to temp working directory with example files
cd /scratch/$USER/bowtie_temp

# Indexing a reference genome
bowtie2-build ./example/reference/lambda_virus.fa lambda_virus

# Aligning example reads, standard example
bowtie2 -p $SLURM_CPUS_PER_TASK -x lambda_virus -U ./example/reads/reads_1.fq -S align.sam

# Paired-end example
bowtie2 -p $SLURM_CPUS_PER_TASK -x lambda_virus -1 ./example/reads/reads_1.fq -2 ./example/reads/reads_2.fq -S align2.sam

# Local alignment example
bowtie2 -p $SLURM_CPUS_PER_TASK --local -x lambda_virus -U ./example/reads/longreads.fq -S align3.sam
