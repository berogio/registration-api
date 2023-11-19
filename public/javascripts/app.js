document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.querySelector("form");

    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Holen Sie sich die eingegebenen Werte aus dem Formular
        const vorname = document.getElementById("vorname").value;
        const nachname = document.getElementById("nachname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("passwort").value;

        // Erstellen Sie ein JavaScript-Objekt mit den Daten
        const formData = {
            vorname: vorname,
            nachname: nachname,
            email: email,
            password: password
        };

        // Hier können Sie die Daten überprüfen und ggf. Validierung durchführen

        // Ersetzen Sie 'ZIEL_SERVER_URL' durch die tatsächliche URL Ihres Zielservers
        const zielUrl = 'http://localhost:3000/register';

        // Senden Sie die Daten an den Server
        fetch(zielUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Hier können Sie die Serverantwort verarbeiten
                console.log('Serverantwort:', data);
                // Weiterleitung zur Anmeldeseite nach erfolgreicher Registrierung
                if (data) {
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Fehler beim Senden der Daten:', error);
                // Hier können Sie Fehlerbehandlung hinzufügen
            });
    });
});