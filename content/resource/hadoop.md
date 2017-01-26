+++
categories = [
  "big data",
]
tags = [
  "hadoop",
  "emr",
]
draft = false
title = "Hadoop / EMR"
description = ""
author = "SOMRC Staff"
images = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Hadoop_logo.svg/2000px-Hadoop_logo.svg.png",
]
date = "2017-01-24T08:28:49-05:00"

+++

<p class=lead>Hadoop is a framework that supports the processing and storage of extremely large data sets in a distributed computing environment. It is part of the Apache project sponsored by the Apache Software Foundation. In Amazon Web Services, Hadoop is available as a service named "Elastic MapReduce" (EMR).</p>

# Hadoop

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Hadoop_logo.svg/2000px-Hadoop_logo.svg.png" align=right style="height:50%;width:50%" />

Hadoop is frequently used by researchers for processing either massive data files (larger than you might be able to store on your local workstation) or a great quantity of files. It has become a critical element to companies and organizations that need to digest vast data sets, or continual data streams, on a regular basis.

# MapReduce

The programming paradigm of Hadoop is called "mapreduce," a two-tier process that both **maps** datasets and then **reduces** them into output data. Hadoop is one of the most frequently used tools when it comes to "big data", as it can scale to thousands of servers (or more), tackling data sets of many petabytes (PB). Here are the two steps, explained further:

<div class="blockquote"><b>Mapping</b> takes input data and processes it into key-value pairs.</div>

<div class="blockquote"><b>Reducing</b> takes these pairs, aggregates them, and then (often) performs some form of analysis upon them.</div>

<iframe width="600" height="338" src="https://www.youtube.com/embed/8wjvMyc01QY" frameborder="0" allowfullscreen></iframe>

