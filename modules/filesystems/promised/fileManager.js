#!usr/bin/env node
import chalk from 'chalk'
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process'
import { createFolder, createFile, writeToFile, deleteFile, deleteFolder, listItems } from './fs.js'

const rl = readline.createInterface({
    input: stdin,
    output: stdout,
});

async function menu() {
    console.clear();
    console.log(chalk.blue.bold('\n📂 File System Manager'));

    const options = [
        'Create Folder',
        'Create File',
        'Write to File',
        'Delete File',
        'Delete Folder',
        'List Items',
        'Exit',
    ];

    options.forEach((opt, i) => {
        console.log(chalk.yellow(`${i + 1}. ${opt}`));
    });

    const answer = await rl.question(chalk.cyan('\nSelect option: '));

    switch (answer) {
        case '1': {
            const folderPath = await rl.question(chalk.cyan('Folder path: '));
            try {
                await createFolder(folderPath);
                console.log(chalk.green('✅ Folder created.'));
            } catch {
                console.log(chalk.red('⚠️ Invalid path.'));
            }
            break;
        }
        case '2': {
            const filePath = await rl.question(chalk.cyan('File path: '));
            const initialContent = await rl.question(chalk.cyan('File content: '));
            try {
                await createFile(filePath, initialContent);
                console.log(chalk.green('✅ File created.'));
            } catch {
                console.log(chalk.red('⚠️ Invalid path.'));
            }
            break;
        }
        case '3': {
            const appendFilePath = await rl.question(chalk.cyan('File path: '));
            const appendContent = await rl.question(chalk.cyan('File content: '));
            try {
                await writeToFile(appendFilePath, `\n${appendContent}`);
                console.log(chalk.green('✅ Content added to file.'));
            } catch {
                console.log(chalk.red('⚠️ Invalid path.'));
            }
            break;
        }
        case '4': {
            const deleteFilePath = await rl.question(chalk.cyan('File path: '));
            try {
                await deleteFile(deleteFilePath);
                console.log(chalk.green('✅ File deleted.'));
            } catch {
                console.log(chalk.red('⚠️ Unable to delete file.'));
            }
            break;
        }
        case '5': {
            const deleteFolderPath = await rl.question(chalk.cyan('Folder path: '));
            try {
                await deleteFolder(deleteFolderPath);
                console.log(chalk.green('✅ Folder deleted.'));
            } catch {
                console.log(chalk.red('⚠️ Unable to delete folder.'));
            }
            break;
        }
        case '6': {
            const listPath = await rl.question(chalk.cyan('Folder path (Enter from current): '));
            try {
                const items = await listItems(listPath || './');
                console.log(chalk.blue('\n📂 Contents:'));
                items.forEach((item)=>{
                    const icon = item.type ==='folder'?'📂':'🗃️';
                    console.log(`${icon} ${chalk.yellow(item.name)}`);
                })
            } catch {
                console.log(chalk.red('⚠️ Invalid folder path.'));
            }
            break;
        }
        case '7': {
            console.log(chalk.magenta('👋 Exiting...'));
            rl.close();
            process.exit(0);
        }
        default:
            console.log(chalk.red('⚠️ Invalid option. Please select a valid number.'));
    }

    // Call menu again for continuous execution
    menu();
}

menu();
