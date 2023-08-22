#!/bin/bash
# This slurm script is an example of submitting a Julia
# code to a gpu

#SBATCH --partition=gpu
#SBATCH --gres=gpu:1
#SBATCH -A hpc_build
#SBATCH --time=1:00:00
#SBATCH --output=run_gpu_%A.out
#SBATCH --error=run_gpu_%A.err
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --ntasks-per-node=1 # allocate one cpu for each gpu
##SBATCH --mem=60000

echo 'slurm allocates gpus ' $CUDA_VISIBLE_DEVICES

module purge
module load julia/1.5.0 cuda/10.2.89

julia gpuTest1.jl
