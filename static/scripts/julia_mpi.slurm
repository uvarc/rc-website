#!/bin/bash
# This script uses Julia's MPI package that
# uses the Intel MPI library on Rivanna. See the URL
# https://juliaparallel.github.io/MPI.jl/stable/configuration/

#SBATCH -p parallel
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=parallelTest1
#SBATCH --output=parallelTest1_%A.out
#SBATCH --error=parallelTest1_%A.err
#SBATCH --nodes=8                #Number of nodes
#SBATCH --ntasks-per-node=1      #Number of cores per node

# Load Julia environment
module load julia
module load intel

srun julia helloParallel.jl
