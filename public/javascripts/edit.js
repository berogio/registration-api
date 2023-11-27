function changePassword() {
    // Formulardaten abrufen
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Überprüfen, ob das neue Passwort und die Bestätigung übereinstimmen
    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
    }

    // Daten für die Fetch-Anfrage vorbereiten
    const data = {
        currentPassword: currentPassword,
        newPassword: newPassword
    };
    const zielUrl = 'http://localhost:3000/edit';
    // Fetch-Anfrage senden
    fetch(zielUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Password change failed');
            }
        })
        .then(data => {
            alert('Password changed successfully');

            window.location.href = 'login'; // Umleitung nach erfolgreicher Passwortänderung
            // Hier kannst du weitere Aktionen nach erfolgreicher Passwortänderung durchführen
        })
        .catch(error => {
            console.error('Password change error:', error.message);
            alert('Password change failed');
            window.location.href = 'login'; // Umleitung nur wenn ein Fehler auftritt
        });

}