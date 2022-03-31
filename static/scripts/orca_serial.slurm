#!/bin/bash
#SBATCH -A mygroup    # your allocation account
#SBATCH -p standard   # partition
#SBATCH -N 1          # number of nodes
#SBATCH -n 10         # number of tasks
#SBATCH -t 24:00:00   # time

module purge
module load orca
$orcadir/orca my.inp > my.out
