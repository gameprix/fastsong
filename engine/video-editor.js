import { createFFmpeg, fetchFile } from 'https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.8/dist/ffmpeg.min.js';

const ffmpeg = createFFmpeg({ log: true });

export const VideoEditor = {
  async export(file) {
    if(!ffmpeg.isLoaded()) await ffmpeg.load();
    ffmpeg.FS('writeFile', file.name, await fetchFile(file));
    await ffmpeg.run('-i', file.name, 'output.mp4');
    const data = ffmpeg.FS('readFile', 'output.mp4');
    return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  }
};
