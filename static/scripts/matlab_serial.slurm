#!/bin/bash
# This slurm script file runs
# a single-core Matlab job (on one compute node)

#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runSingleTest
#SBATCH --output=runSingleTest_%A.out
#SBATCH --error=runSingleTest_%A.err
#SBATCH --ntasks=1

# Load Matlab environment
module load matlab

# Input paramaters for Matlab function
nLoops=400; # number of iterations to perform
nDim=400; # Dimension of matrix to create

# Run Matlab single core program
matlab -nodisplay -r "pcalc2(${nLoops},${nDim},'${SLURM_JOB_ID}'); exit;"

