let fs = require("fs");
let path = require("path");

function tree(srcPath) {
    //console.log("tree implemented", srcPath);
    if(srcPath == undefined)
        srcPath = process.cwd();
    
        let content = fs.readdirSync(srcPath);
        console.log(content);

        let parentFolderName = path.basename(srcPath);
        let completePath = "└──" + parentFolderName;

        for (let i = 0; i < content.length; i++) {
            completePath = completePath + "\n\t" + "├──" + content[i];

            //TODO: folder found -> needs word, update the code
            let fullOriginalPath = path.join(srcPath, content[i]);
            if (fs.lstatSync(fullOriginalPath).isDirectory() == true) {
                tree(fullOriginalPath);
            }
        }

        console.log(completePath);
}

module.exports = {
    treeFn : tree
}