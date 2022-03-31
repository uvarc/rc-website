#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=10
#SBATCH -t 00:30:00
#SBATCH -o results.out
#SBATCH -p parallel
#SBATCH -A mygroup

module purge
module load goolf/7.1.0_3.1.4 R

srun Rscript myRprog.R
