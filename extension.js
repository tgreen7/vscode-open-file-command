// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "open-file-command.openFile",
    async function ([filePath, line, character]) {
      try {
        const activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor.document.fileName !== filePath) {
          const homedir = require("os").homedir();
          if (filePath.includes("~")) {
            filePath = path.join(homedir, filePath.replace("~", ""));
          }
          const doc = await vscode.workspace.openTextDocument(
            vscode.Uri.file(filePath)
          );
          const editor = await vscode.window.showTextDocument(doc);
          revealPosition(editor, line, character);
        }
      } catch (error) {
        console.error(`error:`, error);
        vscode.window.showErrorMessage(error.message);
      }
    }
  );

  context.subscriptions.push(disposable);
}

function revealPosition(editor, line, character) {
  if (!line) return;
  character = character || 1;
  const position = new vscode.Position(line - 1, character - 1);
  editor.selections = [new vscode.Selection(position, position)];
  editor.revealRange(
    new vscode.Range(position, position),
    vscode.TextEditorRevealType.InCenterIfOutsideViewport
  );
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
