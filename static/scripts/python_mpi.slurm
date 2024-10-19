#!/bin/bash
#SBATCH -A mygroup
#SBATCH -p standard
#SBATCH -N 1
#SBATCH --ntasks-per-node=10
#SBATCH -t 01:00:00
#SBATCH -o myprog.out
#SBATCH --export=NONE

module purge
module load gcc openmpi

# Replace 'custom_env' with the actual env name.
module load miniforge
source activate custom_env

srun --export=ALL python myscript.py

