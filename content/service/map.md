+++
categories = ["services"]
type = "full-width"
images = []
description = ""
title = "Service Map"
author = "RC Staff"
tags = [
  "hpc",
  "rivanna",
  "ssz",
  "hsz",
  "hipaa",
  "secure",
  "microservices"
]
date = "2022-03-08"
draft = false
toc = true

+++

<style>
  .card-body{
    padding:0.6rem;
  }
</style>

<p class="lead">
From a security perspective, research data generally breaks down into two types: <b>Moderately Sensitive</b> and <b>Highly Sensitive</b>. Each must be handled appropriately. For the purposes of computing environments, that means conducting your research in the right security zone.
</p>

<p>
  <a class="btn btn-primary btn-lg" data-toggle="collapse" href="#sszcollapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Blue Zone</a>
  <button class="btn btn-warning btn-lg" type="button" data-toggle="collapse" data-target="#hszcollapse" aria-expanded="false" aria-controls="multiCollapseExample2">Orange Zone</button>
</p>
<div class="row" style="margin-top:2rem;">
  <div class="col">
    <div class="collapse multi-collapse" id="sszcollapse">
      <div class="card-header" style="background-color:#0275d8;color:white;">
        <b>Moderately Sensitive Data</b>
      </div>
      <div class="card card-body">
        <ul>
          <li>HPC
          <li>Storage
          <li>Virtual Machines
          <li>Microservices
        </ul>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="collapse multi-collapse" id="hszcollapse">
      <div class="card-header" style="background-color:#f0ad4e;color:white;">
        <b>Highly Sensitive Data</b>
      </div>
      <div class="card card-body">
        <ul>
          <li>HPC
          <li>Storage
          <li>Virtual Machines
          <li>Microservices
        </ul>
      </div>
    </div>
  </div>
</div>
