+++
title = "Group Claim Form"
+++
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    .form-container {
      max-width: 400px;
      margin: auto;
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    label {
      font-weight: bold;
      display: block;
      margin-bottom: 8px;
    }

    select, button {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      font-size: 16px;
    }

    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }

    .message {
      text-align: center;
      margin-top: 10px;
    }
  </style>
</head>


<body>

  <div class="form-container">
    <form id="claimForm">
      <label for="user_groups">Select a Group to Claim:</label>
      <select id="user_groups" name="user_groups" required>
        <option value="">-- Select Group --</option>
      </select>
      <button type="submit">Claim</button>
    </form>
    <div class="message" id="resultMessage"></div>
  </div>
</body>
  <script>
    $(document).ready(function () {
        const sections = document.querySelectorAll(".blog-sidebar");
        sections.forEach(section => section.remove());
    });
  </script>