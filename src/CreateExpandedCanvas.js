import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CreateCanvasViewer from "./CreateCanvasViewer.js";
import closeIcon from './closeIcon.svg';

export default function CreateExpandedCanvas(filename){
    
    var renderer = CreateCanvasViewer(window.innerWidth *0.96,window.innerHeight *0.98 ,filename);
    console.log(renderer);
    var ExtendedCanvas = document.createElement('div');
    ExtendedCanvas.setAttribute("id","bigCanvas");
    var closeButton = document.createElement('button');
    closeButton.innerHTML = "<img src="+closeIcon+"/>";
    closeButton.setAttribute("id","closeButton");
    closeButton.onclick = ()=> { 
      document.getElementById("bigCanvas").remove(); 
      document.body.style.overflow = 'visible';
    };
    ExtendedCanvas.appendChild(closeButton);
    ExtendedCanvas.appendChild(renderer.domElement);
    document.body.appendChild(ExtendedCanvas);
    
  }