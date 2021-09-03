let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv", "mp3", "avi"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'odt', 'odp', 'odg', 'txt', 'ps', 'ppt', 'pptx'],
    app: ['exe', 'dmg', 'pkg', 'deb'],
    programs: ['java', 'class', 'js', 'py', 'c', 'o', 'cpp', 'html', 'json'],
    images: ['jpg', 'jpeg', 'png', 'gif']
}

function organise(srcPath) {
    if (srcPath == undefined)
        srcPath = process.cwd();

    //console.log("organise implemented", srcPath);
    //1. Create organised files directory
    let organisedFilesPath = path.join(srcPath, "organised_files");
    if (fs.existsSync(organisedFilesPath) == false)
        fs.mkdirSync(organisedFilesPath);
    

    //2. Scan whole src path -> extension check
    let allTheFiles = fs.readdirSync(srcPath);
    console.log(allTheFiles);

    //3. extension check -> classify
    for (let i=0; i<allTheFiles.length; i++) {
        let fullOriginalPath = path.join(srcPath, allTheFiles[i]);
        if (fs.lstatSync(fullOriginalPath).isFile() == true) {
            let folderName = checkextnTellFolder(allTheFiles[i]);
            copyFileToDest(folderName, fullOriginalPath, srcPath);
        }
    }

    //4. Copy to that folder to which it belongs
}

function copyFileToDest(folderName, fullOriginalPath, srcPath) {
    //creating folder
    let destFolderPath = path.join(srcPath, "organised_files", folderName);
    if (fs.existsSync(destFolderPath) == false)
        fs.mkdirSync(destFolderPath);

    //copying file
    let originalFileName = path.basename(fullOriginalPath);
    let destFilePath = path.join(destFolderPath, originalFileName);
    fs.copyFileSync(fullOriginalPath, destFilePath);
    console.log(originalFileName, " copied to ", folderName);
    
    //Removing file after copying
    fs.rmSync(fullOriginalPath);
}

//check name of folder where it belongs
function checkextnTellFolder (fileName) {
    let extName = path.extname(fileName);
    extName = extName.slice(1);
    for (let key in types) {
        for (let i=0; i < types[key].length; i++) {
            if (types[key][i] == extName) 
                return key;
        }
    }

    return "others";
}

module.exports = {
    organiseFn : organise
}