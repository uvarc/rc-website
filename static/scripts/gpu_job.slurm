#!/bin/bash
#SBATCH --ntasks=1
#SBATCH --time=12:00:00
#SBATCH --output=output_filename
#SBATCH -A mygroup
#SBATCH --partition=gpu
#SBATCH --gres=gpu:p100:2

module load tensorflow3
python myAI.py
