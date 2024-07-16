import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { InteractiveImageProps } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import Image from "./Image";
// import ZoomComponent from "./ZoomComponent";
import { PanzoomObject } from "@panzoom/panzoom";
import { checkAllFound, createPanzoom, handleSounds } from "../../utils/functionsModule";

const InteractiveImage = ({
    image,
    imageAreas,
    setImageAreas,
    setFound
}: InteractiveImageProps) => {
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const imgRef = useRef<HTMLImageElement>(null);
    const [panzoomElement, setPanzoomElement] = useState<PanzoomObject | null>(null);
    const [_scale, setScale] = useState<number>(panzoomElement ? panzoomElement.getScale() : 1);

    const maxScale = 2;
    const minScale = 0.6;

    useEffect(() => {
        createPanzoom(imgRef, maxScale, minScale, setPanzoomElement, setScale);
    }, []);

    useEffect(() => {
        handleSounds(isFirstRender, checkAllFound, navigate, imageAreas);
    }, [imageAreas]);

    return (
        <ImageContainer>
            <Image 
                image={image}
                imageAreas={imageAreas} 
                setImageAreas={setImageAreas!}
                imgRef={imgRef}
                setFound={setFound}
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