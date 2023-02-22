+++
author = "RC Staff"
description = ""
title = "Computing Environments at UVA"
date = "2023-02-21T10:08:29-05:00"
draft = false
tags = ["compute","rivanna","ivy","containers","systems","kubernetes","hipaa","hpc","accord"]
categories = ["userinfo"]
images = [""]
aliases = [ "/facilities" ]
+++

# Rivanna

The primary vehicle for high-performance computing since 2014 has been the Rivanna cluster. Rivanna is a heterogenous system with a total of {{< rivanna-node-count >}} nodes and {{< rivanna-core-count >}} cpu cores. It consists of 527 nodes with 20-40 cores and 128-768GB of RAM each, 11 large memory nodes with 16-48 cores and 1-1.5TB of RAM each, and 34 nodes with a total of 228 NVIDIA GPU accelerators (K80, P100, V100, A100, RTX2080Ti, RTX3090). These nodes are partitioned for various types of workloads, but include development, parallel, HTC and instructional partitions. All nodes are supported by a high-performance EDR/FDR Infiniband network using Mellanox hardware. The Rivanna cluster also provides approximately {{< rivanna-scratch-capacity >}} of scratch (temporary) storage on a high-speed Lustre filesystem. Users may also lease space on “Reseaarch Project” and “Research Standard” storage that is mounted to Rivanna, as well as elsewhere. 
 
Rivanna is allocated by service units (SUs) and is managed under the “hotel” model in which researchers buy SUs rather than physical nodes. Service units generally correspond to core-hours, but in the case of very large memory jobs users must pay at least partially for cores not scheduled by the resource manager on that node due to the additional memory usage. We have also begun implementing a partial “condo” model, in which researchers can purchase time tied to cores or can purchase their own hardware to add to the cluster. This model coexists with the SU model for users who do not wish to make a large expenditure for time, or who can successfully manage their projects through free allocations from RC or from their Dean’s office.

- - -

# Ivy
Ivy is a computing system that meets all Health Insurance Portability and Accountability Act (HIPAA), Family Educational Rights and Privacy Act (FERPA), Controlled Unclassified Information (CUI), and International Traffic in Arms Regulations (ITAR) data security requirements. Ivy satisfies the needs of researchers who must comply with all of the rules and regulations surrounding these directives, but do not have a system that meets the appropriate hardware/software standards. 

The Ivy platform provides ~{{< ivy-core-count >}} cpu cores consisting of approximately 32 x 36-core nodes with 256GB of RAM each, 27 x 20-core nodes with 384GB of RAM, 24 x 40-core nodes with 384GB each. In addition, nodes supporting specialty hardware include 4 nodes with NVIDIA V100 GPGPUs, and 1 node with NVIDIA M60 GPGPUs. All nodes are connected by a 10+10GbE Ethernet network to provide client and external network storage access. A high-performance EDR Infiniband network using Mellanox hardware is available on the 40-core standard compute and V100 GPGPU nodes. Users may also lease space on high security “Project” and “Value” storage that is mounted on Ivy resources and accessible via Globus high security DTN.

Faculty/staff may request Ivy resources in the form of virtual machines (VMs) with software customized for their needs. The project PI can create a list of project members who should also be given access to the VM. Ivy VMs are available at different tiers. By default, every Ivy VM is allocated 1TB of storage in Ivy Central Storage (ICS). Transferring data in and out of Ivy is done through a Globus Data Transfer Node. Primarly intended as a computational resource, Ivy was not designed for long-term data storage. 

- - -

# ACCORD

ACCORD is a web-based computing environment for highly sensitive data. This project was funded through a grant from the NSF,
with the intention of providing computing resources for researchers across the commonwealth who may lack such resources at their
home institution. Placed in the High Security Zone alongside Ivy, ACCORD is designed to be a collaborative platform for cross-institutional 
research. ACCORD is currently approved for deidentified PHI, PII, FERPA, and Business Confidential data.

The ACCORD platform consists of 8 nodes in a Kubernetes cluster, each with approximately 40 cores and 256GB of RAM. Cluster storage is
approximately 1PB of IBM Spectrum storage (GPFS), with data transfer capabilities via Globus DTN. GPU capacity is being added in 2023.

PIs may request ACCORD access for their project and team members. Once approved, researchers connect to ACCORD from either their campus
or institutional VPN, select an appropriate software interface, and their environment is provisioned immediately. Currently the interfaces
offered are: Theia Python, Theia C++, Jupyter Notebook, and RStudio. All researchers in a given project are given a home directory that 
persists across sessions, as well as project storage they share with other team members.

- - -

# Microservices

Microservices enable researchers to run containerized applications in a single managed environment. Researchers bring their
own containers or multi-container solutions, and UVA Research Computing coordinates their deployment. Once deployed, users
manage their own services, including versioning, content, scaling, and connecting to other services.

The microservice platform is a multi-node Kubernetes cluster currently 
consisting of 12 nodes, with approximately 72 cores and 384GB of RAM each. The cluster also includes a single GPU server
with 4 x A100 NVIDIA GPUs. The system is located in the UVA Standard Security Zone and
has full network visibility to other SSZ resources such as the Rivanna HPC system. This cluster includes ingress
controllers, SSL encryption, a secrets manager, namespaces with role-based access, and 
tools for automated deployment and management. Kubernetes nodes currently have NFS access to Research Standard 
Storage shares.
