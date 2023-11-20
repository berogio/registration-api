document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.querySelector("form");

    registrationForm.addEventListener("submit", function(event) {
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


        const zielUrl = 'http://localhost:3000/register';

        fetch(zielUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {

                console.log('Serverantwort:', data);

                if (data) {
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Fehler beim Senden der Daten:', error);

            });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("LogiForm");
    const errorMessageElement = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const loginEmail = document.getElementById('LoginEmail').value;
        const loginPassword = document.getElementById('LoginPasswort').value;

        const LoginFormData = {
            loginEmail: loginEmail,
            loginPassword: loginPassword
        };

        const zielUrl = 'http://localhost:3000/login';

        fetch(zielUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(LoginFormData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'OK') {
                    // Redirect to the panel page
                    window.location.href = 'panel.html';
                } else {
                    errorMessageElement.textContent = 'Incorrect email or password';
                }
            })
            .catch(error => {
                console.error('Fehler beim Senden der Daten:', error);
            });
    });
});