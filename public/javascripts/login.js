document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("LogiForm");
    const errorMessageElement = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const { value: loginEmail } = document.getElementById('LoginEmail');
        const { value: loginPassword } = document.getElementById('LoginPasswort');

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ loginEmail, loginPassword })
            });

            const data = await response.json();

            if (data.message === 'OK') {
                window.location.href = 'dashboard';
            } else {
                errorMessageElement.textContent = data.error
            }
        } catch (error) {
            console.error('Error Sending Data:', error);
        }
    });
});

const forgotPasswordButton = document.getElementById("forgotPasswordButton");