#!/bin/bash
#SBATCH -A mygroup           # your allocation account
#SBATCH -p gpu               # partition
#SBATCH --gres=gpu:1         # number of GPUs
#SBATCH -C "a40|a6000|a100"  # compatible with A40, A6000, A100
#SBATCH -c 8                 # number of cores
#SBATCH -t 10:00:00          # time

module purge
module load gcc alphafold

python $EBROOTALPHAFOLD/app/alphafold/run_alphafold.py \
    --db_dir=$ALPHAFOLD_DATA_PATH \
    --model_dir=$HOME/af3 \
    --json_path=fold_input.json \
    --output_dir=$PWD
