import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { InteractiveImageProps } from "../../interfaces/interfaces";
import { Alert } from "../../utils/alerts/customAlert";
import { useNavigate } from "react-router-dom";
import { found, tada, clap, start } from '../../assets/sounds';
import Image from "./Image";
import SideMenuComponent from "../sideMenu/SideMenuComponent";
// import ZoomComponent from "./ZoomComponent";
import Panzoom, { PanzoomObject } from "@panzoom/panzoom";
import { PlaySound } from "../../utils/playSound";

const InteractiveImage = ({
    image,
    imageAreas,
    setImageAreas,
    levelName
}: InteractiveImageProps) => {
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const imgRef = useRef<HTMLImageElement>(null);
    const [panzoomElement, setPanzoomElement] = useState<PanzoomObject | null>(null);
    const [_scale, setScale] = useState<number>(panzoomElement ? panzoomElement.getScale() : 1);

    const maxScale = 2;
    const minScale = 0.6;

    useEffect(() => {
        if (imgRef.current) {
            const updateStartScale = () => {
                return window.innerWidth <= 768 ? 0.5 : 0.8;
            };

            const panzoom = Panzoom(imgRef.current, {
                maxScale: maxScale,
                minScale: minScale,
                startScale: updateStartScale(),
                contain: 'outside',
                startX: 0,
                startY: 0
            });

            setPanzoomElement(panzoom);
            
            imgRef.current.parentElement!.addEventListener('wheel', function(event) {
                panzoom.zoomWithWheel(event);
                setScale(panzoom.getScale());
            });

            return () => {
                imgRef.current?.parentElement?.removeEventListener('wheel', panzoom.zoomWithWheel);
            };
        }
    }, []);

    const checkAllFound = () => {
        return imageAreas.every(area => area.found);
    };

    const handleSounds = () => {
        if(isFirstRender.current){
            PlaySound(start);
            isFirstRender.current = false;
        } else {
            const isAllFound = checkAllFound();

            if(isAllFound) {
                PlaySound(tada)
                PlaySound(clap);

                Alert.fire({
                    icon: 'success',
                    html: `
                        <h1>¡Enhorabuena!</h1>
                        <p>Has encontrado todas las pistas</p>
                        <small>¡Gracias por probar esta demo!</small>
                    `,
                    showCloseButton: false,
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    confirmButtonText: 'Volver'
                }).then((result) => {
                    if(result.isConfirmed){
                        navigate(-1)
                    }
                })
            } else {
                PlaySound(found);
            }
        }
    }

    useEffect(() => {
        handleSounds();
    }, [imageAreas]);

    return (
        <ImageContainer>
            <SideMenuComponent 
                imageAreas={imageAreas} 
                PlaySound={PlaySound} 
                levelName={levelName} 
            />

            <Image 
                image={image}
                imageAreas={imageAreas} 
                setImageAreas={setImageAreas!}
                imgRef={imgRef}
            />

            {/* <ZoomComponent 
                panzoom={panzoomElement} 
                maxScale={maxScale} 
                minScale={minScale}
                scale={scale} 
                setScale={setScale}
            /> */}
        </ImageContainer>
    );
}

const ImageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
`;


export default InteractiveImage;