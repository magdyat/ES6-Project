document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const errors = document.querySelectorAll(".error");
  errors.forEach(err => err.textContent = "");

  let isValid = true;

  if (email === "") {
    setError("email", "Email is required");
    isValid = false;
  }
  if (password === "") {
    setError("password", "Password is required");
    isValid = false;
  }

  if (isValid) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser = users.find(u => u.email === email && u.password === password);

    if (matchedUser) {
      showMessage("Login successful! Redirecting...", "success");

      localStorage.setItem("currentUser", JSON.stringify(matchedUser));

      setTimeout(() => {
        window.location.href = "main.html";
      }, 1500);
    } else {
      setError("password", "Invalid email or password");
    }
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
    document.getElementById("loginForm").appendChild(msgBox);
  }
  msgBox.textContent = msg;
  msgBox.className = `form-message ${type}`;
}
