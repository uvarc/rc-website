+++
type = "reference"
draft = false
object = "awscli"
images = [""]
author = "SOMRC Staff"
description = ""
title = "AWS Command Line"
date = "2017-01-31T12:19:03-05:00"
tags = ["aws","boto3","cli","cloud"]
categories = ["reference"]

+++

<p class=lead>The AWS CLI is a command-line interface to the AWS service APIs. It allows users to interact programmatically with services such as EC2, S3, and others via <code>bash</code> and PowerShell scripts. 
This can be useful for local scripts or automated cron tasks. The AWS CLI also serves as a good introduction for programmatic API interaction using language-specific SKDs (Python, C#, PHP, Go, etc.)</p>

<p class=lead>Learn more at the <a href="https://aws.amazon.com/cli/" target="_new"><b>AWS Command Line Interface</b></a> page.</p>

- - - 

# Install the AWSCLI


## Mac/Linux

Using `pip` you can install the current release:

```pip install awscli```


## Windows

Download and run the <a href="https://s3.amazonaws.com/aws-cli/AWSCLI64.msi">64-bit</a> or <a href="https://s3.amazonaws.com/aws-cli/AWSCLI32.msi">32-bit</a> Windows installer.

- - -

# Configure With Credentials

Using the access key and secret access key generated for your account, enter those into the AWS CLI configuration. Use this command:

```aws configure```

When prompted, enter the appropriate region you are working in, such as `us-east-1` and your preferred output format `text` | `table` | `json`.


- - -

# Basic Usage

The `aws` command is used, followed by the service name, and then the specific operation you want to call:

```bash
$ aws ec2 describe-instances

$ aws ec2 start-instances --instance-ids i-1348636c

$ aws s3 cp local-file.txt s3://my-bucket/

$ aws sns publish --topic-arn arn:aws:sns:us-east-1:546123:OperationsError \
      --message "Script Failure"

$ aws sqs receive-message --queue-url https://queue.amazonaws.com/546123/Test
```

- - -

# Help

General help with listing services:

```aws help```

Find available commands specific to one service:

```aws ec2 help```

Specific parameters for a call within a service:

```aws ec2 describe-instances help```

- - - 

# Real-world example

Use a `bash` script to turn off your EC2 instance at night, and send you a notification. Use a similar script for a morning startup:

```bash
#!/bin/sh

set -e
instance='i-1234567890abcd'

# our script won't know where aws is unless you specify a full path
/path/to/aws ec2 stop-instances --instance-ids $instance

/path/to/aws sns publish --topic-arn arn:aws:sns:us-east-1:546123:OnlineNotifications \
    --message "Your instance is back on!"

```


