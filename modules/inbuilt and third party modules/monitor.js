import os from 'node:os';
import chalk from 'chalk';

function monitor(){
    //Take snapshot
    //Take another snapshot

    const oldCpus = os.cpus();
    // console.log(`old: ${oldCpus}`);
    setTimeout(()=>{
        console.clear();
        const newCpus = os.cpus();
        const usage = newCpus.map((cpu,i)=>{
            return{
                core: i,
                usage: calculateCpu(oldCpus[i], newCpus[i])
            };
        });
        
        console.log(chalk.bgBlue('=======System Stats======='));
        console.table(usage);
        
        const usedMemory = ((os.totalmem() - os.freemem())/(1024*1024*1024));

        console.log('memory used:',
            usedMemory > 11
            ? chalk.redBright(`Memory usage: ${(usedMemory).toFixed(2)} GB/${(os.totalmem()/(1024*1024*1024)).toFixed(2)} GB
            `): chalk.greenBright(`Memory usage: ${(usedMemory).toFixed(2)} GB/${(os.totalmem()/(1024*1024*1024)).toFixed(2)} GB`)
        );
    //     console.log(`Memory usage: ${(usedMemory).toFixed(2)} GB/${(os.totalmem()/(1024*1024*1024)).toFixed(2)} GB`);
    },1000);
}

function calculateCpu(oldCpu, newCpu){
    const oldTotal = Object.values(oldCpu.times).reduce((a,b) => a+b);
    const newTotal = Object.values(newCpu.times).reduce((a,b) => a+b);

    const idle = newCpu.times.idle - oldCpu.times.idle;
    const total = newTotal - oldTotal;
    const used = total - idle;
    return ((used/total)*100).toFixed(2);
}

setInterval(monitor,1000);