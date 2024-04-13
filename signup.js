document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Get form values
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var id = document.getElementById('id').value;
  
    // Do something with the form values (for example, send them to server)
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("ID:", id);
  });
