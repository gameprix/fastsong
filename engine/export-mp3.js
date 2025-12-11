export const ExportMP3 = {
  async export(engine) {
    if(!window.Lame) {
      await new Promise(res => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/gh/zhuker/lamejs/lame.min.js';
        s.onload = res;
        document.body.appendChild(s);
      });
    }
    alert("Export MP3 applied (LAME placeholder)");
  }
};
