let drumBuffers = {};
let recording = false;
let recordStart = 0;
let recordedNotes = [];

const volumeControl = document.getElementById("volumeControl");
volumeControl.addEventListener("input", () => {
    masterGain.gain.value = volumeControl.value;
});

async function init() {
    const sounds = ["kick", "snare", "hihat", "tom1", "tom2", "crash"];

    for (let s of sounds) {
        drumBuffers[s] = await loadSound(`sounds/${s}.wav`);
    }
}

init();

function playSound(name) {
    const source = audioCtx.createBufferSource();
    source.buffer = drumBuffers[name];

    source.connect(convolver);
    source.start(0);
}

function animateButton(btn) {
    btn.classList.add("playing");
    setTimeout(() => btn.classList.remove("playing"), 150);
}

// CLICK / TOUCH
document.querySelectorAll(".drum").forEach(btn => {
    btn.addEventListener("click", () => trigger(btn.dataset.sound, btn));
    btn.addEventListener("touchstart", () => trigger(btn.dataset.sound, btn));
});

// KEYBOARD
document.addEventListener("keydown", e => {
    const btn = [...document.querySelectorAll(".drum")]
        .find(b => b.dataset.key.toLowerCase() === e.key.toLowerCase());
    if (btn) trigger(btn.dataset.sound, btn);
});

function trigger(sound, btn) {
    playSound(sound);
    animateButton(btn);

    if (recording) {
        recordedNotes.push({
            sound: sound,
            time: performance.now() - recordStart
        });
    }
}

// RECORD
document.getElementById("recordBtn").onclick = () => {
    recording = !recording;
    if (recording) {
        recordedNotes = [];
        recordStart = performance.now();
        recordBtn.textContent = "⏹ Stop";
    } else {
        recordBtn.textContent = "🔴 Record";
    }
};

// PLAYBACK
document.getElementById("playBtn").onclick = () => {
    if (recordedNotes.length === 0) return;

    for (let note of recordedNotes) {
        setTimeout(() => {
            const btn = document.querySelector(`[data-sound="${note.sound}"]`);
            trigger(note.sound, btn);
        }, note.time);
    }
};
