+++
type = "reference"
draft = false
object = "awscli"
images = [""]
author = "SOMRC Staff"
description = ""
title = "AWS Command Line (bash)"
date = "2017-01-31T12:19:03-05:00"
tags = ["aws","cli","cloud","bash"]
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

<div class="bd-callout bd-callout-warning">
  <h4>Profiles</h4>
  <p>If you access AWS through numerous accounts, you can create multiple profiles. To do this, use the <code>--profile myprofile</code> parameter when configuring the AWS CLI, with a name you like (replacing <code>myprofile</code>.</p>
  <p>Then to use a profile:</p>
  <code>aws --profile mycoolprofile ec2 describe-instances</code>
</div>

- - -

# Basic Usage

The `aws` command is used, followed by the service name, and then the specific operation you want to call:

{{< gist nmagee 2f8426406a99c6cfd11e11d8e2aee11b >}}

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

{{< gist nmagee 64bbe2b80fd90514b463032d01ba8d9f >}}
