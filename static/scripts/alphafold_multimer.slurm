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
    --model_preset=multimer \
    --db_preset=reduced_dbs \
    --pdb_seqres_database_path=/data/pdb_seqres/pdb_seqres.txt \
    --uniprot_database_path=/data/uniprot/uniprot.fasta \
    --small_bfd_database_path=/data/small_bfd/bfd-first_non_consensus_sequences.fasta \
    --max_template_date=YYYY-MM-DD \
    --use_gpu_relax=True
