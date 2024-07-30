#!/bin/bash
#SBATCH -A mygroup      # your allocation account
#SBATCH -p gpu          # partition
#SBATCH --gres=gpu:1    # number of GPUs
#SBATCH -N 1            # number of nodes
#SBATCH -c 1            # number of cores
#SBATCH -t 10:00:00     # time

module purge
module load apptainer deeplabcut

apptainer run --nv $CONTAINERDIR/deeplabcut-2.2.1.1-anipose.sif myscript.py
