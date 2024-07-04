import { useEffect, useRef } from "react";
import styled from "styled-components";
import { IntectiveImageProps } from "../../interfaces/interfaces";
import { Alert } from "../../utils/alerts/customAlert";

import clap from '../../assets/clap.mp3';
import { useNavigate } from "react-router-dom";
import Image from "./Image";
import Areas from "./Areas";

const IntectiveImage = ({
    image,
    imageAreas,
    setImageAreas
}: IntectiveImageProps) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const PlaySound = (sound: string) => {
        new Audio(sound).play();
    }

    const checkAllFound = () => {
        return imageAreas.every(area => area.found);
    };

    useEffect(() => {
        if (checkAllFound()) {
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
        }
    }, [imageAreas]);

    return (
        <ImageContainer ref={containerRef}>
            <Image containerRef={containerRef} imageRef={imageRef} image={image} />

            <Areas PlaySound={PlaySound} imageAreas={imageAreas} setImageAreas={setImageAreas} />
        </ImageContainer>
    );
}

const ImageContainer = styled.div`
    z-index: 0;
    width: 100vw;
    height: calc(100vh - 16px);
    overflow: hidden;
    position: relative;
`;


export default IntectiveImage;