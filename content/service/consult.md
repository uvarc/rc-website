+++
date = "2017-01-31T15:26:06-05:00"
categories = ["service"]
images = [""]
author = "SOMRC Staff"
description = ""
title = "Request a Consultation"
draft = false
tags = ["staff","consultation","contact"]
sidebar = "hidden"
+++

<form action="https://handlers.uvasomrc.io/consult/" method="POST">
  <div class="form-group">
    <label for="inputName">Name</label>
    <input type="text" name="_name" id="inputName" class="form-control" placeholder="Enter name">
  </div>
  <div class="form-group">
    <label for="inputEmail">Email</label>
    <input type="email" name="_replyto" id="inputEmail" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="inputUvaHandle">User ID</label>
    <input type="text" name="_uvahandle" id="inputUvaHandle" class="form-control" placeholder="Enter your UVA computing user ID, i.e. mst3k">
  </div>
  <div class="form-group">
    <label for="inputPhone">Phone</label>
    <input type="text" name="_phone" id="inputPhone" class="form-control" placeholder="Enter phone">
  </div>
  <div class="form-group">
    <label for="Textarea">Describe your project</label>
    <textarea class="form-control" id="Textarea" rows="5" name="_project"></textarea>
  </div>
    <input type="hidden" name="nogo" id="nogo" class="form-control" placeholder="This should not be filled in.">
  <button type="submit" value="Send" class="btn btn-primary">Send</button>
  <a href="https://somrc.virginia.edu/"><button class="btn btn-secondary">Cancel</button></a>
</form>
