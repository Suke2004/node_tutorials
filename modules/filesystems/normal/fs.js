import * as fs from 'node:fs';

// function createFile(filepath){
//     fs.writeFileSync(filepath,"hello Potter\n");
        // console.log("file created succesfully")
// }

// function append(filepath){
//     fs.appendFileSync(filepath,"good to see you\n");
// }
// createFile("./first.txt");
// append('./first.txt');

//Asynchronous
function createFile(filepath){
    fs.writeFile(filepath,"Hello Potter\n",(err)=>{//as it is async so we should use callback
        if(err){
            console.log(err);
            return;
        }
        fs.appendFile(filepath,"Good  morning",(err)=>{//as it is async process we have to nest this so that it executes after creating file only so that no conflicts arise
            if(err){
                console.log(err);
                return;
            }
            console.log("appended successfully")
        })
        console.log("File created successfully");
    });
}
createFile("./async.txt");

//As normal file systems has lot of call backs to be written and lost of nesting  which reduces code readability, to overcome this we use Promises which reduces the code and improves readability