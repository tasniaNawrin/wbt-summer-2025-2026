const form = document.getElementById("clubForm");

let wrongAttempts = 0;
let isLocked = false;

form.addEventListener("submit", function (event) {

    event.preventDefault();
    clearErrors();

    if (isLocked) {
        document.getElementById("passwordError").innerHTML = "Password is locked. Try again after 30 seconds.";
        return;
    }

    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let category = document.getElementById("category");
    let whyjoin = document.getElementById("whyjoin");

    let gender = document.querySelector('input[name="gender"]:checked');
    let clubs = document.querySelectorAll('input[name="clubs"]:checked');

    let valid = true;

    //First Name Check
    if (fname.value.trim() == "") {
        showError(fname, "fnameError", "First Name is required.");
        valid = false;
    }

    else if (!/^[A-Za-z ]+$/.test(fname.value.trim())) {
        showError(fname, "fnameError", "Only alphabets are allowed.");
        valid = false;
    }

    else {
        showSuccess(fname);
    }

    //Last name check
    if (lname.value.trim() == "") {
        showError(lname, "lnameError", "Last Name is required.");
        valid = false;
    }

    else if (!/^[A-Za-z ]+$/.test(lname.value.trim())) {
        showError(lname, "lnameError", "Only alphabets are allowed.");
        valid = false;
    }

    else {
        showSuccess(lname);
    }

    //Email check
    if (email.value.trim() == "") {
        showError(email, "emailError", "Email is required.");
        valid = false;
    }

    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, "emailError", "Invalid email address.");
        valid = false;
    }

    else {
        showSuccess(email);
    }

    //Password check
    if (password.value == "") {
        showError(password, "passwordError", "Password is required.");
        valid = false;
    }

    else if (password.value != "Club1234") {
        wrongAttempts++;

        showError(password, "passwordError", "Wrong Password! Attempt " + wrongAttempts + " of 3.");

        valid = false;

        if (wrongAttempts >= 3) {
            isLocked = true;

            document.getElementById("passwordError").innerHTML = "Too many wrong attempts. Password locked for 30 seconds.";

            password.disabled = true;

            setTimeout(function () {

                isLocked = false;
                wrongAttempts = 0;
                password.disabled = false;

                document.getElementById("passwordError").innerHTML = "Password unlocked. Try again.";

            }, 30000);
        }
    }

    else {
        wrongAttempts = 0;
        showSuccess(password);
    }

    //Radio check
    if (gender == null) {
        document.getElementById("genderError").innerHTML = "Please select your gender.";
        valid = false;
    }

    //Checkbox check
    if (clubs.length == 0) {
        document.getElementById("clubsError").innerHTML = "Select at least one club.";
        valid = false;
    }

    //dropdown check
    if (category.value == "") {
        showError(category, "categoryError", "Please select one club category.");
        valid = false;
    }

    else {
        showSuccess(category);
    }


    //textarea check
    if (whyjoin.value.trim() == "") {
        showError(whyjoin, "whyjoinError", "This field is required.");
        valid = false;
    }

    else if (whyjoin.value.trim().length < 20) {
        showError(whyjoin, "whyjoinError", "Address must be at least 20 characters.");
        valid = false;
    }

    else {
        showSuccess(whyjoin);
    }


    if (valid) {
        alert("Form Submitted Successfully!");
        form.reset();
        clearErrors();
    }

});


function showError(input, errorId, message) {

    input.classList.add("errorBorder");
    input.classList.remove("successBorder");

    document.getElementById(errorId).innerHTML = message;

}

function showSuccess(input) {

    input.classList.remove("errorBorder");
    input.classList.add("successBorder");

}

function clearErrors() {

    let errors = document.querySelectorAll(".error");

    errors.forEach(function (item) {

        item.innerHTML = "";

    });

    let fields = document.querySelectorAll("input, select, textarea");

    fields.forEach(function (field) {

        field.classList.remove("errorBorder");
        field.classList.remove("successBorder");

    });

}