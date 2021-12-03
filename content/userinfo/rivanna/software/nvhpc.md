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

# Compiling For a GPU

Using a GPU can accelerate a code, but requires special programming and compiling.  Several options are available for GPU-enabled programs.

## OpenACC

OpenACC is a standard

## Available NVIDIA CUDA Compilers

{{< module-versions module="cuda" >}}

{{< module-versions module="nvhpc" >}}

## GPU architecture
According to the [CUDA documentation](https://docs.nvidia.com/cuda/cuda-compiler-driver-nvcc/index.html#gpu-feature-list), "in the CUDA naming scheme, GPUs are named `sm_xy`, where `x` denotes the GPU generation number, and `y` the version in that generation." The documentation contains details about the architecture and the corresponding `xy` value. The *compute capability* is `x.y`.

Please use the following values when compiling CUDA code on Rivanna.

| Type | GPU | Architechture | Compute Capability | CUDA Version |
| --- | --- |  --- | --- | --- |
| Data Center |K80 | Kepler | 3.7 | 5 - 11 |
|             |P100 | Pascal | 6.0 | 8+ |
|             |V100 | Volta | 7.0 | 9+ |
|             |A100 | Ampere | 8.0 | 11+ |
| GeForce     |RTX 2080 Ti | Turing | 7.5 | 10+ |
|             |RTX 3090 (coming soon) | Ampere | 8.6 | 11+ |

<br>

As an example, if you are only interested in V100 and A100:
```
-gencode arch=compute_70,code=sm_70 -gencode arch=compute_80,code=sm_80
```
