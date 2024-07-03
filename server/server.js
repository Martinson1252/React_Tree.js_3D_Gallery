

const express = require("express");
const app = express();
const path = require("path");



const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log("server started") );
const model_list = [];
fs = require("fs");
let folder = path.join(__dirname,"/","public/models/");
const files = fs.readdirSync(folder);
for (const i of files){
    if(i.endsWith(".glb"))
    {
        
        filesize = fs.statSync(path.join(  folder,i )).size/(1024*1024);
        model_list.push( {fileName: i, fileSize: filesize, pathToFolder: folder});
    }
    
}

app.get("/api/items", (req, res) => {
    res.send((model_list)); 

   
});
    