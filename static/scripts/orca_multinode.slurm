#!/bin/bash
#SBATCH -A mygroup            # your allocation account
#SBATCH -p parallel           # partition
#SBATCH -N 3                  # number of nodes
#SBATCH --ntasks-per-node=36  # number of tasks
#SBATCH -t 24:00:00           # time

module purge
module load orca
$orcadir/orca my.inp > my.out
