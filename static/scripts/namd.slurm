#!/bin/bash
#SBATCH -A mygroup             # your allocation account
#SBATCH -p parallel            # partition
#SBATCH -N 2                   # number of nodes
#SBATCH --ntasks-per-node=40   # number of tasks
#SBATCH -t 24:00:00            # time

module purge
module load goolf namd
mpiexec namd2 input.namd       # please use mpiexec as the executor for NAMD
