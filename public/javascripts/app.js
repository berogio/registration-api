import { fetchData } from "./service.js";

document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.querySelector('loginButton');
    const registrationForm = document.querySelector("form");

    registrationForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const vorname = document.getElementById("vorname").value;
        const nachname = document.getElementById("nachname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("passwort").value;

        const formData = {
            vorname: vorname,
            nachname: nachname,
            email: email,
            password: password
        };

        try {
            const data = await fetchData('register', 'POST', formData);

            const redirectTo = data.redirectTo;
            if (redirectTo) {
                window.location.href = redirectTo;
            }
        } catch (error) {
            showError(error.message);
        }

        function showError(errorMessage) {
            const errorElement = document.getElementById('error-message');
            errorElement.innerText = errorMessage;
            errorElement.style.color = 'red';
        }
    });
});
loginButton.addEventListener('click', function() {
    window.location.href = 'login';
});