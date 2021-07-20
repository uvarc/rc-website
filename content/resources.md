+++
date = "2020-12-31T23:59:16-05:00"
tags = ["support"]
categories = ["support"]
images = [""]
about = true
author = "Staff"
description = ""
title = "Your Resources"
draft = false
type = "resource"

+++

<script>
function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 60 * 60 * 90));
    // document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/' + ';domain=rc.virginia.edu';
    // document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
};

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  };

var form_url = window.location;
let referrer = setCookie('__rc_form_referrer', form_url, '24');

var pkey_check = getCookie("__rc_pkey");
if (!pkey_check) {
    window.location.replace("https://auth.rc.virginia.edu/session.php");
};

var purl = "https://tja4lfp3da.execute-api.us-east-1.amazonaws.com/nocache/persona/";
var pkey = getCookie("__rc_pkey");
var url = purl + pkey;

async function get(url) {
    let obj = await (await fetch(url)).json();
    return obj;
}
var profile;
(async () => {
  profile = await get(url)
  document.getElementById("name").innerHTML = "Hello " + profile["fname"];
  document.getElementById("identity").innerHTML = profile["name"] + " | " + profile["uid"] + " | " + profile["eppn"];
})();

</script>

<div id="identity" style="float:right;text-align:right;font-family:'Roboto Mono', monospace;font-size:90%;"></div>
<h2 id="name">Hello </h2>

<div id="resource-data" style="width:100%;">
<div class="alert alert-info" role="alert" style="float:left;width:48%;">
<h4 class="alert-heading">Allocations</h4>
<p>Review and manage your HPC allocations on Rivanna or Neo.</p>
<table class="table table-striped table-sm" style="font-family:'Roboto Mono', monospace;font-size:90%;">
  <thead class="">
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>SUs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cphg-genomes</code></td>
      <td>standard</td>
      <td>46,400</td>
    </tr>
    <tr>
      <td><code>uvarc</code></td>
      <td>purchased</td>
      <td>282,814</td>
    </tr>
    <tr>
      <td><code>cs1234</code></td>
      <td>instructional</td>
      <td>14,000</td>
    </tr>
  </tbody>
</table>
<p style="font-size:85%;font-style:italic;">Allocation counts are updated 1x per day.</p>
<hr>
<a href="#"><button class="btn btn-primary btn-sm">Manage Allocations</button></a> &nbsp; 
<a href="#"><button class="btn btn-success btn-sm">Learn More</button></a>
</div>

<div class="alert alert-success" role="alert" style="float:right;width:48%;">
<h4 class="alert-heading">Storage</h4>
<p>Review and manage your Project or Value storage shares.</p>
<table class="table table-striped table-sm" style="font-family:'Roboto Mono', monospace;font-size:90%;">
  <thead class="">
    <tr>
      <th>Group Name</th>
      <th>Type</th>
      <th>Capacity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cphg-genomes</code></td>
      <td>project</td>
      <td>20TB</td>
    </tr>
    <tr>
      <td><code>uvarc</code></td>
      <td>project</td>
      <td>5TB</td>
    </tr>
    <tr>
      <td><code>cs1234</code></td>
      <td>value</td>
      <td>50TB</td>
    </tr>
    <tr>
      <td><code>cs9876</code></td>
      <td>value</td>
      <td>30TB</td>
    </tr>

  </tbody>
</table>
<p style="font-size:85%;font-style:italic;">Storage quotas are updated 1x per day.</p>
<hr>
<a href="#"><button class="btn btn-primary btn-sm">Manage Storage</button></a> &nbsp;
<a href="#"><button class="btn btn-success btn-sm">Learn More</button></a>
</div>
</div>

