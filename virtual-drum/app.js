const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const masterGain = audioCtx.createGain();
masterGain.connect(audioCtx.destination);

let buffers = {}; // Semua suara di satu object

// Load audio
async function loadAudio(path) {
    const res = await fetch(path);
    const arrayBuffer = await res.arrayBuffer();
    return await audioCtx.decodeAudioData(arrayBuffer);
}

// Semua nama file di sounds/
const soundFiles = [
    "kick.wav","snare.wav","hihat.wav","tom1.wav","tom2.wav","crash.wav",
    "90_Back_Loop_BBD_FatLoops_01.wav","90_Back_Loop_BBD_FatLoops_02.wav","90_Back_Loop_BBD_FatLoops_03.wav",
    "BD_BBD_FatLoops_01.wav","BD_BBD_FatLoops_02.wav","BD_BBD_FatLoops_03.wav",
    "CC_BBD_FatLoops_01.wav","CP_BBD_FatLoops_01.wav","CY_BBD_FatLoops_01.wav",
    "FX_BBD_FatLoops_01.wav","FX_BBD_FatLoops_02.wav",
    "HH_BBD_FatLoops_01.wav","HH_BBD_FatLoops_02.wav","HH_BBD_FatLoops_03.wav",
    "PC_BBD_FatLoops_01.wav",
    "SD_BBD_FatLoops_01.wav","SD_BBD_FatLoops_02.wav","SD_BBD_FatLoops_03.wav",
    "Yahoo - Chime.mp3","Yahoo - Classic.mp3","Yahoo - Completion.m4a",
    "Yahoo - Easy.m4a","Yahoo - Got Mail.mp3","Yahoo - Mallet.m4a",
    "Yahoo - Melody.m4a","Yahoo - Precision.m4a","Yahoo - Reflective.m4a",
    "Yahoo - Sequence.m4a","Yahoo - Skipping Rocks.m4a","Yahoo - Snip Snap.m4a",
    "Yahoo - Soft Reminder.m4a",
    "mixkit-arcade-chiptune-explosion-1691.wav",
    "mixkit-bomb-drop-cold-water-explosion-2806.wav",
    "mixkit-collapsing-structure-2958.wav",
    "mixkit-dramatic-metal-explosion-impact-1687.wav",
    "mixkit-joke-drums-578.wav"
];

// Load semua file
async function loadAllSounds() {
    for (let file of soundFiles) {
        buffers[file] = await loadAudio(`sounds/${file}`);
    }
}

// Main play function
function playSound(name) {
    const buffer = buffers[name];
    if (!buffer) return;
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(masterGain);
    source.start();
}

// Event tombol drum/loop/fx
document.querySelectorAll(".drum, .loop, .fx").forEach(btn => {
    btn.addEventListener("click", () => {
        playSound(btn.dataset.sound);
    });
});

window.addEventListener("load", loadAllSounds);
