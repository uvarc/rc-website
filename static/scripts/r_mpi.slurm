#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=10
#SBATCH -t 00:30:00
#SBATCH -o results.out
#SBATCH -p parallel
#SBATCH -A mygroup

module purge
module load goolf R

mpirun Rscript myRprog.R
