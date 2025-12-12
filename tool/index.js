import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// ===========================
// FRONTEND (UI) FULL DALAM 1 FILE
// ===========================
app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Multi Downloader</title>

<style>
body {
    background:#111;
    color:white;
    font-family: Arial;
    text-align:center;
    padding:40px;
}
.container {
    max-width:500px;
    margin:auto;
    background:#1e1e1e;
    padding:20px;
    border-radius:10px;
}
input {
    width:90%;
    padding:12px;
    border-radius:6px;
    border:none;
    margin-top:10px;
}
button {
    padding:12px 25px;
    background:#ff4757;
    color:white;
    border:none;
    border-radius:6px;
    cursor:pointer;
    margin-top:15px;
}
button:hover {
    background:#e84118;
}
#result {
    margin-top:20px;
}
.loader {
    border:5px solid #444;
    border-top:5px solid #ff4757;
    border-radius:50%;
    width:40px;
    height:40px;
    animation:spin 1s linear infinite;
    margin:auto;
}
@keyframes spin { 100% { transform: rotate(360deg); } }
</style>

</head>
<body>

<div class="container">
<h2>Multi Downloader Music & Video</h2>
<p>YouTube — TikTok — Facebook — Instagram — SoundCloud</p>

<input id="url" placeholder="Tempel URL disini...">

<button onclick="downloadNow()">Download</button>

<div id="result"></div>
</div>

<script>
async function downloadNow() {
    const inputUrl = document.getElementById("url").value;
    const result = document.getElementById("result");

    if (!inputUrl) {
        result.innerHTML = "<p style='color:red'>URL wajib diisi!</p>";
        return;
    }

    result.innerHTML = \`
    <div class="loader"></div>
    <p>Memproses...</p>\`;

    try {
        const res = await fetch("/download?url=" + encodeURIComponent(inputUrl));
        const data = await res.json();

        if (data.status === "ok") {
            result.innerHTML = \`
                <h3>Berhasil!</h3>
                <p>\${data.title || ""}</p>
                <a href="\${data.download_url}" target="_blank">
                    <button>Download File</button>
                </a>
            \`;
        } else {
            result.innerHTML = "<p style='color:red'>Gagal memproses URL.</p>";
        }
    } catch (err) {
        result.innerHTML = "<p style='color:red'>Server tidak merespon.</p>";
    }
}
</script>

</body>
</html>
`);
});

// ===========================
// BACKEND API DOWNLOADER
// ===========================
app.get("/download", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.json({ status: "error", msg: "URL kosong" });

    try {
        // YOUTUBE
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const api = `https://api.savefromcdn.net/api?url=${encodeURIComponent(url)}`;
            const data = await fetch(api).then(r => r.json());

            return res.json({
                status: "ok",
                platform: "youtube",
                title: data.title,
                download_url: data.url[0].url
            });
        }

        // TIKTOK
        if (url.includes("tiktok.com")) {
            const api = `https://www.tikcdn.org/api/v1?url=${encodeURIComponent(url)}`;
            const data = await fetch(api).then(r => r.json());

            return res.json({
                status: "ok",
                platform: "tiktok",
                download_url: data.video.noWatermark
            });
        }

        // FACEBOOK
        if (url.includes("facebook.com") || url.includes("fb.watch")) {
            const api = `https://fdowncdn.com/api?url=${encodeURIComponent(url)}`;
            const data = await fetch(api).then(r => r.json());

            return res.json({
                status: "ok",
                platform: "facebook",
                download_url: data.url[0].url
            });
        }

        // INSTAGRAM
        if (url.includes("instagram.com")) {
            const api = `https://igramcdn.com/api?url=${encodeURIComponent(url)}`;
            const data = await fetch(api).then(r => r.json());

            return res.json({
                status: "ok",
                platform: "instagram",
                download_url: data.url_list[0]
            });
        }

        // SOUNDCLOUD
        if (url.includes("soundcloud.com")) {
            const api = `https://scdownloadercdn.onrender.com/api?url=${encodeURIComponent(url)}`;
            const data = await fetch(api).then(r => r.json());

            return res.json({
                status: "ok",
                platform: "soundcloud",
                title: data.title,
                download_url: data.download
            });
        }

        // PLATFORM TIDAK DIDUKUNG
        return res.json({ status: "error", msg: "Platform tidak didukung" });

    } catch (err) {
        return res.json({ status: "error", msg: "Gagal memproses URL" });
    }
});

// ===========================
// START SERVER
// ===========================
app.listen(PORT, () => {
    console.log("Server berjalan di http://localhost:" + PORT);
});
