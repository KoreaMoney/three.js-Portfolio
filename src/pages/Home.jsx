import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';
import HomeInfo from '../components/HomeInfo';

import bgm from '../assets/bgm.mp3';
import soundOn from '../assets/icon/soundon.png';
import soundOff from '../assets/icon/soundoff.png';
/**
 * @author kimdowon
 * @date 23.12.27.
 * @description react + three.js
 *
 * react의 Suspense : 내장함수이며, 데이터가 로딩 중일때는 로딩화면을 보여주고 완료되면 로딩이 끝나고 완료된 화면을 보여주는 함수역할을 한다.
 */

const Home = () => {
    const audioRef = useRef(new Audio(bgm));
    audioRef.current.volume = 0.4;
    audioRef.current.loop = true;

    const [isPlaying, setIsPlaying] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [currentStage, setCurrentStage] = useState(1);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        }
        return () => {
            audioRef.current.pause();
        };
    }, [isPlaying]);

    const adjustIslandScreenSize = () => {
        let sceenScale = null;
        let screenPosition = [0, -6.5, -43];
        let rotation = [0.1, 4.7, 0];

        if (window.innerWidth < 768) {
            sceenScale = [0.9, 0.9, 0.9];
        } else {
            sceenScale = [1, 1, 1];
        }
        return [sceenScale, screenPosition, rotation];
    };

    const adjustPlaneScreenSize = () => {
        let sceenScale, screenPosition;

        if (window.innerWidth < 768) {
            sceenScale = [1.5, 1.5, 1.5];
            screenPosition = [0, -1.5, 0];
        } else {
            sceenScale = [3, 3, 3];
            screenPosition = [0, -4, -4];
        }
        return [sceenScale, screenPosition];
    };

    const [islandScale, islandPosition, islandRotation] = adjustIslandScreenSize();
    const [planeScale, planePosition] = adjustPlaneScreenSize();

    return (
        <section className="w-full h-screen">
            <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
                {currentStage && <HomeInfo currentStage={currentStage} />}
            </div>
            <Canvas
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
                    <Bird />
                    <Sky isRotating={isRotating} />
                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={islandRotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        setCurrentStage={setCurrentStage}
                    />
                    <Plane isRotating={isRotating} rotation={[0, 20, 0]} scale={planeScale} position={planePosition} />
                </Suspense>
            </Canvas>
            <div className="absolute bottom-2 right-2">
                <img
                    src={!isPlaying ? soundOff : soundOn}
                    alt="sound"
                    className="w-10 h-10 cursor-pointer object-contain"
                    onClick={() => setIsPlaying(!isPlaying)}
                />
            </div>
        </section>
    );
};

export default Home;
