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
private = true
+++

<script>
function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 60 * 60 * 90));
    // Switch lines below before builds
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/' + ';domain=rc.virginia.edu';
    // document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
};

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  };

var form_url = window.location;
let referrer = setCookie('__rc_form_referrer', form_url, '24');

// Uncomment before builds
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

allocation_url = "https://user-resources.uvarc.io/allocations/_d61e71c36c9c8adaece2cfe7dbfebde762aea424315ce02e2ba20fdecbc8fafd";
fetch(allocation_url)
    .then(response => response.json())
    .then(data => {
        const alloc_html = data
            .map(allocation => {
              const records = data.length
              if (records > 0) {
                const remain = allocation.remaining / allocation.purchased * 100;
                const remain_round = parseFloat(remain).toFixed(2);
                return `
                    <tr>
                    <td><code>${allocation.name}</code></td>
                    <td><span class="dot-allocation">${allocation.type}</span></td>
                    <td style="text-align:right;">${allocation.remaining}</td>
                    <td style="text-align:right;">${remain_round}%</td>
                    </tr>
                `;
              } else {
                return `
                    <tr>
                    <td colspan="4">No allocations found</td>
                    </tr>
                `;              }
            })
            .join("");
        document.querySelector("#allocation-data").insertAdjacentHTML("afterbegin", alloc_html)
    }).catch(error => {
      console.log(error)
    });

storage_url = "https://user-resources.uvarc.io/storage/_d61e71c36c9c8adaece2cfe7dbfebde762aea424315ce02e2ba20fdecbc8fafd";
fetch(storage_url)
    .then(response => response.json())
    .then(data2 => {
        const storage_html = data2
            .map(storage => {
              return `
                  <tr>
                  <td><code>${storage.name}</code></td>
                  <td><span class="dot-storage">${storage.type}</span></td>
                  <td style="text-align:right;">${storage.purchased} TB</td>
                  </tr>
              `;
            })
            .join("");
        document.querySelector("#storage-data").insertAdjacentHTML("afterbegin", storage_html)
    }).catch(error => {
      console.log(error)
    });


</script>

<div id="identity" style="float:right;text-align:right;font-family:'Roboto Mono', monospace;font-size:90%;"></div>
<h2 id="name">Hello </h2>

<div class="col-12 col-md-6">
<div class="alert alert-info" role="alert" style="margin:0.1rem;">
<h4 class="alert-heading">Allocations</h4>
<p>Review and manage your HPC allocations on Rivanna.</p>
<table class="table table-striped table-sm" style="font-family:'Roboto Mono', monospace;font-size:90%;">
  <thead class="">
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th style="text-align:right;">SUs Remain</th>
      <th style="text-align:right;">% Remain</th>
    </tr>
  </thead>
  <tbody id="allocation-data">
  </tbody>
</table>
<p style="font-size:85%;font-style:italic;">S = Standard  &nbsp;&nbsp; P = Purchased &nbsp;&nbsp; I = Instructional &nbsp;&nbsp; D = Dean<br />Allocation counts are updated 1x per day.</p>
<hr>
<a href="/userinfo/rivanna/allocations/"><button class="btn btn-primary btn-sm">Request Allocations</button></a>
</div>
</div>

<div class="col-12 col-md-6">
<div class="alert alert-success" role="alert" style="margin:0.1rem;">
<h4 class="alert-heading">Storage</h4>
<p>Review and manage your Project or Value storage shares.</p>
<table class="table table-striped table-sm" style="font-family:'Roboto Mono', monospace;font-size:90%;">
  <thead class="">
    <tr>
      <th>Group Name</th>
      <th>Type</th>
      <th style="text-align:right;">Capacity</th>
    </tr>
  </thead>
  <tbody id="storage-data">
  </tbody>
</table>
<p style="font-size:85%;font-style:italic;">P = Project &nbsp;&nbsp; V = Value<br />Storage quotas are updated 1x per day.</p>
<hr>
<a href="/form/storage/"><button class="btn btn-primary btn-sm">Request Storage</button></a> &nbsp;
</div>
</div>
