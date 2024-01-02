#!/bin/bash
#SBATCH -A mygroup
#SBATCH -p standard
#SBATCH -N 1
#SBATCH -c 1
#SBATCH -t 01:00:00
#SBATCH -o myprog.out

module purge
module load anaconda
# optional: uncomment next line to use your custom Conda environment; replace 'custom_env' with actual env name
# source activate custom_env

python myscript.py

