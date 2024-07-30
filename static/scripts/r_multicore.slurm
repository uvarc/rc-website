#!/bin/bash
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=10      #Requests 10 cores
#SBATCH -t 00:30:00
#SBATCH -o results.out
#SBATCH -p standard
#SBATCH -A mygroup

module purge
module load goolf R
Rscript myRprog.R ${SLURM_CPUS_PER_TASK}
