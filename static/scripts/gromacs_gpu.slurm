#!/bin/bash
#SBATCH -A mygroup            # your allocation account
#SBATCH -p gpu                # partition
#SBATCH --gres=gpu:2          # number of GPUs
#SBATCH --ntasks-per-node=2   # same number of tasks as GPUs
#SBATCH -t 10:00:00           # time

module purge
module load apptainer gromacs

srun apptainer run --nv $CONTAINERDIR/gromacs-2023.2.sif gmx <arguments>
