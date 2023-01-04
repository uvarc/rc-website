#!/bin/bash
#SBATCH -N 1
#SBATCH -n 1
#SBATCH -t 01:00:00
#SBATCH -o output_filename
#SBATCH -p standard
#SBATCH -A mygroup

module load matlab

matlab -nojvm -nodisplay -nosplash -singleCompThread -r "Mymain(myvar1s);exit"
