#SBATCH -A mygroup
#SBATCH -p standard
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --mem-per-cpu=6000
#SBATCH --time=06:00:00

module purge
module load smrtlink/5.1.0.26412
blasr reads.bam genome.fasta --bam --out alignment.bam --nproc $SLURM_CPUS_PER_TASK
