#!/bin/bash
#SBATCH -A myallocation        # your allocation
#SBATCH -p parallel            # partition
#SBATCH -N 2                   # number of nodes
#SBATCH --ntasks-per-node=40   # number of tasks
#SBATCH -t 1-00:00:00          # walltime

module purge
module load intel quantumespresso

srun pw.x -in file.in
