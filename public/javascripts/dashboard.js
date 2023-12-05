document.getElementById('editProfileButton').addEventListener('click', function() {
    window.location.href = 'edit';
});

document.getElementById('logoutButton').addEventListener('click', function() {
    fetch('/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            console.log('Logout successful');
            window.location.href = 'login';
        })
        .catch(error => {
            console.error('Logout error:', error.message);
        });
});