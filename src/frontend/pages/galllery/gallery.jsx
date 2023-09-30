import React, { useEffect, useState, useRef } from 'react'; 
import * as THREE from 'three';
import './gallery.css'
import GalleryCard from './gallerycard';
import { createRoot } from 'react-dom/client';





const Gallery = () => {
        
    
    
    const [isLightOn, setIsLightOn] = useState(true); // Track the light state
    const boxRef = useRef();

   

    


    
    
    useEffect(() => {
        
            let mouseX = 0;
            let mouseY = 0;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
            const renderer = new THREE.WebGLRenderer();
            const darkMaterial = new THREE.MeshStandardMaterial({ color: 'black', roughness: 0.9 });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);



          

        
        // Walls
        const wallMaterial = new THREE.MeshStandardMaterial({ color: 'lightgrey' });





      const frontWallGeometry = new THREE.PlaneGeometry(36.5, 30.6 );
        const frontWallMesh = new THREE.Mesh(frontWallGeometry, wallMaterial, darkMaterial);
        frontWallMesh.position.set(0, 0, -5);
        scene.add(frontWallMesh);

        const ceilingGeometry = new THREE.PlaneGeometry(34.5, 20);
        const ceilingMesh = new THREE.Mesh(ceilingGeometry, wallMaterial, darkMaterial);
        ceilingMesh.position.set(0, 9, 5.7);
        ceilingMesh.rotation.x = Math.PI / 2;
        scene.add(ceilingMesh);
        
        const leftWallGeometry = new THREE.PlaneGeometry(15, 19);
        const leftWallMesh = new THREE.Mesh(leftWallGeometry, wallMaterial, darkMaterial);    
        leftWallMesh.position.set(-18, 0, 0);
        leftWallMesh.rotation.y = Math.PI / 2;
        scene.add(leftWallMesh);

        const rightWallGeometry = new THREE.PlaneGeometry(15, 19);
        const rightWallMesh = new THREE.Mesh(rightWallGeometry, wallMaterial, darkMaterial);
        rightWallMesh.position.set(18, 0, 0);
        rightWallMesh.rotation.y = -Math.PI / 2;
        scene.add(rightWallMesh);


        const floorGeometry = new THREE.PlaneGeometry(45.5, 13);
        const floorMesh = new THREE.Mesh(floorGeometry, new THREE.MeshStandardMaterial({ color: 'gray' }));
        floorMesh.rotation.x = - Math.PI / 2;
        floorMesh.position.set(0, -9, 0);
        scene.add(floorMesh);


        const boxGeometry = new THREE.BoxGeometry(1, 1, 1); 
        const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); 
        boxMesh.position.set(0, 2, -2);
        boxMesh.scale.set(2, 2, 2);
        scene.add(boxMesh);
        const boxContainer = boxRef.current;
        const root = createRoot(boxContainer);
        root.render(<GalleryCard />);
        
       

            // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, isLightOn ? 0.6 : 0.2); // Toggle ambient light
        const directionalLight = new THREE.DirectionalLight(0xffffff, isLightOn ? 0.5 : 0.1); // Toggle directional light
        directionalLight.position.set(0, 7, 2);

        const ceilingLight = new THREE.PointLight(isLightOn ? 0xffffff : 0x000000, 0.6, 10); // Toggle ceiling light color
        ceilingLight.position.set(0, 7, 0);

        scene.add(ambientLight);
        scene.add(directionalLight);
        scene.add(ceilingLight);




        camera.position.set(0, 4.6, 9);
        camera.lookAt(0, 5, 0);

        scene.add(ambientLight);
        scene.add(directionalLight);

        document.body.appendChild(renderer.domElement);



        function animate() {
            // Calculate the difference in mouse position
            const deltaX = mouseX - window.innerWidth / 2;
            const deltaY = mouseY - window.innerHeight / 2;

            // Adjust camera position based on mouse movement
            camera.position.x = deltaX / 500; // Adjust the divisor to control sensitivity
            camera.position.y = -deltaY / 500;  // Adjust the divisor to control sensitivity

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        const handleMouseMove = (event) => {
            // Update mouse coordinates on mouse move
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        document.addEventListener('mousemove', handleMouseMove);

        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            // Clean up
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('mousemove', handleMouseMove);
            document.body.removeChild(renderer.domElement);
            ReactDOM.unmountComponentAtNode(boxContainer);
            // Dispose geometries, materials, etc. if needed
        }
    }, [isLightOn]); // Re-run the effect when isLightOn changes


        const toggleLight = () => {
            
            setIsLightOn(!isLightOn); // Toggle the light state
        };
     



    
    return (
        <div className='gallery-body'>
            Gallery

      
        <button className='gallery-lamp-button' onClick={toggleLight}>
           {isLightOn ? 'Turn Off Light' : 'Turn On Light'}
        </button>

        
   
        </div>
    );
}

export default Gallery;