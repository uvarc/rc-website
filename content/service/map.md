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
private = true

+++

<style>
  .card-body{
    padding:0.6rem;
  }
.card {
    background-color: #fff;
    border-radius: 10px;
    border: none;
    position: relative;
    margin-bottom: 30px;
    box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}
.l-bg-cherry {
    background: linear-gradient(to right, #493240, #f09) !important;
    color: #fff;
}
.l-bg-blue-dark {
    background: linear-gradient(to right, #373b44, #4286f4) !important;
    color: #fff;
}
.l-bg-green-dark {
    background: linear-gradient(to right, #0a504a, #38ef7d) !important;
    color: #fff;
}
.l-bg-orange-dark {
    background: linear-gradient(to right, #a86008, #ffba56) !important;
    color: #fff;
}
.card .card-statistic-3 .card-icon-large .fas, .card .card-statistic-3 .card-icon-large .far, .card .card-statistic-3 .card-icon-large .fab, .card .card-statistic-3 .card-icon-large .fal {
    font-size: 110px;
}
.card .card-statistic-3 .card-icon {
    text-align: center;
    line-height: 50px;
    margin-left: 15px;
    color: #000;
    position: absolute;
    right: -5px;
    top: 20px;
    opacity: 0.1;
}
.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}
.l-bg-green {
    background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
    color: #fff;
}
.l-bg-orange {
    background: linear-gradient(to right, #f9900e, #ffba56) !important;
    color: #fff;
}
.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}

</style>

<p class="lead">
From a security perspective, research data generally breaks down into two types: <b>Moderately Sensitive</b> and <b>Highly Sensitive</b>. Each must be handled appropriately. For the purposes of computing environments, that means conducting your research in the right security zone.
</p>
<p>
  <a class="btn btn-primary btn-lg" style="background-color:#084B84;" data-toggle="collapse" href="#sszcollapse" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Blue Zone</a>
  <button class="btn btn-warning btn-lg" style="background-color:#E47D1E;" type="button" data-toggle="collapse" data-target="#hszcollapse" aria-expanded="false" aria-controls="multiCollapseExample2">Orange Zone</button>
</p>
<div class="row" style="margin-top:2rem;">
  <div class="col">
    <div class="collapse multi-collapse" id="sszcollapse">
      <div class="card-header" style="background-color:#084B84;color:white;">
        <b>Moderately Sensitive Data</b>
      </div>
      <div class="card card-body">
        <ul>
          <li>HPC - Rivanna and Afton, our high performance clusters. Includes over 12k cores across 
          <li>Storage
          <li>Virtual Machines
          <li>Microservices
        </ul>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="collapse multi-collapse" id="hszcollapse">
      <div class="card-header" style="background-color:#E47D1E;color:white;">
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
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossorigin="anonymous" />
<div class="col-md-10 ">
    <div class="row ">
        <div class="col-xl-4 col-lg-6">
            <div class="card l-bg-cherry">
                <div class="card-statistic-3 p-4">
                    <div class="mb-4">
                        <h5 class="card-title mb-0"><span class="fa-solid fa-server"></span>HPC</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                      Computing with over 12k cores.
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-lg-6">
            <div class="card l-bg-blue-dark">
                <div class="card-statistic-3 p-4">
                    <div class="mb-4">
                        <h5 class="card-title mb-0">Storage</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                      All your data are belong to us.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-xl-4 col-lg-6">
            <div class="card l-bg-green-dark">
                <div class="card-statistic-3 p-4">
                    <div class="mb-4">
                        <h5 class="card-title mb-0">Virtual Machines</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                      Virtual Machines for all your data.
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-lg-6">
            <div class="card l-bg-orange-dark">
                <div class="card-statistic-3 p-4">
                    <div class="mb-4">
                        <h5 class="card-title mb-0">Microservices</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                      Microservices for all your data.
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
