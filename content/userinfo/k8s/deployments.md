+++
author = "RC Staff"
description = ""
title = "Microservice Deployments"
date = "2023-03-04T23:59:16-05:00"
draft = false
tags = ["compute","containers","infrastructure","docker","kubernetes","api","k8s"]
categories = ["userinfo","containers"]
images = [""]
+++

<p class=lead>
  <img src="/images/logos/k8s-icon.png" style="" alt="Kubernetes" align="right" />
  Kubernetes is a container orchestrator for both short-running (such as workflow/pipeline stages) jobs and long-running (such as web and 
  database servers) services. Containerized applications running in the UVARC Kubernetes cluster are visible to UVA Research networks (and 
  therefore from Rivanna, Afton, Skyline, etc.). Web applications can be made visible to the UVA campus or the public Internet.
</p>

# Kubernetes

Research Computing runs microservices in a Kubernetes cluster that automates the deployment of many containers, making their
management easy and scalable. This cluster will eventually consist of several dozen instances, >2000 cores and >2TB of memory allocated to 
running containerized services. It will also have over 300TB of cluster storage and can attach to both [project](/userinfo/storage/#public-internal-use-data-storage) and 
[standard](/userinfo/storage/#public-internal-use-data-storage) storage.

{{% highlight-danger %}}
The research Kubernetes cluster is hosted in the standard security zone. It is suitable for processing standard sensitivity or internal 
use data. Highly sensitive data (PHI, FERPA, etc.) are not permitted on this platform. 
{{% /highlight-danger %}}

<img src="/images/microservices/microservice-cluster.jpg" alt="Microservices Architecture" style="" />

# Design Principles

Deployments within the UVARC Kubernetes cluster are configured with a "Desired State" architecture. This means that deployments are
described in code (k8s YAML, Helm charts, Jsonnet & Kustomize files) and the cluster maintains the described state all the time. This is
often called the "GitOps" model, since the deployment files are code that can be tracked and versioned in a Git repository. As researchers
iterate on their application and build+test their containers, deployments themselves can be managed separately with new container versions.

This model has some distinct advantages for both research users and engineers:

- Deployments should be defined in code. Hand-built deployments are as brittle and unreproducable as hand-made Docker containers. This helps maintain the state of applications as well as for disaster recovery.
- We do not grant users command-line access to the K8S API. <code>kubectl</code> and <code>helm</code> require the overhead of user authentication, roles, permissions, and network connectivity to the control plane that are unnecessary.
- Permissions in the GitOps model are granted via the deployment's Git repository, not at the cluster level.


# Deployment Lifecycle

The lifecycle of applications themselves is different from, and should be independent from, various deployments of that application. 
Running your containerized application in Kubernetes requires you to think of two separate activities: (1) developing, testing, and building your 
application and its dependencies; and (2) deploying your application stack in the cluster.

1. **Development** - The first activity is generally well understood by researchers who may write their apps in Python, R, or other languages. As the 
app evolves, it is containerized using a `Dockerfile` and tested. Finally, more advanced projects will use automation tools such as GitHub Actions or 
Jenkins to build, test, and publish the application container(s) image to a container registry such as Docker Hub or GitHub Container Registry (GHCR).

2. **Delivery** - The second activity is less understood by researchers, since running `docker` locally for testing is different from cluster 
deployments. It is our belief that researchers should not be required to learn `kubectl` or other cluster management commands, instead simply defining their
deployment in code and letting automation tools take it from there. We suggest you use a separate repository for all your deployment files, so
that these two activities remain entirely separate.

This lifecycle is known to engineers and developers as CI/CD, or Continuous Integration / Continuous Delivery, as it describes how modern applications
are built, packaged, delivered, and deployed - each of which may take more than one form. 

- **Continous Integration** is the process of developers 
continually iterating on the features, logic, and inner-workings of their application stack. This may be as small as bug fixes and as large as a 
complete redesign. The final product of the CI stage is a deliverable that can be run in test, user acceptance, or production modes. CI tools help automate the packaging
and publication of that deliverable. In the case of microservices this is most often a container image that is ready to use. 

- **Continous Delivery** is
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

# Launching Your Application

The following ingredients come together to run your application

1. **Namespace** -
Service launches generally require the creation of a namespace if users do not already have one. Namespaces serve as logical 
and organizational dividers, keeping the management of the services of User A isolated from those of User B. Namespaces also
allow administrators to monitor or limit the maximum consumable resources (i.e. CPU and memory) for all deployments within the
namespace. 

2. **Deployment** -
The basic unit of your running application. This defines what container image to use, what it should be named,
how many replicas should run, what storage should be mounted and where, as well as resource limits.

3. **Service** -
A running deployment that expects incoming requests must be exposed as a service, over a port. This allows Kubernetes
to route traffic to the container(s). Some deployments, such as a recurring task or cron job, may not need a service 
or ingress definition.

4. **Ingress** -
For service deployments such as web servers that expect incoming requests, the ingress definition maps a hostname (`example.pods.uvarc.io`)
with a service. The UVARC cluster runs multiple ingress controllers to handle incoming traffic.

5. **Secrets / `env` Variables** -
The best practice for passing sensitive information (usernames, passwords, keys, tokens, credentials) into a running
container is to pass them in as encrypted environment variables called secrets. We use `kubeseal` for encrypting secrets 
into plaintext. This text can be added and committed to public repositories since their decryption key is stored privately 
in the cluster. Secrets can be consumed as `env` variables or as files mapped within the file hierarchy of the container.
Normal `env` variables can also be passed to the container by defining them within the deployment spec file or as a
config map that stores several key-value `env` vars.

6. **Storage** -
We offer the ability to mount from three pools of persistent storage:
    1. Research Value Storage
    2. Research Project Storage
    3. Local Cluster Storage - priced by TB increments like Project Storage.

- - -

# Observability

Observability is the process of debugging, monitoring, or determining the state of your applications
behind the scenes. We provide three levels of access into your microservices:

1. **ArgoCD** - A GUI to check the state of your deployments within Kubernetes.
2. **Lens** - A GUI to view pods, logs, shell into your pods, view storage and secrets, etc. Download Lens [**here**](https://k8slens.dev/)
3. **`kubectl`** - Programmatic CLI access to the same resources as Lens.

# Connecting Services

Kubernetes offers two simple ways to connect your microservices:

1. **Inter-pod communication** - When launching more than one container in your deployment specification, the
containers can communicate by name, without a service definition. Your containers would launch in the same
pod, which means they run on the same physical server and have immediate access to each other.

2. **Service-based communication** - Running pods are assigned an arbitrary internal IP address within the
cluster, and exposed internally within a namespace through service definitions (see above). Fortunately,
containers within a namespace are provided all other service addresses within that namespace
as `env` variables. This means that one of your pods, (e.g. `MY_API`) will be exposed via the name defined
in its specification (in all caps, e.g. `MY_API_SERVICE`), that can be consumed by other pods running within 
that namespace, simply by referring to that variable.

# Division of Responsibilities

What we take care of:

- Underlying physical infrastructure: Servers, networks, cabling, power, cooling.
- Underlying hosts: Operating system, patching, mounts to cluster/remote storage.
- Kubernetes API: Core k8s services across the cluster, high availability.
- Kubernetes Ingress: The ability to map traffic to pods. With SSL as necessary.
- Observability Tools: K8S Dashboard, ArgoCD Dashboard, Lens GUI to monitor and inspect your deployments.
- Deployment templates: To help you get started.

What you take care of

- Creation, versioning and maintenance of container image(s).
- Maintenance of your deployment's scale, version, `env` variables and secrets.
- Debugging your application as necessary.

- - -

# Cluster Status

{{% k8s-grafana-embed %}}

- - -

# Next Steps

Have a containerized application ready for launch? Or want a consultation to discuss your microservice implementation?

<a href="/form/containers/"><button class="btn btn-success">Request Access</button></a> &nbsp;&nbsp; {{< consult-button >}}
