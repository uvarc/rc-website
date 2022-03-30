#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -t 10:00:00
#SBATCH -p standard
#SBATCH -A mygroup

./mycode.exe
