#!/bin/bash

#SBATCH -t 5:00:00
#SBATCH -p standard
#SBATCH --mem=50000
#SBATCH -A allocation_name
#SBATCH -n 9

module purge
module load anaconda
source activate rnaseq

snakemake -p -j 8
