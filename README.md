# Panopto PiP

A small Chrome extension to enable Picture-in-Picture mode on secondary videos in Panopto's Viewer page.

## How it works

- Only activates on: `https://*.cloud.panopto.eu/Panopto/Pages/Viewer.aspx`
- Finds the visible video in the `#secondaryScreen` container.
- Clicking the icon opens the video in Picture-in-Picture.

> [!WARNING]
> Pausing in PiP doesn't pause the main video on the site — you’ll need to manually pause it there.

## Install (Unpacked)

1. Go to `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the extension folder

---

MIT License
