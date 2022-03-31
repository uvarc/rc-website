#!/bin/bash
# This slurm script is an example of submitting job arrays
# with Julia and passing in the SLURM_ARRAY_TASK_ID variable
# to the code

#SBATCH --array=1-5
#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runMultiple
#SBATCH --output=runMultiple_%A_%a.out
#SBATCH --error=runMultiple_%A_%a.err
#SBATCH --ntasks-per-node=1

module purge
module load julia/1.5.0

export SLURM_ARRAY_TASK_ID

julia jobArray.jl
