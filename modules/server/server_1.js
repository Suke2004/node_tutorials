import { createServer } from "node:http";
import fs from 'node:fs';

let count = 0;

const server = createServer(async (req, res)=>{

    if(req.url === '/'){
        const htmlPage = fs.createReadStream('./stream.html');
        htmlPage.pipe(res);
    }else if(req.url === '/stream'){
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'cache-control': 'no-cache',
            connection: 'keep-alive'
        });
        setInterval(()=>{
            res.write(`data: The count is  ${count++}\n\n`);
        },1000);
    }
});


server.listen(3000, () => {//port,host,callback
    console.log('Server is listening on port 3000');
});