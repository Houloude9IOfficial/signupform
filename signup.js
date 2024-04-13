document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var username = document.getElementById('username').value;

  // Signup with Netlify Identity
  netlifyIdentity.signup(email, password, {
    username: username,
    // Additional user metadata can be passed here
  }).then(function(user) {
    // Signup successful, you can redirect or perform additional actions here
    console.log("Signup successful:", user);
  }).catch(function(error) {
    // Signup failed, handle the error
    console.error("Signup failed:", error);
    showError(error.message);
  });
});

function showError(message) {
  var errorMsg = document.getElementById('error-msg');
  errorMsg.textContent = message;
}
