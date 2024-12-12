+++
categories = ["architecture"]
tags = [
  "aws",
  "google",
  "cloud",
  "iot",
  "containers"
]
draft = false
date = "2023-02-23T14:18:18-05:00"
title = "Cloud Solutions"
description = ""
author = "Staff"
images = [
  "/2016/10/image.jpg",
]
aliases = ["/cloud"]
+++

<script>
// <!--
var aText = new Array(
"serverless website",
"API",
"scheduled tasks",
"pipelines",
"containers",
"jobs more efficiently"
);
//-->
</script>

<div class="typed">Run your<span id="typedtext"></span>
  <script src="/js/typed.js"></script>
</div>

<img src="/images/logos/aws_logo_smile_195x195.png" alt="AWS" align=right style="max-width:33%;" />
<p class=lead>Cloud computing is ideal for running flexible, scalable applications on demand, in periodic bursts, or for fixed periods of time. UVA Research Computing works alongside researchers to design and run research applications and datasets into Amazon Web Services, the leader among public cloud vendors. This means that server, storage, and database needs do not have to be estimated or purchased beforehand – they can be scaled larger and smaller with your needs, or programmed to scale dynamically with your application.</p>

<hr size=1 style="padding-bottom:10px;" />

# Service Oriented Architecture

A key advantage of the cloud is that for many services you do not need to build or maintain the servers that support the service -- you simply use it.

Here are some of the building blocks available using cloud infrastructure:

<div class="row">
  <div class="col-sm">
  <ul class="list-group">
    <li class="list-group-item"><i class="fa fa-2x fa-microchip" aria-hidden="true" style="padding-right:8px;"></i>&nbsp;Compute</li>
    <li class="list-group-item"><i class="far fa-2x fa-hdd" aria-hidden="true" style="padding-right:8px;"></i>&nbsp;Storage</li>
    <li class="list-group-item"><i class="fa fa-2x fa-database" aria-hidden="true" style="padding-right:8px;"></i> &nbsp;Databases</li>
    <li class="list-group-item"><i class="fa fa-2x fa-cube" aria-hidden="true" style="padding-right:8px;"></i> Containers / Docker</li>
    <li class="list-group-item"><i class="fas fa-2x fa-chart-pie" aria-hidden="true" style="padding-right:8px;"></i> Analytics / Data Management</li>
    <li class="list-group-item"><i class="fa fa-2x fa-share-alt" aria-hidden="true" style="padding-right:8px;"></i> &nbsp;Continuous Integration</li>
  </ul>
  </div>
  <div class="col-sm">
  <ul class="list-group">
    <li class="list-group-item"><i class="fa fa-2x fa-spin fa-cog" aria-hidden="true" style=""></i> &nbsp; Sensor / IoT Data Streaming</li>
    <li class="list-group-item"><i class="fa fa-2x fa-list-ul" aria-hidden="true" style="padding-right:8px;"></i> Message Queues / Brokers</li>
    <li class="list-group-item"><i class="fa fa-2x fa-mobile" aria-hidden="true" style="padding-left:8px;padding-right:18px;"></i> SMS / Push Integration</li>
    <li class="list-group-item"><i class="fa fa-2x fa-microphone" aria-hidden="true" style="padding-right:8px;"></i> &nbsp; Alexa Skills / Speech Integration</li>
    <li class="list-group-item"><i class="fa fa-2x fa-code" aria-hidden="true" style="padding-right:8px;"></i> Serverless Computing</li>
    <li class="list-group-item"><i class="fas fa-2x fa-check-circle" aria-hidden="true" style="padding-right:8px;"></i> &nbsp; Code Build / Validation</li>
  </ul>
  </div>
</div>

# Researchers Using the Cloud

<table class="table table-striped">
  <tbody>
    <tr>
      <th scope="row" style="width:25%;">Serverless Web</th>
      <td>
UVA faculty and researchers can share data, findings, tools and other resources from static HTML
content published to object storage. This simple method for publishing can cost only a few dollars a month and requires
no server management. 
      </td>
    </tr>
    <tr>
      <th scope="row" style="width:25%;font-weight:bold;">Data Lakes</th>
      <td>
A new paradigm in data storage and processing, data lakes help researchers by providing a central repository for both
structured and unstructured data, of any type or size. These data can then be siphoned off for processing, either in
real-time streams or in queues for later analysis.
      </td>
    </tr>
    <tr>
      <th scope="row" style="width:25%;font-weight:bold;">Services in Support of HPC</th>
      <td>
Users of HPC usually have more than enough computing power to run their jobs. But what if you
need a relational or NoSQL database, a messaging service, or offsite storage? Researchers have begun integrating the cloud 
into their HPC jobs to create, use, and manage external services like these.
      </td>
    </tr>
    <tr>
      <th scope="row" style="width:25%;font-weight:bold;">Workflows & Pipeline Management</th>
      <td>
<img src="/images/isometric-boxes.png" alt="Workflows" align="right" style="max-width:40%;padding:10px;" />
Researchers need flexibility for where they run their data pipelines -- it might be on a personal computer, a lab server,
an HPC cluster, or a cloud instance. We are working with faculty to extend some commonly-used pipeline tools so that they
can create and push jobs to cloud-based resources, regardless of the cloud vendor. 
      </td>
    </tr>
    <tr>
      <th scope="row" style="width:25%;font-weight:bold;">Long-term Cold Storage</th>
      <td>
AWS Glacier and Google Nearline/Coldline offer researchers "cold" offsite storage for long-term backups of infrequently-accessed data. 
Many researchers use Glacier to store terabytes of source data to fulfill grants and federal research project compliance. 
      </td>
    </tr>
  </tbody>
</table>


# Other Common Use Cases

* **Proofs of concept** - To verify a system or design works, to benchmark processing speeds, we may use short-lived instances to learn from before building a production system.

* **Test / Development environments** - For installing test packages, trying new ideas, and testing design patterns.

* **Dynamic / flexible / scaling application stacks** - When future traffic or load cannot be determined beforehand, deploying into a dynamic environment means the infrastructure is not locked into any set type of CPU/RAM or scale.

* **Short-term or fast deployment projects** - For almost immediate computing needs, existing users can create new instances as needed.

* **Container deployments** - Run microservices (such as Docker containers) in an environment that can load-balance their traffic and maintain container health.

<hr size=1 style="padding-bottom:10px;" />

# Reference Architecture

To get an idea of how public or private cloud resources are used in real-world and research scenarios, visit one of these **Solution Architecture References**:

- <a style="font-weight:bold;" href="https://aws.amazon.com/architecture/" target="_new">AWS Architecture Center</a>.
- <a style="font-weight:bold;" href="https://cloud.google.com/architecture/all-reference-architectures" target="_new">Google Cloud Solutions Architecture Reference</a> | <a href="https://cloud.google.com/docs/tutorials" target="_new" style="font-weight:bold;">GCP Builder Tutorials</a>.
- <a style="font-weight:bold;" href="https://learn.microsoft.com/en-us/azure/architecture/browse/" target="_new">Azure Solution Architecture</a> | <a style="font-weight:bold;" href="https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/" target="_new">Azure Reference Architectures</a>.

<small id="emailHelp" class="form-text text-muted">Some examples from AWS:</small>

<div class="row">
  <div class="aws-comp section col-sm"> 
    <a href="https://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_batch_03.pdf"> 
    <div class="image-border image-shadow"> 
      <div class="image parbase"> 
        <img alt="AWS-batch-processing-thumb" title="AWS-batch-processing-thumb" src="//d0.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/AWS-batch-processing-thumb.png" /> 
      </div> 
    </div></a> 
    <div style="padding-top:10px;"> 
     <p><b>Batch Processing</b><br /> Build auto-scalable batch processing systems like video/image/datastream processing pipelines.<br /> </p> 
    </div> 
  </div> 
  <div class="aws-comp section col-sm"> 
    <a href="https://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_largescale_05.pdf"> 
    <div class="image-border image-shadow"> 
      <div class="image parbase"> 
        <img alt="AWS-large-scale-processing-huge-data-thumb" title="AWS-large-scale-processing-huge-data-thumb" src="//d0.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/AWS-large-scale-processing-huge-data-thumb.png" /> 
      </div> 
    </div></a> 
    <div style="padding-top:10px;"> 
      <p><b>Large Scale Processing and Huge Data sets</b><br /> Build high-performance computing systems that involve Big Data.<br /> </p> 
    </div> 
  </div> 
  <div class="aws-comp section col-sm">
    <a href="https://media.amazonwebservices.com/architecturecenter/AWS_ac_ra_timeseriesprocessing_16.pdf">
    <div class="image-border image-shadow">
      <div class="image parbase">
        <img alt="AWS-large-scale-processing-huge-data-thumb" title="AWS-large-scale-processing-huge-data-thumb" src="//d0.awsstatic.com/architecture-diagrams/ArchitectureDiagrams/AWS-Time-Series.png" />
      </div>
    </div></a>
    <div style="padding-top:10px;">
      <p><b>Time Series and Streaming Data Processing</b><br /> Build elastic systems that process chronological data.
    </div>
  </div>
</div>

<hr size=1 style="padding-bottom:10px;" />

# Cloud Services at UVA

## Request an Account

Researchers or labs who would like to use AWS for their computing infrastructure should request an account through UVA Information Technology Services (ITS).
They currently support deployments in Amazon Web Services and Microsoft Azure, and offer both managed and self-service options.

[<button class="btn btn-primary">ITS Cloud Solutions</button>](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=af6801bbdbd8509066137deaae96191d)

## Training & Implementation

With an AWS account in hand, you will need some training. ITS can provide you with links to self-paced training for both AWS and Azure. Research Computing

If you need help with how to design your project in a cloud environment, or thinking through how to migrate your existing projects, [contact us](/form/support-request/) for a consultation.

## Sensitive Data in the Cloud

If your cloud-based project involves any sensitive data (HIPAA, PHI, etc.) you must request approval from the [Information Security](http://security.virginia.edu/) office at UVA. You will be required
to verify that your application, infrastructure, and staff can meet all minimum requirements for the secure transfer and handling of sensitive data.

<div class="alert alert-danger">
<b>Please note</b> that while sensitive data projects are possible in the cloud, their approval is not automatic nor guaranteed.
</div>

<hr size=1 style="padding-bottom:10px;" />

# Solution Architecture / Consulting

We have experience designing and delivering solutions to the public cloud using industry best practices. 
If you have a project and would like to discuss options, pricing, design, or implementation, we are available for consultation.
Our staff includes an AWS certified solution architect, and the RC team uses AWS for our own internal 
systems and development.

[<button class="btn btn-primary">Request a Consultation</button>](/form/support-request/)

<hr size=1 style="padding-bottom:10px;" />

# Training

We also offer in-person, hands-on workshops and sessions on working with the cloud. Workshops cover a number of topics,
from creating object storage buckets and simple compute instances to more complex data-driven workflows and Docker containers,
If you have an idea for a workshop or would like to schedule training for your lab or group, please contact us. 

<hr size=1 style="padding-bottom:10px;" />

<div class="row">
  <div class="col-sm-4">
    <a href="https://aws.amazon.com/education/awseducate/" target="_new"><img src="https://www.awseducate.com/resource/AWSLogo_350" alt="AWS Educate Member" style="padding-top:20px;padding-bottom:20px;" /></a>
  </div>
  <div class="col-sm-8">
    <img src="/images/aws-sa-pro.png" alt="Certified Solution Architect - Professional" style="width:196px;height:80px;" />
  </div>
</div>

{{% top-of-page %}}
