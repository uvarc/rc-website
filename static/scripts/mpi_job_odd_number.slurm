#!/bin/bash
#SBATCH --ntasks=97
#SBATCH --nodes=5
#SBATCH --ntasks-per-node=20
#SBATCH --time=12:00:00
#SBATCH --output=output_filename
#SBATCH --partition=parallel 
#SBATCH -A mygroup

module load gcc
module load openmpi
mpirun ./parallel_executable
