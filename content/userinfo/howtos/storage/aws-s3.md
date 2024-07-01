+++
type = "howto"
categories = [
  "howto",
  "storage",
]
date = "2020-12-17T13:53:46-05:00"
tags = ["howto","storage","aws","cloud","cli","boto3","curl"]
draft = false
shorttitle = "AWS CLI"
title = "Transfer Files Using Amazon S3"
description = "Access AWS resources through its command-line interface."
author = "RC Staff"

+++

# Setup

You will need to install and configure the `awscli` package in order to access objects in S3.

## Install the AWS CLI

The AWS CLI is available through the `pip`/`pip3` installer:

If you have administrator privileges type

{{< code-snippet >}}
pip install awscli
{{< /code-snippet >}}

Otherwise use

{{< code-snippet >}}
pip install --user awscli
{{< /code-snippet >}}

The project is open source, so you can also download the source at https://github.com/aws/aws-cli

{{% alert-green %}}
<p><b>UVA HPC Users</b> have two options:</p>
<ol>
  <li>Load the <code>awscli</code> module:<br /><br />
{{< code-snippet >}}
module load awscli
{{< /code-snippet >}}
  <li>If you need a different version, install it in your user directory:<br /><br />
{{< code-snippet >}}
pip install --user awscli==1.19.29
{{< /code-snippet >}}
</ol>

{{% /alert-green %}}

## Authenticate the CLI to Amazon Web Services

Once the `aws` package is installed, you will need to configure it:

{{< code-snippet >}}
aws configure
{{< /code-snippet >}}

You will be prompted to enter four values:

1. Your AWS access keys: `aws_access_key_id` / `aws_secret_access_key`: These can be obtained from within your AWS account. [See this AWS documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) for how to retrieve these two keys. If you are the root account owner, go to your account security settings to retrieve these. It is highly advised NOT to use root credentials for access in this way.
3. Your default AWS region: Unless you know your S3 bucket is scoped to another region, enter `us-east-1`.
4. Your default output format: Your options are `text`, `json` and `table` output.

The AWS account you enter in these steps must have at least read permissions to access the resources you want to download.

# Access S3 using the AWS CLI

- - -
## `aws s3 ls` - List Buckets
```
aws s3 ls

2018-01-18 16:16:17 mybucket1
2018-06-20 13:18:38 mybucket2
2017-08-15 09:35:08 my-new-bucket
2018-06-28 09:19:29 my-other-bucket
```

- - -
## `aws s3 mb` - Make a new bucket
```
aws s3 mb s3://mybucket3
```
Remember that S3 bucket names must be globally unique from all other AWS customers.

- - -
### `aws s3 rm` - Remove a bucket
```
aws s3 rm s3://mybucket3
```
Remember that S3 buckets must be emptied of all contents before they can be removed. Once removed the bucket name is available for other users.

- - -
## `aws s3 ls` - List the contents of a bucket
```
aws s3 ls s3://mybucket1/
                           PRE keys/
                           PRE status/
                           PRE zip/
2020-06-26 09:50:08      10451 index.json
2020-06-26 09:50:09         64 robots.txt
```

{{% alert-blue %}}
**FOLDERS IN S3** - Contrary to how it appears, S3 is not a file system in the ordinary sense. Instead, it is a web-based, API-driven object storage
service containing KEYS and VALUES. The key (name) of a file (object) is arbitrary after the name of the bucket itself, but must obey certain rules such as
using no unusual characters. The typical form of grouping objects under "subfolders" uses the same naming convention as regular filesystems with a "key" such as: 

`mybucket1/folder/subfolder/filename.txt`

The value (contents) of that key are the actual contents of the file itself. But it is important to remember that folders as they appear in the path of
an S3 object are simply a mental convenience.

{{% /alert-blue %}}

- - -
## `aws s3 cp` - Download a file
```
aws s3 cp s3://mybucket1/robots.txt ./
```

- - -
## `aws s3 cp` - Upload a file
```
aws s3 cp local-file.txt s3://mybucket1/
```

To upload a file and make it publicly available via HTTPS, add an `acl` property to it:
```
aws s3 cp --acl public-read local-file.txt s3://mybucket1/
```

{{<alert-green>}}
Files that have been made public-readable can be retrieved using other command-line tools such as `curl` and `wget`. S3 is an HTTPS web
endpoint, and without the need for authentication you can work with them as if they were regular public web resources:

<br clear=all /><br />
<code>
curl -O https://mybucket1.s3.amazonaws.com/path/to/myfile.txt
</code>

{{</alert-green>}}


- - -
## `aws s3 sync` - Synchronize to/from an S3 bucket
```
aws s3 sync ./local-dir s3://mybucket1/remote-dir/
```
You can synchronize between any source/destination so long as at least one of them is S3:

1. Sync from local workstation to S3
2. Sync from S3 to local workstation
3. Sync from S3 bucket to another S3 bucket

- - -
## `aws s3 rm` - Remove a file from S3
```
aws s3 rm s3://mybucket1/file-not-wanted.pdf
```

- - -
## `aws s3 mv` - Move a file within S3
```
aws s3 mv s3://mybucket1/original-file.csv s3://mybucket1/moved-file.csv
```

- - -
## `aws s3 presign` - Presign an S3 URL

In some cases users want to share a file with a remote party without creating access keys or for a limited amount of time. The `presign` feature
is useful in this case since it creates a unique signed URL that expires after a set amount of time. 

To set the expiry time, calculate the length of time you want the signature to last in seconds. This value will be used with the `--expires-in` flag.

```
aws s3 presign --expires-in 600 s3://mybucket1/path/file-to-share.tar.gz

https://mybucket1.s3.amazonaws.com/path/file-to-share.tar.gz?AWSAccessKeyId=AKICMAJHNXKQDLN34VZJ&Signature=sCH2pRjn7M02P5D8JnAyBq%2FP7kQ%3D&Expires=1593196195
```

{{<alert>}}
NOTE: This URL works regardless of who uses it, and requires no authentication. Therefore, be careful with the distribution of signed URLs, and keep their expiry time as short as possible.
{{</alert>}}

- - -

# Access S3 using `boto3` in Python

The `boto3` package is the standard library enabling programmatic access to AWS using Python. `boto3` can access all AWS services and is helpful for creating,
managing, or removing remote resources and infrastructure dynamically. The steps below refer to using `boto3` for working with files in S3.

## Install `boto3`

{{< code-snippet >}}
pip install boto3
{{< /code-snippet >}}

`boto3` will obtain its credentials from one of a few various locations:

- Hard-coded credentials within the application code itself. This is not recommended.
- Inherited credentials from the `~/.aws/` directory within your home directory. This is common for remote development.
- Injected as environment variables of the environment in which your code is running.
- Inherited credentials from the IAM role of the EC2 instance running your code. This is a best practice for production systems in AWS.

## Use `boto3`

Import the library as you would for any other Python package, and set up a client or resource for the AWS service:
```
import boto3

s3 = boto3.client('s3')
```

- - -
## Upload a file to S3

{{< gist nmagee c2be9caa4479bb11bb1b6097d7269946 >}}

- - -
## Download a file from S3

{{< gist nmagee a8b42a126235a0366f7472efd4965d18 >}}

- - -
## More Information about `boto3`

Documentation is available [**here**](https://boto3.amazonaws.com/v1/documentation/api/latest/index.html).
