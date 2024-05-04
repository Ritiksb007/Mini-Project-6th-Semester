import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, updatePassword, updateEmail, updateProfile ,deleteUser } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
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
let auth;



// Function to create and append spinner
function appendSpinner(button) {
  const spinner = document.createElement('span');
  spinner.classList.add('spinner-border', 'spinner-border-sm', 'ms-1');
  button.appendChild(spinner);
}

// Function to remove spinner
function removeSpinner(button) {
  const spinner = button.querySelector('.spinner-border');
  if (spinner) {
    spinner.remove();
  }
}










// Listen for auth state changes
onAuthStateChanged(getAuth(app), (user) => {
 auth = getAuth(app);

 //delete account

const deleteAccount = document.getElementById("deleteProfile")

deleteAccount.addEventListener("click", function(){
  appendSpinner(deleteAccount);
  deleteUser(user).then(() => {
    // User deleted.
    removeSpinner(deleteAccount); // Remove spinner
    alert("Profile deleted..")
    window.location.href ="index.html"
  }).catch((error) => {
    // An error ocurred
    removeSpinner(deleteAccount); // Remove spinner
    alert(error)
  });
})
});


// Function to handle change password
document.getElementById("changePassword").addEventListener("click", () => {
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate input fields
  if (newPassword.length < 6 || confirmPassword.length < 6) {
      alert("Passwords must have at least 6 characters.");
      return;
  }

  if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
  }

  const user = auth.currentUser;

  appendSpinner(document.getElementById("changePassword"));

  updatePassword(user, newPassword)
      .then(() => {
          removeSpinner(document.getElementById("changePassword"));
          alert("Password updated successfully!");
          window.location.reload();
      })
      .catch((error) => {
          removeSpinner(document.getElementById("changePassword"));
          alert("Error updating password: " + error.message);
      });
});

// Function to handle change email
document.getElementById("changeEmail").addEventListener("click", () => {
  const newEmail = document.getElementById("newEmail").value;
  const user = auth.currentUser;

  // Validate input field
  if (!newEmail) {
      alert("Please enter a new email address.");
      return;
  }

  appendSpinner(document.getElementById("changeEmail"));

  if (newEmail !== user.email) {
      updateEmail(user, newEmail)
          .then(() => {
              removeSpinner(document.getElementById("changeEmail"));
              alert("Email updated successfully! Please verify your new email address.");
              window.location.reload();
          })
          .catch((error) => {
              removeSpinner(document.getElementById("changeEmail"));
              alert("Error updating email: " + error.message);
          });
  } else {
      removeSpinner(document.getElementById("changeEmail"));
      alert("The new email address is the same as the current one.");
  }
});

// Function to handle change display name
document.getElementById("changeDisplayName").addEventListener("click", () => {
  const newDisplayName = document.getElementById("newDisplayName").value;
  const user = auth.currentUser;

  // Validate input field
  if (!newDisplayName) {
      alert("Please enter a new display name.");
      return;
  }

  appendSpinner(document.getElementById("changeDisplayName"));

  updateProfile(user, { displayName: newDisplayName })
      .then(() => {
          removeSpinner(document.getElementById("changeDisplayName"));
          alert("Username updated successfully!");
          window.location.reload();
      })
      .catch((error) => {
          removeSpinner(document.getElementById("changeDisplayName"));
          alert("Error updating username: " + error.message);
      });
});



