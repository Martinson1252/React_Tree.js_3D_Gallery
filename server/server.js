

const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const serverless = require('serverless-http');


const PORT = process.env.PORT || 8080;
// app.listen(PORT, ()=> console.log("server started") );
app.use('/.netlify/functions/api', router );
module.exports.handler = serverless(app);
const model_list = [];
fs = require("fs");
let folder = path.join("public/models/");
const files = fs.readdirSync(folder);
for (const i of files){
    if(i.endsWith(".glb"))
    {
        
        filesize = fs.statSync(path.join(  folder,i )).size/(1024*1024);
        model_list.push( {fileName: i, fileSize: filesize, pathToFolder: folder});
    }
    
}

router.get("/api/items", (req, res) => {
    res.send((model_list)); 

   
});
    