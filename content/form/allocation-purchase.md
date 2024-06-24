+++
date = "2023-04-22T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Purchase Service Units"
draft = false
type = "form"
private = true
+++

{{% jira-msg %}}


<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">

{{< enable-disable-form >}}

<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>

  <input type="hidden" id="category" name="category" value="Rivanna HPC">
  <input type="hidden" id="allocation_type" name="Allocation Type" value="Purchase Service Units">
  <input type="hidden" id="request_title" name="request_title" value="Allocation Request: Purchase" />

  {{% getstatus keyword="jira" %}}

  {{% form-userinfo-v2 %}}
  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="pi-name">Name of PI <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="pi-name" name="pi-name" value="" size="60" maxlength="80" />
  </div>
  <div class="form-item form-type-radios form-group"> 
    <label class="control-label" for="faculty-verify">Is the PI of your account a UVA faculty member? <span class="form-required" title="This field is required.">*</span></label>
    <div id="faculty-verify" class="form-radios">
      <div class="form-item form-type-radio radio"> <label class="control-label" for="faculty-verify-yes">
        <input required="required" type="radio" id="faculty-verify-yes" name="faculty-verify" value="yes" class="form-radio" /> &nbsp;Yes</label>
      </div>
      <div class="form-item form-type-radio radio"> <label class="control-label" for="faculty-verify-no">
        <input required="required" type="radio" id="faculty-verify-no" name="faculty-verify" value="no" class="form-radio" /> &nbsp;No</label>
      </div>
    </div>
  </div>
  <div class="form-item form-type-radios form-group"> <label class="control-label" for="research-verify">I agree that this allocation will be used for research purposes only <span class="form-required" title="This field is required.">*</span></label>
    <div id="research-verify" class="form-radios">
      <div class="form-item form-type-radio radio"> <label class="control-label" for="research-agree">
        <input required="required" type="radio" id="research-agree" name="research-verify" value="agree" class="form-radio" /> &nbsp;Agree</label>
      </div>
      <div class="form-item form-type-radio radio"> <label class="control-label" for="research-disagree">
        <input required="required" type="radio" id="research-disagree" name="research-verify" value="disagree" class="form-radio" /> &nbsp;Disagree</label>
      </div>
    </div>
  </div>
  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="award-title">Title of Award (if applicable) </label>
    <input class="form-control form-text" type="text" id="award-title" name="award-title" value="" size="60" maxlength="128" />
  </div>
  <div class="row">
    <div class="col form-item form-type-textfield form-group"> <label class="control-label" for="sus-requested">Total number of SUs requested <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="number" id="sus-requested" name="sus-requested" value="" size="60" maxlength="128" onfocusout="figureTotal()" />
    </div>
    <div class="col form-item form-type-textfield form-group"> <label class="control-label" for="fdm-total">Total amount to be charged to FDM <span class="form-required" title="This field is required.">*</span></label>
      <div>
        <div style="float:left;width:1.4rem;font-size:120%;padding-top:4px;margin:auto;">$</div>
        <input class="form-control form-text" type="text" id="fdm-total" name="fdm-total" value="0" size="60" maxlength="128" readonly style="text-align:right;width:90%;" />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col form-item form-group form-item form-type-date form-group"> <label class="control-label" for="su-expires">SU expiration date (if applicable) </label>
      <input class="form-control form-date" type="date" id="su-expires" name="su-expires" value="" size="20" maxlength="20" />
    </div>
    <div class="col form-item form-type-textfield form-group"> <label class="control-label" for="su-allocation">Apply this purchase to which allocation <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="su-allocation" name="su-allocation" value="" size="60" maxlength="128" />
    </div>
      {{% group_creation_tip %}}
  </div>
  <hr size=1 />
  {{% billing-fdm %}}
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>

{{< /enable-disable-form >}}

</form>

<script>
function figureTotal() {
  var total = document.getElementById('fdm-total');
  var sus = document.getElementById('sus-requested').value;
  var susi = parseInt(sus, 10);
  if ( susi < 1000000) {
    var sureq = sus * 0.01;
  } else {
    var sureq = sus * 0.01;
  }
  var sutotal = parseInt(sureq, 10);
  total.value = sutotal;
};
</script>

<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
