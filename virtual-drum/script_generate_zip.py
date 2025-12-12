import zipfile
import io
import struct

def blank_wav():
    # 44-byte WAV header tanpa data (silent)
    chunk_id = b'RIFF'
    chunk_size = 36  # 36 + data_size (0)
    format = b'WAVE'
    subchunk1_id = b'fmt '
    subchunk1_size = 16
    audio_format = 1
    num_channels = 1
    sample_rate = 44100
    bits_per_sample = 16
    byte_rate = sample_rate * num_channels * bits_per_sample // 8
    block_align = num_channels * bits_per_sample // 8
    subchunk2_id = b'data'
    subchunk2_size = 0

    header = struct.pack(
        '<4sI4s4sIHHIIHH4sI',
        chunk_id, chunk_size, format,
        subchunk1_id, subchunk1_size,
        audio_format, num_channels,
        sample_rate, byte_rate,
        block_align, bits_per_sample,
        subchunk2_id, subchunk2_size
    )
    return header

# Membuat ZIP
with zipfile.ZipFile("drumkit.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for name in ["kick.wav", "snare.wav", "hihat.wav", "tom1.wav", "tom2.wav", "crash.wav"]:
        z.writestr(name, blank_wav())

print("✔ ZIP berhasil dibuat: drumkit.zip")
