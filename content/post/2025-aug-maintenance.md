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

{{< table title="replacement" class="table table-striped" >}}
| Module | Remove | Replace with |
|---|---|---|
|bazel        | 6.1.1  | 8.3.1 |
|blasr        |20190414| - |
|cellpose     | 2.3.2  | 3.0.10, 4.0.5 |
|dbg2olc      |20200723| - |
|idl          | 8.9    | 9.1 |
|jdftx        | 1.7.0  | - |
|openspeedshop| 2.4    | - |
|platform-mpi |9.01.04.03| - |
|rapidsai     | 24.06  | 25.06 |
|rasqual      |20210424| - |
|sparc        |20180702| - |
|sparseassembler|2016  | - |
|torus        |20221211| - |
|totalview    |  |  |
{{< /table >}}
