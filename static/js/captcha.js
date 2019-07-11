var code;
function createCaptcha() {
  //clear the contents of captcha div first 
  document.getElementById('captcha').innerHTML = "";
  var charsArray =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 160;
  canv.height = 80;
  var ctx = canv.getContext("2d");
  ctx.font = "36px Georgia";
  ctx.strokeText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  code = captcha.join("");
  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}
function validateCaptcha() {
  event.preventDefault();
  debugger
  if (document.getElementById("cpatchaTextBox").value == code) {
    // alert("Valid Captcha")
    document.getElementById("submit").disabled = false;
    // var x = document.getElementById("submit-div");
    // x.style.display = "block";
  } else {
    document.getElementById("submit").disabled = true;
    // var x = document.getElementById("submit-div");
    // x.style.display = "none";
    alert("Invalid Captcha. Please try again");
    createCaptcha();
  }
}
window.onload = function() {
  document.getElementById("submit").disabled = true;
  createCaptcha();
}
