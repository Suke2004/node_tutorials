import { createServer } from 'node:http';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

const server = createServer(async (req, res) => {  // Fixed argument order & marked callback as async
    //Routing...
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        // const data = await fs.readFile('./index.html');
        const dataStream = fs.createReadStream('./index.html');
        
        // Stream the file content to the response
        dataStream.pipe(res);

        dataStream.on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading page');
        });

        // dataStream.on('data',(chunk)=>{
        //     res.write(chunk);
        // });
        // dataStream.on('end',()=>{
        //     res.end();
        // });

        // res.writeHead(200,{'Content-Type':'text/html'});
        // res.end('<h1>Home Page</h1>');
    } else if (req.url === '/about') {
        if (req.method === 'POST') {
            let buff = '';

            // Read data from request
            req.on('data', (chunk) => {
                buff += chunk.toString();
            });

            req.on('end', async () => {
                try {
                    // Read data from json database
                    const data = await fsPromises.readFile('./db.json', 'utf-8');
                    const dbData = JSON.parse(data || '[]'); // Handle empty file case
                    dbData.push(JSON.parse(buff));

                    // Store the updated data in json database
                    await fsPromises.writeFile('./db.json', JSON.stringify(dbData, null, 2));

                    // Send the response
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('OK');
                } catch (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error saving data');
                }
            });

        } else if (req.method === 'GET') {
            try {
                // Read data from json db
                const data = await fsPromises.readFile('./db.json', 'utf-8');
                
                // Return the data to the client
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading data');
            }
        }

        // res.writeHead(200,{'Content-Type':'text/html'});
        // res.end('<h1>About page</h1>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
