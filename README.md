# open-file-command README

adds the command `open-file-command.openFile` which can be used to open any file with a keyboard shortcut.

## How to Use

Add a a keyboard shortcut:

```json
{
  "key": "ctrl+m",
  "command": "open-file-command.openFile",
  "args": ["~/.vscode/notes.txt", 6, 3]
},
```

The args take in a path, line number (optional), and cursor position (optional). The path should be absolute.
