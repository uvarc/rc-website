+++
author = "RC Staff"
description = ""
title = "Computing Environments at UVA"
date = "2019-09-16T10:08:29-05:00"
draft = false
tags = ["compute","rivanna","ivy","cloud","aws","hpc","containers","dcos"]
categories = ["userinfo"]
images = [""]
+++

# Rivanna

The primary vehicle for high-performance computing since 2014 has been the Rivanna cluster. Rivanna is a heterogenous system consisting of approximately 186 x 20-core nodes with 128GB of RAM each, 25 x 28-core nodes with 256 GB of RAM, and 152 x 40-core nodes with 384GB each. Five “big memory” nodes offer 1TB of RAM with 16 cores each. All nodes are supported by a high-performance FDR Infiniband network using Mellanox hardware and some have EDR Infiniband. A number of nodes supporting specialty hardware are included; there are 8 nodes with NVIDIA K80 GPGPUs, 4 nodes with NVIDIA V100 GPGPUs, 1 node with NVIDIA V100, and 2 nodes with NVIDIA RTX2080TI boards. In addition, 8 KNL nodes with 64 physical cores and 192GB of RAM are available. The Rivanna cluster also provides approximately 1.4 Petabytes of scratch (temporary) storage on a high-speed Lustre filesystem. Users may also lease space on “Project” and “Value” storage that is mounted to Rivanna, as well as elsewhere. 
 
Rivanna is allocated by service units (SUs) and is managed under the “hotel” model in which researchers buy SUs rather than physical nodes. Service units generally correspond to core-hours, but in the case of very large memory jobs users must pay at least partially for cores not scheduled by the resource manager on that node due to the additional memory usage. We have also begun implementing a partial “condo” model, in which researchers can purchase time tied to cores or can purchase their own hardware to add to the cluster. This model coexists with the SU model for users who do not wish to make a large expenditure for time, or who can successfully manage their projects through free allocations from RC or from their Dean’s office.
 
- - -

# Ivy
Ivy is a computing system that meets all Health Insurance Portability and Accountability Act (HIPAA), Controlled Unclassified Information (CUI), and International Traffic in Arms Regulations (ITAR) data security requirements. Ivy satisfies the needs of researchers who must comply with all of the rules and regulations surrounding these directives, but do not have a system that meets the appropriate hardware/software standards. Faculty/staff may request Ivy resources in the form of virtual machines (VMs) with software customized for their needs. The project PI can create a list of project members who should also be given access to the VM. Ivy VMs are available at different tiers. By default, every Ivy VM is allocated 1TB of storage in Ivy Central Storage (ICS). Transferring data in and out of Ivy is done through a Globus Data Transfer Node. Primarly intended as a computational resource, Ivy was not designed for long-term data storage.
 
- - -

# Skyline
Skyline is the University's local research cloud for public and moderately sensitive data. Skyline is a collection of OpenStack virtual machines that can be leased by research groups in a variety of configurations to fit their computing needs.
 
- - -

# DCOS
Research Computing runs microservices in an orchestration environment named DCOS (Distributed Cloud Operating System), based on Apache Mesos and Apache Marathon. DCOS makes the deployment and management of many containers easy and scalable. This cluster has >1000 cores and ~1TB of memory allocated to running containerized services. DCOS also has over 300TB of cluster storage and can attach to project storage and GPFS.
