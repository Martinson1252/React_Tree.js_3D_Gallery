

const express = require("express");
const app = express();
const cors = require('cors');
const path = require("path");
//const serverless = require('serverless-http');

app.use(cors());
app.options("/api/items", (req, res) => {
    // CORS handling
    res.setHeader("Access-Control-Allow-Origin", 'https://react-tree3d-3dgallery-server.vercel.app');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private','no-cors');
    res.sendStatus(204);
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  });
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log("server started") );
// app.use('https://react-tree-3d-gallery-server.netlify.app' );
const model_list = [];
fs = require("fs");
let folder = path.join(__dirname,"../public/models/");
const files = fs.readdirSync(folder);
console.log(files);
app.use(express.json());

    
    for (const i of files){
        if(i.endsWith(".glb"))
            {
                
                filesize = fs.statSync(path.join(  folder,i )).size/(1024*1024);
                model_list.push( {fileName: i, fileSize: filesize, pathToFolder: folder});
            }
            
        }
            
    app.get("/api/items", (req, res) => {
        res.send((model_list)); 
        console.log(model_list);
        
    });
        
// app.use('react-tree3d-3dgallery-server',router);
module.exports = app;
//module.exports.handler = serverless(app);