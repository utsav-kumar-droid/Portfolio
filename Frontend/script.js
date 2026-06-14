const moonPath = "M13 28C13 43.464 28 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C28 1.5 13 12.536 13 28Z";
const sunPath = "M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z";

const darkModeToggle = document.querySelector("#darkMode");
const sun = document.querySelector(".sun");
const form = document.getElementById("contactForm");

let isDark = false;

/* ---------------- DARK MODE ---------------- */
if (darkModeToggle && sun) {
    darkModeToggle.addEventListener("click", () => {
        anime.timeline({
            duration: 750,
            easing: "easeOutExpo"
        })

        .add({
            targets: sun,
            d: [{ value: isDark ? sunPath : moonPath }]
        })

        .add({
            targets: "#darkMode",
            rotate: isDark ? 0 : 320
        }, "-=500")

        .add({
            targets: ["body", ".container"],
            backgroundColor: isDark ? "#ffffff" : "#121212",
            color: isDark ? "#161616" : "#ffffff"
        }, "-=700")

        .add({
            targets: [
                ".sticky-nav",
                ".box",
                ".project",
                ".skill",
                "form",
                "footer"
            ],
            backgroundColor: isDark ? "#f5f5f5" : "#1e1e1e",
            color: isDark ? "#161616" : "#ffffff",
            borderColor: isDark ? "#dcdcdc" : "#333333"
        }, "-=700")

        .add({
            targets: [
                ".sticky-nav",
                ".nav a",
                ".sidebar a",
                ".project a",
                "h1",
                "h2",
                "h3",
                "p",
                ".highlight",
                "footer"
            ],
            color: isDark ? "#161616" : "#ffffff"
        }, "-=700")

        .add({
            targets: [
                "input",
                "textarea",
                "button",
                "#darkMode"
            ],
            backgroundColor: isDark ? "#ffffff" : "#2c2c2c",
            color: isDark ? "#161616" : "#ffffff",
            borderColor: isDark ? "#cccccc" : "#555555"
        }, "-=700");

        isDark = !isDark;
    });
}

/* ---------------- CONTACT FORM ---------------- */
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const API_URL = window.API_URL || "https://portfolio-1-dsb1.onrender.com";

        const data = {
            name: document.getElementById("name")?.value || "",
            email: document.getElementById("email")?.value || "",
            message: document.getElementById("message")?.value || ""
        };

        try {
            console.log("Sending data →", data);

            const response = await fetch(`${API_URL}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            console.log("Status →", response.status);

            const result = await response.json();
            console.log("Response →", result);

            if (!response.ok) {
                throw new Error(result.message || "Request failed");
            }

            alert(result.message || "Message sent successfully!");
            form.reset();

        } catch (error) {
            console.error("Submit error:", error);
            alert("Something went wrong. Check console.");
        }
    });
}