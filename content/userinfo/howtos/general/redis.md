+++
type = "howto"
date = "2022-01-20T00:00:00-05:00" 
tags = [ "Rivanna", "database", "howto", "redis" ] 
category = ["howtos"]
draft = false 
title = "Redis - A Key/Value Store" 
description = "Basic usage of Redis" 
author = "RC Staff"
+++

{{% callout %}}
<p>
<code>redis</code> is an in-memory, key/value store. Think of it as a dictionary with any number of keys, each of which has a value
that can be set or retrieved. However, Redis goes beyond a simple key/value store as it is actually a data structures server, 
supporting different kinds of values. Some fundamental concepts:
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

Rivanna has access to an open Redis service in the HPC network:
```
redis.uvarc.io
```
This service is backed by a pair of servers in HA replication mode. One serves as the primary for READS and WRITES, and
the read-replica can be used for READ queries only. The endpoint name for the read-replica is `redis-rr.uvarc.io`.
These endpoints are available only within the HPC networks and cannot be accessed from elsewhere in the UVA WAN.

To use Redis from the command-line, use the `redis-cli`. In Rivanna, this is a module:
```
$  module load redis-cli
```

You can now create a connection to the server. Use port `6379` (the default port). No password is required:
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

{{% callout %}}
<b>Note!</b> The "value" half of a Redis key/value pair can be quite large - 512MB.
This is considerably larger than other popular NoSQL databases such as DynamoDB or MongoDB.
{{% /callout %}}

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

To set a new key/value:
```
redis.uvarc.io:6379> set herman melville
OK
```

Set an expiring key/value (EX in seconds, PX in miliseconds)
```
redis.uvarc.io:6379> set jane eyre EX 30
OK
```

Delete a key/value:
```
redis.uvarc.io:6379> del herman
OK
```

# Working Alongside Other Users

Redis allows for the creation and management of multiple databases, called "indexes". By default new connections are attached
to index `0` but this can be changed to the integer of another index. Keys/values stored in one index are unavailable to another
index. Use `select` to move between indexes.

```sh
redis.uvarc.io:6379> select 0
OK
redis.uvarc.io:6379> set hello world
OK
redis.uvarc.io:6379> get hello
"world"
redis.uvarc.io:6379> select 1
OK
redis.uvarc.io:6379[1]> get hello
(nil)
```

Indexes need not be created in order. We suggest you select a high arbitrary number for a private index. Populate and empty it
as you find necessary. However, in the standard security environment remember that your keys/values are visible to other Rivanna
users.

To connect to the Redis endpoint and specify an index other than `0`, use the `-n` flag with the integer of the index. The `cli`
prompt will indicate when you are using a non-zero index:
```
$ redis-cli -h redis.uvarc.io -n 1
redis.uvarc.io:6379[1]> 
```

# Advanced Operations

## Data Types & Structures

In addition to strings and integers, Redis supports the following data types and data manipulations:

* Lists
* Sets
* Hashes
* Increments
* Command repetition
* Random Keys
* Sorted sets
* Secondary indexes
* Scripts

## Values are not constrained
Remember that the "value" half of a key/value pair does not have to contain only a single value. It can essentially be populated
with multiple, separated values, so long as you can anticipate the order, and identity of those values. In this way a
key/value is akin to a "row" of a comma-separated data file.

To implement this functionality, use a hash. Hashes in Redis store multiple objects within the same key, i.e. sets of key/value pairs within a single key/value pair.

Hashes are named, then fields and their values are defined:
```
redis.uvarc.io:6379> hset hash-key subkey1 value1 subkey2 value2
OK
```
Then fetch all values, or a specific field:
```
redis.uvarc.io:6379> hgetall hash-key
1) "subkey1"
2) "value1"
3) "subkey2"
4) "value2"

redis.uvarc.io:6379> hget hash-key subkey2
"value2"
```

## Lists

Create a list by pushing a value into it:
```
redis.uvarc.io:6379> LPUSH dbs redis 
(integer) 1 
redis.uvarc.io:6379> LPUSH dbs mongodb 
(integer) 2 
redis.uvarc.io:6379> LPUSH dbs mysql 
(integer) 3 
```

Pushing a new value into a list gives the new value the 0 index of the list. (To add new values
to the end of the list use the `RPUSH` command.)

Then get a list range by defining the min and max indices you want:
```
redis.uvarc.io:6379> LRANGE dbs 0 10
1) "mysql" 
2) "mongodb" 
3) "redis"
redis.uvarc.io:6379> LRANGE dbs 0 1
1) "mysql"
2) "mongodb"
```

You can also `LPOP`, `LPUSH`, and `LTRIM` as well as `RPOP`, `RPUSH`, and `RTRIM` with Redis lists.


## Sets

You can populate a set within a single key. Set members already present are not duplicated within the set:
```
redis.uvarc.io:6379> sadd set1 bananas
(integer) 1
redis.uvarc.io:6379> sadd set1 apples
(integer) 1
redis.uvarc.io:6379> sadd set1 grapes
(integer) 1
redis.uvarc.io:6379> sadd set1 bananas
(integer) 0
```

Then retrieve the set members:
```
redis.uvarc.io:6379> smembers set1
1) "grapes"
2) "apples"
3) "bananas"
```


## Incremental Counters

Use Redis as a counter or tracker:
```
redis.uvarc.io:6379> set counter 1
OK
redis.uvarc.io:6379> incr counter
(integer) 2
redis.uvarc.io:6379> incr counter
(integer) 3
```

Or increment by integers other than `1`:
```
redis.uvarc.io:6379> get counter
1
redis.uvarc.io:6379> incrby counter 3
(integer) 4
redis.uvarc.io:6379> incrby counter 6
(integer) 10
```

## Command Repetition

If you need the same command to be repeated N times, simply preface your command with that integer:
```
redis.uvarc.io:6379> set counter 1
OK
redis.uvarc.io:6379> 5 incr counter
(integer) 2
(integer) 3
(integer) 4
(integer) 5
(integer) 6
```

## Random Keys

Using a database populated with keys and values, some workflows could make use of this as a queue for jobs
or batches to be processed. Your process could retrieve a random one:

```
redis.uvarc.io:6379> randomkey
"herman"
redis.uvarc.io:6379> randomkey
"hello"
```



# Working with `redis` in Code

Redis has many available SDKs for most modern languages. Every operation available via the `cli` is available in those SDKs.

Some popular choices:

* [Python](https://redis.io/clients#python)
* [C++](https://redis.io/clients#c-plus-plus)
* [R](https://redis.io/clients#r)
* [Go](https://redis.io/clients#go)
* [Others](https://redis.io/clients)

# Using `redis` in Your Research

We are frequently asked by researchers how to incorporate databases into their work. Here are four suggestions for how Redis might help your research::

1. **Queue** - Have a list of files or batches that need processing? Redis can hold the queue and let jobs retrieve single values at a time until they work the queue down to empty.
2. **Cache** - Store interim results or data for use in later computation. This could be a faster and more scalable replacement for temporary text files.
3. **Dictionary or Lookup** - Use an extended key/value store as an in-memory lookup resource for reference values. Where you may have previously stored reference values in a text file or relational DB table, Redis would likely outperform that pattern. Transactions with Redis are also atomic, which means multiple keys can be set, retrieved, or modified at the same time without risking data concurrency.

# Other Resources

* [Redis Documentation](https://www.redis.io/documentation)
* [Try Redis Online](https://try.redis.io/)
* [Redis Cheatsheet](/images/pdfs/redis-cheatsheet.pdf)
