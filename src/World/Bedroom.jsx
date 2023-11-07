import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRafLoop } from 'react-use';

import woodSound from "../assets/sounds/steps/wood.mp3";
import woodEndSound from "../assets/sounds/steps/wood-end2.mp3";
import backgroundSound from "../assets/sounds/background.mp3";

const Room = () => {
    const roomModel = useGLTF('src/assets/models/bedroom/scene.gltf');
    const { camera, gl } = useThree();
    const cameraRef = useRef();
    const isDragging = useRef(false);
    const prevMouseX = useRef(null);
    const isMovingForward = useRef(false);
    const isCameraShaking = useRef(false);
    const audioRef = useRef(new Audio(woodSound));
    const audioEndRef = useRef(new Audio(woodEndSound));

    // Elemento de audio para el sonido de fondo.
    const backgroundAudioRef = useRef(new Audio(backgroundSound));

    const movementDirection = useRef({ x: 0, z: -1 });
    const movementSpeed = 0.04;
    const shakeAmplitude = 0.02;
    const shakeFrequency = 0.015;
    const cameraShakeOffset = useRef(0);

    const [elapsedTime, setElapsedTime] = useState(0); // Nuevo estado para el tiempo transcurrido.

    // Estado para registrar si se ha dado el primer clic izquierdo.
    const [firstLeftClick, setFirstLeftClick] = useState(false);

    // Función para reiniciar el sonido de fondo con un retraso aleatorio.
    const restartBackgroundSound = () => {
        // Detenemos el sonido actual.
        backgroundAudioRef.current.pause();

        // Calculamos un retraso aleatorio entre 0 y 10 segundos.
        const randomDelay = Math.random() * 2000;

        // Iniciamos el sonido nuevamente después del retraso.
        setTimeout(() => {
            backgroundAudioRef.current.currentTime = 0;
            backgroundAudioRef.current.play();
            setElapsedTime(0); // Reiniciamos el tiempo transcurrido.
        }, randomDelay);
    };

    const shakeCamera = () => {
        cameraShakeOffset.current = Math.sin(performance.now() * shakeFrequency) * shakeAmplitude;
        if (cameraRef.current && isCameraShaking.current) {
            cameraRef.current.position.y = 5 + cameraShakeOffset.current;
        }
    };

    const [, stop] = useRafLoop(shakeCamera);

    useEffect(() => {
        // Configurar la posición y orientación inicial de la cámara.
        camera.position.set( 1, 5, -14);
        camera.lookAt(2, 2, 2);
        cameraRef.current = camera;
    }, [camera]);

    // Nuevo: Control de reproducción del sonido de fondo al inicio.
    useEffect(() => {
        // Agregar un oyente para reiniciar el sonido de fondo cuando termine.
        backgroundAudioRef.current.addEventListener("ended", restartBackgroundSound);

        if (firstLeftClick) {
            // Iniciar el sonido de fondo al cargar el componente si se ha dado el primer clic izquierdo.
            backgroundAudioRef.current.loop = true;
            backgroundAudioRef.current.play();
        }

        return () => {
            // Detener el sonido y eliminar el oyente al desmontar el componente.
            backgroundAudioRef.current.pause();
            backgroundAudioRef.current.removeEventListener("ended", restartBackgroundSound);
        };
    }, [firstLeftClick]);

    const handleContextMenu = (e) => {
        e.preventDefault();
        isDragging.current = true;
        prevMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        prevMouseX.current = null;
        isMovingForward.current = false;
        isCameraShaking.current = false;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioEndRef.current.play();
    };

    const handleMouseDown = () => {
        isMovingForward.current = true;
        isCameraShaking.current = true;

        const moveForward = () => {
            if (isMovingForward.current && cameraRef.current) {
                cameraRef.current.position.x -= movementDirection.current.x * movementSpeed;
                cameraRef.current.position.z -= movementDirection.current.z * movementSpeed;
                requestAnimationFrame(moveForward);
                audioRef.current.play();
            }
        };

        moveForward();

        // Nuevo: Registrar que se ha dado el primer clic izquierdo.
        setFirstLeftClick(true);
    };

    useEffect(() => {
        stop(); // Detener la vibración de la cámara al desmontar el componente.

        // Agregar y eliminar oyentes de eventos de ratón en el lienzo 3D.
        gl.domElement.addEventListener('contextmenu', handleContextMenu);
        gl.domElement.addEventListener('mouseup', handleMouseUp);
        gl.domElement.addEventListener('mousedown', handleMouseDown);

        return () => {
            gl.domElement.removeEventListener('contextmenu', handleContextMenu);
            gl.domElement.removeEventListener('mouseup', handleMouseUp);
            gl.domElement.removeEventListener('mousedown', handleMouseDown);
        };
    }, [gl.domElement]);

    return (
        <group>
            {/* Renderizar el modelo de la habitación dentro de un grupo. */}
            <mesh scale={[2, 2, 2]}>
                <primitive object={roomModel.scene} />
            </mesh>
        </group>
    );
};

export default Room;
