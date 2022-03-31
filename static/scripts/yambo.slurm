#!/bin/bash
#SBATCH -A myallocation        # your allocation
#SBATCH -p gpu                 # do not change
#SBATCH --gres=gpu:1           # number of GPU devices
#SBATCH -C v100|a100           # can only run on V100 and A100
#SBATCH -N 1                   # number of nodes
#SBATCH --ntasks-per-node=2    # number of tasks
#SBATCH -t 1-00:00:00          # walltime

module purge
module load nvompic yambo

srun yambo ...
