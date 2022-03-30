#!/bin/bash
#SBATCH --nodes=1
#SBATCH -c 8
#SBATCH -t 160:00:00
#SBATCH -p standard
#SBATCH --mem=48000
#SBATCH -A mygroup

module load gaussian/g16

# Define Gaussian scratch directory as compute node scratch space.
# It's best to use a separate directory for each job.
export GAUSS_SCRDIR=/scratch/$USER/$SLURM_JOBID
mkdir $GAUSS_SCRDIR

#Stop OpenMP from interfering with Gaussian's thread mechanism.
export OMP_NUM_THREADS=1

g16 -m=48gb -p=${SLURM_CPUS_PER_TASK} h2o.com
