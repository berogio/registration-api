import { fetchData, updateLanguage } from './service.js';

document.addEventListener("DOMContentLoaded", () => {
    updateLanguage()
    const submitBtn = document.querySelector("input[type='submit']");
    submitBtn.addEventListener("click", async() => {
        try {
            const { name, email, message } = ['name', 'email', 'message'].reduce((acc, id) => {
                acc[id] = document.getElementById(id).value;
                return acc;
            }, {});

            const response = await fetchData("contact", "POST", { name, email, message });
            console.log(response);
        } catch (error) {
            console.error("Error:", error);
        }
    });
});