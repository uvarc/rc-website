+++
author = "RC Staff"
description = ""
title = "Kubernetes & Deployments"
date = "2022-06-04T23:59:16-05:00"
draft = false
tags = ["compute","containers","infrastructure","docker","kubernetes","api","k8s"]
categories = ["userinfo"]
images = [""]
+++


<p class=lead>
  <img src="/images/logos/k8s-icon.png" style="" alt="Kubernetes" align="right" />
  Kubernetes is a container orchestrator for both short-running (such as workflow/pipeline stages) and long-running (such as web and database 
  servers) jobs. Containerized applications running in the UVARC Kubernetes cluster are visible to UVA Research networks (and therefore
  from Rivanna, Skyline, etc.). Web applications can be made visible to the UVA campus or the public Internet.
</p>


# Kubernetes

Research Computing runs microservices in a clustered orchestration environment that automates the deployment and management of many containers easy and 
scalable. This cluster will have over 20 instances, >2000 cores and >2TB of memory allocated to running containerized services. It will also have over 
300TB of cluster storage and can attach to [project](/userinfo/storage/#public-internal-use-data-storage) and 
[standard](/userinfo/storage/#public-internal-use-data-storage) storage.

{{% highlight-danger %}}
The Kubernetes research cluster is hosted in the standard security zone. It is suitable for processing public or internal use data. Sensitive or highly sensitive data are not permitted on this platform. 
{{% /highlight-danger %}}

<img src="/images/microservices/microservice-cluster.jpg" alt="Microservices Architecture" style="" />

# Design/Deployment Principles

Some guiding principles for the RC Kubernetes cluster:

<ol>
  <li> No direct command-line access - <code>kubectl</code> and <code>helm</code> require the overhead of user authentication, roles, permissions,
and network connectivity to the control plane. A better alternative employs the GitOps model for defining, updating, and managing deployments in code.
  <li> Dedicated Build and Deployment pipelines - Containerized applications consist of code, dependencies, and data requirements. The lifecycle of 
applications themselves is different from, and should be independent from, various deployments of that application. 
  <li> "Desired state" architecture
  <li> Code-based deployments - Deployments should be defined in code. Hand-built deployments are as brittle and unreliable as hand-made Docker 
containers.
  <li> Git-based permissions

</ol>


Here's a talk given by Martin Fowler explaining the idea:

{{< youtube "2yko4TbC8cI" >}}

<div style="width:100%;height:2rem;"></div>

<p class="lead"><span class="badge badge-default">2</span> The easiest and most common way to run microservices is inside of containers.</p>

- We teach workshops on containers and how to use them. Browse the course overview for <a href="https://learning.rc.virginia.edu/tag/containers/" target="_new">Building Containers for Rivanna</a> at your own pace.
- Docker provides an excellent [Getting Started](https://docs.docker.com/get-started/) tutorial.
- Katacoda offers a great [hands-on Docker training series](https://www.katacoda.com/courses/docker) for free.
- Users may inject `ENV` environment variables and encrypted secrets into containers at runtime. This means sensitive information does not need to be written into your container.

- - -

# Uses for Research

<p class="lead">Microservices are typically used in computational research in one of two ways:</p>

<ol>
  <li class=lead><b>Standalone microservices or small stacks</b> - Such as interactive or data-driven web applications and APIs, small databases (<100GB), or scheduled task containers. Some examples:</li>
    <ul style="margin-bottom:2rem;">
      <li>Simple web container to serve Project files to the research community or as part of a publication.
      <li>Reference APIs can handle requests based either on static reference data or databases.
      <li>Shiny Server presents users with interactive plots to engage with your datasets.
      <li>A scheduled job to retrieve remote datasets, perform initial ETL processing, and stage them for analysis.
    </ul>

  <li class=lead><b>Microservices in support of HPC jobs</b> - Some workflows in HPC jobs require supplemental services in order to run, such as relational databases, key-value stores, or reference APIs. Some examples:</li>
    <ul style="margin-bottom:2rem;">
      <li>Cromwell/WDL pipelines rely on MySQL databases to track job status and state if a portion of your pipeline fails.
      <li>Key-value stores in Redis can track an index of values or a running count that is updated as part of a job.
      <li>A scheduled job to refresh a library of reference data from an external source, such as reference genomes or public datasets.
    </ul>
</ol>


Browse a list of recent [UVA projects employing microservices](/project?tag=.containers).

- - -

# Next Steps

Have a containerized application ready for launch? Or want a consultation to discuss your microservice implementation?

<a href="/form/containers/"><button class="btn btn-success">Request Access</button></a> &nbsp;&nbsp; {{< consult-button >}}
