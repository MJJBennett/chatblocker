# Twitch Chat Blocker

A Chrome extension to allow blocking of twitch chat users and messages.

# Usage

This is an extension mostly meant for personal use; as such, if you'd like to make use of it yourself, it will need some additional setup that a normal Chrome extension wouldn't.

After downloading the extension, also download a compressed/minified copy of JQuery (from [here](https://jquery.com/download/)) and place it in the extension's root directory, making sure it is mentioned in the manifest.json file.

As well, you will need to edit the data/README.md file according to the specifications within.

To use the extension in Chrome, you will need to open chrome://extensions and enable developer mode, then selected "load unpacked" and load the root folder for this extension.

## WARNING

Generally speaking, only add an extension in this manner if you trust the source. You are more than welcome to read through the javascript content (in inject.js) before using; in fact, I would recommend doing so.
