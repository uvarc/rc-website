+++
title = "Infrastructure & Code"
author = "SOMRC Staff"
categories = ["projects"]
tags = ["tools","containers","ami","scripts","architecture","cloud","code","mesos","bots","dcos"]
images = "/images/projects/code-infrastructure.png"
description = ""
date = "2018-04-27T17:18:27-04:00"
draft = false
projecttype = ["tools"]
+++

## Code & Resources

* [**SOMRC on GitHub**](https://github.com/uvasomrc/)
* [**SOMRC Workshop Materials**](https://workshops.somrc.virginia.edu/)
* [AWS Snippets](https://github.com/uvasomrc/aws-snippets)
* [Cloud Templates](https://github.com/uvasomrc/cloud-templates)
* [Project: `epihet`](/project/epihet/)
* [Project: `simpleCache`](/project/simplecache/)

## Containers

* [**SOMRC Docker Hub**](https://hub.docker.com/u/somrc/dashboard/)
* [Learn how to use Docker](https://github.com/uvasomrc/courses/blob/master/workshops/docker/README.md)
* [Project: LOLAweb](/project/lolaweb/)
* [Project: BARTweb](/project/bartweb/)

## Bots & Artificial Intelligence

* Alexa Skills (in development)
* Twitter Chatbot (in development)

## DC/OS Mesos

Launching in late 2018, this platform will orchestrate container deployments for both on-demand, short-lived workflows and long-running services.

<img align="right" alt="DCOS" style="max-width:34%;" src="/images/dcos-logo.png">
Some example workloads:

* Web content
* Relational Databases (MySQL, PostgreSQL)
* NoSQL Databases (MongoDB, Cassandra, Redis, Scylla)
* Elasticsearch / Kibana
* Pipelines and sequential workflows
* Travis-based builds
* Apache Spark
* Apache Kafka 
* See [other available packages](https://universe.dcos.io/#/packages)

Users will be able to select from a catalog of images, stored in a UVA Container Registry, and launch them on-demand. This new cluster will be attached to Qumulo storage, as well as the Globus DTN.

More information coming soon!
