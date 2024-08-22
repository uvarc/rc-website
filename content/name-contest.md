+++
date = "2022-02-02T23:59:16-05:00"
tags = ["support"]
categories = ["support"]
images = [""]
about = true
author = "Staff"
description = ""
title = "Secure HPC Naming Contest"
draft = true
type = "resource"
private = true
+++

<link rel="stylesheet"href="https://use.fontawesome.com/releases/v5.9.0/css/all.css"crossorigin="anonymous">
<script src="https://sdk.amazonaws.com/js/aws-sdk-2.885.0.min.js"></script>
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
// var form_url = window.location;
// let referrer = setCookie('__rc_form_referrer', form_url, '24');


// Initialize the Amazon Cognito credentials provider
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:476d3055-6a82-45c9-80f5-c04bfdc47cbd',
});

// Create publish parameters
var params = {
  Message: 'MESSAGE_TEXT', /* required */
  TopicArn: 'TOPIC_ARN'
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
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
    <hr>
    <a href="/userinfo/hpc/allocations/"><button class="btn btn-primary btn-sm">Request Allocations</button></a>
  </div>
</div>
</div>
