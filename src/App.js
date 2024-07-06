import React, { useState, useEffect } from "react";
import './App.css';
import expandIcon from './expandLogo.svg';
import CreateCanvasViewer from "./CreateCanvasViewer.js";
import CreateExpandedCanvas from "./CreateExpandedCanvas.js";

function App() {
const [width,setWidth] = useState([500]);
const [heigh,setHeigh] = useState([500]);
const [filePath, setFilePath] = useState();

//creating a placeholder for canvas
var g = document.createElement('div');
g.setAttribute("id", "box")
if(!document.getElementById("box")){
  document.body.append(g);  }

 
    
    useEffect( () =>{
      getFetchedData();
    },[] )
    
    
    function getFetchedData() {
      return fetch('https://react-tree3d-3dgallery-server-nkpxjak3o-martinsons-projects.vercel.app/api/items')
          .then((response) => { 
              return response.json().then((data) => {
                console.log(data);
                for (  let i of data  )
                CreateViewerTile(data.length,i.fileName,i.fileSize,i.pathToFolder );
                
                return data;
              }).catch((err) => {
                console.log(err);
              }) 
            });
          }
          
  
  //creates single item of 3D viewer
  function CreateViewerTile( canvasamount, filename, filesize, filepath){
    
  var renderer = CreateCanvasViewer( 500,500, filename,filesize);
  
  var wrapper = document.createElement('div');
  wrapper.setAttribute("class","canvas_wrapper");
  wrapper.setAttribute("id",filename);
  
  var infoNode = document.createElement('div');
  infoNode.setAttribute("id","info_node");
  infoNode.innerHTML = "<h3> "+filename+" </h3>  <h4>"+Math.round(filesize)+" MB</h4>"
  
  var expandButton = document.createElement('button');
  expandButton.innerHTML = "<img src="+expandIcon+"/>";
  expandButton.setAttribute("id","expandButton");
  expandButton.onclick = ()=>{ 
    if (!document.getElementById("bigCanvas")) 
    {CreateExpandedCanvas(filename) 
      document.body.style.overflow = 'hidden';}
  } ;
  
  //document.getElementById("box").replaceChildren();
  if(document.getElementById("box").children.length < canvasamount )
  { wrapper.appendChild(renderer.domElement);
    wrapper.appendChild(infoNode);   
    wrapper.appendChild(expandButton);   
    document.getElementById("box").appendChild(wrapper);  }
  
} 

document.getElementById("SearchInputField").addEventListener("input",(value)=>
{
  value = value.target.value;
  document.querySelectorAll('[class*="canvas_wrapper"]').forEach(element => {
    console.log(element.id);
    if(element.id.includes(value))
    {element.style.display = 'block';}
    else{
      element.style.display = 'none';
    }
      
  });
  console.log(value);
})
  





return (
    <div className="App">
      <header className="App-header">

      </header>
        
    </div>
  );
}

export default App;
