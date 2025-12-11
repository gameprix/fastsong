export const AIDenoise = {
  async run(engine) {
    if(!window.RNNoise) {
      await new Promise(res => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/gh/jitsi/rnnoise-wasm/dist/rnnoise.js';
        s.onload = res;
        document.body.appendChild(s);
      });
    }
    alert("AI Denoise applied (RNNoise placeholder)");
  }
};
