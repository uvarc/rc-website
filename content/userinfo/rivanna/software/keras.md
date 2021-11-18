+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "data"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "containers","singularity"
]
draft = false
modulename = "keras"
softwarename = "Keras"
title = "Keras on Rivanna"
author = "RC Staff"
+++

# Description

[Keras](https://keras.io/) is a high-level neural networks application programming interface (API), written in Python and capable of running on top of [TensorFlow](https://www.tensorflow.org/), [CNTK](https://www.microsoft.com/en-us/cognitive-toolkit/), or [Theano](http://deeplearning.net/software/theano/).  On Rivanna, we provide TensorFlow containers that include the Keras API.  Since version 1.12.0, TensorFlow contains its own Keras API implementation as described on the [TensorFlow](http://www.tensorflow.org/guide/keras) website.

# Using Keras with TensorFlow containers
Like TensorFlow itself, Python code that utlizes the Keras package can be run interactively as Jupyter Notebooks, in interactive shell jobs, or non-interctively as Slurm batch jobs.  Rivanna provides several nodes with graphics processing units (GPUs) that should be used when running Keras code.

As best practice, it is recommended to create a [local copy of the TensorFlow container](/userinfo/rivanna/software/tensorflow/#local-copy-of-container-image) before using the Keras package in Slurm or interactive jobs.

# Example Python Script
The follwing example script can be found on the [TensorFlow Tutorials](https://www.tensorflow.org/tutorials/) website.  **Note that this script requires TensorFlow 1.12.0.**
```
import tensorflow as tf
mnist = tf.keras.datasets.mnist


(x_train, y_train),(x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0

model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(),
  tf.keras.layers.Dense(512, activation=tf.nn.relu),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation=tf.nn.softmax)
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.fit(x_train, y_train, epochs=5)
model.evaluate(x_test, y_test)
```

# Keras Jupyter Notebooks
The Keras package can be used for interactive code development in Jupyter Notebooks as described in our [TensorFlow Jupyter Notebook](/userinfo/rivanna/software/tensorflow/#tensorflow-jupyter-notebooks) documentation.

# Keras Slurm jobs
The Keras package can be used for Slurm job batch processing as described in our [TensorFlow Slurm Job](/userinfo/rivanna/software/tensorflow/#tensorflow-slurm-jobs) documentation.

# Keras Interactive Jobs (ijob)
The Keras package can be used for code development in an interactive shell environment as described in our [TensorFlow Interactive Jobs](/userinfo/rivanna/software/tensorflow/#tensorflow-interactive-jobs-ijob) documentation.
The ijob is for command-line usage; if you require a graphical user interface, including some form of IDE, see the instructions for [Tensorboard](/userinfo/rivanna/software/tensorflow/#tensorboard) or you may use [Jupyterlab](/userinfo/rivanna/software/tensorflow/#tensorflow-jupyter-notebooks).

# Interaction with the Host File System
The following user directories are overlayed onto each container by default on Rivanna:

+ /home
+ /scratch
+ /nv
+ /project

Due to the overlay, these directories are by default the same inside and outside the container with the same read, write, and execute permissions.  **This means that file modifications in these directories (e.g. in `/home`) via processes running inside the container are persistent even after the container instance exits.**  The `/nv` and `/project` directories refer to leased storage locations that may not be available to all users.

For more details review our [software and Singularity container](/userinfo/rivanna/software/containers) documentation.
