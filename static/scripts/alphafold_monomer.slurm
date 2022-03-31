#!/bin/bash
#SBATCH -A mygroup      # your allocation account
#SBATCH -p gpu          # partition
#SBATCH --gres=gpu:1    # number of GPUs
#SBATCH -N 1            # number of nodes
#SBATCH -c 8            # number of cores
#SBATCH -t 10:00:00     # time

module purge
module load singularity alphafold

run --fasta_paths=$PWD/your_fasta_file \
    --output_dir=$PWD/outdir \
    --model_preset=monomer \
    --db_preset=full_dbs \
    --bfd_database_path=/data/bfd/bfd_metaclust_clu_complete_id30_c90_final_seq.sorted_opt \
    --pdb70_database_path=/data/pdb70/pdb70 \
    --uniclust30_database_path=/data/uniclust30/uniclust30_2018_08/uniclust30_2018_08 \
    --max_template_date=YYYY-MM-DD \
    --use_gpu_relax=True