// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const {json2phpArray,js2phpArray} = require('php-array-from-json-js')
const {phparray2json} = require('php-array-to-json-js')

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "php-array-from-json" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable;
	disposable = vscode.commands.registerCommand('php-array-from-json.fromJSON', function () {
		const editor = vscode.window.activeTextEditor;
		const selectedText = editor.document.getText(editor.selection);
		try{
			const phpCode=json2phpArray(selectedText);
			editor.edit(editBuilder => {
				editBuilder.replace(
					new vscode.Range(
						editor.selection.start.line,
						editor.selection.start.character,
						editor.selection.end.line,
						editor.selection.end.character
					),
					phpCode
				);
			});
		} catch(exception) {
			console.log(exception); // see Dev Logs: https://stackoverflow.com/questions/34085330/how-to-write-to-log-from-vscode-extension
			vscode.window.showErrorMessage('Invalid JSON: '+exception.message);
		}
	});

	disposable = vscode.commands.registerCommand('php-array-from-json.fromJS', function () {
		const editor = vscode.window.activeTextEditor;
		const selectedText = editor.document.getText(editor.selection);
		try{
			const phpCode=js2phpArray(selectedText);
			editor.edit(editBuilder => {
				editBuilder.replace(
					new vscode.Range(
						editor.selection.start.line,
						editor.selection.start.character,
						editor.selection.end.line,
						editor.selection.end.character
					),
					phpCode
				);
			});
		} catch(exception) {
			console.log(exception); // see Dev Logs: https://stackoverflow.com/questions/34085330/how-to-write-to-log-from-vscode-extension
			vscode.window.showErrorMessage('Invalid Javascript Object Notation: '+exception.message);
		}

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from JSON to PHP Array!');
	});

	disposable = vscode.commands.registerCommand('php-array-from-json.toJSON', async function () {
		const config = vscode.workspace.getConfiguration('php-array-from-json')
		console.log(config)
		const editor = vscode.window.activeTextEditor;
		const selectedText = editor.document.getText(editor.selection);
		try{
			const json=await phparray2json(selectedText,config.phpexec);
			editor.edit(editBuilder => {
				editBuilder.replace(
					new vscode.Range(
						editor.selection.start.line,
						editor.selection.start.character,
						editor.selection.end.line,
						editor.selection.end.character
					),
					json
				);
			});
		} catch(exception) {
			console.log(exception); // see Dev Logs: https://stackoverflow.com/questions/34085330/how-to-write-to-log-from-vscode-extension
			vscode.window.showErrorMessage('Invalid PHP Array Code: '+exception.message);
		}

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World from JSON to PHP Array!');
	});


	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
