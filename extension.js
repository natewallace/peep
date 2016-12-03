var vscode = require('vscode');
var fs = require('fs');
var path = require('path');
var json5 = require('comment-json');

// extension is activated the very first time the command is executed
function activate(context) {

  // The peep all command
  var peepAll = vscode.commands.registerCommand('extension.peepAll', function () {
    if (vscode.workspace && vscode.workspace.rootPath) {
      updateVisibility(true, function (err) {
        vscode.window.showErrorMessage(err.message);
      });
    }
  });
  context.subscriptions.push(peepAll);

  // The peep none command
  var peepNone = vscode.commands.registerCommand('extension.peepNone', function () {
    updateVisibility(false, function (err) {
      vscode.window.showErrorMessage(err.message);
    });
  });
  context.subscriptions.push(peepNone);

  // The peep toggle command
  var peepToggle = vscode.commands.registerCommand('extension.peepToggle', function () {
    updateVisibility(null, function (err) {
      vscode.window.showErrorMessage(err.message);
    });
  });
  context.subscriptions.push(peepToggle);
}

// updates the visibility of the settings file if there is one
function updateVisibility(visibility, cb) {
  const COMMENT = '--byPeepExtension--files.exclude';
  const UNCOMMENT = 'files.exclude';

  var settingsFile = path.join(vscode.workspace.rootPath, '.vscode/settings.json');
  fs.readFile(settingsFile, function (err, data) {
    if (err) {
      if (cb) {
        cb(err);
      }
    }
    else {
      var settings = json5.parse(data);
      var didChanged = false;

      if (settings[UNCOMMENT] && (visibility || visibility === null)) {
        settings[COMMENT] = settings[UNCOMMENT];
        delete settings[UNCOMMENT];
        didChanged = true;
      }
      else if (settings[COMMENT] && (!visibility || visibility === null)) {
        settings[UNCOMMENT] = settings[COMMENT];
        delete settings[COMMENT];
        didChanged = true;
      }

      if (didChanged) {
        // write the updated settings to file
        fs.writeFile(settingsFile, json5.stringify(settings, null, 2), function (err) {
          if (err) {
            if (cb) {
              cb(err);
            }
          }
        });
      }
    }
  });
}

exports.activate = activate;