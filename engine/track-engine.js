export class TrackEngine {
    constructor(container) {
        this.container = container;
        this.tracks = [];
    }

    addTrack() {
        const el = document.createElement("div");
        el.className = "glass track";
        el.textContent = "Track " + (this.tracks.length + 1);

        const input = document.createElement("input");
        input.type = "file";
        input.accept = "audio/*";
        input.onchange = () => this.loadTrack(input.files[0], el);

        el.appendChild(input);
        this.container.appendChild(el);
        this.tracks.push({ element: el, file: null });
    }

    loadTrack(file, el) {
        el.textContent = "Loaded: " + file.name;
        this.tracks.find(t => t.element === el).file = file;
    }
}
