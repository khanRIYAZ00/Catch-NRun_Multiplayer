const roles = [
    "runner",
    "catcher",
    "builder",
    "eraser"
];

const container = document.getElementById("qrCodes");

roles.forEach(role => {

    const link = window.location.origin + "/controller.html?role=" + role;

    const div = document.createElement("div");
    div.innerHTML = `${role}<br>${link}`;

    container.appendChild(div);
});