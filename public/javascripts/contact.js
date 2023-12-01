document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.addEventListener("click", function() {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, message }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error("Error:", error));
    });
});