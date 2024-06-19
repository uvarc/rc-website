+++
author = "RC Staff"
description = ""
title = "Container Services"
date = "2023-02-23T23:59:16-05:00"
draft = false
tags = ["compute","containers","hybrid","infrastructure","docker","kubernetes","api","k8s"]
categories = ["userinfo","containers"]
images = [""]
+++

<!--
  <img src="/images/carousel/microservice-army.png" alt="Stand out from the pack" />
-->

<p class=lead style="margin-top:2rem;">
  <img src="/images/docker-logo.png" style="max-width:30%;" alt="Docker Containers" align="right" />
  Container-based architecture, also known as "microservices," is an approach to designing and running applications as a distributed set of components or layers. Such applications are typically run within containers, made popular in the last few years by <a href="https://www.docker.com" target="_new">Docker</a>.
</p>
<p class=lead>
  Containers are portable, efficient, reusable, and contain code and any dependencies in a single package.
  Containerized services typically run a single process, rather than an entire stack within the same environment. 
  This allows developers to replace, scale, or troubleshoot portions of their entire application at a time.
</p>

{{< highlight >}}
<img style="max-width:100px;float:right;" src="/images/logos/k8s-icon.png" />
<p><b>General Availability (GA) of Kubernetes</b> - Research Computing now manages microservice orchestration
with Kubernetes, the open-source tool from Google. New deployments are now launched directly within Kuberenetes.</p>
<p>&raquo; <a href="/userinfo/k8s/deployments/">Read about Kubernetes and user deployments</a>.</p>
{{< /highlight >}}

# Microservices at UVA
Research Computing runs microservices in a clustered orchestration environment that automates the deployment and 
management of many containers easy and scalable. This cluster has >1000 cores and ~1TB of memory allocated to 
running containerized services. It also has over 300TB of cluster storage and can attach to 
[**project**](/userinfo/storage/) and [**value**](/userinfo/storage/) storage.

{{% highlight-danger %}}
<div style="float:left;margin:0.5rem 1rem 1rem 0rem;"><i class="fa fa-3x fa-exclamation-triangle" aria-hidden="true"></i></div>
UVA's microservices platform is hosted in the standard security zone. It is suitable for processing public or internal use data. Sensitive or highly sensitive data are not permitted on this platform. 
{{% /highlight-danger %}}

<img src="/images/microservices/microservice-cluster.jpg" alt="Microservices Architecture" style="" />

# Basic Principles

<p class="lead"><span class="badge badge-default">1</span> Microservice architecture is a design approach, or a way of building things. Microservices can be considered the opposite of "monolithic" designs.</p>

A few guiding design principles:

1. Separate components and services
2. Availability and resilience
3. Replaceable elements
4. Easily distributable
5. Reusable components
6. Decentralized elements
7. Easy deployment

Here's a talk given by Martin Fowler explaining the idea:

{{< youtube "2yko4TbC8cI" >}}

<div style="width:100%;height:2rem;"></div>

<p class="lead"><span class="badge badge-default">2</span> The easiest and most common way to run microservices is inside of containers.</p>

- We teach workshops on containers and how to use them. Browse the course overview for <a href="https://learning.rc.virginia.edu/tag/containers/" target="_new">Building Containers for Rivanna</a> at your own pace.
- Docker provides an excellent [Getting Started](https://docs.docker.com/get-started/) tutorial.
- Users may inject `ENV` environment variables and encrypted secrets into containers at runtime. This means sensitive information does not need to be written into your container.

- - -

# Uses for Research

<p class="lead">Microservices are typically used in computational research in one of two ways:</p>

<ol>
  <li class=lead><b>Standalone microservices or small stacks</b> - Such as interactive or data-driven web applications and APIs or scheduled task containers. Some examples:</li>
    <ul style="margin-bottom:2rem;">
      <li>Simple web container to serve Project files to the research community or as part of a publication.
      <li>Reference APIs can handle requests based either on static reference data or databases.
      <li>Shiny Server presents users with interactive plots to engage with your datasets.
      <li>A scheduled job to retrieve remote datasets, perform initial ETL processing, and stage them for analysis.
    </ul>

  <li class=lead><b>Microservices in support of HPC jobs</b> - Some workflows in HPC jobs require supplemental services in order to run such as relational databses, key-value stores or reference APIs.
</ol>


Browse a list of recent [UVA projects employing microservices](/project?tag=.containers).

- - -

# Common Deployments

<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col"></th>
      <th scope="col">Service</th>
      <th scope="col">Accessibility</th>
      <th scope="col" style="width:40%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:4rem;" src="/images/microservices/nginx-500x500.png" /></th>
      <td style="font-weight:bold;">NGINX Web Server</td>
      <td>Public</td>
      <td>A fast web server that can run
        <ul>
          <li>Static HTML <a target="_new" href="http://innovation.lab.virginia.edu/" class="badge badge-primary">demo</a>
          <li>Flask or Django apps <a target="_new" href="http://bartweb.org/" class="badge badge-primary">demo</a>
          <li>RESTful APIs <a target="_new" href="http://ids.uvadcos.io/docs" class="badge badge-primary">demo</a>
          <li>Expose Project storage <a target="_new" href="http://big.databio.org/" class="badge badge-primary">demo</a>
        </ul>
      </td>
    </tr>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:6rem;" src="/images/microservices/apache_logo.jpg" /></th>
      <td style="font-weight:bold;">Apache Web Server</td>
      <td>Public</td>
      <td>An extremely popular web server that can run your static HTML, Flask or Django apps, RESTful APIs, or expose files stored in Project storage.</td>
    </tr>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:4rem;" src="/images/microservices/shiny-server.png" /></th>
      <td style="font-weight:bold;">Shiny Server</td>
      <td>Public</td>
      <td>Runs R-based web applications and offers a dynamic, data-driven user interface. See a <a href="https://www.rstudio.com/products/shiny/shiny-user-showcase/" target="_new" class="badge badge-primary">demo</a> or try using <a target="_new" href="http://lolaweb.databio.org/" class="badge badge-primary"><b>LOLAweb</a></td>
    </tr>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:4rem;" src="/images/microservices/bash_512x512.png" /></th>
      <td style="font-weight:bold;">Recurring Tasks</td>
      <td>n/a</td>
      <td>Schedule or automate tasks or data staging using the language of your choice (bash, Python, R, C, Ruby).</td>
    </tr>
  </tbody>
</table>

- - - 

# Database Hosting

Research computing may be able to provide support for your database hosting needs. Please schedule a consultation request on our website. Follow the link [here](https://www.rc.virginia.edu/form/support-request/?category=Consultation) and fill out the form under "Consultation Request" on the right hand side of the page under "All Forms".

# Service Eligibility & Limitations

<div class="alert alert-danger" role="alert">
To be eligible to run your microservice on our infrastructure, you must meet the following requirements:

<ul>
  <li>Microservices and custom containers must be for <b>research purposes only</b>. We do not run production systems outside the scope 
of academic research support.
  <li>Your container(s) must <b>pass basic security checks</b>. Containers <b>may not contain passwords</b>, SSH keys, API keys, or 
other sensitive information. There are secure methods for passing sensitive information into containers.
  <li>If bringing your own custom container, it must be <b>ready to go</b>! Unfortunately, we cannot create custom containers for you 
unless it is part of a funded project.
</ul>

Microservices may not run efficiently for all use cases. Some scenarios that cannot run successfully in containers include:

<ul>
  <li>Services (apart from web-based services over HTTP/HTTPS) that need to be accessed from outside the HPC network.
  <li>Services that require licensing, such as Microsoft SQL Server, MATLAB, etc.
  <li>Services that require GPU to run.
</ul>
</div>

- - -

# Pricing

Container services hosted by UVA Research Computing fall under this pricing structure:

{{< pricing microservices >}}

- - -

# Apptainer

Want to run your container within an HPC environment? It can be done, using Apptainer! 

Apptainer is a container application targeted to multi-user, high-performance computing systems. It interoperates well with Slurm and with the Lmod modules system. It can be used to create and run its own containers, or it can import Docker containers.

[**Learn more about Apptainer**](/userinfo/hpc/software/apptainer/).

- - -

# Next Steps

Have a containerized application ready for launch? Or want a consultation to discuss your microservice implementation?

<a href="/form/containers/"><button class="btn btn-success">Request Access</button></a> &nbsp;&nbsp; {{< consult-button >}}
