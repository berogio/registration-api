function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
    }
    const data = {
        currentPassword: currentPassword,
        newPassword: newPassword
    };
    const zielUrl = 'http://localhost:3000/edit';
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
            window.location.href = 'login';
        })
        .catch(error => {
            console.error('Password change error:', error.message);
            alert('Password change failed');
            window.location.href = 'login';
        });

}