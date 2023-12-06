function changePassword() {
    const [currentPassword, newPassword, confirmPassword] = ['currentPassword', 'newPassword', 'confirmPassword']
    .map(id => document.getElementById(id).value);

    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
    }

    const data = { currentPassword, newPassword };
    const zielUrl = 'http://localhost:3000/edit';

    fetch(zielUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.ok ? response.json() : Promise.reject('Password change failed'))
        .then(() => {
            alert('Password changed successfully');
            window.location.href = 'login';
        })
        .catch(error => {
            console.error('Password change error:', error);
            alert('Password change failed');
            window.location.href = 'login';
        });
}