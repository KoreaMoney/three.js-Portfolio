import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Island from '../models/Island';
import Sky from '../models/Sky';
/**
 * @author kimdowon
 * @date 23.12.27.
 * @description react + three.js
 *
 * react의 Suspense : 내장함수이며, 데이터가 로딩 중일때는 로딩화면을 보여주고 완료되면 로딩이 끝나고 완료된 화면을 보여주는 함수역할을 한다.
 */

const Home = () => {
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

    const [islandScale, islandPosition, islandRotation] = adjustIslandScreenSize();

    return (
        <section className="w-full h-screen">
            {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">POPUP구역</div> */}
            <Canvas className="w-full h-screen bg-transparent" camera={{ near: 0.1, far: 1000 }}>
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 1, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
                    <Sky />
                    <Island position={islandPosition} scale={islandScale} rotation={islandRotation} />
                </Suspense>
            </Canvas>
        </section>
    );
};

export default Home;
