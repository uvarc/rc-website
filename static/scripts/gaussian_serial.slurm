#!/bin/bash
#SBATCH --tasks=1
#SBATCH -t 160:00:00
#SBATCH -p standard
#SBATCH --mem=9000
#SBATCH -A mygroup

module load gaussian/g16

# Define Gaussian scratch directory as compute node scratch space.
# It's best to use a separate directory for each job.
export GAUSS_SCRDIR=/scratch/$USER/$SLURM_JOBID
mkdir $GAUSS_SCRDIR

g16 -m=6gb h2o.com
