const fileInput = document.getElementById("torrentFile");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
        const buffer = await file.arrayBuffer();
        const torrent = parseTorrent(new Uint8Array(buffer));
        result.value = torrent.magnetURI;
    } catch (err) {
        alert("Invalid torrent file.");
        console.error(err);
    }
});

copyBtn.addEventListener("click", async () => {
    if (!result.value) return;

    await navigator.clipboard.writeText(result.value);
    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 1500);
});

clearBtn.addEventListener("click", () => {
    fileInput.value = "";
    result.value = "";
});
