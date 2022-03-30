#!/bin/bash
#SBATCH -p standard     # partition
#SBATCH -A myaccount    # your allocation
#SBATCH -N 1            # number of nodes
#SBATCH -c 10           # number of cores per node
#SBATCH -t 10:00:00     # time

module purge
module load spark

spark-submit script.py
