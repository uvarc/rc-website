+++
type = "rivanna"
date = "2019-04-23T08:37:46-05:00"
tags = [
  "rivanna", "software", "compiler","gpu"
]
draft = false
title = "Compiling GPU Applications on Rivanna"
description = "Compiling GPU Applications on Rivanna"
author = "RC Staff"

+++

## Available NVIDIA CUDA Compilers

{{< module-versions module="cuda" >}}

{{< module-versions module="nvhpc" >}}

## GPU architecture `-arch`
According to the [CUDA documentation](https://docs.nvidia.com/cuda/cuda-compiler-driver-nvcc/index.html#gpu-feature-list), "in the CUDA naming scheme, GPUs are named `sm_xy`, where `x` denotes the GPU generation number, and `y` the version in that generation." The documentation contains details about the architecture and the corresponding `xy` value. On Rivanna, the GPU nodes are K80, P100, V100, and RTX 2080 Ti, which are Kepler, Pascal, Volta, and Turing, respectively. In summary, please use the following values when compiling CUDA code on Rivanna.

| GPU Type | Architechture | `xy` | CUDA Version |
| --- | --- | --- | --- |
| K80 | Kepler | 37 | 5 - 10 (deprecated from 11) |
| P100 | Pascal | 60 | 8+ |
| V100 | Volta | 70 | 9+ |
| RTX 2080 Ti | Turing | 75 | 10+ |

<br>

Therefore, if you need your code to work on all GPU types, please load CUDA version 10:
```
module load cuda/10.2.89
```
and provide a list of NVCC flags, e.g.
```
-gencode arch=compute_37,code=sm_37 \
-gencode arch=compute_60,code=sm_60 \
-gencode arch=compute_70,code=sm_70 \
-gencode arch=compute_75,code=sm_75
```
