import * as fs from 'node:fs/promises';
import path from 'node:path';

// async function createFile(pathname){
//     try{
//         await fs.writeFile(pathname,"Hello Potter");
//     }catch(err){
//         console.log(err);
//     }
//     console.log("File created successfully");
// }

export async function createFolder(foldername){
    try{
        await fs.mkdir(foldername,{recursive: true});
    }catch(err){
        console.log(err);
    }
    console.log("Directory created successfully");
}

export async function createFile(filepath,content=''){
    try{
        await fs.writeFile(filepath,content)
    }catch(err){
        console.log(err);
    }
    console.log("File created successfully");
}

export async function writeToFile(filepath,content = ''){
    try{
        await fs.appendFile(filepath,content);
    }catch(err){
        console.log(err);
    }
    console.log("Content written to file successfully");
}

async function readFile(filepath){
    try{
        data = await fs.readFile(filepath,'utf8');
    }catch(err){
        console.log(err);
    }
    console.log(data);
}

export async function deleteFile(filepath){
    try{
        await fs.unlink(filepath);
    }catch(err){
        console.log(err);
    }
}

export async function deleteFolder(folderpath){
    try{
        await fs.rmdir(folderpath,{recursive: true});
    }
    catch(err){
        console.log(err);
    }
    console.log("Directory has been successfully deleted");
}

export async function getFileInfo(filepath){
    const stats = await fs.stat(filepath);
    // console.log(stats);
    return {
        permission: stats.mode,
        size: stats.size,
        createdTime: stats.birthtime,
        modifiedTime: stats.mtime,
    }
}

export async function listItems(listPath = './'){
    const items = await fs.readdir(listPath,{withFileTypes: true});
    return items.map((item)=>{
        return{
            name: item.name,
            type: item.isDirectory()? 'folder':'file',
            path: path.join(import.meta.dirname,item.name)
        }
    });
}

// createFile("promises.txt","hello Potter");
getFileInfo("./promises.txt").then((data)=>{
    console.log(data)
})