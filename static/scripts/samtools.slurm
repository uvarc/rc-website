#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -t 1:00:00
#SBATCH -p standard
#SBATCH -A mygroup

module purge
module load samtools

samtools view -bS example.sam > example.bam
