#!/bin/bash
#SBATCH -A mygroup      # your allocation account
#SBATCH -p gpu          # partition
#SBATCH --gres=gpu:1    # number of GPUs
#SBATCH -C "v100|a100"  # request a V100 or A100 GPU
#SBATCH -N 1            # number of nodes
#SBATCH -c 8            # number of cores
#SBATCH -t 10:00:00     # time

module purge
module load apptainer alphafold

run --fasta_paths=$PWD/your_fasta_file \
    --output_dir=$PWD/outdir \
    --model_preset=monomer \
    --db_preset=full_dbs \
    --bfd_database_path=/data/bfd/bfd_metaclust_clu_complete_id30_c90_final_seq.sorted_opt \
    --pdb70_database_path=/data/pdb70/pdb70 \
    --uniref30_database_path=/data/uniref30/UniRef30_2021_03 \
    --max_template_date=YYYY-MM-DD \
    --use_gpu_relax=True
