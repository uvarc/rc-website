$("#standard-data").hide();
$("#sensitive-data").hide();
$("#storage-options").change(function () {
  var type = $("input[name='storage-choice']:checked").val();
  if (type == "project") {
    $("#standard-data").show(400);
    $("#sensitive-data").hide(200);
  } else if (type == "zfs") {
    $("#standard-data").show(400);
    $("#sensitive-data").hide(200);
  } else if (type == "value") {
    $("#standard-data").show(400);
    $("#sensitive-data").hide(200);
  } else if (type == "ivy") {
    $("#sensitive-data").show(400);
    $("#standard-data").hide(200);
  } else {
    $("#standard-data").hide(400);
    $("#sensitive-data").hide(400);
  }
});
