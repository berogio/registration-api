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
    const registrationForm = document.getElementById("LogiForm");

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const loginEmail = document.getElementById('LoginEmail').value
        const loignPassword = document.getElementById('LoginPasswort').value

        const LoginFormData = {
            loginEmail: loginEmail,
            loignPassword: loignPassword
        }

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

                console.log('Serverantwort:', data);

                if (data.message === 'Login successful') {
                    window.location.href = '/panel';
                }
            })
            .catch(error => {
                console.error('Fehler beim Senden der Daten:', error);

            });
    });
});