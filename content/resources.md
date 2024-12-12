+++
date = "2022-02-02T23:59:16-05:00"
tags = ["support"]
categories = ["support"]
images = [""]
about = true
author = "Staff"
description = ""
title = "Your Resources"
draft = true
type = "resource"
private = true
+++

<link rel="stylesheet"href="https://use.fontawesome.com/releases/v5.9.0/css/all.css"crossorigin="anonymous">
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
// allocations
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
              const remain = allocation.remaining / allocation.quantity * 100;
              const remain_round = parseFloat(remain).toFixed(2);
              const remain_commas = allocation.remaining.toLocaleString('en-US')
              return `
                  <tr>
                      <td><a style="background-color:#efefef;text-decoration:none;padding:2px;" href="https://mygroups.virginia.edu/display-groupinfo.jsp?GroupSelected=${allocation.name}&uva-userid=${allocation.owner}" target="_new">${allocation.name}</a></td>
                      <td><span class="dot-allocation">${allocation.type}</span></td>
                      <td style="text-align:right;">${remain_commas}</td>
                      <td style="text-align:right;">${remain_round}%</td>
                  </tr>
                `;
              })
            .join("");       
        document.querySelector("#allocation-data").insertAdjacentHTML("afterbegin", alloc_html)
    }).catch(error => {
      console.log(error)
    });
// storage
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
// containers
var con_base_url = "https://user-resources.uvarc.io/containers/";
// var pkey = getCookie("__rc_pkey");
var pkey = "_d61e71c36c9c8adaece2cfe7dbfebde762aea424315ce02e2ba20fdecbc8fafd";
var container_url = con_base_url + pkey;
fetch(container_url)
    .then(response => response.json())
    .then(data3 => {
        const concount = data3
        const records = concount.length
        if (records == 0) {
          empty_html = "<tr><td colspan=4>No containers recorded</td></tr>";
          document.querySelector("#container-data").insertAdjacentHTML("afterbegin", empty_html)
        } 
        const container_html = data3
            .map(container => {
              const records3 = data3.length
              return `
                  <tr>
                  <td>${container.service}</td>
                  <td>${container.image}</td>
                  <td style="text-align:right;">${container.quantity}</td>
                  </tr>
              `;
            })
            .join("");
        document.querySelector("#container-data").insertAdjacentHTML("afterbegin", container_html)
    }).catch(error => {
      console.log(error)
    });
// databases
var db_base_url = "https://user-resources.uvarc.io/databases/";
// var pkey = getCookie("__rc_pkey");
var pkey = "_d61e71c36c9c8adaece2cfe7dbfebde762aea424315ce02e2ba20fdecbc8fafd";
var db_url = db_base_url + pkey;
fetch(db_url)
    .then(response => response.json())
    .then(data4 => {
        const dbcount = data4
        const records = dbcount.length
        if (records == 0) {
          empty_html = "<tr><td colspan=4>No databases recorded</td></tr>";
          document.querySelector("#database-data").insertAdjacentHTML("afterbegin", empty_html)
        } 
        const db_html = data4
            .map(database => {
              const records4 = data4.length
              return `
                  <tr>
                  <td>${database.name}</td>
                  <td>${database.type}</td>
                  <td>${database.host}</td>
                  </tr>
              `;
            })
            .join("");
        document.querySelector("#database-data").insertAdjacentHTML("afterbegin", db_html)
    }).catch(error => {
      console.log(error)
    });
</script>
<div class="row">
  <div class="col-12 col-md-6">
    <h2 id="name">Hello </h2>
  </div>
  <div class="col-12 col-md-6">
    <div id="identity" style="float:right;text-align:right;font-family:'Roboto Mono', monospace;font-size:90%;"></div>
  </div>
</div>
<div class="row">
<div class="col-md-6">
  <div class="alert alert-primary" role="alert" style="">
    <div style="float:right;"><i class="fas fa-list-alt fa-2x"></i></div>
    <h4 class="alert-heading">Allocations</h4>
    <p>Review and manage your HPC allocations on Rivanna.</p>
    <table class="table table-striped" style="font-family:'Roboto Mono', monospace;font-size:90%;">
      <thead class="">
        <tr>
          <th style="width:50%;">Name</th>
          <th>Type</th>
          <th style="text-align:right;">SUs Remain</th>
          <th style="text-align:right;">% Remain</th>
        </tr>
      </thead>
      <tbody id="allocation-data">
      </tbody>
    </table>
    <p style="font-size:80%;font-style:italic;"><span class="dot-allocation">S</span> = Standard  &nbsp;&nbsp; <span class="dot-allocation">P</span> = Purchased &nbsp;&nbsp; <span class="dot-allocation">I</span> = Instructional &nbsp;&nbsp; <span class="dot-allocation">D</span> = Dean<br />Allocation counts are refreshed 1x per day.</p>
    <hr>
    <a href="/userinfo/hpc/access/"><button class="btn btn-primary btn-sm">Request Allocations</button></a>
  </div>
</div>
<div class="col-md-6">
  <div class="alert alert-success" role="alert" style="">
    <div style="float:right;"><i class="fas fa-server fa-2x"></i></div>
    <h4 class="alert-heading">Storage</h4>
    <p>Review and manage your Research Project or Research Standard storage shares.</p>
    <table class="table table-striped" style="font-family:'Roboto Mono', monospace;font-size:90%;">
      <thead class="">
        <tr>
          <th style="width:70%;">Group Name</th>
          <th>Type</th>
          <th style="text-align:right;">Capacity</th>
        </tr>
      </thead>
      <tbody id="storage-data">
      </tbody>
    </table>
    <p style="font-size:80%;font-style:italic;"><span class="dot-storage">P</span> = Project &nbsp;&nbsp; <span class="dot-storage">V</span> = Value<br />Storage quotas are refreshed 1x per day.</p>
    <hr>
    <a href="/form/storage/"><button class="btn btn-primary btn-sm">Request Storage</button></a> &nbsp;
  </div>
</div>
<div class="col-md-6">
  <div class="alert" role="alert" style="background-color:#efefef;">
    <div style="float:right;"><img style="max-width:40px;margin-top:0px;" src="/images/docker-bw-icon.png" alt="Docker Container" /></div>
    <h4 class="alert-heading">Container Services</h4>
    <p>Review and manage your microservices.</p>
    <table class="table table-striped" style="font-family:'Roboto Mono', monospace;font-size:90%;">
      <thead class="">
        <tr>
          <th style="">Service</th>
          <th>Image</th>
          <th style="text-align:right;">Count</th>
        </tr>
      </thead>
      <tbody id="container-data">
      </tbody>
    </table>
    <p style="font-size:80%;font-style:italic;">Container inventories are refreshed 1x per day.</p>
    <hr>
    <a href="/form/containers/"><button class="btn btn-primary btn-sm">Request Microservices</button></a> &nbsp;
  </div>
</div>
<div class="col-md-6">
  <div class="alert" role="alert" style="background-color:#efefef;">
    <div style="float:right;"><i class="fas fa-database fa-2x"></i></div>
    <h4 class="alert-heading">Databases</h4>
    <p>Review and manage your databases.</p>
    <table class="table table-striped" style="font-family:'Roboto Mono', monospace;font-size:90%;">
      <thead class="">
        <tr>
          <th style="">Database</th>
          <th>Type</th>
          <th style="">Host</th>
        </tr>
      </thead>
      <tbody id="database-data">
      </tbody>
    </table>
    <p style="font-size:80%;font-style:italic;">Database inventories are refreshed 1x per day.</p>
    <hr>
    <a href="/form/database/"><button class="btn btn-primary btn-sm">Request a Database</button></a> &nbsp;
  </div>
</div>
</div>
