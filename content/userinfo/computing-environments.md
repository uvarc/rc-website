+++
author = "RC Staff"
description = ""
title = "Computing Environments at UVA"
date = "2025-01-15T08:08:29-05:00"
draft = false
tags = ["compute","rivanna","ivy","containers","systems","kubernetes","hipaa","hpc","accord"]
categories = ["userinfo"]
images = [""]
aliases = [ "/facilities" ]
+++

Research Computing (UVA-RC) serves as the principal center for computational resources and associated expertise at the University of Virginia (UVA). Each year UVA-RC provides services to over 433 active PIs that sponsor more than 2463 unique users from 14 different schools/organizations at the University, maintaining a breadth of systems to support the computational and data intensive research of UVA’s researchers.

# High Performance Computing 

## Standard Security Zone

UVA-RC’s High Performance Computing (HPC) systems are designed with high-speed networks, high performance storage, GPUs, and large amounts of memory in order to support modern compute and memory intensive programs. UVA-RC operates two HPC systems within the standard security zone, Rivanna and Afton. In total these systems are comprised of over 900 compute nodes, with a total of more than 48,000 X86 64-bit compute cores. Scheduled using SLURM, these resources can support over 1.5 PFLOP of peak CPU performance. HPC nodes are equipped with between 375 GB and 1.5 TB of RAM to support applications that require small and large amounts of memory, and 55 nodes include various configurations of the NVIDIA general purpose GPU accelerators (RTX2080, RTX3090, A6000, V100, A40, A100 and H200), from 4- to 10-way.

UVA-RC also acquires and maintains capability systems focused on providing novel environments. This includes an 18-node DGX BasePOD system with 8x A100 GPU devices per node, as well as newly added HGX H200 GPU nodes. The BasePOD provides a shared memory space across all GPUs in the system, allowing it to work collectively on models with memory needs larger than what can be held in a single node. The addition of H200 nodes further enhances UVA-RC’s support for large-scale AI workloads and memory-intensive applications. More information can be found [here](https://www.rc.virginia.edu/userinfo/hpc/basepod/).

## High Security Zone

The High-Security HPC (Rio) cluster is a high-performance computing system specifically designed for the processing and analysis of controlled-access and highly sensitive data. It features high-speed networks, high-performance storage, and GPUs - including an NVIDIA HGX H200 GPU - to support demanding computational tasks. Currently, Rio comprises 39 compute nodes, providing a total of 1,560 x86 64-bit compute cores. Each HPC node is equipped with 375 GB of RAM to accommodate memory-intensive applications. Additional GPU nodes designed to support AI and machine learning workloads will be integrated in the near future. 

Situated within the high-security zone, Rio can only be accessed through Ivy Linux virtual machines, ensuring compliance with stringent security requirements for data storage and processing. Compute time is managed through service unit allocations and fairshare models, with SLURM serving as the job scheduler. This architecture provides a secure, efficient, and robust environment for handling sensitive research workloads.

# Interactive Computing and Scientific Visualization 

UVA-RC supports specialized interfaces (i.e., Open OnDemand, FastX) and hardware for remote visualization and interactive computing. Interactive HPC systems allow real-time user inputs in order to facilitate code development, real-time data exploration, and visualizations. Interactive HPC systems are used when data are too large to download to a desktop or laptop, software is difficult or impossible to install on a personal machine, or specialized hardware resources (e.g., GPUs) are needed to visualize large data sets.

# Expertise 

UVA-RC aggregates expertise to provide consulting and collaboration services to researchers addressing all levels of the Research Computing technology stack.

UVA-RCs user support staff provide basic support and general onboarding through helpdesk and regularly scheduled tutorials. The Data Analytics Center (DAC) serves as a central hub for computational services and expertise in Data Analytics, including bioinformatics, image processing, text analysis, Artificial Intelligence. By offering specialized support and resources, the DAC connects UVA researchers with the advanced computing capabilities essential for their data-intensive research and analysis. The DAC provides a comprehensive suite of services designed to enhance research efforts. The services are organized into three primary areas: Training and Technical Support, Consultations, and Collaborations. Training and technical support, offered as a general service, includes tutorials and technical assistance with research computing systems. Consultations, also free of charge, facilitate knowledge sharing and the design of analysis workflows through dedicated meetings. DAC team members are available for collaborations on grants. Collaborations involve more in-depth work than consultations and in general require a DAC member to be embedded into a researcher’s grant. The DAC members, all holding advanced degrees, are adept at reviewing published techniques and adapting them to specific domain use cases, ensuring tailored and effective support for researchers.

Senior support staff have advanced degrees in relevant research domains such as biology, imaging, physics, computer science and material science, enabling in-depth collaboration on complex projects. For projects that require significant application development work, UVA-RC maintains a Solutions & DevOps team capable of rapid iteration while leveraging non-traditional HPC technologies. Lastly, UVA-RC's Infrastructure Services team enables projects that may require custom hardware or configurations outside of the standard images. Beyond their availability for direct project support, together these teams provide the R&D and operations expertise needed to ensure that UVA-RC is providing a modern research computing ecosystem for UVA researchers.

# Cloud Computing {#ivy}

Ivy is a secure computing environment for researchers consisting of virtual machines (Linux and Windows) backed by a total of 45 nodes and 2048 cores. Researchers can use Ivy to process and store sensitive data with the confidence that the environment is secure and meets HIPAA, FERPA, or CUI requirements.

For standard security projects, UVA-RC supports microservices in a clustered orchestration environment that leverages Kubernetes to automate the deployment and management of many containers in an easy and scalable manner. This cluster has 876 cores and 4.9TB of memory allocated to running containerized services, including one node with 4 x A100 GPUs. It also has over 300TB of cluster storage and can attach to UVA-RC's broader storage offerings. 

**ACCORD**

The ACCORD project (NSF Award: #1919667) offers flexible web-based interfaces for sensitive and highly sensitive data in a system focused on supporting cross-institutional access and collaboration. The ACCORD platform consists of 8 nodes in a Kubernetes cluster, for a total of 320 cores and ~3.2TB of memory. Cluster storage is approximately 1PB of IBM Spectrum storage (GPFS).

Researchers from non-UVA institutions can be brought into the ACCORD system through a memorandum of understanding between the researcher’s institution and UVA, security training for the researcher, and a posture-checking client installed on the researcher’s laptop/desktop. 

# Data Storage 

All researchers on UVA-RC's systems have access to a high-performance parallel storage platform. This system provides 8PB (PetaBytes) of storage with sustained read and write speeds of up to 10 GB/sec. The integrity of the data is protected by daily snapshots. UVA-RC also supports a second-tier storage solution, 3 PB, designed to address the growing need for resources that support data-intensive research by offering a lower cost, scalable solution. The system is tightly integrated with other UVA-RC storage and computing resources in order to support a wide variety of research data life cycles and data analysis workflows. 

# Data Centers, Network Connectivity, and Office Facilities 

UVA-RC enables interdisciplinary research through its robust data center facilities with over 1.5 MW of IT capacity to support leading edge computational and data storage systems. UVA-RC's equipment occupies a data center near campus, connected to the 10 Gbps campus network. Dedicated 10 and 100 Gbps links to our regional optical network and Internet2 give our researchers the network capacity and capability needed to collaborate with researchers from around the world. A Globus data transfer node enables data access and transfers to transcend institutional credentials. Located in the Michie North Building at 918 Emmet Street, UVA-RC’s offices are a short shuttle ride away from the central UVA grounds.
