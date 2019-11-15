// return message/status
let message = decodeURI(getParams()["message"]);
let status = decodeURI(getParams()["status"]);
if(message == "undefined" || message == undefined) {
  message="";
}

if(status == "error" || status == undefined) {
  document.getElementById("form_post_response").innerHTML = message;
  var messagebox = document.getElementById("response_message");
  messagebox.classList.add("alert-danger");
  document.getElementById("form_post_response").style.fontWeight = "500";
} else if(status == "success") {
  success_message = "We're on it. RC staff make every effort to respond to requests within 1 business day.";
  full_message = "<b>" + message + "</b> " + success_message;
  document.getElementById("form_post_response").innerHTML = full_message;
  var messagebox = document.getElementById("response_message");
  messagebox.classList.add("alert-success");
  document.getElementById("form_post_response").style.fontWeight = "500";
} else {
  document.getElementById("form_post_response").innerHTML = message;
  var messagebox = document.getElementById("response_message");
  document.getElementById("form_post_response").style.fontWeight = "500";
}
