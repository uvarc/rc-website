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
tags = ["python","boto3"]

+++

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

* Using hard-coded AWS credentials in your code or in a local config.json file

* Using AWS IAM roles assigned to the EC2 instance when you created it

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

```python
# Get the service resource
sqs = boto3.resource('sqs')

# Get the queue
queue = sqs.get_queue_by_name(QueueName='test')

# Create a new message
response = queue.send_message(MessageBody='boto3', MessageAttributes={
    'Author': {
        'StringValue': 'Daniel',
        'DataType': 'String'
    }
})

# The response is NOT a resource, but gives you a message ID and MD5
print(response.get('MessageId'))
print(response.get('MD5OfMessageBody'))

```

- - -

# Errors

Note that error handling and parsing error messages is not built into most `boto3` requests. You should use `try` and `catch`, and `botocore` can help you display, log, or act on errors.
