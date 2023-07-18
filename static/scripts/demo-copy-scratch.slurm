#!/bin/bash
#SBATCH -A your_allocation  # to find your allocation, type "allocations"
#SBATCH -t 12:00:00         # up to 7-00:00:00 (7 days)
#SBATCH -p standard         

rsync -av /oldscratch/$USER/ /scratch/$USER
