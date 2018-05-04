+++
title = "User Guides"
description = ""
author = "SOMRC Staff"
images = [
  "",
]
date = "2017-01-19T09:55:56-05:00"
categories = [
  "userinfo",
]
tags = [
  "hpc",
  "ivy",
  "storage",
  "cloud",
]
draft = false
quell_footer = true

+++

<div class="card-group" style="margin-top:2rem;">
  <div class="card">
    <div style="text-align:center;"><i class="fa fa-microchip fa-5x" aria-hidden="true" style="padding-top:40px;padding-bottom:20px;"></i></div>
    <div class="card-block">
      <h4 class="card-title">High Performance Computing</h4>
      <p class="card-text">Standard and high security HPC to run your code, generally written in R, Python or shell scripts.</p>
      <br clear=all />
      <div class="contact-button">
        <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#hpcModal">Learn More &rsaquo;</button>
      </div>
    </div>
  </div>
  <div class="card">
    <div style="text-align:center;"><i class="fa fa-database fa-5x" aria-hidden="true" style="padding-top:40px;padding-bottom:20px;"></i></div>
    <div class="card-block">
      <h4 class="card-title">Storage</h4>
      <p class="card-text">Need large, or extremely large storage offsite or on grounds? Can you count in GB, TB, or PB? Learn more about storage options and pricing.</p>
      <br clear=all />
      <div class="contact-button">
        <a href="/userinfo/storage/"><button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#storageModal">Get Started &rsaquo;</button></a>
      </div>
    </div>
  </div>
  <div class="card">
    <div style="text-align:center;"><i class="fa fa-cloud fa-5x" aria-hidden="true" style="padding-top:40px;padding-bottom:20px;"></i></div>
    <div class="card-block">
      <h4 class="card-title">Cloud</h4>
      <p class="card-text">Have an idea you'd like to test? Need an environment provisioned in short-order? We can help you build in the AWS cloud.</p>
      <br clear=all />
      <div class="contact-button">
        <a href="/service/cloud/"><button class="btn btn-sm btn-primary">Get Started &rsaquo;</button></a>
      </div>
    </div>
  </div>
</div>


<div class="card-group">
  <div class="card">
    <div style="text-align:center;"><i class="fa fa-image fa-5x" aria-hidden="true" style="padding-top:40px;padding-bottom:20px;"></i></div>
    <div class="card-block">
      <h4 class="card-title">Image Processing</h4>
      <p class="card-text">Do you have a large imaging dataset to process? Do you want to automate your image processing pipeline? Learn more about tools and techniques to speed up your workflow. 
      </p>
      <br clear=all />
      <div class="contact-button">
        <a href="/service/imaging/"><button class="btn btn-sm btn-primary">Get Started &rsaquo;</button></a>
      </div>
    </div>
  </div>
  <div class="card">
    <div style="text-align:center;"><i class="fa fa-truck fa-5x" aria-hidden="true" style="padding-top:40px;padding-bottom:20px;"></i></div>
    <div class="card-block">
      <h4 class="card-title">Data Transfer</h4>
      <p class="card-text">Sometimes you have the right data, but in the wrong place. There are several paths available for researchers depending upon the size and destination of your data.</p>
      <br clear=all />
      <div class="contact-button">
        <a href="/userinfo/data-transfer/"><button class="btn btn-sm btn-primary">Get Started &rsaquo;</button></a>
      </div>
    </div>
  </div>
  <div class="card">
    <div style="text-align:center;"><i class="fas fa-dna fa-5x" aria-hidden="true" style="padding-top:40px;padding-bottom:20px;"></i></div>
    <div class="card-block">
      <h4 class="card-title">Bioinformatics</h4>
      <p class="card-text">We are developing a library of documentation and code templates for performing bioinformatics analyses using local HPC Rivanna) and cloud computing resources.</p>
      <br clear=all />  
      <div class="contact-button">
        <a href="/service/bioinformatics/"><button class="btn btn-sm btn-primary">Get Started &rsaquo;</button></a>
      </div>
    </div>
  </div>
</div>



<!-- Modal for HPC -->
<div class="modal fade" id="hpcModal" tabindex="-1" role="dialog" aria-labelledby="hpcModalLabel" aria-hidden="true" style="margin-top:100px;">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="hpcModalLabel">High Performance Computing</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row" style="">
          <div class="col-sm-6">
        <div class="card">
          <div class="card-header">
            <b>Rivanna - Standard Security</b>
          </div>
          <div class="card-block">
            <p class="card-text">A traditional high performance cluster with job scheduler, large file system, modules, and MPI processing. Please see the ARCS page for how to begin working in Rivanna.</p>
            <a href="http://arcs.virginia.edu/rivanna" target="_new"><button class="btn btn-primary">Rivanna User Guide</button></a>
          </div>
        </div>
        </div>
        <div class="col-sm-6">
        <div class="card">
          <div class="card-header">
            <b>Ivy - High Security</b>
          </div>
          <div class="card-block">
            <p class="card-text">A multi-platform, HIPAA-compliant system for secure data that includes dedicated virtual machines (Linux and Windows), Domino Data Lab, and Hadoop/Spark.</p>
            <a href="/userinfo/ivy/"><button class="btn btn-primary">Ivy User Guide</button></a>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>
