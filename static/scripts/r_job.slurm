#!/bin/bash
#SBATCH -n 1
#SBATCH -t 01:00:00
#SBATCH -o results.out
#SBATCH -p standard
#SBATCH -A mygroup

module purge
module load goolf/7.1.0_3.1.4  R
Rscript myRprog.R
