document.addEventListener('DOMContentLoaded', function() {
    const userInfo = document.getElementById('user-info');
    const usernameElement = document.getElementById('username');
    const emailElement = document.getElementById('email');
    const logoutButton = document.getElementById('logout-btn');
    const loginButton = document.getElementById('login-btn');
    const signupButton = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
  
    // Function to update user information
    function updateUserInfo(user) {
      if (user) {
        // If user is logged in, display user info and show logout button
        userInfo.style.display = 'block';
        usernameElement.textContent = 'Username: ' + user.user_metadata.full_name;
        emailElement.textContent = 'Email: ' + user.email;
        logoutButton.style.display = 'block';
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        loginModal.style.display = 'none'; // Close the login modal if open
      } else {
        // If user is not logged in, hide user info and show login and signup buttons
        userInfo.style.display = 'none';
        logoutButton.style.display = 'none';
        loginButton.style.display = 'block';
        signupButton.style.display = 'block';
      }
    }
  
    // Check if user is logged in
    const currentUser = netlifyIdentity.currentUser();
    updateUserInfo(currentUser);
  
    // Event listener for logout button
    logoutButton.addEventListener('click', function() {
      netlifyIdentity.logout();
      updateUserInfo(null);
    });
  
    // Event listener for login button
    loginButton.addEventListener('click', function() {
      loginModal.style.display = 'block';
    });
  
    // Event listener for close button in login modal
    document.querySelector('.close').addEventListener('click', function() {
      loginModal.style.display = 'none';
    });
  
    // Event listener for clicking outside the modal to close it
    window.addEventListener('click', function(event) {
      if (event.target === loginModal) {
        loginModal.style.display = 'none';
      }
    });
  
    // Event listener for login form submission
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const email = loginEmailInput.value;
      const password = loginPasswordInput.value;
  
      netlifyIdentity.login(email, password).then(function(user) {
        console.log('Login successful:', user);
        updateUserInfo(user);
      }).catch(function(error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      });
    });
  
    // Event listener for identity login event
    netlifyIdentity.on('login', function(user) {
      updateUserInfo(user);
    });
  
    // Event listener for identity logout event
    netlifyIdentity.on('logout', function() {
      updateUserInfo(null);
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signin-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMsg = document.getElementById('error-msg');
  
    // Event listener for sign-in form submission
    signinForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get the values from the form inputs
      const email = emailInput.value;
      const password = passwordInput.value;
  
      // Call the login function of Netlify Identity
      netlifyIdentity.login(email, password)
        .then(function(user) {
          // If login is successful, you can redirect or perform other actions
          console.log('Login successful:', user);
          // Example: Redirect to dashboard
          window.location.href = '/dashboard.html';
        })
        .catch(function(error) {
          // If login fails, display an error message
          console.error('Login failed:', error);
          showError(error.message);
        });
    });
  
    // Function to display error messages
    function showError(message) {
      errorMsg.textContent = message;
    }
  });
  