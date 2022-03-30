#!/bin/bash
#SBATCH --nodes=2
#SBATCH -c 20
#SBATCH -t 48:00:00
#SBATCH -p parallel
#SBATCH --mem=120000
#SBATCH -A mygroup

module load gaussian/g16

# Define Gaussian scratch directory as compute node scratch space.
# It's best to use a separate directory for each job.

export GAUSS_SCRDIR=/scratch/$USER/$SLURM_JOBID
mkdir $GAUSS_SCRDIR

#Stop OpenMP from interfering with Gaussian's thread mechanism.
export OMP_NUM_THREADS=1
for n in `scontrol show hostname | sort -u`; do
  echo ${n}
done | paste -s -d, > snodes.$SLURM_JOBID

g16 -m=100gb -p=${SLURM_CPUS_PER_TASK} -w=`cat snodes.$SLURM_JOBID` h2o.com
#Clean up
rm snodes.$SLURM_JOBID
