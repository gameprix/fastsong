const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const masterGain = audioCtx.createGain();
masterGain.connect(audioCtx.destination);

const convolver = audioCtx.createConvolver();
convolver.connect(masterGain);

// Make simple reverb buffer (very subtle)
function makeReverb() {
    const length = audioCtx.sampleRate * 0.8;
    const impulse = audioCtx.createBuffer(2, length, audioCtx.sampleRate);
    for (let c = 0; c < 2; c++) {
        let channel = impulse.getChannelData(c);
        for (let i = 0; i < length; i++) {
            channel[i] = (Math.random() * 2 - 1) * (1 - i / length);
        }
    }
    convolver.buffer = impulse;
}

makeReverb();

function playAudioBuffer(arrayBuffer) {
    return new Promise(resolve => {
        audioCtx.decodeAudioData(arrayBuffer, resolve);
    });
}

async function loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return playAudioBuffer(arrayBuffer);
}
