const socket = io();

const params = new URLSearchParams(window.location.search);
const role = params.get("role");

document.getElementById("role").textContent = "Role: " + role;

socket.emit("joinRole", role);

function move(dx, dy) {
    
    socket.emit("move", {player: role, dx, dy} );
    
}