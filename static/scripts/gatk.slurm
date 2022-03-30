#!/bin/bash
#SBATCH --job-name=gatk-prs             # Job name
#SBATCH --nodes=1                       # Number of nodes
#SBATCH --cpus-per-task=8               # Number of CPU cores per task
#SBATCH --mem=10gb                      # Job Memory
#SBATCH --time=05:00:00                 # Time limit hrs:min:sec
#SBATCH --output=gatk-prs_%A.out        # Standard output log
#SBATCH --error=gatk-prs_%A.err         # Standard error log
#SBATCH -A <YOUR_ALLOCATION>            # allocation name
#SBATCH -p standard                     # slurm queue

pwd; hostname; date

# load gatk module, to make the wrapper script available for execution
module load gatk

# gatk command and arguments
gatk --java-option "-Xmx8G" PrintReadsSpark \
    --spark-master local[8] \
    -I input1.bam \
    -I input2.bam \
    -O output.bam \
    --read_filter MappingQualityZero

date
