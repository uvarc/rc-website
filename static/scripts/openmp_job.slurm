#!/bin/bash
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=20
#SBATCH --time=12:00:00
#SBATCH --output=output_filename
#SBATCH --partition=standard
#SBATCH -A mygroup

module load gcc
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
./threaded_executable
