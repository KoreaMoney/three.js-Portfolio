import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import islandScene from '../assets/3d/foxsIslands.glb';
import { a } from '@react-spring/three';

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
    const islandRef = useRef();
    const lastX = useRef(0);
    const rotationSpeed = useRef(0);
    const dampingFactor = 0.95;

    const { gl, viewport } = useThree();
    const { nodes, materials } = useGLTF(islandScene);

    // 마우스 화면 in
    const handlePoinerDown = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(true);

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        lastX.current = clientX;
    };
    // 마우스 화면 out
    const handlePoinerUp = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRotating(false);
    };
    // 마우스 화면 움직일 경우
    const handlePoinerMove = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (isRotating) {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const delta = (clientX - lastX.current) / viewport.width;
            islandRef.current.rotation.y += delta * 0.01 * Math.PI;
            lastX.current = clientX;
            rotationSpeed.current = delta * 0.01 * Math.PI;
        }
    };
    // 키보드 화면 in
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            if (!isRotating) setIsRotating(true);
            islandRef.current.rotation.y += 0.01 * Math.PI;
            rotationSpeed.current = 0.0125;
        } else if (e.key === 'ArrowRight') {
            if (!isRotating) setIsRotating(true);
            islandRef.current.rotation.y -= 0.01 * Math.PI;
            rotationSpeed.current = -0.0125;
        }
    };
    // 키보드 화면 out
    const handleKeyUp = (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            setIsRotating(false);
        }
    };
    //  render-loop
    useFrame(() => {
        if (!isRotating) {
            rotationSpeed.current *= dampingFactor;
            if (Math.abs(rotationSpeed.current) < 0.001) {
                rotationSpeed.current = 0;
            }
            islandRef.current.rotation.y += rotationSpeed.current;
        } else {
            const rotation = islandRef.current.rotation.y;
            const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
            switch (true) {
                case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
                    setCurrentStage(4);
                    break;
                case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
                    setCurrentStage(3);
                    break;
                case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
                    setCurrentStage(2);
                    break;
                case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                    setCurrentStage(1);
                    break;
                default:
                    setCurrentStage(null);
            }
        }
    });
    // event
    useEffect(() => {
        const canvas = gl.domElement;
        canvas.addEventListener('pointerdown', handlePoinerDown);
        canvas.addEventListener('pointerup', handlePoinerUp);
        canvas.addEventListener('pointermove', handlePoinerMove);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            canvas.removeEventListener('pointerdown', handlePoinerDown);
            canvas.removeEventListener('pointerup', handlePoinerUp);
            canvas.removeEventListener('pointermove', handlePoinerMove);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [gl, handlePoinerDown, handlePoinerUp, handlePoinerMove, handleKeyDown, handleKeyUp]);

    return (
        <a.group {...props} ref={islandRef}>
            <mesh geometry={nodes.polySurface12_home_body_0.geometry} material={materials.home_body} />
            <mesh geometry={nodes.polySurface1336_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1467_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface16_roof1_0.geometry} material={materials.roof1} />
            <mesh
                geometry={nodes.polySurface16_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface16_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface17_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface13_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface14_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface727_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface725_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface944_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface945_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface946_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface947_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface948_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface949_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface986_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface987_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface988_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface989_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface990_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface991_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface962_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface963_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface964_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface965_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface966_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface967_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface956_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface957_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface958_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface959_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface960_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface961_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface950_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface951_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface952_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface953_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface954_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface955_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface968_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface969_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface970_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface971_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface972_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface973_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface135_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface826_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface827_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface828_wood2_0.geometry} material={materials.wood2} />
            <mesh
                geometry={nodes.polySurface828_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface829_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface830_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface831_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface831_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface832_totem2_0.geometry} material={materials.totem2} />
            <mesh geometry={nodes.polySurface837_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface838_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface838_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface840_home_body_0.geometry} material={materials.home_body} />
            <mesh geometry={nodes.polySurface841_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface846_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface304_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh
                geometry={nodes.polySurface304_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface304_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface488_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface491_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface492_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface493_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface494_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface495_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1133_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface374_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface394_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface395_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface396_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface397_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface398_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface399_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface400_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface401_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface402_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface403_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface404_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface405_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface406_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface407_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface408_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface409_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface410_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface411_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface412_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface413_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface414_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface415_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface416_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface417_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface418_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface419_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface420_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface421_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface422_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface423_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface424_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface425_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface426_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface427_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface428_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface429_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface497_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1380_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface1380_totem_0.geometry} material={materials.totem} />
            <mesh
                geometry={nodes.polySurface1380_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface1381_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1382_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1383_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1325_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1326_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1327_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1328_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1330_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1331_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1332_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1333_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1334_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1335_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface980_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface981_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface982_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface983_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface984_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface985_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface476_rocks_0.geometry} material={materials.rocks} />
            <mesh geometry={nodes.polySurface477_rocks_0.geometry} material={materials.rocks} />
            <mesh geometry={nodes.polySurface478_rocks_0.geometry} material={materials.rocks} />
            <mesh geometry={nodes.polySurface483_totem2_0.geometry} material={materials.totem2} />
            <mesh geometry={nodes.polySurface496_totem2_0.geometry} material={materials.totem2} />
            <mesh geometry={nodes.polySurface823_totem2_0.geometry} material={materials.totem2} />
            <mesh geometry={nodes.polySurface1034_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1035_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1036_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1037_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1038_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1039_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1004_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1005_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1006_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1007_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1008_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1009_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1040_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1041_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1042_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1043_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1044_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1045_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1022_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1023_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1024_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1025_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1026_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1027_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1090_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface1091_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface1092_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface1093_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface1094_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface1095_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1096_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1097_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1098_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1099_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1100_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1101_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1102_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1103_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1104_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1106_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1107_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1107_phongE1_0.geometry} material={materials.phongE1} />
            <mesh geometry={nodes.polySurface1108_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1108_phongE1_0.geometry} material={materials.phongE1} />
            <mesh geometry={nodes.polySurface1119_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1120_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1121_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1121_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface1122_home_body_0.geometry} material={materials.home_body} />
            <mesh geometry={nodes.polySurface998_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface999_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1000_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1001_lambert2_0.geometry} material={materials.lambert2} />
            <mesh geometry={nodes.polySurface1002_lambert2_0.geometry} material={materials.lambert2} />
            <mesh geometry={nodes.polySurface1003_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1208_floor2_0.geometry} material={materials.floor2} />
            <mesh geometry={nodes.polySurface1209_ground_0.geometry} material={materials.ground} />
            <mesh geometry={nodes.pCylinder139_fox_readyfox_body_0.geometry} material={materials.fox_readyfox_body} />
            <mesh geometry={nodes.pCylinder139_fox_readyfox_white_0.geometry} material={materials.fox_readyfox_white} />
            <mesh geometry={nodes.pCylinder139_fox_readyfox_black_0.geometry} material={materials.fox_readyfox_black} />
            <mesh geometry={nodes.polySurface1150_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1151_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1152_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1153_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1138_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1139_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1140_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1141_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1158_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1159_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1160_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1161_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1134_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1135_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1136_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1137_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1154_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1155_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1156_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1157_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1210_shovel2_0.geometry} material={materials.shovel2} />
            <mesh geometry={nodes.polySurface1211_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1212_shovel2_0.geometry} material={materials.shovel2} />
            <mesh geometry={nodes.polySurface1213_shovel2_0.geometry} material={materials.shovel2} />
            <mesh geometry={nodes.polySurface1142_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1143_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1144_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1145_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1146_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1147_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1148_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1149_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1162_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1163_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1164_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1165_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface924_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface925_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface926_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface927_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface928_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface929_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface930_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface931_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface932_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface933_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface934_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface935_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface936_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface937_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface938_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface939_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface940_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface941_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface943_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface992_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface993_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface994_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface995_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface996_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface997_tree_body_0.geometry} material={materials.tree_body} />
            <mesh
                geometry={nodes.polySurface1168_fox_readyfox_body_0.geometry}
                material={materials.fox_readyfox_body}
            />
            <mesh
                geometry={nodes.polySurface1168_fox_readyfox_white_0.geometry}
                material={materials.fox_readyfox_white}
            />
            <mesh
                geometry={nodes.polySurface1168_fox_readyfox_black_0.geometry}
                material={materials.fox_readyfox_black}
            />
            <mesh
                geometry={nodes.polySurface1169_fox_readyfox_body_0.geometry}
                material={materials.fox_readyfox_body}
            />
            <mesh
                geometry={nodes.polySurface1169_fox_readyfox_white_0.geometry}
                material={materials.fox_readyfox_white}
            />
            <mesh
                geometry={nodes.polySurface1169_fox_readyfox_black_0.geometry}
                material={materials.fox_readyfox_black}
            />
            <mesh geometry={nodes.polySurface1188_floor2_0.geometry} material={materials.floor2} />
            <mesh geometry={nodes.polySurface1189_ground_0.geometry} material={materials.ground} />

            <mesh geometry={nodes.polySurface1377_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh
                geometry={nodes.polySurface1377_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface1378_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1379_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1246_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1248_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1249_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1250_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1251_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1344_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1345_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1349_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1350_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1351_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1352_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1353_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1354_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1355_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1356_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1357_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1358_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1359_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1360_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1361_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1362_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1363_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1364_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1365_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1366_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1367_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1368_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1369_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1370_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1371_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1372_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1373_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1374_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh
                geometry={nodes.polySurface1374_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface1375_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1376_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1337_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1338_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1339_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh
                geometry={nodes.polySurface1339_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface1422_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1423_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1424_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1425_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1426_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1427_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1428_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface1429_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface1430_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1431_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1432_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1433_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1434_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1435_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1437_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1438_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1439_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1440_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1441_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1442_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1443_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1444_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1445_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1446_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1447_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1448_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1449_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1450_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1451_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1452_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1453_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1454_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1455_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1456_lambert2_0.geometry} material={materials.lambert2} />
            <mesh geometry={nodes.polySurface1457_lambert2_0.geometry} material={materials.lambert2} />
            <mesh geometry={nodes.polySurface1458_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1459_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1460_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1461_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1462_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface1463_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface1464_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface1465_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface1466_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface1525_rocks2_0.geometry} material={materials.rocks2} />
            <mesh geometry={nodes.polySurface1526_rocks2_0.geometry} material={materials.rocks2} />
            <mesh geometry={nodes.polySurface1531_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1532_shovel2_0.geometry} material={materials.shovel2} />
            <mesh geometry={nodes.polySurface1533_shovel2_0.geometry} material={materials.shovel2} />
            <mesh geometry={nodes.polySurface1534_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1535_bricks_2_0.geometry} material={materials.bricks_2} />
            <mesh geometry={nodes.polySurface1536_shovel2_0.geometry} material={materials.shovel2} />
            <mesh geometry={nodes.polySurface1537_shovel2_0.geometry} material={materials.shovel2} />
            <mesh geometry={nodes.polySurface1538_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1539_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1540_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1541_rocks2_0.geometry} material={materials.rocks2} />
            <mesh geometry={nodes.polySurface1541_water_0.geometry} material={materials.water} />
            <mesh geometry={nodes.polySurface1542_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1543_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1544_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1545_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1547_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1547_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1547_water_0.geometry} material={materials.water} />
            <mesh geometry={nodes.pCylinder183_fox_readyfox_body_0.geometry} material={materials.fox_readyfox_body} />
            <mesh geometry={nodes.pCylinder183_fox_readyfox_white_0.geometry} material={materials.fox_readyfox_white} />
            <mesh geometry={nodes.pCylinder183_fox_readyfox_black_0.geometry} material={materials.fox_readyfox_black} />
            <mesh geometry={nodes.pCylinder185_fox_readyfox_body_0.geometry} material={materials.fox_readyfox_body} />
            <mesh geometry={nodes.pCylinder185_fox_readyfox_white_0.geometry} material={materials.fox_readyfox_white} />
            <mesh geometry={nodes.pCylinder185_fox_readyfox_black_0.geometry} material={materials.fox_readyfox_black} />
            <mesh geometry={nodes.pCylinder186_fox_readyfox_body_0.geometry} material={materials.fox_readyfox_body} />
            <mesh geometry={nodes.pCylinder186_fox_readyfox_white_0.geometry} material={materials.fox_readyfox_white} />
            <mesh geometry={nodes.pCylinder186_fox_readyfox_black_0.geometry} material={materials.fox_readyfox_black} />
            <mesh geometry={nodes.pCube11_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube12_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube13_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube14_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube15_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube16_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube17_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube18_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCylinder11_floor_0.geometry} material={materials.floor} />
            <mesh geometry={nodes.pCylinder21_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.pCube27_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.pCube27_phongE1_0.geometry} material={materials.phongE1} />
            <mesh geometry={nodes.pSphere1_ground_0.geometry} material={materials.ground} />
            <mesh geometry={nodes.pCylinder25_roof2_0.geometry} material={materials.roof2} />
            <mesh geometry={nodes.pCube51_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube55_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube56_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube57_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube58_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface38_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.pCylinder92_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1311_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1313_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1314_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1315_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1316_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1317_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface310_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface311_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface312_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface313_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh
                geometry={nodes.polySurface313_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface314_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface315_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface337_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface337_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface338_totem2_0.geometry} material={materials.totem2} />
            <mesh geometry={nodes.polySurface339_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface342_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface342_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface343_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface345_home_body_0.geometry} material={materials.home_body} />
            <mesh geometry={nodes.polySurface345_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.pCube106_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.pCube107_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.pCube108_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.pCube109_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.pCube113_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.pCube114_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.pCube115_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface437_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.pCylinder101_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.pCylinder101_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface11_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface11_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.pCylinder122_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface487_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface469_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface340_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.pCube194_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface1028_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1029_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1030_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1031_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1032_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1033_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.pCube195_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube196_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube197_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.polySurface900_home_body_0.geometry} material={materials.home_body} />
            <mesh geometry={nodes.polySurface922_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface923_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface220_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.pCube205_roof2_0.geometry} material={materials.roof2} />
            <mesh geometry={nodes.pCylinder141_fox_readyfox_body_0.geometry} material={materials.fox_readyfox_body} />
            <mesh geometry={nodes.pCylinder141_fox_readyfox_white_0.geometry} material={materials.fox_readyfox_white} />
            <mesh geometry={nodes.pCylinder141_fox_readyfox_black_0.geometry} material={materials.fox_readyfox_black} />
            <mesh geometry={nodes.pCylinder142_fox_readyfox_body_0.geometry} material={materials.fox_readyfox_body} />
            <mesh geometry={nodes.pCylinder142_fox_readyfox_white_0.geometry} material={materials.fox_readyfox_white} />
            <mesh geometry={nodes.pCylinder142_fox_readyfox_black_0.geometry} material={materials.fox_readyfox_black} />
            <mesh geometry={nodes.pCube209_rocks2_0.geometry} material={materials.rocks2} />
            <mesh geometry={nodes.pCylinder149_leika2_0.geometry} material={materials.leika2} />
            <mesh geometry={nodes.polySurface898_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface1054_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1054_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1054_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface875_rocks_0.geometry} material={materials.rocks} />
            <mesh geometry={nodes.polySurface1166_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface1166_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface1166_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface1167_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.pCylinder159_roof2_0.geometry} material={materials.roof2} />
            <mesh geometry={nodes.polySurface1125_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface1125_phongE1_0.geometry} material={materials.phongE1} />
            <mesh geometry={nodes.polySurface1125_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1125_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1125_totem2_0.geometry} material={materials.totem2} />
            <mesh geometry={nodes.polySurface1214_roof3_0.geometry} material={materials.roof3} />
            <mesh geometry={nodes.polySurface1214_phongE1_0.geometry} material={materials.phongE1} />
            <mesh geometry={nodes.polySurface1214_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1214_roof1_0.geometry} material={materials.roof1} />
            <mesh geometry={nodes.polySurface1214_totem2_0.geometry} material={materials.totem2} />
            <mesh geometry={nodes.polySurface319_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface850_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1522_floor2_0.geometry} material={materials.floor2} />
            <mesh geometry={nodes.polySurface1523_ground_0.geometry} material={materials.ground} />
            <mesh geometry={nodes.polySurface975_tree2_0.geometry} material={materials.tree2} />
            <mesh geometry={nodes.polySurface975_tree1_0.geometry} material={materials.tree1} />
            <mesh geometry={nodes.polySurface975_tree_body_0.geometry} material={materials.tree_body} />
            <mesh geometry={nodes.polySurface857_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface860_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1310_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.pCube213_roof2_0.geometry} material={materials.roof2} />
            <mesh geometry={nodes.polySurface1318_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh geometry={nodes.polySurface1080_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1080_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1244_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1074_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1340_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh
                geometry={nodes.polySurface1340_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface1340_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1341_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh
                geometry={nodes.polySurface1341_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface1341_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1342_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh
                geometry={nodes.polySurface1342_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface1342_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1343_windows_frame_0.geometry} material={materials.windows_frame} />
            <mesh
                geometry={nodes.polySurface1343_windows_background_0.geometry}
                material={materials.windows_background}
            />
            <mesh geometry={nodes.polySurface1343_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.pCylinder160_rocks2_0.geometry} material={materials.rocks2} />
            <mesh geometry={nodes.polySurface1491_wood2_0.geometry} material={materials.wood2} />
            <mesh geometry={nodes.polySurface1491_shovel2_0.geometry} material={materials.shovel2} />
            <mesh geometry={nodes.polySurface1491_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1491_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.polySurface1489_wood_0.geometry} material={materials.wood} />
            <mesh geometry={nodes.polySurface1489_totem_0.geometry} material={materials.totem} />
            <mesh geometry={nodes.pCube223_phongE1_0.geometry} material={materials.phongE1} />
            <mesh geometry={nodes.pCube224_phongE1_0.geometry} material={materials.phongE1} />
            <mesh geometry={nodes.pCube225_phongE1_0.geometry} material={materials.phongE1} />
            <mesh geometry={nodes.pCone10_phongE1_0.geometry} material={materials.phongE1} />
            <mesh geometry={nodes.pCube245_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube246_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube247_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube248_rocks1_0.geometry} material={materials.rocks1} />
            <mesh geometry={nodes.pCube252_rocks1_0.geometry} material={materials.rocks1} />
        </a.group>
    );
};

export default Island;
