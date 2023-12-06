document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.addEventListener("click", async() => {
        try {
            const { name, email, message } = ['name', 'email', 'message'].reduce((acc, id) => {
                acc[id] = document.getElementById(id).value;
                return acc;
            }, {});
            const response = await fetch("/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
        }
    });
});