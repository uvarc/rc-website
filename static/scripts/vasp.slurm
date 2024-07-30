#!/bin/bash
#SBATCH --account my_acct
#SBATCH --nodes=4
#SBATCH --ntasks-per-node=40
#SBATCH --time=3-00:00:00
#SBATCH --output=thermo.out
#SBATCH --partition=parallel

module load intel

srun ~/bin/vasp_std
