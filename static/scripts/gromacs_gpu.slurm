#!/bin/bash
#SBATCH -A mygroup            # your allocation account
#SBATCH -p gpu                # partition
#SBATCH --gres=gpu:1          # number of GPUs
#SBATCH -N 1                  # number of nodes
#SBATCH --ntasks-per-node=10  # number of tasks
#SBATCH -t 10:00:00           # time

module purge
module load nvompi gromacs

srun gmx_mpi <arguments>
