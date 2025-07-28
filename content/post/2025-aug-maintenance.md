+++
images = [""]
author = "Staff"
description = ""
date = "2025-08-05T00:00:00-05:00"
title = "HPC Maintenance: Aug 12, 2025"
draft = false
tags = ["rivanna", "afton"]
categories = ["feature"]
+++

{{< alert-green >}}The UVA HPC systems, Afton/Rivanna, will be down for maintenance on <strong>Tuesday, August 12, 2025</strong> beginning at 6 am.{{< /alert-green >}}

All systems are expected to return to service by **Wednesday, August 13** at 6 am.

## IMPORTANT MAINTENANCE NOTES

### Open OnDemand

The PySpark Interactive App will be removed. Please use the new PySpark 4.0.0 kernel within JupyterLab. For details see [here](/userinfo/hpc/software/spark).

### Modules

Default version changes:
- homer/4.11 &rarr; 5.1

We are removing many old modules that are no longer maintained. If you need to use any of these please contact us.

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|aspera-connect|4.2.4  | 4.2.8 |
|bazel        | 6.1.1  | 8.3.1 |
|bioconda     | py3.10 | py3.11 |
|blasr        |20190414| - |
|bsmap        | 2.42   | - |
|cd-hit       | 4.8.1  | - |
|cellpose     | 2.3.2  | 3.0.10, 4.0.5 |
|ciftilib     | 1.6.0  | - |
|circos       | 0.69.9 | - |
|clearcut     | 1.3.0  | - |
|cnnpeaks     | 200913 | - |
|cromwell     | 30.1   | - |
|dbg2olc      |20200723| - |
|emboss       | 6.6.0  | - |
|evm          | 1.1.1  | - |
|exonerate    | 2.4.0  | - |
|fastx-toolkit| 0.0.14 | - |
|fgwas        | 0.3.6  | - |
|fsa          | 1.15.9 | - |
|gdrcopy      | 2.4.4  | (system) |
|genrich      | 0.6.1  | - |
|glpk         | 5.0    | - |
|gpunufft     | 2.1.0  | - |
|grace        | 5.1.25 | - |
|impute2      | 2.3.2  | - |
|intltool     | 0.51.0 | - |
|io_lib       | 1.14.8 | - |
|jdftx        | 1.7.0  | - |
|jtreeview    | 3      | - |
|junit        | 4.12   | - |
|levmar       | 2.6    | - |
|locuszoom    | 1.4    | - |
|manta        | 1.6.0  | - |
|marge        | 1.0    | - |
|mirdeep2     | 0.1.3  | - |
|motif        | 2.3.8  | - |
|mutect       | 1.1.4  | - |
|mutsigcv     | 1.41   | - |
|ncl          | 6.6.2  | - |
|netperf      | 2.6.0  | - |
|nextflow     | 24.10.5| 25.04.6 |
|nseg         | 1.0.0  | - |
|openbugs     | 3.2.3  | - |
|openspeedshop| 2.4    | - |
|p3dfft       | 2.7.9  | - |
|paintor      | 3.0    | - |
|pcmsolver    | 1.3.0  | - |
|peakseq      | 1.31   | - |
|platform-mpi |9.01.04.03| - |
|pov-ray      |3.7.0.10| - |
|psipred      | 4.02   | - |
|psmc         | 0.6.5  | - |
|pstool       | 0.4.5  | - |
|qtltools     | 1.3.1  | - |
|rapidsai     | 24.06  | 25.06 |
|rasqual      |20210424| - |
|readosm      | 1.1.0a | - |
|saint        | 2.5.0  | - |
|saintexpress | 3.6.3  | - |
|seacr        | 1.3    | - |
|slatec       | 4.1    | - |
|snakemake    | 7.24.2 | 9.8.1 |
|sparc        |20180702| - |
|sparseassembler|2016  | - |
|sparsehash   | 2.0.3  | - |
|tophat       | 2.1.1  | - |
|torus        |20221211| - |
|voro++       | 0.4.6  | - |
|wasp         | 0.3.4  | - |
|wdltool      | 0.14   | - |
|yaff         | 1.6.0  | - |
|yasm         | 1.3.0  | - |
{{< /table >}}
