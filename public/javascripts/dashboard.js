import { fetchData } from './service.js';

document.getElementById('editProfileButton').addEventListener('click', () => {
    window.location.href = 'edit';
});

document.getElementById('logoutButton').addEventListener('click', async() => {
    try {
        const response = await fetchData('signout', 'POST', {});

        if (response.message === 'Logout successful') {
            window.location.href = 'login';
        } else {
            console.error('Unexpected response:', response);
            alert('Logout failed');
        }
    } catch (error) {
        console.error('Logout error:', error.message);
        alert('Logout failed');
    }
});