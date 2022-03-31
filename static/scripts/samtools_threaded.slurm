#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH --cpus-per-task=8
#SBATCH -t 1:00:00
#SBATCH -p standard
#SBATCH -A mygroup

module purge
module load samtools

samtools view -bS -@ 7 example.sam > example.bam
