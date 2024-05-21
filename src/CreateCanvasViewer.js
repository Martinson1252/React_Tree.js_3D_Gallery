import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

export default function CreateCanvasViewer( width, heigh , filename, filesize ){
  var object;
  const renderer = new THREE.WebGLRenderer({alpha:true});
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setSize( width, heigh );
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(renderer.devicePixelRatio);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 18, window.innerWidth / window.innerHeight, 1, 200 );
  const controls = new OrbitControls( camera, renderer.domElement );
  camera.position.set(12, 12, 13);
  camera.lookAt(0,10,0);
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
  spotlight.target.position.set(-1,50,0);
  scene.add(spotlight);
  // const Hemilight = new THREE.HemisphereLight(0xFFFF80, 0x4040FF ,1.0);
  // scene.add(Hemilight);
  // const RecLight = new THREE.RectAreaLight(0xFFFFFF,1.0,20,20);
  // RecLight.position.set(10,20,10);
  // RecLight.lookAt(0,0,0);
  // scene.add(RecLight);
  
  const ambientLight = new THREE.AmbientLight(0xffffff,3);
  scene.add(ambientLight);
  
  function animate() {
    requestAnimationFrame(animate);

    controls.update();
    
    renderer.render(scene, camera);
    
  }
  animate();
  
  return renderer;
  }