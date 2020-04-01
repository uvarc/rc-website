+++
type = "general" 
date = "2020-03-20T00:00:00-05:00" 
tags = [ "Rivanna", "database", "howto" ] 
category = ["howtos"]
draft = false 
title = "Introduction to Databases" 
description = "Authentication with SSH Keys" 
author = "RC Staff"
+++

{{% callout %}}
<p>
There are two main families of databases: Relational and NoSQL.
</p>
<p>
<b>Relational databases</b> store information in an orderly, column, row, and table schema. They “relate” the tables together to present different views of the data.
</p>
<p>
<b>NoSQL databases</b> are much less structured. This means they can store different data alongside each other – which makes things both easier to store but harder to query across.
</p>
{{% /callout %}}

# Relational Databases (RDBMS)

Most users have at least heard of relational databases like:

* MySQL / MariaDB
* PostgreSQL
* Microsoft SQL Server
* Oracle

Relational databases operate on the concepts of tables, relations, indexes, SQL, CRUD operations, and joins.

	C = Create   (Insert)
	R = Read     (Select)
	U = Update   (Update)
	D = Delete   (Delete)

Take the example of an online store, where data revolves around the ideas of items, orders and customers. When a customer makes a purchase in our store, the data from the transaction is actually broken apart into tables of related data. Here’s one way of seeing that process:

![](/images/howtos/databases/reldb.png)

But this “breaking apart” process is actually an intensive, time-consuming process. Data being sent off to
any particular table has to be validated by data type (strings, integers, dates, decimals, binary, etc.), length,
and NULL before it can be inserted into a particular data table. This is going on across multiple tables at
the same time, and ensures that the entire transaction completes successfully or is rolled back.

{{% callout %}}
<b>Impedance Mismatch</b> - a set of conceptual and technical difficulties that are often encountered when interacting with a relational database management system.
{{% /callout %}}

---

# NoSQL Databases

NoSQL databases come in at least two main groupings: **Aggregate oriented** or **Node-Arc/Graph**.

## 1. Aggregate-Oriented

* Key-Value - Redis, Memcached
* Document - DynamoDB, MongoDB
* Column-Family - Cassandra, BigTable

NoSQL databases share very few common characteristics. Perhaps the only one is that they are **schema-less**. Typical aggregate-oriented NoSQL databases will store an aggregation in the form of strings or entire documents. That is usually in plain text, often in a specific format or notation, such as JSON or XML.

Here are some sample entries from a simple Key-Value datastore:

<div>
<table class="table">
  <thead>
    <tr>
      <th>Key</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>access_key</td>
      <td>ABCDEfghijklmnop123456789xyzabc</td>
	</tr>
    <tr>
      <td>secret_key</td>
      <td>23481283852384128328a</td>
	</tr>
    <tr>
      <td>current_count</td>
      <td>472</td>
	</tr>
    <tr>
      <td>jobs_remaining</td>
      <td>13</td>
	</tr>
    <tr>
      <td>last-winner</td>
      <td>Darla Johnson</td>
	</tr>
    <tr>
      <td>last-winner-date</td>
      <td>08/17/2014 08:42:13.015 UTC</td>
	</tr>
  </tbody> 
</table>
</div>

<br>
In the case of document NoSQL databases, the “value” portion of the entry can get much larger.

Here is an example of an entry in JSON. Note that the entire entry (or “document”) breaks down into a hierarchy of data: fields and their values, and dictionaries of multiple values,

```
{
	"success": {
        "total": 1
    },
    "contents": {
        "quotes": [
            {
                "quote": "Remove the temptation to settle for anything short of what you deserve.",
                "length": "71",
                "author": "Lorii Myers",
                "tags": [
                    "expectation",
                    "inspire",
                    "perfection"
                ],
                "category": "inspire",
                "date": "2017-09-08",
                "permalink": "https://theysaidso.com/quote/ZWrV624xU_q6_KYYlrQpYgeF/lorii-myers-remove-the-temptation-to-settle-for-anything-short-of-what-you-deser",
                "title": "Inspiring Quote of the day",
                "background": "https://theysaidso.com/img/bgs/man_on_the_mountain.jpg",
                "id": "ZWrV624xU_q6_KYYlrQpYgeF"
            }
        ],
        "copyright": "2017-19 theysaidso.com"
    }
}
```

## 2. Node-Arc / Graph

Graph, or Node-arc databases are entirely different, in that they try to store and represent connectivity between nodes in a constellation, and their relationships. So a “query” of a graph database might inform you about the networks of other nodes related to the node you are interested in, and the types and strengths of those relationships, among other uses. Some examples of Graph DBs are:

* Neo4j
* TinkerPop
* Infinite

![](/images/howtos/databases/graph-nodes.png)

![](/images/howtos/databases/graphdb-property.png)

---

## Other Resources

Here is a great overview of databases and their histories:

{{< youtube qI_g07C_Q5I >}}

Martin Fowler - NoSQL - YouTube