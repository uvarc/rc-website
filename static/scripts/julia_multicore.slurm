#!/bin/bash
# This is a slurm script for running Julia across
# multiple cores of one compute node

#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=1:00:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=multipleTest1
#SBATCH --output=multipleTest1_%A.out
#SBATCH --error=multipleTest1_%A.err
#SBATCH --nodes=1                #Number of nodes
#SBATCH --ntasks-per-node=1     #Number of cores per node
#SBATCH --cpus-per-task=8     #Number of cores per node

# Load Julia environment
module load julia/1.5.0

srun julia helloDistributed.jl
