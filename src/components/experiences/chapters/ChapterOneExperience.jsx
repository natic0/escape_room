import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Bed from "../../../world/elements/Bed";
import Chair from "../../../world/elements/chair";
import Bucket from "../../../world/elements/Bucket";
import Desktop from "../../../world/elements/Desktop";
import Library from "../../../world/elements/Library";
import BedroomC1 from "./BedroomC1";
import BedroomC2 from "./BedroomC2"; 
import LightsC1 from "./LightsC1";
import './SceneC1.css';

const SceneC1 = ({ showButton, onButtonClick }) => {
  return (
    <div className="scene-container">
      {showButton && <button className="Button1" onClick={() => onButtonClick("button1")}>Tomar medicina para dormir</button>}
      {showButton && <button className="Button2" onClick={() => onButtonClick("button2")}>No tomar medicina para dormir</button>}
    </div>
  );
};

const ChapterOneExperience = () => {
  const [showButton, setShowButton] = useState(false);
  const [showBedroomC1, setShowBedroomC1] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 62000);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = (button) => {
    setShowButton(false); // Oculta los botones cuando uno de ellos es clickeado

    if (button === "button1") {
      // Iniciar la reproducción del sonido después de 4 segundos
      const soundTimeout = setTimeout(() => {
        const audio = new Audio("/assets/sounds/Scenes C1/1.2.mp3");
        audio.play();
      }, 1000);

      // Iniciar la reproducción del sonido después de 6 segundos
      const soundTimeout2 = setTimeout(() => {
        const audio = new Audio("/assets/sounds/Scenes C1/falls.mp3");
        audio.play();
      }, 13000);

      // Cambiar la escena después de 30 segundos
      const changeSceneTimer = setTimeout(() => {
        setShowBedroomC1(false);
      }, 30000);

      return () => {
        clearTimeout(soundTimeout);
        clearTimeout(changeSceneTimer);
      };
    }
  };

  return (
    <>
      <SceneC1 showButton={showButton} onButtonClick={handleButtonClick} />
      <Canvas shadows>
        {showBedroomC1 ? <BedroomC1 /> : <BedroomC2 />}
        <Bed position={[1.2, 0.2, 5]} rotation-y={Math.PI * 0.95} />
        <Bucket position={[1.3, 1.19, 6.4]} />
        <Chair position={[-7.2, 0, -2]} />
        <Desktop position={[4, -1, -6.28]} />
        <Library position={[6.1, 0.42, 5]} />
        <LightsC1 />
      </Canvas>
    </>
  );
};

export default ChapterOneExperience;
