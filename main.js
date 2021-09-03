let inputArr = process.argv.slice(2);
//console.log(inputArr);

let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organiseObj = require("./commands/organise");

let cmd = inputArr[0];
switch (cmd) {
    case "help":
        helpObj.helpFn();
        break;
    case "tree":
        treeObj.treeFn(inputArr[1]);
        break;
    case "organise":
        organiseObj.organiseFn(inputArr[1]);
        break;
    default:
        console.log("Command Not Found! Enter 'help' to see available options");
        break;
}

//we can export only function, variable or objects
// module.exports = {
//     varName: cmd,
//     exportWithName : currentName
// }

//to get the exported code from another file
//let libExportObj = require("path of file");
//access the content using libExportObj.variableName
//path can be of two types: 1. Absolute Path 2. Relative Path
