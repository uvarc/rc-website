#!/bin/bash
#SBATCH --job-name=fiji_example
#SBATCH --cpus-per-task=8
#SBATCH --mem=32G
#SBATCH --time=04:00:00
#SBATCH --partition=standard
#SBATCH --account=<YOUR_ALLOCATION>

#Load the Fiji Module
module load fiji

# Change to temp working directory with example files
ImageJ-linux --mem=32G --headless <FIJI_SCRIPT> <SCRIPT_ARGS>
