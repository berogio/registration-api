import { fetchData } from './service.js';

function changePassword() {
    const [currentPassword, newPassword, confirmPassword] = ['currentPassword', 'newPassword', 'confirmPassword']
    .map(id => document.getElementById(id).value);

    if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
    }

    const data = { currentPassword, newPassword };

    fetchData('edit', 'POST', data)
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

document.addEventListener("DOMContentLoaded", function() {
    const passwordChangeForm = document.getElementById("passwordChangeForm");
    passwordChangeForm.addEventListener("submit", function(event) {
        event.preventDefault();
        changePassword();
    });
});