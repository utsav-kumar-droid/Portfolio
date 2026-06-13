const moonPath = "M13 28C13 43.464 28 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C28 1.5 13 12.536 13 28Z";
const sunPath = "M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z";

const darkModeToggle = document.querySelector("#darkMode");
const sun = document.querySelector(".sun");
let isDark = false;

const img=document.querySelector("img");
const form = document.getElementById("contactForm");




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
    
    // 1. Structural Page Layout Backgrounds
    .add({
        targets: ["body", ".container"],
        backgroundColor: isDark ? "#ffffff" : "#121212",
        color: isDark ? "#161616" : "#ffffff"
    }, "-=700")

    // 2. Component/Card Elements (Keeps UI components distinct from background)
    .add({
        targets: [
            ".sticky-nav",
            ".box",
            ".project",
            ".skill",
            "form",
            "footer"
        ],
        backgroundColor: isDark ? "#f5f5f5" : "#1e1e1e", // Offset colors so they don't erase
        color: isDark ? "#161616" : "#ffffff",
        borderColor: isDark ? "#dcdcdc" : "#333333"       // Retains visible borders 
    }, "-=700")

    // 3. Text & Nav Links
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

    // 4. Form inputs, textareas, and buttons
    .add({
        targets: [
           "input",
        "textarea",
        "button",
        "input::placeholder",    /* Targets input placeholders */
        "textarea::placeholder",
        "#darkMode"
        ],
        backgroundColor: isDark ? "#ffffff" : "#2c2c2c",
        color: isDark ? "#161616" : "#ffffff",
        borderColor: isDark ? "#cccccc" : "#555555"
    }, "-=700");

    isDark = !isDark;
});

form.addEventListener("submit", async (e) => {

    e.preventDefault();


    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };


    try {

        const response = await fetch("http://localhost:5000/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        });


        const result = await response.json();


        alert(result.message);

        form.reset();


    } catch(error) {

        alert("Something went wrong");

    }

});
