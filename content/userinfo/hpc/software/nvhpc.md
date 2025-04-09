+++
type = "rivanna"
date = "2019-04-23T08:37:46-05:00"
tags = [
  "rivanna", "software", "compiler","gpu"
]
draft = false
title = "NVHPC"
description = "Compiling GPU Applications and UVA HPC"
author = "RC Staff"

+++

# Compiling for a GPU

Using a GPU can accelerate a code, but requires special programming and compiling.  Several options are available for GPU-enabled programs.

## OpenACC

OpenACC is a standard

## Available NVIDIA CUDA Compilers

{{< module-versions module="cuda" >}}

{{< module-versions module="nvhpc" >}}

## GPU architecture
According to the [CUDA documentation](https://docs.nvidia.com/cuda/cuda-compiler-driver-nvcc/index.html#gpu-feature-list), "in the CUDA naming scheme, GPUs are named `sm_xy`, where `x` denotes the GPU generation number, and `y` the version in that generation." The documentation contains details about the architecture and the corresponding `xy` value. The *compute capability* is `x.y`.

Please use the following values when compiling CUDA code on the HPC system.

| Type       | GPU       | Architecture | Compute Capability | CUDA Version |
|------------|-----------|--------------|--------------------|--------------|
| Datacenter | V100      | Volta        | 7.0                | 9+           |
|            | A100      | Ampere       | 8.0                | 11+          |
|            | A40       | Ampere       | 8.6                | 11+          |
|            | H200      | Hopper       | 9.0                | 11.8+        |
| RTX        | A6000     | Ampere       | 8.6                | 11+          |
| GeForce    | RTX2080Ti | Turing       | 7.5                | 10+          |
|            | RTX3090   | Ampere       | 8.6                | 11+          |

<br>

As an example, if you are only interested in V100 and A100:
```
-gencode arch=compute_70,code=sm_70 -gencode arch=compute_80,code=sm_80
```
