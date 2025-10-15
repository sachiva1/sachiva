// Toggle password visibility
document.getElementById("toggleLoginPassword").onclick = function () {
  let pass = document.getElementById("loginPassword");
  pass.type = pass.type === "password" ? "text" : "password";
  this.classList.toggle("fa-eye-slash");
};

document.getElementById("toggleSignupPassword").onclick = function () {
  let pass = document.getElementById("signupPassword");
  pass.type = pass.type === "password" ? "text" : "password";
  this.classList.toggle("fa-eye-slash");
};

// Switch between login & signup
document.getElementById("showSignup").onclick = function (e) {
  e.preventDefault();
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("signupForm").classList.add("active");
};
document.getElementById("showLogin").onclick = function (e) {
  e.preventDefault();
  document.getElementById("signupForm").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
};

// Error messages for login
document.getElementById("loginForm").onsubmit = function (e) {
  e.preventDefault();
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;
  if (email === "" || password === "") {
    document.getElementById("loginError").textContent = "Please fill all fields!";
  } else {
    document.getElementById("loginError").textContent = "";
    alert("Login successful!");
  }
};

// Error messages for signup
document.getElementById("signupForm").onsubmit = function (e) {
  e.preventDefault();
  let name = document.getElementById("signupName").value;
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  if (name === "" || email === "" || password === "") {
    document.getElementById("signupError").textContent = "Please fill all fields!";
  } else {
    document.getElementById("signupError").textContent = "";
    alert("Signup successful!");
  }
};
