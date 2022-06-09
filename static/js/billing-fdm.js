function projectSel(value) {
    if (value == 'Project') {
      // alert("Is a project!");
      document.getElementsByName('funding-number')[0].placeholder = 'e.g. PJ01607';
    }
    else if (value == 'Gift') {
      // alert("Is a gift!");
      document.getElementsByName('funding-number')[0].placeholder = 'e.g. GF003124'; 
    }
    else if (value == 'Grant') {
      // alert("Is a grant!");
      document.getElementsByName('funding-number')[0].placeholder = 'e.g. GR098063'; 
    }
    else if (value == 'Designated') {
      // alert("Is designated!");
      document.getElementsByName('funding-number')[0].placeholder = 'e.g. DN001153'; 
    }
}
