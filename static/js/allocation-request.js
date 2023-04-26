$("#new-descr").show();
$("#renewal-descr").hide();
$("#new-or-renewal-options").change(function () {
  var type = $("input[name='new-or-renewal']:checked").val();
  if (type == "new") {
    $("#new-descr").show(400);
    $("#renewal-descr").hide(400);
  } else {
    $("#new-descr").hide(400);
    $("#renewal-descr").show(400);
  }
});

// show extra "other" field if selected for Academic Discipline
$("#discipline-other").hide();
$("#discipline-other-label").hide();
$("#discipline").change(function () {
  var discval = this.value;
  if (discval == "other") {
    $("#discipline-other").show(400);
    $("#discipline-other-label").show(400);
  } else {
    $("#discipline-other").hide(400);
    $("#discipline-other-label").hide(400);
  }
});
