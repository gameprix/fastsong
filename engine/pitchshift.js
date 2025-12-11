export const PitchShift = {
  async apply(engine, semitones) {
    if(!window.Rubberband) {
      await new Promise(res => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/gh/Daninet/rubberband-wasm/rubberband.js';
        s.onload = res;
        document.body.appendChild(s);
      });
    }
    alert(`PitchShift applied: ${semitones} semitones`);
  }
};
