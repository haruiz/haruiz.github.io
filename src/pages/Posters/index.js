import React, {useEffect, useRef, useState} from "react";
import {Canvas, useFrame, useLoader, useThree} from '@react-three/fiber'
import CustomLayout from "../../components/CustomLayout";
import {Box} from "rebass";
import styles from "./index.module.css";
import clsx from "clsx";
import {PointerLockControls, useTexture} from "@react-three/drei";
import * as THREE from 'three' // for TextureLoader and Vector3

const LoadingPoster = () => <div >Loading poster...</div>

const PosterIframe = ({ title, fileId }) => {
    const [loadingIframe, setLoadingIframe] = useState(true);

    return (
        <div style={{ display: "inline-block", margin: "1rem", textAlign: "center" }}>
            <h3 style={{ maxWidth: "640px", margin: "0 auto 0.5rem", fontSize: "1.1rem" }}>
                {title}
            </h3>

            {loadingIframe && <LoadingPoster />}

            <iframe
                src={`https://drive.google.com/file/d/${fileId}/preview`}
                className={clsx(styles.responsive_iframe)}
                onLoad={() => setLoadingIframe(false)}
                title={title}
                style={{
                    width: "640px",
                    height: "480px",
                    border: "none",
                    display: "block"
                }}
            />
        </div>
    );
};


// const Poster = ({ url, position }) => {
//     const texture = useTexture(url);
//
//     return (
//         <mesh position={position}>
//             <planeGeometry args={[2, 3]} />
//             <meshStandardMaterial map={texture} />
//         </mesh>
//     );
// };
//

// const GalleryScene = () => {
//     const posterPaths = [
//         "img/profile2.jpg",
//         "img/profile3.jpg",
//         "img/profile4.jpg",
//     ];
//
//     return (
//         <Canvas camera={{ position: [0, 2, 10], fov: 60 }} style={{ height: "100vh", width: "100vw" }}>
//             <ambientLight intensity={0.6} />
//             <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
//             <Environment preset="city" />
//
//             {posterPaths.map((url, i) => (
//                 <Poster key={i} url={url} position={[i * 3 - 3, 1.5, 0]} />
//             ))}
//             <OrbitControls />
//         </Canvas>
//     );
// };

// function GalleryScene() {
//     const { camera, scene } = useThree()
//     const controlsRef = useRef()
//     // State for keyboard controls (WASD)
//     const [move, setMove] = useState({ forward: false, backward: false, left: false, right: false })
//
//     // Key handlers for movement
//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             if (e.code === 'KeyW' || e.code === 'ArrowUp') setMove(m => ({ ...m, forward: true }))
//             if (e.code === 'KeyS' || e.code === 'ArrowDown') setMove(m => ({ ...m, backward: true }))
//             if (e.code === 'KeyA' || e.code === 'ArrowLeft') setMove(m => ({ ...m, left: true }))
//             if (e.code === 'KeyD' || e.code === 'ArrowRight') setMove(m => ({ ...m, right: true }))
//         }
//         const handleKeyUp = (e) => {
//             if (e.code === 'KeyW' || e.code === 'ArrowUp') setMove(m => ({ ...m, forward: false }))
//             if (e.code === 'KeyS' || e.code === 'ArrowDown') setMove(m => ({ ...m, backward: false }))
//             if (e.code === 'KeyA' || e.code === 'ArrowLeft') setMove(m => ({ ...m, left: false }))
//             if (e.code === 'KeyD' || e.code === 'ArrowRight') setMove(m => ({ ...m, right: false }))
//         }
//         document.addEventListener('keydown', handleKeyDown)
//         document.addEventListener('keyup', handleKeyUp)
//         return () => {
//             document.removeEventListener('keydown', handleKeyDown)
//             document.removeEventListener('keyup', handleKeyUp)
//         }
//     }, [])
//
//     // Update camera position on each frame based on keys:
//     useFrame(() => {
//         if (!controlsRef.current) return
//         const speed = 0.1  // movement speed
//         // Use PointerLockControls built-in move methods to move along the camera's orientation
//         if (move.forward) controlsRef.current.moveForward(speed)   // move forward in XZ plane&#8203;:contentReference[oaicite:1]{index=1}
//         if (move.backward) controlsRef.current.moveForward(-speed) // move backward
//         if (move.left) controlsRef.current.moveRight(-speed)       // strafe left
//         if (move.right) controlsRef.current.moveRight(speed)       // strafe right
//     })
//
//     // Gallery room (walls, floor) and posters will be included here:
//     return (
//         <>
//             {/* Global ambient light for baseline illumination */}
//             <ambientLight intensity={0.3} color={0xffffff} />
//             {/* A spotlight simulating a gallery light (e.g., overhead) */}
//             <spotLight
//                 position={[0, 4, 0]}   // near ceiling, centered
//                 angle={0.5} penumbra={0.3}
//                 intensity={1.0}
//                 color={0xffffff}
//                 castShadow
//             />
//             {/* Additional point light to highlight front wall artwork */}
//             <pointLight
//                 position={[0, 2.5, -4]}  // in front of the front wall
//                 intensity={0.8}
//                 color={0xffffff}
//             />
//
//             {/* Floor (wood or concrete texture) */}
//             <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0, 0]} receiveShadow>
//                 <planeGeometry args={[10, 10]} />  {/* 10x10 floor */}
//                 <meshStandardMaterial color="#dddddd" />  {/* will apply texture later if available */}
//             </mesh>
//             {/* Walls (4 walls forming a room) */}
//             {/* Front Wall */}
//             <mesh position={[0, 1.5, -5]} rotation={[0, 0, 0]} receiveShadow>
//                 <planeGeometry args={[10, 3]} />   {/* width 10, height 3 */}
//                 <meshStandardMaterial color="#ffffff" />
//             </mesh>
//             {/* Back Wall */}
//             <mesh position={[0, 1.5, 5]} rotation={[0, Math.PI, 0]} receiveShadow>
//                 <planeGeometry args={[10, 3]} />
//                 <meshStandardMaterial color="#ffffff" />
//             </mesh>
//             {/* Left Wall */}
//             <mesh position={[-5, 1.5, 0]} rotation={[0, Math.PI/2, 0]} receiveShadow>
//                 <planeGeometry args={[10, 3]} />
//                 <meshStandardMaterial color="#ffffff" />
//             </mesh>
//             {/* Right Wall */}
//             <mesh position={[5, 1.5, 0]} rotation={[0, -Math.PI/2, 0]} receiveShadow>
//                 <planeGeometry args={[10, 3]} />
//                 <meshStandardMaterial color="#ffffff" />
//             </mesh>
//
//             {/* Posters (textured planes) */}
//             <Posters />
//
//             {/* Pointer Lock Controls for first-person camera */}
//             <PointerLockControls ref={controlsRef} />
//         </>
//     )
// }

// function Posters() {
//     // Define poster images and their placement on walls
//     const posterData = [
//         // Example poster on the front wall
//         { img: '/img/profile2.jpg', size: [1.5, 2], position: [0, 1.5, -4.9], rotation: [0, 0, 0] },
//         // Example poster on the left wall
//         { img: '/img/profile3.jpg', size: [1.5, 2], position: [-4.9, 1.5, 0], rotation: [0, Math.PI/2, 0] }
//     ]
//     // Load all poster textures in parallel using useLoader
//     const textures = useLoader(THREE.TextureLoader, posterData.map(p => p.img))  //&#8203;:contentReference[oaicite:2]{index=2}
//
//     return (
//         <>
//             {posterData.map((poster, i) => (
//                 <mesh
//                     key={i}
//                     position={poster.position}
//                     rotation={poster.rotation}
//                     castShadow>
//                     <planeGeometry args={poster.size} />
//                     <meshStandardMaterial map={textures[i]} />
//                 </mesh>
//             ))}
//         </>
//     )
// }



export default function PostersPage() {
    const posters = [
        {
            title: "LgoPy: General purpose agentic framework to orchestrate and manage data " +
                "science pipelines on multi-modal datasets. Harnessing LLMs and Multi-Agent Systems " +
                "to Orchestrate and Optimize Data Science Pipelines in Agricultural Research and Remote Sensing",
            fileId: "1bIdrz1I6CQt7rYKrtK9jQ_F621f-_crd"
        },
        {
            title: "Sugar Beet Biomass Prediction Using Aero-Ground Penetrating Radar (GPR) Derived Features " +
                "Sugar Beet Biomass Prediction Using Ground Penetrating Radar\n" +
                "Derived Features and Polynomial Regression\n" +
                "and Polynomial Regression",
            fileId: "1w_ZHLbWntxi2XQScmvyEaj5xhV6VpyKD"
        },
        {   title: "Using GPR and Machine Learning to Automate the Predictions of Root and Tuber Crop Biomass",
            fileId: "1PTcN_AyNCOh6kzG8Zqfx18ouFP8IMZDE"
        },
        {
            title: "Ground Penetrating Radar (GPR) curvelet analysis at the citadel of Alcatraz",
            fileId: "1e7eXI6d273uNvWxBSmTT1tGWe-h6_1Fa"
        },
        {
          "title": "Fusion-Studio: Analy tic s pl atform for\n" +
              "integrating UAV, LiDAR , and RADAR-derived data\n" +
              "for agricultural applications",
            fileId: "1DIM3vJa-UwjwkopSegQh3KoEvXbJgGuG"
        },
        {
            title: "Using Deep Learning to Discover Cassava Roots on GPR Radargrams",
            fileId: "1AU4nK0UT8Vxj3VLfxTGNfrLMc5dZEVxG",
        },
        {
            title: " Comparison of the Microsoft Kinect V2 and FARO Focus 120 for 3D Plant Phenotyping of Cassava (Manihot esculenta)",
            fileId: "1rqGDBMxfL6yPYlLkRToTD5_GN72OtrCV",
        },
        {
            title: "Phenotyping and genome wide association for out-crossing traits in Indica Rice",
            fileId: "1lvqlnqlLKD3q_O3-Z5iiscuidJk-y8v7"
        }

    ]
    return (
        <CustomLayout title="Posters" description="Posters">

            <Box textAlign="center">
                <h2>Posters</h2>
                {/*<Canvas shadows camera={{ fov: 75, position: [0, 1.6, 5] }} style={{ width: "100vw", height: "100vh" }}>*/}
                {/*    <GalleryScene />*/}
                {/*</Canvas>*/}
                {posters.map((poster, index) =>
                    <div key={index} >
                        <PosterIframe title={poster.title} fileId={poster.fileId}/>
                    </div>
                )}
            </Box>
        </CustomLayout>
    );
}