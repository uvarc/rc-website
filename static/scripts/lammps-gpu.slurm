#!/bin/bash
#SBATCH --account=my_acct
#SBATCH --partition=gpu
#SBATCH --gres=gpu:a100:2
#SBATCH --ntasks-per-node=2
#SBATCH --time=3-00:00:00

module purge
module load goolf lammps/2Aug2023

srun lmp -in run.in.npt
