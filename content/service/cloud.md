+++
categories = [
  "architecture",
]
tags = [
  "hpc",
  "cloud",
  "services",
]
draft = false
date = "2017-01-24T14:18:18-05:00"
title = "Cloud Solutions"
description = ""
author = "SOMRC Staff"
images = [
  "/2016/10/image.jpg",
]

+++

<img src="https://somrc.virginia.edu/images/aws-logo-344x150.png" alt="AWS" align=right style="height:50%;width:50%;max-width:33%;" />
<p class=lead>Cloud computing is ideal for running flexible, scalable applications on demand, in periodic bursts, or for fixed periods of time. UVA SOMRC works alongside researchers to design and run research applications and datasets into Amazon Web Services, the leader among public cloud vendors. This means that server, storage, and database needs do not have to be estimated or purchased beforehand – they can be scaled larger and smaller with your needs, or programmed to scale dynamically with your application. If you have an idea or project and need a proof of concept, we would be happy to sit down and design a cloud solution with you.</p>

<hr size=1 style="padding-bottom:20px;" />

# Common Use Cases

* Proofs of concept
* Test/Development environments
* Dynamic / flexible / scaling application stacks
* Short-term or fast deployment projects
* Container deployments

<hr size=1 style="padding-bottom:20px;" />

# Service Oriented Architecture

We have experience designing and delivering solutions to the public cloud using industry best practices. A key advantage of the cloud is that, for many services, you do not need to build, provision, or maintain the servers that support the service -- you simply use it.

Here are some of the building blocks available using cloud infrastructure:

<div class="row">
  <div class="col-sm">
  <ul class="list-group">
    <li class="list-group-item"><i class="fa fa-2x fa-microchip" aria-hidden="true" style="padding-right:8px;"></i> Compute</li>
    <li class="list-group-item"><i class="fa fa-2x fa-hdd-o" aria-hidden="true" style="padding-right:8px;"></i> Storage</li>
    <li class="list-group-item"><i class="fa fa-2x fa-database" aria-hidden="true" style="padding-right:8px;"></i> Database</li>
    <li class="list-group-item"><i class="fa fa-2x fa-cube" aria-hidden="true" style="padding-right:8px;"></i> Containers / Docker</li>
    <li class="list-group-item"><i class="fa fa-2x fa-pie-chart" aria-hidden="true" style="padding-right:8px;"></i> Analytics / Data Management</li>
  </ul>
  </div>
  <div class="col-sm">
  <ul class="list-group">
    <li class="list-group-item"><i class="fa fa-2x fa-spin fa-cog" aria-hidden="true" style=""></i> &nbsp; Sensor / IoT Data Streaming</li>
    <li class="list-group-item"><i class="fa fa-2x fa-list-ul" aria-hidden="true" style="padding-right:8px;"></i> Messaging Queues</li>
    <li class="list-group-item"><i class="fa fa-2x fa-mobile" aria-hidden="true" style="padding-left:8px;padding-right:18px;"></i> SMS / Push Integration</li>
    <li class="list-group-item"><i class="fa fa-2x fa-amazon" aria-hidden="true" style="padding-right:8px;"></i> Alexa Skills / Speech Integration</li>
    <li class="list-group-item"><i class="fa fa-2x fa-code" aria-hidden="true" style="padding-right:8px;"></i> Serverless Computing</li>
  </ul>
  </div>
</div>

<hr size=1 style="padding-bottom:20px;" />

# Reference Architecture

To get an idea of how AWS is used in real-world and research scenarios, visit the <a style="font-weight:bold;" href="https://aws.amazon.com/architecture/" target="_new">AWS Architecture Center</a> or review some reference deployments below.
<small id="emailHelp" class="form-text text-muted">These examples are drawn from AWS.</small>

<div class="row">
  <div class="aws-comp section col-sm"> 
    <a href="http://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_batch_03.pdf"> 
    <div class="image-border image-shadow "> 
      <div class="image parbase"> 
        <img alt="AWS-batch-processing-thumb" title="AWS-batch-processing-thumb" src="//d0.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/AWS-batch-processing-thumb.png" /> 
      </div> 
    </div></a> 
    <div style="padding-top:10px;"> 
     <p><b>Batch Processing</b><br /> Build auto-scalable batch processing systems like video/image/datastream processing pipelines (<a adhocenable="false" href="http://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_batch_03.pdf">PDF</a>)<br /> </p> 
    </div> 
  </div> 
  <div class="aws-comp section col-sm"> 
    <a href="http://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_largescale_05.pdf"> 
    <div class="image-border image-shadow "> 
      <div class="image parbase"> 
        <img alt="AWS-large-scale-processing-huge-data-thumb" title="AWS-large-scale-processing-huge-data-thumb" src="//d0.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/AWS-large-scale-processing-huge-data-thumb.png" /> 
      </div> 
    </div></a> 
    <div style="padding-top:10px;"> 
      <p><b>Large Scale Processing and Huge Data sets</b><br /> Build high-performance computing systems that involve Big Data (<a adhocenable="false" href="http://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_largescale_05.pdf">PDF</a>) <br /> </p> 
    </div> 
  </div> 
  <div class="aws-comp section col-sm">
    <a href="http://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_timeseriesprocessing_16.pdf">
    <div class="image-border image-shadow ">
      <div class="image parbase">
        <img alt="AWS-large-scale-processing-huge-data-thumb" title="AWS-large-scale-processing-huge-data-thumb" src="//d0.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/AWS-Time-Series.png" />
      </div>
    </div></a>
    <div style="padding-top:10px;">
      <p><b>Time Series Processing</b><br /> Build elastic systems that process time series data (<a adhocenable="false" href="http://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_timeseriesprocessing_16.pdf">PDF</a>)
    </div>
  </div>
</div>

<hr size=1 style="padding-bottom:20px;" />

<div class="row">
  <div class="col-sm-4">
    <img src="https://www.awseducate.com/resource/AWSLogo_350" alt="AWS Educate Member" style="padding-top:20px;padding-bottom:20px;" />
  </div>
  <div class="col-sm-8">
    <img src="https://somrc.virginia.edu/images/aws-sa-pro.png" alt="Certified Solution Architect - Professional" style="width:196px;height:80px;" />
  </div>
</div>
