document.getElementById('editProfileButton').addEventListener('click', () => window.location.href = 'edit');
document.getElementById('logoutButton').addEventListener('click', async() => {
    try {
        const response = await fetch('/signout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });

        if (!response.ok) throw new Error('Logout failed');

        console.log('Logout successful');
        window.location.href = 'login';
    } catch (error) {
        console.error('Logout error:', error.message);
    }
});