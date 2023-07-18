#SBATCH -A mygroup
#SBATCH -p standard
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1 # multi-threading not supported
#SBATCH --mem-per-cpu=9000
#SBATCH --time=06:00:00

module purge
module load smrtlink/5.1.0.26412
sawriter sa_outputfile input1.fasta # or multiple input files: input1.fasta input2.fasta input3.fasta ...]
