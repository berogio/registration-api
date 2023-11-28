document.addEventListener("DOMContentLoaded", function() {
    const loginButton = document.querySelector('loginButton');
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
            .then(response => {
                if (response.status === 201) {
                    return response.json();
                } else if (response.status === 400) {
                    return response.json().then(data => {
                        showError(data.error);
                        throw new Error(data.error);
                    });
                } else {
                    console.error('Fehler beim Registrieren:', response.statusText);
                    throw new Error('Fehler beim Registrieren');
                }
            })
            .then(data => {
                const redirectTo = data.redirectTo;
                if (redirectTo) {
                    window.location.href = redirectTo;
                }
            })
            .catch(error => {
                console.error('Fehler beim Senden der Daten:', error);
            });

        function showError(errorMessage) {
            const errorElement = document.getElementById('error-message');
            errorElement.innerText = errorMessage;
            errorElement.style.color = 'red';
        }

    });
});

loginButton.addEventListener('click', function() {
    window.location.href = 'login';
})