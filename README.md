## Peep for Visual Studio Code
Quickly toggle between hiding and showing files defined in your projects files.exclude setting.

## Guide
Before using this extension in a project you will need to define the folders and files that you want to be able to toggle between
hidden and visible.  To do this you will need to create a `settings.json` file within the `.vscode` folder at the root of your project
if there isn't one already.  Within the settings.json file you will define your folders and files within the files.exclude property.
This property is documented here: [https://code.visualstudio.com/Docs/editor/codebasics#_explorer](https://code.visualstudio.com/Docs/editor/codebasics#_explorer).

Here is an example of what the settings.json file might look like:
```json
{
  "files.exclude": {
    "node_modules/": false,
    "dist/": false,
    "lib/": false
  }
}
```

In the file above I have specified that the node_modules, dist, and lib folders are all currently visible.  To quickly make them hidden, all
you have to do is execute the `Peep None` command which will update the settings file and set the boolean values to true.  To reverse this
you just need to execute `Peep All` to make them visible again.

You can also execute the `Peep Toggle` command to toggle the current visibility set for each entry in the files.exclude setting
that has a boolean value.

Note that when this extension is updating the files.exclude property in your settings.json file it will first read in the entire file,
then update the file.exclude values in memory, and finally write the entire settings back to the file.  This means that any special
type of formatting or spacing will be lost.