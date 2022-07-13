function reset_form() {
    document.getElementById("support-fields").innerHTML = "";
    document.getElementById("rivanna-fields").innerHTML = "";
    document.getElementById("ivy-fields").innerHTML = "";
    document.getElementById("consultation-fields").innerHTML = "";
  };
  function show_submit() {
    var submitadd = document.getElementById("submit-div")
    submitadd.style.display = 'block';
  }
  function selected(cat) {
    console.log(cat)
    if (cat == 'support') {
      reset_form();
      var formadd = document.getElementById("support-fields").innerHTML += `
        <input type="hidden" id="category" name="category" value="General">
        <div class="form-item form-type-textfield form-group">
          <label id="request_title" class="control-label" for="request_title">Describe the nature of your request *</label>
          <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="What can we help you with?" />
        </div>
        <div class="form-item form-group form-item form-type-textarea form-group">
          <label id="description_label" class="control-label" for="description">Details of your request *</label>
          <div class="form-textarea-wrapper resizable">
            <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
            <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
          </div>
        <br clear=all />
        </div>
        `;
        show_submit();
    } 
    if (cat == 'rivanna') {
      reset_form();
      var formadd = document.getElementById("rivanna-fields").innerHTML += `
        <input type="hidden" id="category" name="category" value="Rivanna">
        <div class="form-item form-type-textfield form-group">
          <label id="request_title" class="control-label" for="request_title">Please give a brief description of the problem *</label>
          <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="What can we help you with?" />
        </div>
        <div class="form-item form-group form-item form-type-textarea form-group">
          <label id="description_label" class="control-label" for="description">Details of your request *</label>
          <div class="form-textarea-wrapper resizable">
            <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
            <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
          </div>
        <br clear=all />
        </div>
        <div class="form-item form-group">
            <label class="control-label" for="rivanna_category">What do you need help with *</label>
            <select required="required" class="dropdown form-control form-select required" id="rivanna_category" name="rivanna_category">
                <option value="" selected="selected">- Select -</option>
                <option value="Rivanna access">Rivanna access</option>
                <option value="Software">Software usage / installation</option>
                <option value="Error">Error running software</option>
                <option value="Storage">Storage</option>
                <option value="OpenOnDemand">OpenOnDemand</option>
            </select>
        </div>
        <div class="form-item form-type-textfield form-group">
          <label class="control-label" for="request_title">What software are you trying to use?</label>
          <input class="form-control form-text" type="text" id="rivanna_software" name="rivanna_software" value="" size="60" maxlength="100" placeholder="" />
        </div>
        <div class="form-textarea-wrapper resizable form-group">
          <label class="control-label" for="error_message">Error message received</label>
          <textarea class="form-control form-textarea" id="error_message" name="error_message" style="font-family:monospace;font-size:90\%;" cols="60" rows="8" maxlength="5000"></textarea>
        </div>
        <div class="form-item form-type-textfield form-group">
          <label class="control-label" for="request_title">SLURM Job ID</label>
          <input class="form-control form-text" type="text" id="slurm_id" name="slurm_id" value="" style="font-family:monospace;" size="10" maxlength="20" placeholder="" />
        </div>
        <div class="form-item form-type-textfield form-group">
          <label class="control-label" for="request_title">Path to your SLURM script</label>
          <input class="form-control form-text" type="text" id="script_path" name="script_path" value="" style="font-family:monospace;" size="60" maxlength="100" placeholder="" />
        </div>      
        `;
        show_submit();
    } 
    if (cat == 'ivy') {
      reset_form();
      var formadd = document.getElementById("ivy-fields").innerHTML += `
        <input type="hidden" id="category" name="category" value="Ivy">
        <div class="form-item form-type-textfield form-group">
          <label id="request_title" class="control-label" for="request_title">Please give a brief description of the problem *</label>
          <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="What can we help you with?" />
        </div>
        <div class="form-item form-group form-type-textarea">
          <label id="description_label" class="control-label" for="description">Details of your request *</label>
          <div class="form-textarea-wrapper resizable">
            <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
            <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
          </div>
        <br clear=all />
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
          <textarea class="form-control form-textarea" id="error_message" name="error_message" style="font-family:monospace;font-size:90\%;" cols="60" rows="8" maxlength="5000"></textarea>
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
          <input class="form-control form-text" type="text" id="ivy_executable_path" name="ivy_executable_path" style="font-family:monospace;" value="" size="60" maxlength="100" placeholder="" />
        </div>
        `;
        show_submit();
    }
    if (cat == 'consultation') {
      reset_form();
      var formadd = document.getElementById("consultation-fields").innerHTML += `
        <input type="hidden" id="category" name="category" value="Consultation">
        <div class="form-item form-type-textfield form-group">
          <label id="request_title" class="control-label" for="request_title">Describe the nature of your consultation request *</label>
          <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="What can we help you with?" />
        </div>
        <div class="form-item form-group form-item form-type-textarea form-group">
          <label id="description_label" class="control-label" for="description">Details of your request *</label>
          <div class="form-textarea-wrapper resizable">
            <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
            <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
          </div>
        <br clear=all />
        </div>
        `;
        show_submit();
    }
    else { }
  };
//   function getParams() {
//     var vars = {};
//     var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
//       vars[key] = value;
//     });
//     return vars;
//   };