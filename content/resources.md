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

var all_base_url = "https://user-resources.uvarc.io/allocations/";
// var pkey = getCookie("__rc_pkey");
var pkey = "_d61e71c36c9c8adaece2cfe7dbfebde762aea424315ce02e2ba20fdecbc8fafd";
var allocation_url = all_base_url + pkey;

fetch(allocation_url)
    .then(response => response.json())
    .then(data => {
        const counter = data
        const records = counter.length
        if (records == 0) {
          empty_html = "<tr><td colspan=4>No allocations recorded</td></tr>";
          document.querySelector("#allocation-data").insertAdjacentHTML("afterbegin", empty_html)
        } 
        const alloc_html = data
            .map(allocation => {
              const remain = allocation.remaining / allocation.purchased * 100;
              const remain_round = parseFloat(remain).toFixed(2);
              return `
                  <tr>
                      <td><a style="background-color:#efefef;text-decoration:none;padding:2px;" href="https://mygroups.virginia.edu/display-groupinfo.jsp?GroupSelected=${allocation.name}&uva-userid=${allocation.owner}" target="_new">${allocation.name}</a></td>
                      <td><span class="dot-allocation">${allocation.type}</span></td>
                      <td style="text-align:right;">${allocation.remaining}</td>
                      <td style="text-align:right;">${remain_round}%</td>
                  </tr>
                `;
              })
            .join("");       
        document.querySelector("#allocation-data").insertAdjacentHTML("afterbegin", alloc_html)
    }).catch(error => {
      console.log(error)
    });

var sto_base_url = "https://user-resources.uvarc.io/storage/";
// var pkey = getCookie("__rc_pkey");
var pkey = "_d61e71c36c9c8adaece2cfe7dbfebde762aea424315ce02e2ba20fdecbc8fafd";
var storage_url = sto_base_url + pkey;
fetch(storage_url)
    .then(response => response.json())
    .then(data2 => {
        const stocount = data2
        const records = stocount.length
        if (records == 0) {
          empty_html = "<tr><td colspan=4>No storage volumes recorded</td></tr>";
          document.querySelector("#storage-data").insertAdjacentHTML("afterbegin", empty_html)
        } 
        const storage_html = data2
            .map(storage => {
              const records2 = data2.length
              return `
                  <tr>
                  <td><a style="background-color:#efefef;text-decoration:none;padding:2px;" href="https://mygroups.virginia.edu/display-groupinfo.jsp?GroupSelected=${storage.name}&uva-userid=${storage.owner}" target="_new">${storage.name}</a></td>
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

<br clear=all />
<div id="identity" style="float:right;text-align:right;font-family:'Roboto Mono', monospace;font-size:90%;"></div>
<h2 id="name">Hello </h2>

<div class="col-12 col-md-6"">
  <div class="alert alert-primary" role="alert" style="">
    <h4 class="alert-heading">Allocations</h4>
    <p>Review and manage your HPC allocations on Rivanna.</p>
    <table class="table table-striped" style="font-family:'Roboto Mono', monospace;font-size:90%;">
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
  <div class="alert alert-success" role="alert" style="">
    <h4 class="alert-heading">Storage</h4>
    <p>Review and manage your Project or Value storage shares.</p>
    <table class="table table-striped" style="font-family:'Roboto Mono', monospace;font-size:90%;">
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

