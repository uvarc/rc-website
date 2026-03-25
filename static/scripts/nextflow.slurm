#!/bin/bash

#SBATCH --time=05:00:00
#SBATCH --partition=standard
#SBATCH --mem=4GB
#SBATCH --account=allocation_name
#SBATCH --cpus-per-task=1

module purge
module load nextflow

nextflow run main.nf
