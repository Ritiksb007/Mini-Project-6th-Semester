import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYM0tkjdUDSzz7UoJt92jQITLXk4DD8lE",
  authDomain: "stdperformance-bf994.firebaseapp.com",
  projectId: "stdperformance-bf994",
  storageBucket: "stdperformance-bf994.appspot.com",
  messagingSenderId: "990002419810",
  appId: "1:990002419810:web:e61ff22f2e52e7664fd93b",
  measurementId: "G-346DHF7S46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to create spinner
function createSpinner(button) {
  const spinner = document.createElement('span');
  spinner.classList.add('spinner-border', 'spinner-border-sm', 'ms-1');
  button.appendChild(spinner);
  return spinner;
}

// Function to remove spinner
function removeSpinner(spinner) {
  spinner.remove();
}

const error = document.getElementById("error");
var submit = document.getElementById("signup");

submit.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission
  
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var fullName = document.getElementById("fullName").value;
  var button = event.target; // Get the button that was clicked

  if (!isValidEmail(email)) {
    alert("Enter a valid email address");
    return; // Exit the function early if email is not valid
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long");
    return; // Exit the function early if password is too short
  }

  if (email === "" || password === "" || fullName === "") {
    alert("Fill All input fields");
    return; // Exit the function early if any other field is empty
  }

  // Add spinner to the button
  const spinner = createSpinner(button);

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("User signed up successfully");
      window.location.href = "dashboard.html"
      // Remove spinner
      removeSpinner(spinner);
      // Additional logic here...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // Remove spinner
      removeSpinner(spinner);
      // Additional error handling here...
    });
});

function isValidEmail(email) {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
