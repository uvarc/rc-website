#!/bin/bash
#SBATCH -n 1
#SBATCH -t 01:00:00
#SBATCH -o myRprog.out
#SBATCH -p standard
#SBATCH -A mygroup

module load miniforge

python myscript.py
