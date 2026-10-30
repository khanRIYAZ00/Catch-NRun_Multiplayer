const roles = ["runner", "catcher", "builder", "eraser"];

function buildAppUrl(ip) {
    return `http://${ip}:3000`;
}

async function getLocalBaseUrl() {
    try {
        const response = await fetch("/api/network-ip");
        if (response.ok) {
            const data = await response.json();
            if (data && data.ip && data.ip !== "localhost") {
                return buildAppUrl(data.ip);
            }
        }
    } catch (error) {
        console.warn("API IP fetch failed, falling back to hostname:", error);
    }
    return buildAppUrl(window.location.hostname || "localhost");
}

async function renderQrCards() {
    const container = document.getElementById("qrCodes");
    if (!container) {
        console.error("#qrCodes element missing from DOM.");
        return;
    }

    const baseUrl = await getLocalBaseUrl();
    container.innerHTML = "";

    const qrLib = window.QRCode;

    for (const role of roles) {
        const link = `${baseUrl}/controller.html?role=${role}`;

        const card = document.createElement("div");
        card.className = "qr-card";

        const title = document.createElement("div");
        title.className = "role";
        title.textContent = role;

        const canvas = document.createElement("canvas");
        canvas.width = 120;
        canvas.height = 120;

        const urlText = document.createElement("div");
        urlText.className = "link";
        urlText.textContent = link;

        card.appendChild(title);
        card.appendChild(canvas);
        card.appendChild(urlText);
        container.appendChild(card);

        if (qrLib && typeof qrLib.toCanvas === "function") {
            requestAnimationFrame(() => {
                qrLib.toCanvas(canvas, link, {
                    width: 120,
                    margin: 1,
                    color: {
                        dark: "#111827",
                        light: "#ffffff"
                    }
                }, (error) => {
                    if (error) {
                        console.error(`QR Render Error for ${role}:`, error);
                        urlText.textContent = `QR Error: ${error.message}`;
                    }
                });
            });
        } else {
            urlText.style.color = "#ef4444";
            urlText.textContent = `QR library missing. Open: ${link}`;
            console.error("QRCode library missing from window object.", qrLib);
        }
    }
}

window.addEventListener("load", renderQrCards);