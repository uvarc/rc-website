+++

date = "2017-02-22T15:28:51-05:00"
description = ""
title = "AWS for Bioinformatics"
draft = true
tags = ["bioinformatics","samtools","AWS","bowtie2", "genomics"]
categories = ["reference"]
images = [""]
author = "RC Staff"
type = "reference"

+++


Setting up computational infrastructure on AWS is a well-defined, though somewhat time-consuming process. This introduction is designed to explain some of the terminology, define the steps required to set up AWS, and point the user to some excellent tutorials/resources created for bioinformatics and genomics.  

Setting up a server on AWS involves making decisions on the following broad categories.


# Set Up a Computational Server

An excellent tutorial that covers the steps for creating an EC2 (Elastic Compute Cloud) instance (up to logging into your EC2) along with a myriad of questions such as pricing and what kind of computing and storage resources to choose from geared towards bioinformatics and genomics is available [here](https://github.com/griffithlab/rnaseq_tutorial/wiki/Intro-to-AWS-Cloud-Computing). Broadly speaking, setting up a server (EC2 instance) requires the following steps.

* AWS user account: The user account can be your own, or you could be part of a group user account (e.g., your lab’s account on AWS). You (or the administrator of the account) can set up permissions for you, such as whether you are allowed to stop instances started by other members of the lab. AWS calls it an IAM Role. See [here](https://aws.amazon.com/iam/) for AWS policies and sign-up procedures for user accounts.

* Amazon Machine Image (AMI): [AMI](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) is an operating system with or without pre-defined computational power, memory, hard disk, or software tools. If you start from scratch, you will choose all the elements step-by-step. We recommend using Ubuntu as your operating system as quite a few community bioinformatics tools are built for Ubuntu. At this time, NCBI BLAST is available as a [community AMI](https://aws.amazon.com/marketplace/pp/B00N44P7L6?qid=1487694350159&sr=0-1&ref_=srh_res_product_title) on Amazon, and we expect more to be available over time.  

* EC2 Instance: If you are building an AMI from scratch, you’ll have to choose the right processing power, memory, and network capabilities for the analyses required. Each operating system available on AWS can come with slightly different processing and memory options, but for the most part the capabilities are comparable. As a start, an instance with 4 cores and 32 GB of memory should be reasonable for a lot of genomics analyses, though for large scale analyses you could need more [computing power and storage space](http://ivory.idyll.org/blog/how-much-compute-ngs.html). Depending on your needs, you can buy more computational power from AWS. 

* Elastic Block Storage (EBS): This is the equivalent of choosing how much hard disk (SSD) to add to your EC2. You can do that while specifying the EC2 or later on as your storage requirements increase or decrease over time. EBS is one of multiple storage options available with AWS, but is a good first choice (along with S3 for long term storage capability) for a researcher starting off on AWS. 500GB of EBS is probably a good start to try out a few analyses. Please see [here](https://d0.awsstatic.com/whitepapers/Storage/AWS%20Storage%20Services%20Whitepaper-v9.pdf) for more information on storage options with AWS. 

* Setting up security protocols to connect with your AMI. This can include which IP addresses are recognized for inbound and outbound communication, methods of connecting with the AMI, etc.

* Logging in using ssh and installing the software you’d like to use, e.g., Bowtie2, Samtools, or Bedtools.
 

# Installing Software

Once you’re logged into an EC2 instance, you can install most software using the apt-get command on Ubuntu and yum on Amazon Linux, e.g., 
	apt-get -y install samtools bedtools python-mysqldb

To install MACS, first install pip and then use pip to install MACS:

	apt-get -y install python-pip
	pip install macs2

To install SRA Toolkit, scroll down to the section SRA Toolkit [here](http://fenglabwkshopmay2015.readthedocs.io/en/latest/instance_readying/), and follow the step-by-step instructions. 
  

# Considerations when using AWS

* If you are trying to ssh into your instance and you get “operation timed out” error, check in the EC2 Dashboard on AWS that the instance is running. Another reason for getting the error could be that the EC2 instance only accepts inbound network connections from a specific IP, so if you change your Wi-Fi networks your laptop’s IP may not be recognized. Go to EC2 Dashboard, click on Running Instances, click on the instance you are trying to connect to, under Description click on Security groups, click on Inbound, and Edit to add a connection with Source “MyIP.” 

* Some of the bioinformatics software is available on apt-get but not yum. Hence, we recommend using Ubuntu as the operating system over Amazon Linux. 

* Your EC2 instance you are setting up with all the tools you will need for your analysis can be [saved as an AMI](http://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/tkv-create-ami-from-instance.html). If you stop and start the instance it will boot up again with all the software you installed, but if you terminate the instance you can use a saved AMI to create the instance again without much work.

