$('input[type=radio][name=funding-type]').change(function() {
    if (this.value == 'funding-project') {
        alert("Is a project!");
    }
    else if (this.value == 'funding-gift') {
        alert("Is a gift!");
    }
    else if (this.value == 'funding-grant') {
        alert("Is a grant!");
    }
    else if (this.value == 'funding-designated') {
        alert("Is designated!");
    }
});
