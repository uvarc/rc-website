+++
date = "2019-05-05T15:26:06-05:00"
categories = ["service"]
images = [""]
author = "Staff"
description = ""
title = "Request a Consultation"
draft = false
tags = ["staff","consultation","contact"]
sidebar = "hidden"
+++

<form action="https://formspree.io/nem2p@virginia.edu" method="POST">
  <div class="form-group">
    <label for="inputName">Name</label>
    <input type="text" name="name-name" id="inputName" class="form-control" placeholder="Enter name">
  </div>
  <div class="form-group">
    <label for="inputEmail">Email</label>
    <input type="email" name="name-replyto" id="inputEmail" class="form-control" aria-describedby="emailHelp" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="inputUvaHandle">User ID</label>
    <input type="text" name="name-uvaid" id="inputUvaHandle" class="form-control" placeholder="Enter your UVA computing user ID, i.e. mst3k">
  </div>
  <div class="form-group">
    <label for="inputPhone">Phone</label>
    <input type="text" name="name-phone" id="inputPhone" class="form-control" placeholder="Enter phone">
  </div>
  <div class="form-group">
    <label for="Textarea">Describe your project</label>
    <textarea class="form-control" name="name-project" id="Textarea" rows="5"></textarea>
  </div>
    <input type="hidden" name="nogo" id="nogo" class="form-control" placeholder="This should not be filled in.">
  <button type="submit" value="Send" class="btn btn-primary">Send</button>
  <a href="/"><button class="btn btn-secondary">Cancel</button></a>
</form>
