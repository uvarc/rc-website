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
