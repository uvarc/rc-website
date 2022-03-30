#!/bin/bash
# The slurm script file runParallelMultiple.slurm runs
# multiple parallel Matlab jobs using a Slurm job array

#SBATCH --array=1-5
#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runMultiple
#SBATCH --output=runMultiple_%A_%a.out
#SBATCH --error=runMultiple_%A_%a.err
#SBATCH --ntasks-per-node=8

module purge
# Load Matlab environment
module load matlab

# Create variable for slurm job and task ids
export slurm_ID="${SLURM_ARRAY_JOB_ID}_${SLURM_ARRAY_TASK_ID}"

# Set workers to one less that number of tasks (leave 1 for master process)
export numWorkers=$((SLURM_NTASKS-1))

# Input paramaters
nLoops=400; # number of iterations to perform
nDim=400; # Dimension of matrix to create

# Run Matlab parallel program
matlab -nodisplay  -r \
"setPool1; pcalc2(${nLoops},${nDim},'${slurm_ID}');exit;"
