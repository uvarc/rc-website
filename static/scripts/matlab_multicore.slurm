#!/bin/bash
# This slurm script file runs
# a multi-core parallel Matlab job (on one compute node)

#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=1:00:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runParallelTest
#SBATCH --output=runParallelTest_%A.out
#SBATCH --error=runParallelTest_%A.err
#SBATCH --nodes=1                #Number of nodes
#SBATCH --ntasks-per-node=8     #Number of cores per node

# Load Matlab environment
module load matlab

# Create and export variable for slurm job id
export slurm_ID="${SLURM_JOB_ID}"

# Set workers to one less that number of tasks (leave 1 for master process)
export numWorkers=$((SLURM_NTASKS-1))

# Input paramaters
nLoops=400; # number of iterations to perform
nDim=400; # Dimension of matrix to create

# Run Matlab parallel program program
matlab -nodisplay  -r \
 "setPool1; pcalc2(${nLoops},${nDim},'${slurm_ID}'); exit;"
