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
                    // Status 201 bedeutet "Created", also erfolgreich registriert
                    return response.json(); // Rückgabe des JSON-Objekts aus der Serverantwort
                } else if (response.status === 400) {
                    // Status 400 bedeutet "Bad Request", also Fehler bei den Benutzereingaben
                    return response.json().then(data => {
                        // Zeige die Fehlermeldung im Front-End an
                        showError(data.error);
                        throw new Error(data.error); // Wirf einen Fehler, um den nachfolgenden .then-Block zu überspringen
                    });
                } else {
                    // Zeige eine allgemeine Fehlermeldung für andere Statuscodes
                    console.error('Fehler beim Registrieren:', response.statusText);
                    throw new Error('Fehler beim Registrieren');
                }
            })
            .then(data => {
                // Handle data if needed
                const redirectTo = data.redirectTo;
                if (redirectTo) {
                    window.location.href = redirectTo;
                }
            })
            .catch(error => {
                // Handle other errors
                console.error('Fehler beim Senden der Daten:', error);
            });

        function showError(errorMessage) {
            // Zeige die Fehlermeldung im Front-End an
            const errorElement = document.getElementById('error-message');
            errorElement.innerText = errorMessage;
            errorElement.style.color = 'red';
        }

    });
});

loginButton.addEventListener('click', function() {
    window.location.href = 'login.html';
})