+++
categories = [
  "services",
  "hpc",
]
tags = [
  "hpc",
  "ivy",
  "rivanna",
]
draft = false
date = "2020-04-16T09:30:12-05:00"
title = "High Performance Computing"
description = ""
author = "RC Staff"
images = [
  "",
]

+++

<p class=lead>Research Computing supports all UVA researchers who are interested in writing code to address their scientific inquiries. Whether these programming tasks are implemented interactively, in a series of scripts or as an open-source software package, services are available to provide guidance and enable collaborative development. RC has specific expertise in object-oriented programming in <b>Matlab</b>, <b>R</b>, and <b>Python</b>.</p>

Examples of service areas include:

- Collaborating on package development
- Reviewing and debugging code
- Preparing scripts to automate or expedite tasks
- Developing web interfaces for interactive data exploration
- Advising on integration of existing software tools

- - -

<p class=lead>UVA has four local computational facilities available to researchers: <b>Rivanna</b>, <b>Afton</b>, <b>Rio</b> and <b>Ivy</b>. Depending upon your use case, privacy requirements, and the application(s) you need to run, we can help you create an account and start processing your data.</p>

<div class="card" style="margin:2rem;">
  <div class="card-block">
    <h2 class="card-title">Afton</h2>
    <h5 class="card-subtitle mb-2">Standard Security HPC Cluster</h5>
    <p class="card-text">
      {{< get_allocation_blurb name="Afton" >}}
    </p>
    <a href="/userinfo/hpc" class="card-link"><button class="btn btn-warning">Read more about Afton</button></a>
  </div>
</div>

<div class="card" style="margin:2rem;">
  <div class="card-block">
    <h2 class="card-title">Rivanna</h2>
    <h5 class="card-subtitle mb-2">Standard Security HPC Cluster</h5>
    <p class="card-text">
      {{< get_allocation_blurb name="Rivanna" >}}
    </p>
    <a href="/userinfo/hpc" class="card-link"><button class="btn btn-warning">Read more about Rivanna</button></a>
  </div>
</div>

<div class="card" style="margin:2rem;">
  <div class="card-block">
    <h2 class="card-title">Rio</h2>
    <h5 class="card-subtitle mb-2">High-Security HPC Cluster</h5>
    <p class="card-text">
Rio is one of the recent University of Virginia’s High-Performance Computing (HPC) systems, specifically designed for the processing and analysis of controlled-access and highly sensitive data. Rio consists of over 40 HPC nodes, each equipped with 375 GB of RAM and offering a combined total of more than 1,600 x86 64-bit compute cores. Researchers can use Rio to process and store sensitive data with the confidence that the environment is secure and meets HIPAA, FERPA, ITAR requirements.     
</p>
    <a href="/userinfo/ivy" class="card-link"><button class="btn btn-warning">Read more about Rio</button></a>
  </div>
</div>

<div class="card" style="margin:2rem;">
  <div class="card-block">
    <h2 class="card-title">Ivy</h2>
    <h5 class="card-subtitle mb-2">High-Security / HIPAA Computing Environment</h5>
    <p class="card-text">
    Ivy is a secure computing environment for researchers consisting of virtual machines (Linux and Windows) backed by a total of {{< ivy-node-count >}} nodes and approximately {{< ivy-core-count >}} cpu cores. Researchers can use Ivy to process and store sensitive data with the confidence that the environment is secure and meets HIPAA, FERPA, CUI or ITAR requirements.
    </p>
    <a href="/userinfo/ivy" class="card-link"><button class="btn btn-warning">Read more about Ivy</button></a>
  </div>
</div>

