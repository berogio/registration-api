import { fetchData, updateLanguage } from './service.js';

document.addEventListener("DOMContentLoaded", function() {
    updateLanguage()
    const loginForm = document.getElementById("LogiForm");
    const errorMessageElement = document.getElementById("errorMessage");
    const forgotPasswordButton = document.getElementById("forgotPasswordButton");
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const { value: loginEmail } = document.getElementById('LoginEmail');
        const { value: loginPassword } = document.getElementById('LoginPasswort');

        try {
            const data = await fetchData('login', 'POST', { loginEmail, loginPassword });

            if (data.message === 'OK') {
                window.location.href = 'dashboard';
            } else {
                showError(data.error);
            }
        } catch (error) {
            console.error('Error Sending Data: aqvar6', error);
            showError(error.message);
        }
    });

    function showError(errorMessage) {
        errorMessageElement.textContent = errorMessage + 'aqvar2';
    }

});