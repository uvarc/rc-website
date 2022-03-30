#!/bin/bash
#SBATCH --account my_acct
#SBATCH --nodes=8
#SBATCH --ntasks-per-node=16
#SBATCH --time=3-00:00:00
#SBATCH --output=thermo.out
#SBATCH --partition=parallel

module load intel intelmpi

srun ../bin/vasp_std
