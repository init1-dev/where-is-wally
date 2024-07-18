import { useEffect, useRef } from "react";
import styled from "styled-components";
import { InteractiveImageProps } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import Image from "./Image";
import ZoomComponent from "./ZoomComponent";
import { checkAllFound, handleSounds } from "../../utils/functionsModule";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const InteractiveImage = ({
    image,
    imageAreas,
    setImageAreas,
    setFound
}: InteractiveImageProps) => {
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const imgRef = useRef<HTMLImageElement>(null);

    const mobile = window.innerWidth <= 768;
    const minScale = mobile ? 0.6 : 0.8;
    const maxScale = 2;
    const initialScale = mobile ? minScale : 1;

    // const [scale, setScale] = useState<number>(initialScale);

    useEffect(() => {
        handleSounds(isFirstRender, checkAllFound, navigate, imageAreas);
    }, [imageAreas]);

    return (
        <ImageContainer>
            <TransformWrapper 
                initialScale={initialScale}
                minScale={minScale}
                maxScale={maxScale}
                doubleClick={{mode:'reset'}}
                disablePadding={true}
            >
                {({ zoomIn, zoomOut }) => (
                    <>
                        <ZoomComponent
                            zoomIn={zoomIn}
                            zoomOut={zoomOut}
                        /> 
                        
                        <TransformComponent
                            wrapperStyle={{ maxWidth: "100%", maxHeight: "100vh" }}
                        >
                            <Image
                                image={image}
                                imageAreas={imageAreas}
                                setImageAreas={setImageAreas!}
                                imgRef={imgRef}
                                setFound={setFound}
                            />
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
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