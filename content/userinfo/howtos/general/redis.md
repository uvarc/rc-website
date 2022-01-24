+++
type = "howto"
date = "2022-01-20T00:00:00-05:00" 
tags = [ "Rivanna", "database", "howto", "redis" ] 
category = ["howtos"]
draft = false 
title = "`redis` - A Key/Value Store" 
description = "Basic usage of Redis" 
author = "RC Staff"
+++

{{% callout %}}
<p>
<code>redis</code> is an in-memory, key/value store. Think of it as a dictionary with any number of keys, each of which has a value
that can be set or retrieved. Some fundamental concepts:
</p>
<ul>
  <li>Can be used as a databse, cache, or message broker
  <li>Supports multiple data types and structures
  <li>Built-in replication
  <li>Keys can be up to 512MB in size
</ul>
{{% /callout %}}

<img src="/images/logos/redis-logo.png" align="right" style="" />

# Getting Started

Rivanna has access to an open Redis instance:
```
redis.uvarc.io
```

To work with Redis from the command-line, load the `redis-cli`:
```
$  module load redis-cli
```

This lets you create a connection to the server. Use port `6379` (the default port). No password is required:
```
$  redis-cli -h redis.uvarc.io
```

# Basic Operations

As a dictionary, Redis allows you to set and retrieve pairs of keys and values. Think of a "key" as a unique
identifier (string, integer, etc.) and a "value" as whatever data you want to associate with that key. Values
can be strings, integers, floats, booleans, binary, lists, arrays, dates, and more.
```
KEY                 VALUE
--------------------------------------------------------
hello               world
1234                5678
1a2b3c              /path/to/file.csv
124a                AGCCCCTCAGGAGTCCGGCCACATGGAAACTCC
```

To view all keys (once you have established a connection to the Redis server):
```
redis.uvarc.io:6379> keys *

1) "hello"
2) "1234"
3) "1a2b3c"
4) "124a"
```

Then use a specific key to fetch its value:
```
redis.uvarc.io:6379> get hello

"world"
```

# Using Databases in Your Research

We are frequently asked by researchers how to incorporate databases into their work. Here are four suggestions for how Redis might help your research::

1. Tracking
2. Queuing
3. Indexing
4. Dictionary


# Other Resources


