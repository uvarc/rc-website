#!/bin/bash
# This slurm script file runs
# a single-core Julia job (on one compute node)

#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=SingleTest
#SBATCH --output=SingleTest_%A.out
#SBATCH --error=SingleTest_%A.err
#SBATCH --ntasks=1

# Load  Julia environment
module load julia/1.5.0

julia hello.jl
