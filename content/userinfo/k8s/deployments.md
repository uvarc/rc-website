+++
author = "RC Staff"
description = ""
title = "Microservice Deployments"
date = "2022-06-14T23:59:16-05:00"
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

Research Computing runs microservices in a Kubernetes cluster that automates the deployment and management of many containers easy and 
scalable. This cluster will have over 24 instances, >2000 cores and >2TB of memory allocated to running containerized services. It will also have over 
300TB of cluster storage and can attach to both [project](/userinfo/storage/#public-internal-use-data-storage) and 
[standard](/userinfo/storage/#public-internal-use-data-storage) storage.

{{% highlight-danger %}}
The Kubernetes research cluster is hosted in the standard security zone. It is suitable for processing public or internal use data. Sensitive or highly sensitive data are not permitted on this platform. 
{{% /highlight-danger %}}

<img src="/images/microservices/microservice-cluster.jpg" alt="Microservices Architecture" style="" />


# Design Principles

Deployments within the UVARC Kubernetes cluster are configured with a "Desired State" architecture. This means that deployments are
described in code (k8s YAML, Helm charts, Jsonnet & Kustomize files) and the cluster maintains the described state all the time. This is
often called the "GitOps" model, since the deployment files are code that can be tracked and versioned in a Git repository. As researchers
iterate on their application and build+test their containers, deployments themselves can be managed separately with new container versions.

This model has some distinct advantages for both research users and engineers:

- Deployments should be defined in code. Hand-built deployments are as brittle and unreproducable as hand-made Docker containers. This helps maintain the state of applications as well as for disaster recovery.
- We no longer grant users command-line access to the K8S API. <code>kubectl</code> and <code>helm</code> require the overhead of user authentication, roles, permissions, and network connectivity to the control plane that are unnecessary.
- Permissions in the GitOps model can be granted within the Git repository, not at the cluster level.


# Deployment Guidelines

The lifecycle of applications themselves is different from, and should be independent from, various deployments of that application. 
Running your containerized application in Kubernetes requires you to think of two separate activities: (1) developing, testing, and building your 
application and its dependencies; and (2) deploying your application stack in the cluster.

1. **Development** - The first activity is generally well understood by researchers who may write their apps in Python, R, or other languages. As the 
app evolves, it is containerized using a `Dockerfile` and tested. Finally, more advanced projects will use automation tools such as GitHub Actions or 
Jenkins to build, test, and deploy the application container(s) to a container registry such as Docker Hub or GitHub Container Registry (GHCR).

2. **Delivery** - The second activity is less understood by researchers, since running `docker` locally for testing is different from cluster 
deployments. It is our belief that researchers should not be required to learn `kubectl` or other cluster management commands, instead simply defining their
deployment in code and letting automation tools take it from there. We suggest you use a separate repository for all your deployment files, so
that these two activities remain entirely separate.

This lifecycle is known to engineers and developers as CI/CD, or Continuous Integration / Continous Delivery, as it describes how modern applications
are built, packaged, delivered, and deployed - each of which may take more than one form. **Continous Integration** is the process of developers 
continually iterating on the features, logic, and inner-workings of their application stack. This may be as small as bug fixes and as large as a 
complete redesign. The final product of the CI stage is a deliverable that can be run in test, user acceptance, or production modes. CI tools help automate the packaging
and publication of that deliverable. In the case of microservices this is most often a container image that is ready to use. **Continous Delivery** is
the process of taking that deliverable and running it in an environment such as a public cloud, a server, etc. However, the CD process is normally
more elegant than stopping the existing version of an application and replacing it. CD tools attempt to gently roll new versions into operation
without any service disruption. And, using normal performance health checks, if the new version does not gain a healthy state, the CD orchestrator will 
roll back the container version.

ArgoCD is UVARC's choice for a Kubernetes-based CD tool as it offers the "desired state" model described above, accepts a number of deployment formats, 
and is robust enough for distributed production clusters.

Here's a brief explanation of ArgoCD and the entire CI/CD lifecycle:

{{< youtube "MeU5_k9ssrs" >}}

<div style="width:100%;height:2rem;"></div>

- - -

# Next Steps

Have a containerized application ready for launch? Or want a consultation to discuss your microservice implementation?

<a href="/form/containers/"><button class="btn btn-success">Request Access</button></a> &nbsp;&nbsp; {{< consult-button >}}
