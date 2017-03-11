+++
images = [""]
author = "SOMRC Staff"
description = ""
date = "2017-01-14T15:18:25-05:00"
title = "Why use the cloud?"
draft = true
tags = ["aws","cloud"]
categories = ["feature"]

+++

The phrase "cloud computing" has come to mean a lot of things lately: web-based email services, or SaaS (software-as-a-service), or cloud-based storage like UVA's own use of Dropbox. But behind all of these practical, useful tools is what we might call the *real* cloud, made up of impossibly large, globally-scaled hardware farms that our first examples live and run on. These farms make up "cloud infrastructure," and are now sold to consumers by Google, Rackspace, Microsoft, and Amazon. 

<img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" align="right" style="margin-left:10px;;max-width:33%;" />This cloud is larger than you probably imagine: One of Amazon's largest customers, Netflix, spins up tens and hundreds of thousands of server instances *every single night* for our viewing pleasure, before they are deleted hours later. Netflix is a great example of how the cloud model works best: large providers such as Amazon Web Services sell computing power on-demand (for pennies an hour) in the form of virtualized servers. While they are operational, Netflix owns them and pays for them. But once they are deleted, they no longer exist and they no longer cost anything for Netflix.

And so, this "infrastructure" that you purchase from a cloud vendor is really just a service. Gone are the days of having to figure out how large a server to purchase, or how many of them, or waiting for them to be delivered so that you can plug them in and start setting them up. In the Amazon, Google, or Microsoft cloud you simply request them and, seconds later, use them. 

This model gives researchers (at least) three powerful features:

1. Rolling out quick, disposable environments for testing and development
2. Building identical environments that can be created repeatedly
3. Deploying low-cost, short-term footprints
4. Leveraging services and fetures that would otherwise be difficult to build or manage.

But for many reasons, moving into the cloud can seem daunting or users are not quite sure where to begin. So let's take some of these principles and apply them to real-world use cases:

# Storage with S3

<img src="https://somrc.virginia.edu/images/aws/s3.png" align="right" style="max-height:60px;" alt="S3" />
S3 (Simple Storage Service) is Amazon's object storage service, ideal for large files, archives, media files, backups, and other file types that do not require
direct interaction (writes/updates) as if they were in your filesystem. Consider S3 for these use cases:

## Offload media files
If you are serving a website (regardless of where you host your code), consider placing your image, js, and css files in S3 and referencing
them by

# High Availability / EC2 Auto-scaling

<img src="https://somrc.virginia.edu/images/aws/autoscaling.png" align="right" style="max-height:60px;" alt="EC2 Autoscaling" />
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

# Messaging / SQS

Resilient systems based on the SOA model are de-coupled, or "loosely coupled." In more traditional monolithic stacks, services such as web presentation, database, storage, 
were all hard-coded to specific instances doing specific tasks. This meant single points of failure, and the stack could fail if any single service dropped out. In a cloud
SOA, we try to point to service endpoints. 
