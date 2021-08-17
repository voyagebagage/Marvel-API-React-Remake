import React from "react";
import { useState } from "react";
// import App from "../../App";

//THREEJS
import * as THREE from "three";
import { CubeTextureLoader } from "three";

import { extend, Canvas, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  Html,
  Stars,
} from "@react-three/drei";
// import { Text } from "troika-three-text";

// import fonts from "../../assets/fonts";
import "./index.css";

// extend({ Text });

// const text = "Marvel";
// const loader = new THREE.FontLoader();

function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    // "7.png",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}
//-----------------------------------------------------------------
function FirstLoader() {
  const [rotation, setRotation] = useState([0, 0, 0, 0]);
  //   const [opts, setOpts] = useState({
  //     font: "Roboto",
  //     fontSize: 3,
  //     color: "#99ccff",
  //     maxWidth: 100,
  //     lineHeight: 1,
  //     letterSpacing: 0,
  //     textAlign: "justify",
  //     materialType: "MeshPhongMaterial",
  //   });

  //   console.log(<Skybox />);

  //   loader.load("fonts/helvetiker_regular.typeface.json", function (font) {
  //     const geometry = new THREE.TextGeometry("MARVEL", {
  //       font: font,
  //       size: 80,
  //       height: 5,
  //       curveSegments: 12,
  //       bevelEnabled: true,
  //       bevelThickness: 10,
  //       bevelSize: 8,
  //       bevelOffset: 0,
  //       bevelSegments: 5,
  //     });
  //   });

  //   // Handlers:
  const onMouseMove = (e) => {
    setRotation([
      ((e.clientY / e.target.offsetHeight - 0.5) * -Math.PI) / 8,
      ((e.clientX / e.target.offsetWidth - 0.5) * -Math.PI) / 8,
      0,
    ]);
  };

  //   function Plane() {
  //     return (
  //       <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
  //         <planeBufferGeometry attatch="geometry" arg={[100, 100]} />
  //         <meshLambertMaterial attatch="material" color="red" />
  //       </mesh>
  //     );
  //   }
  return (
    <>
      <Canvas
        // children
        className="canvas"
        // attach="background"
        pixelRatio={window.devicePixelRatio}
        onMouseMove={onMouseMove}
      >
        <SkyBox />
        {/* <Stars /> */}
        <PerspectiveCamera />
        <OrbitControls autoRotate={true} autoRotateSpeed={0.3} />
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 15, 10]} angle={0.7} />

        {/* <pointLight position={[-100, 0, -160]} />
        <pointLight position={[0, 0, -170]} />
        <pointLight position={[100, 0, -160]} /> */}
      </Canvas>
    </>
  );
}
export default FirstLoader;
{
  /* <Html fullscreen>
          <div className="container3DText">
            <h1>{text}</h1>
          </div>
        </Html>
        <mesh>
          <text
            position-z={0}
            rotation={rotation}
            {...opts}
            text={text}
            font={fonts[opts.font]}
            anchorX="center"
            anchorY="middle"
          >
            {opts.materialType === "MeshPhongMaterial" ? (
              <meshPhongMaterial attach="material" color={opts.color} />
            ) : null}
          </text>
        </mesh> */
}
{
  /* <Plane /> */
}
