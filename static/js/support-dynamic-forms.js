function reset_form() {
    $("#support-fields").html('');
    $("#rivanna-fields").html('');
    $("#ivy-fields").html('');
    $("#consultation-fields").html('');    
    $("#support").css("background-color","#F8FAFB");
    $("#rivanna").css("background-color","#F8FAFB");
    $("#ivy").css("background-color","#F8FAFB");
    $("#consultation").css("background-color","#F8FAFB");
    hide_submit();
  };
function show_submit() {
  $("#submit-div").css("display","block");
};
function hide_submit() {
  $("#submit-div").css("display","none");
}
function show_support() {
  $("#support").css("background-color","#D9DBDC");
  $("#support-fields").html(`
    <input type="hidden" id="category" name="category" value="General">
    <input type="hidden" id="categories" name="categories" value="General">
    <div class="form-item form-type-textfield form-group">
      <label id="request_title" class="control-label" for="request_title">Describe the nature of your support request *</label>
      <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="" />
    </div>
    <div class="form-item form-group form-item form-type-textarea form-group">
      <label id="description_label" class="control-label" for="description">Details of your request *</label>
      <div class="form-textarea-wrapper resizable">
        <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
        <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
      </div>
    <br clear=all />
    </div>
  `);
  enforce_max();
  show_submit();
};

function show_rivanna() {
  $("#rivanna").css("background-color","#D9DBDC");
  $("#rivanna-fields").html(`
    <input type="hidden" id="category" name="category" value="Rivanna">
    <input type="hidden" id="categories" name="categories" value="Rivanna">
    <div class="form-item form-type-textfield form-group">
      <label id="request_title" class="control-label" for="request_title">Please give a brief description of the problem *</label>
      <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="" />
    </div>
    <div class="form-item form-group">
        <label class="control-label" for="rivanna_category">What do you need help with *</label>
        <select required="required" onchange="rivannaSubCategory()" class="dropdown form-control form-select required" id="rivanna_category" name="rivanna_category">
            <option value="" selected="selected">- Select -</option>
            <option value="Access">Rivanna access</option>
            <option value="Software">Software usage / installation</option>
            <option value="Error">Error running software</option>
            <option value="Storage">Storage</option>
            <option value="OOD">OpenOnDemand</option>
        </select>
    </div>
    <div class="form-item form-type-textfield form-group">
      <label class="control-label" for="request_title">What software are you trying to use?</label>
      <input class="form-control form-text" type="text" id="rivanna_software" name="rivanna_software" value="" size="60" maxlength="100" placeholder="" />
    </div>
    <div class="form-textarea-wrapper resizable form-group">
      <label class="control-label" for="error_message">Error message received</label>
      <textarea class="form-control form-textarea" id="error_message" name="error_message" style="font-family:monospace;font-size:90\%;" cols="60" rows="8" maxlength="5000" placeholder="Paste your error here."></textarea>
    </div>
    <div class="form-item form-type-textfield form-group" id="slurm_id_div">
      <label class="control-label" for="request_title">SLURM Job ID</label>
      <input class="form-control form-text" type="text" id="slurm_id" name="slurm_id" value="" style="font-family:monospace;" size="10" maxlength="20" placeholder="e.g. 12345678" />
    </div>
    <div class="form-item form-type-textfield form-group">
      <label class="control-label" for="request_title">Path to your SLURM script</label>
      <input class="form-control form-text" type="text" id="script_path" name="script_path" value="" style="font-family:monospace;" size="60" maxlength="100" placeholder="e.g. /home/mst3k/script.slurm" />
    </div>  
    <div class="form-item form-group form-item form-type-textarea form-group">
      <label id="description_label" class="control-label" for="description">Details of your request *</label>
      <div class="form-textarea-wrapper resizable">
        <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
        <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
      </div>
    <br clear=all />
    </div>
  `);
  enforce_max();
  show_submit();
};

function rivannaSubCategory() {
  var subcat = document.getElementById("rivanna_category").value;
  // console.log(subcat);
  if (subcat == "OOD") {
    $("#slurm_id_div").remove();
  }
};

function show_ivy() {
  $("#ivy").css("background-color","#D9DBDC");
  $("#ivy-fields").html(`
    <input type="hidden" id="category" name="category" value="Ivy">
    <input type="hidden" id="categories" name="categories" value="Ivy">
    <div class="form-item form-type-textfield form-group">
      <label id="request_title" class="control-label" for="request_title">Please give a brief description of the problem *</label>
      <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="" />
    </div>
    <div class="form-item form-group">
        <label class="control-label" for="rivanna_category">What do you need help with *</label>
        <select required="required" class="dropdown form-control form-select required" id="rivanna_category" name="rivanna_category">
            <option value="" selected="selected">- Select -</option>
            <option value="Ivy access">Ivy access</option>
            <option value="Software">Software usage / installation</option>
            <option value="Error">Error running software</option>
            <option value="Other">Other</option>
        </select>
    </div>
    <div class="form-textarea-wrapper resizable form-group">
      <label class="control-label" for="error_message">Error message received</label>
      <textarea class="form-control form-textarea" id="error_message" name="error_message" style="font-family:monospace;font-size:90\%;" cols="60" rows="8" maxlength="5000" placeholder="Paste error message here."></textarea>
    </div>
    <div class="form-item form-type-textfield form-group">
      <label class="control-label" for="request_title">Project PI</label>
      <input class="form-control form-text" type="text" id="ivy_project_pi" name="ivy_project_pi" value="" size="60" maxlength="100" placeholder="" />
    </div>
    <div class="form-item form-type-textfield form-group">
      <label class="control-label" for="request_title">IP Address of your Ivy VM</label>
      <input class="form-control form-text" type="text" id="ivy_ip_address" name="ivy_ip_address" style="font-family:monospace;" value="" size="20" maxlength="20" placeholder="" />
    </div>    
    <div class="form-item form-type-textfield form-group">
      <label class="control-label" for="request_title">Path to your executable / script</label>
      <input class="form-control form-text" type="text" id="ivy_executable_path" name="ivy_executable_path" style="font-family:monospace;" value="" size="60" maxlength="100" placeholder="e.g. /home/mst3k/script.sh" />
    </div>
    <div class="form-item form-group form-type-textarea">
      <label id="description_label" class="control-label" for="description">Details of your request *</label>
      <div class="form-textarea-wrapper resizable">
        <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
        <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
      </div>
    <br clear=all />
    </div>
  `);
  enforce_max();
  show_submit();
};

function show_consultation() {
  $("#consultation").css("background-color","#D9DBDC");
  $("#consultation-fields").html(`
    <input type="hidden" id="category" name="category" value="Consultation">
    <input type="hidden" id="categories" name="categories" value="Consultation">
    <div class="form-item form-type-textfield form-group">
      <label id="request_title" class="control-label" for="request_title">Describe the nature of your consultation request *</label>
      <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="" />
    </div>
    <div class="form-item form-group form-item form-type-textarea form-group">
      <label id="description_label" class="control-label" for="description">Details of your request *</label>
      <div class="form-textarea-wrapper resizable">
        <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
        <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
      </div>
    <br clear=all />
    </div>
  `);
  enforce_max();
  show_submit();
};

function selected(cat) {
  if (cat == 'support') {
    reset_form();
    show_support();
  } 
  if (cat == 'rivanna') {
    reset_form();
    show_rivanna();
  } 
  if (cat == 'ivy') {
    reset_form();
    show_ivy();
  }
  if (cat == 'consultation') {
    reset_form();
    show_consultation();
  }
  else { }
};
function getParams() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
};
$( document ).ready(function() {
  enforce_max();
  // category thrown as URL parameter
  let qparam = decodeURI(getParams()["category"]).toLocaleLowerCase();
  if(qparam != undefined && qparam != "undefined") {
    if (qparam == "support") {show_support();}
    if (qparam == "rivanna") {show_rivanna();}
    if (qparam == "ivy") {show_ivy()}
    if (qparam == "consultation") {show_consultation();}
  } else {reset_form()}
});

function enforce_max() {
  var text_max = 5000;
  $('#textarea_feedback').html(text_max + ' characters remaining');
  $('#description').keyup(function() {
    var text_length = $('#description').val().length;
    var text_remaining = text_max - text_length;
    $('#textarea_feedback').html(text_remaining + ' characters remaining');
    if (text_remaining <=20) {
      $('#textarea_feedback').css("color","red");
      $('#textarea_feedback').css("font-weight","bold");
    } else if (text_remaining <= 0) {
      $('#textarea_feedback').html("No more room left!");
    } else {
      $('#textarea_feedback').css("color","green");
      $('#textarea_feedback').css("font-weight","normal");
    }
  });
};