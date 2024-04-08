document.addEventListener("DOMContentLoaded", function() {
    const fileUpload = document.getElementById("file-upload");
    const profileImage = document.getElementById("profile-image");

    // Update profile image when file is selected
    fileUpload.addEventListener("change", function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function() {
            profileImage.src = reader.result;
        };
        reader.readAsDataURL(file);
    });

    // Add event listener to the logout button
    const logoutButton = document.querySelector(".logout-mode li:nth-child(1) a");
    logoutButton.addEventListener("click", () => {
        // Redirect to signup.html page
        window.location.href = 'signup.html';
    });

    const body = document.querySelector("body"),
          modeToggle = document.querySelector(".mode-toggle"),
          sidebar = document.querySelector("nav"),
          sidebarToggle = document.querySelector(".sidebar-toggle");

    let getMode = localStorage.getItem("mode");
    if (getMode) {
        body.classList.toggle(getMode);
    }

    let getStatus = localStorage.getItem("status");
    if (getStatus) {
        sidebar.classList.toggle(getStatus);
    }

    modeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        const mode = body.classList.contains("dark") ? "dark" : "light";
        localStorage.setItem("mode", mode);
    });

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
        const status = sidebar.classList.contains("close") ? "close" : "open";
        localStorage.setItem("status", status);
    });
});