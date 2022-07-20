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
    r = atob(str);
    return r;
  };

  function encode64(str) {
    r = btoa(str);
    return r;
  };
  
  if (getCookie("__rc_name") == null || getCookie("__rc_name") == '') {
    window.location.replace( "https://auth.rc.virginia.edu/session.php" );  
  }
  
  document.cookie = "__rc_form_referrer= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  var form_url = window.location;
  let referrer = setCookie('__rc_form_referrer', form_url, '24');
  
  // var form = document.getElementById('request-form');
  
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

  // dept
  let dept = getCookie("__rc_dept");
  if (dept !== null || dept !== '') {
    let dept_dec = decode64(dept);
    var set_dept = document.getElementById("department").value = dept_dec;
  } else {
    // do nothing;
  };

  function set_department(dept) {
    key = "__rc_dept";
    dept_enc = encode64(dept);
    setCookie(key, dept_enc, 8760)
  };

  function dept_select() {
    var dept = document.getElementById("department").value;
    set_department(dept)
  };
