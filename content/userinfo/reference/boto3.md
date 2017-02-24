+++
type = "reference"
draft = false
date = "2017-02-02T22:28:18-05:00"
author = "SOMRC Staff"
description = ""
title = "boto3 Library (Python)"
categories = ["reference"]
images = [""]
object = "Python"
tags = ["python","boto3","aws","cloud"]

+++

<div class="bd-callout bd-callout-warning">
<h4>boto3 - the AWS SDK for Python</h4>
Boto3 is the Amazon Web Services (AWS) Software Development Kit (SDK) for Python, which allows Python developers to write software that makes use of services like Amazon S3 and Amazon EC2. You can find the latest, most up to date, documentation at <a href="https://boto3.readthedocs.io/en/latest/" target="_new">Read the Docs</a>, including a list of services that are supported.
</div>

# Install the boto3 library:

Install using `pip` on Linux/Mac:

```pip install boto3```

or for Windows (or the latest release) simply clone from GitHub:

    $ git clone git://github.com/boto/boto3.git
    $ cd boto3
    $ python setup.py install

- - -

# Authentication

`boto` can run under AWS authentication granted in a few ways:

* Inherited from user environment variables
* Using hard-coded AWS credentials in your code (Never in production / Never committed to git)
* Using hard-coded AWS credentials in a local config.json file (Never committed to git)
* Using AWS IAM roles assigned to the EC2 instance when you created it (Best practice)

- - -

# Create the client

The client is generally referenced directly by name as a resource:

```python
# Get the service resource
sns = boto3.resource('sns')
```

- - -

# Make your request

Here is an example of sending a message to an SQS queue:

{{< gist nmagee f55e6d1c03a673a44333e70d1fa6872c >}}

- - -

# Errors

Note that error handling and parsing error messages is not built into most `boto3` requests. You should use `try` and `catch`, and `botocore` can help you display, log, or act on errors.
