# Ambient audio — asset pending

No audio is included or downloaded. The site opens silently and the SOUND OFF control is disabled until an authorized file is available.

Required licensed/original files:
- edy-ambient-jazz-loop.ogg
- edy-ambient-jazz-loop.mp3 (fallback)

Target: instrumental noir jazz, 60–70 BPM, unobtrusive, no vocals or dramatic changes. Record author, license and license evidence before enabling `ambientAsset.available` in lib/ambient-audio.ts.

The player uses one persistent AudioContext and one decoded buffer, scheduled crossfaded sources, master gain .055, 3s fade-in and .75s fade-out. Crossfade timing must be auditioned against the actual file; a seamless result cannot be certified before that.

Also verify codec fallback, tab hide/show, repeated ON/OFF, saved preference, Save-Data, download/decode time, mobile CPU and at least three consecutive loops before publishing with sound enabled.
