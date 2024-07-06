import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { IntectiveImageProps } from "../../interfaces/interfaces";
import { Alert } from "../../utils/alerts/customAlert";
import { useNavigate } from "react-router-dom";
import { found, tada, clap, start } from '../../assets/sounds';
import Image from "./Image";
import Areas from "./Areas";
import SideMenuComponent from "../sideMenu/SideMenuComponent";
import ZoomComponent from "./ZoomComponent";

const IntectiveImage = ({
    image,
    imageAreas,
    setImageAreas,
    PlaySound
}: IntectiveImageProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const isFirstRender = useRef(true);

    const [ zoom, setZoom ] = useState(1);

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
        <ImageContainer ref={containerRef}>
            <SideMenuComponent imageAreas={imageAreas} PlaySound={PlaySound}/>

            <Image 
                containerRef={containerRef} 
                imageRef={imageRef} 
                image={image} 
                zoom={zoom}
            />

            <Areas
                imageAreas={imageAreas} 
                setImageAreas={setImageAreas}
            />

            <ZoomComponent zoom={zoom} setZoom={setZoom} />
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