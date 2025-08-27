document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const errors = document.querySelectorAll(".error");
  errors.forEach(err => err.textContent = "");

  let isValid = true;

  if (name.length < 3) {
    setError("name", "Name must be at least 3 characters");
    isValid = false;
  }

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    setError("email", "Enter a valid email address");
    isValid = false;
  }

  const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
  if (!password.match(passwordPattern)) {
    setError("password", "Password must be 6+ chars, include number & special char");
    isValid = false;
  }

  if (password !== confirmPassword) {
    setError("confirmPassword", "Passwords do not match");
    isValid = false;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find(u => u.email === email || u.name === name);

  if (existingUser) {
    setError("email", "Email or username already exists");
    isValid = false;
  }

  if (isValid) {
    const user = { name, email, password };
    users.push(user); 
    localStorage.setItem("users", JSON.stringify(users));

    showMessage("Registration successful! You can now login.", "success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }
});

function setError(id, message) {
  const inputField = document.getElementById(id);
  inputField.nextElementSibling.textContent = message;
}

function showMessage(msg, type) {
  let msgBox = document.querySelector(".form-message");
  if (!msgBox) {
    msgBox = document.createElement("div");
    msgBox.className = "form-message";
    document.getElementById("registerForm").appendChild(msgBox);
  }
  msgBox.textContent = msg;
  msgBox.className = `form-message ${type}`;
}
