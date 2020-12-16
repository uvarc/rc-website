$('form').submit(function() {
    $(this).find("button[type='submit']").prop('disabled',true);
  });
  
  //Add a JQuery click event handler onto our checkbox.
  $('#data-agreement').click(function(){
      //If the checkbox is checked.
      if($(this).is(':checked')){
          //Enable the submit button.
          $('#submit').attr("disabled", false);
      } else{
          //If it is not checked, disable the button.
          $('#submit').attr("disabled", true);
      }
  });
  
  function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  };
  
  function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/' + ';domain=rc.virginia.edu';
  };
  
  function decode64(str) {
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=str.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
    for(x=0;x<L;x++){
      c=e[str.charAt(x)];b=(b<<6)+c;l+=6;
      while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
    }
    return r;
  };
  
  if (getCookie("__rc_name") == null || getCookie("__rc_name") == '') {
    window.location.replace( "https://auth.rc.virginia.edu/session.php" );  
  }
  
  document.cookie = "__rc_form_referrer= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  var form_url = window.location;
  let referrer = setCookie('__rc_form_referrer', form_url, '24');
  
  var form = document.getElementById('request-form');
  
  // name
  let name = getCookie("__rc_name");
  let name_dec = decode64(name);
  var set_name = document.getElementById("name").value = name_dec;
  
  // uid
  let uid = getCookie("__rc_uid");
  let uid_dec = decode64(uid);
  var set_uid = document.getElementById("uid").value = uid_dec;
  
  // email
  let email = getCookie("__rc_email");
  let email_dec = decode64(email);
  var set_email = document.getElementById("email").value = email_dec;
  
  // get fname for friendliness
  let fname_cookie = getCookie("__rc_fname");
  let fname = decode64(fname_cookie);
  // var set_greeting = document.getElementById("support-greeting").innerHTML = fname;
  var set_greeting = document.getElementById("support-greeting");
    if(set_greeting){
      var set_g = document.getElementById("support-greeting").innerHTML = fname;
    }
