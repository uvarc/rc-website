#!/bin/bash
#SBATCH --nodes=4
#SBATCH --ntasks-per-node=4
#SBATCH --cpus-per-task=5
#SBATCH --time=12:00:00
#SBATCH --output=output_filename
#SBATCH --partition=parallel
#SBATCH -A mygroup

module load gcc openmpi
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
mpirun ./hybrid_executable
