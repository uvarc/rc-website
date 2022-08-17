  function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  };
  
  function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 60 * 60 * 1000));
    // document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ';path=/' + ';domain=localhost';
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

  function encode64(str) {
    var d = window.btoa(unescape(encodeURIComponent(str)));
    return d;
  }
  
  if (getCookie("__rc_name") == null || getCookie("__rc_name") == '') {
    window.location.replace( "https://auth.rc.virginia.edu/session.php" );  
  }

  // document.cookie = "__rc_form_referrer= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
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
  // let findit = document.cookie.match(/^(.*;)?\s*__rc_dept\s*=\s*[^;]+(.*)?$/);
  // console.log(findit);
  // if (findit == null) {
  //   console.log("findit var is null");
  // }

  let dept = getCookie("__rc_dept");
  if (dept !== null || dept !== '') {
    // let dept_dec = decode64(dept);
    // var set_dept = document.getElementById("department").value = dept_dec;
    // set_school(dept_dec);
  } else if (dept == null) {
    // do nothing;
  };

  function set_school(dept) {
    if (dept == 'PV-Biocomplexity Initiative') {
      var f = document.getElementById("school_name").textContent = 'BII';
      var g = document.getElementById("school").value = 'BII';
      let sch = encode64('BII');
      let referrer = setCookie('__rc_school', sch, '24');
    } else if (dept == 'Data Science') {
      var s = document.getElementById("school_name").textContent = 'SDS';
      var g = document.getElementById("school").value = 'SDS'; 
      let sch = encode64('SDS');
      let referrer = setCookie('__rc_school', sch, '24');
    } else if (dept == 'Other') {
      var s = document.getElementById("school_name").textContent = 'OTHER';
      var g = document.getElementById("school").value = 'Other'; 
      let sch = encode64('Other'); 
      let referrer = setCookie('__rc_school', sch, '24');    
    } else {
      let schb = dept.substring(0, 2);
      let correlations ={
        AS: "CLAS",
        BA: "BATTEN",
        DA: "DARDEN",
        DS: "SDS",
        ED: "SEHD",
        EN: "SEAS",
        LW: "LAW",
        MD: "SOM",
        PV: "PROVOST",
        RS: "RESEARCH"     
      }
      let schoolval = correlations[schb];
      var s = document.getElementById("school_name").textContent = schoolval;
      var g = document.getElementById("school").value = schoolval;
      let sch = encode64(schoolval);
      let referrer = setCookie('__rc_school', sch, '24');
    };
  };
 
  $("#department").on("change",function(){ 
    var dept = $("#department").val();
    let deptval = encode64(dept);
    let deptdo = setCookie('__rc_dept', deptval, '24');
    set_school(dept);
  });
