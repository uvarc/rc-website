#!/bin/bash
#SBATCH -A myallocation        # your allocation
#SBATCH -p parallel            # partition
#SBATCH -N 2                   # number of nodes
#SBATCH --ntasks-per-node=40   # number of tasks
#SBATCH -t 1-00:00:00          # walltime

module purge
module load intel/18.0 intelmpi/18.0
module load quantumespresso/6.4.1

srun pw.x -in file.in
