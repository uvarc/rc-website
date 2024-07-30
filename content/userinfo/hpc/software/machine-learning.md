+++
type = "rivanna"
date = "2024-01-02T00:00:00-05:00"
tags = [
  "rivanna", "software", "machine-learning"
]
draft = false
title = "Machine Learning and UVA HPC"
description = "Machine Learning and UVA HPC"
author = "RC Staff"

+++
# Overview
Many machine learning packages can utilize general purpose graphics processing units (GPGPUs).  If supported by the respective machine learning framework or application, code execution can be manyfold, often orders of magnitude, faster on GPU nodes compared to nodes without GPU devices.

The HPC system has several nodes that are equipped with GPU devices.  These nodes are available in the GPU partition.  Access to a GPU node and its GPU device(s) requires specific Slurm directives or command line options as described in the Jobs using a GPU Node section.

# Applications
Several machine learning software packages are installed on the UVA HPC system.  The most commonly used ones are:

* [TensorFlow](/userinfo/hpc/software/tensorflow)
* [PyTorch](/userinfo/hpc/software/pytorch)

Other less frequently used software packages include:

* Dragonn
* LightGBM
* XGBoost
