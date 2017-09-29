+++
images = [""]
author = "SOMRC Staff"
description = ""
date = "2017-04-14T15:18:25-05:00"
title = "Why use the Cloud?"
draft = false
tags = ["aws","cloud","feature"]
categories = ["feature"]

+++

"Cloud computing" has come to mean a lot of things in recent years: web-based email services, or SaaS (software-as-a-service), 
or cloud-based storage like UVA's use of Box. But behind all of these practical, useful tools is another cloud, made up of 
impossibly large, global-scale hardware farms that the above examples live and run on. These farms make up "cloud infrastructure," 
and are now sold to consumers by Google, Rackspace, Microsoft, and Amazon. 

<img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" align="right" style="margin-left:10px;;max-width:33%;" />This cloud is larger than you probably imagine: One of Amazon's largest customers, Netflix, spins up tens and hundreds of thousands of server instances *every single night* for our viewing pleasure, before they are deleted hours later. Netflix is a great example of how the cloud model works best: large providers such as Amazon Web Services sell computing power on-demand (for pennies an hour) in the form of virtualized servers. While they are operational, Netflix owns them and pays for them. But once they are deleted, they no longer exist and they no longer cost anything for Netflix.

And so, this "infrastructure" that you purchase from a cloud vendor is really just a service. Gone are the days of having to 
figure out how large a server to purchase, or how many of them, or waiting for them to be delivered so that you can plug them in 
and start setting them up. In the Amazon, Google, or Microsoft cloud you simply request them and, seconds later, use them. 

This model gives researchers a few powerful features:

1. Rolling out quick, disposable environments for testing and development
2. Building identical environments that can be created repeatedly
3. Deploying low-cost, short-term footprints
4. Leveraging services and fetures that would otherwise be difficult to build or manage.

For many reasons, moving into the cloud can seem daunting, or users aren't quite sure where to begin. So let's take some of 
these principles and apply them to practical, real-world use cases:

## Storage with S3

<img src="https://somrc.virginia.edu/images/aws/s3.png" align="left" style="max-height:80px;margin:4px;" alt="S3" />
S3 (Simple Storage Service) is Amazon's object storage service, ideal for large files, archives, media files, backups, and other file types that do not require
direct interaction (writes/updates) as if they were in your filesystem.

## Resizable Computers

Amazon EC2 (Elastic Compute Cloud) is a service that provides virtual compute instances. Need a small instance to test an idea on? That's 
no problem. But what if your code works great and you then need to test it on real data? Resize your instance to something much more 
powerful easily, and only for the time you need extra resources. 

## Website / Web Publishing

Need to host a simple, public-facing site to explain or share your research? You may only need a static HTML website, and in S3 you 
can publish your site with no server(s) to maintain. (The website you are currently reading is hosted in S3.) If you need something
more that runs Python, PHP, or Shiny (among many others), we can help you create an instance and publish to it. You can even lock 
down all or part of your site using Netbadge.

## Databases

Finally, many researchers who find themselves awash in data are moving toward using databases to store and manage their files
or file metadata. Those who use Rivanna can actually use cloud-based database services without any difficulty, such as MySQL,
PostgreSQL, or NoSQL options such as MongoDB and DynamoDB.

## Want to learn more?

[Read more](https://somrc.virginia.edu/service/cloud/) about how the UVA School of Medicine Research Computing group is helping researchers use the cloud.
