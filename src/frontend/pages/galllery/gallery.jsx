import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import './gallery.css'
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../../../backend/config/fire'; 


















const GalleryCard = () => {


  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  


                    
  useEffect(() => {
    const fetchPaintings = async () => {
    try {
        const paintingsCollectionRef = collection(db, 'paintings');
        const querySnapshot = await getDocs(paintingsCollectionRef);
        const paintingsData = querySnapshot.docs.map((doc) => doc.data());
        setPaintings(paintingsData);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching paintings:', error);
        setLoading(false);
    }
    };

    fetchPaintings();
}, []);

if (loading) {
    return <div>Loading...</div>;
}

  

  useEffect(() => {


  
    const galleryCardGeometry = new THREE.PlaneGeometry(14, 14, 50, 50);

    const galleryCardMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: new THREE.TextureLoader().load(paintings.img) }
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;

        void main() {
            vUv = uv;
            vec3 pos = position;
            pos.y += sin(pos.x * 0.1 + uTime) * 0.1; // Adjust curvature here
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      // fragmentShader: `
      //   varying vec2 vUv;

      //   void main() {
      //       gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Set color to red
      //   }
      // `
    
    });

    const galleryCardMesh = new THREE.Mesh(galleryCardGeometry, galleryCardMaterial);
    galleryCardMesh.position.set(0, 0, -1);
    scene.add(galleryCardMesh);

    const animate = () => {
      galleryCardMaterial.uniforms.uTime.value += 0.01; // Adjust speed of bending here
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      scene.remove(galleryCardMesh);
    };

  }, [paintings]);

  return null;
};








const Gallery = () => {
        
    
    
    const [isLightOn, setIsLightOn] = useState(true); // Track the light state
    const [paintings, setPaintings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rotation, setRotation] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);

  
  
  
  

    const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (touchStartX !== null) {
      const touchEndX = e.touches[0].clientX;
      const deltaX = touchEndX - touchStartX;
      const rotationChange = deltaX * 0.05;
      setRotation(rotation + rotationChange);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  
 

 
    const handleRotateLeft = () => {
      setRotation(rotation + 45);
    };
  
    const handleRotateRight = () => {
      setRotation(rotation - 45);      
    };
  




    
    
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
            // Dispose geometries, materials, etc. if needed
        }
    }, [isLightOn]); // Re-run the effect when isLightOn changes


        const toggleLight = () => {
            
            setIsLightOn(!isLightOn); // Toggle the light state
        };
     



                    
            useEffect(() => {
                const fetchPaintings = async () => {
                try {
                    const paintingsCollectionRef = collection(db, 'paintings');
                    const querySnapshot = await getDocs(paintingsCollectionRef);
                    const paintingsData = querySnapshot.docs.map((doc) => doc.data());
                    setPaintings(paintingsData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching paintings:', error);
                    setLoading(false);
                }
                };

                fetchPaintings();
            }, []);

            if (loading) {
                return <div>Loading...</div>;
            }

    
    return (
        <div className='gallery-body'>
            Gallery

            {/* <div className="box"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
            {paintings.slice(0, 8).map((painting, index) => (
        <span
          key={painting.id}
          style={{
            transform: `rotateY(${rotation}deg) rotateY(${index * 45}deg) translateZ(400px)`,
            transitionTimingFunction:'ease-out',
            transitionDuration:'0.89s',
            WebkitBoxReflect: 'below 0px linear-gradient(transparent,transparent, #8884)',
          }}
        >
          <img src={painting.img} alt={`Painting ${index + 1}`} />
        </span>
      ))}
    </div>    
    <button  className='gallery-rotate-button rotate-left' onClick={handleRotateLeft}>Rotate Left</button>
      <button className='gallery-rotate-button rotate-right' onClick={handleRotateRight}>Rotate Right</button>
  


        <button className='gallery-lamp-button' onClick={toggleLight}>
           {isLightOn ? 'Turn Off Light' : 'Turn On Light'}
        </button> */}

        
                
        <div className="box">
                {paintings.slice(0, 7).map((painting, index) => (
                  <GalleryCard key={index} painting={painting} />
                ))}
              </div>

  
        </div>
    );
}

export default Gallery;
