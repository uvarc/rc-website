#!/bin/bash
#SBATCH -A YOUR_ALLOCATION
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --mem=64000
#SBATCH -p standard

# Run program
module purge
module load bwa
module list

cd /scratch/$USER/bwaanalysis

# replace refgnome.fa with the name of your reference genome
# reference in FASTA format
bwa index refgenome.fa
