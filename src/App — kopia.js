import React, { useState, useEffect } from "react";
import './App.css';
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



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
      return fetch('api/items')
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
    
  var object = null;
  const renderer = new THREE.WebGLRenderer({alpha:true});
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( width, heigh );
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(renderer.devicePixelRatio);
  
  var wrapper = document.createElement('div');
  wrapper.setAttribute("id","canvas_wrapper");
  
  var infoNode = document.createElement('div');
  infoNode.setAttribute("id","info_node");
  infoNode.innerHTML = "  <h3> "+filename+" </h3>  <h4>"+Math.round(filesize)+" MB</h4> "
  
  //document.getElementById("box").replaceChildren();
  if(document.getElementById("box").children.length < canvasamount )
  { wrapper.appendChild(renderer.domElement);
    wrapper.appendChild(infoNode);   
    document.getElementById("box").appendChild(wrapper);  }
  
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 18, window.innerWidth / window.innerHeight, 1, 200 );
  const controls = new OrbitControls( camera, renderer.domElement );
  camera.position.set(12, 12, 13);
  controls.update();
  camera.lookAt(0,0,0);
  const loader = new GLTFLoader().setPath("models/");
  
 
  
  loader.load( filename  , function ( gltf ) {
    const mesh = gltf.scene;
    object = mesh;
    mesh.position.set(0,0,0);
    scene.add( mesh );
    
  }, function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + '% loaded')
  }, function ( error ) {
    
    console.error( error );
  });
  
  
  
  
  const spotlight = new THREE.SpotLight(0xffffff, 3,100,0.2,0.5);
  spotlight.position.set(0, 125, 0);
  scene.add(spotlight);
  
  const ambientLight = new THREE.AmbientLight(0xffffff,3);
  scene.add(ambientLight);
  
  function animate() {
    requestAnimationFrame(animate);
    
    
    controls.update();
    renderer.render(scene, camera);
    
  }
  animate();
} 



return (
    <div className="App">
      <header className="App-header">
        
      
        <h2>
          3D models gallery
        </h2>
        
        
          
      </header>
        
    </div>
  );
}

export default App;
