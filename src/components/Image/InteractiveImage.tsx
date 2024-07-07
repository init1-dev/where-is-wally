import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IntectiveImageProps } from "../../interfaces/interfaces";
import { Alert } from "../../utils/alerts/customAlert";
import { useNavigate } from "react-router-dom";
import { found, tada, clap, start } from '../../assets/sounds';
import Image from "./Image";
import SideMenuComponent from "../sideMenu/SideMenuComponent";
import ZoomComponent from "./ZoomComponent";
import Panzoom, { PanzoomObject } from "@panzoom/panzoom";

const IntectiveImage = ({
    image,
    imageAreas,
    setImageAreas,
    PlaySound
}: IntectiveImageProps) => {
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const imgRef = useRef<HTMLImageElement>(null);
    const [panzoomElement, setPanzoomElement] = useState<PanzoomObject | null>(null);

    const maxScale = 3;

    useEffect(() => {
        if (imgRef.current) {
            const panzoom = Panzoom(imgRef.current, {
                maxScale: maxScale,
                minScale: 1,
                contain: 'outside',
                startX: 0,
                startY: 0
            });

            setPanzoomElement(panzoom);
            
            imgRef.current.parentElement!.addEventListener('wheel', panzoom.zoomWithWheel);

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
                        navigate('/main')
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
            <SideMenuComponent imageAreas={imageAreas} PlaySound={PlaySound}/>

            <Image 
                image={image}
                imageAreas={imageAreas} 
                setImageAreas={setImageAreas}
                imgRef={imgRef}
            />

            <ZoomComponent panzoom={panzoomElement} maxScale={maxScale} />
        </ImageContainer>
    );
}

const ImageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
`;


export default IntectiveImage;