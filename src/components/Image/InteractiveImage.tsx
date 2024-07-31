import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Area } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import Image from "./Image";
import ZoomComponent from "./ZoomComponent";
import { checkAllFound, handleSounds } from "../../utils/functionsModule";
import { ReactZoomPanPinchContentRef, TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

type ZoomDirection = 'in' | 'out';
type ZoomFunc = (step: number) => void;

interface InteractiveImageProps {
    image: string;
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>> | undefined;
    setFound: Dispatch<SetStateAction<number>>;
}

const InteractiveImage = ({
    image,
    imageAreas,
    setImageAreas,
    setFound
}: InteractiveImageProps) => {
    const navigate = useNavigate();
    const isFirstRender = useRef(true);
    const imgRef = useRef<HTMLImageElement>(null);
    const transformComponentRef = useRef<ReactZoomPanPinchContentRef>(null);

    const mobile = window.innerWidth <= 768;
    const minScale = mobile ? 0.6 : 0.8;
    const maxScale = 2;
    const initialScale = mobile ? minScale : 1;

    const [scale, setScale] = useState<number>(initialScale);

    useEffect(() => {
        handleSounds(isFirstRender, checkAllFound, navigate, imageAreas);
    }, [imageAreas]);

    const handleZoom = () => {
        const currentScale = transformComponentRef.current?.instance.transformState.scale;
        setScale(currentScale!);
    };

    const handleZoomBtn = (zoomFunc: ZoomFunc, operation: ZoomDirection, step = 0.3) => {
        const operations = {
            in: (scale: number) => scale + step,
            out: (scale: number) => scale - step
        };

        setScale(prev => operations[operation](prev));
        zoomFunc(step);
    }

    return (
        <ImageContainer>
            <TransformWrapper 
                ref={transformComponentRef}
                initialScale={initialScale}
                minScale={minScale}
                maxScale={maxScale}
                doubleClick={{mode:'reset'}}
                disablePadding={true}
                onZoom={handleZoom}
                onPinching={handleZoom}
            >
                {({ zoomIn, zoomOut }) => (
                    <>
                        <ZoomComponent
                            scale={scale}
                            minScale={minScale}
                            maxScale={maxScale}
                            zoomIn={() => handleZoomBtn(zoomIn, "in")}
                            zoomOut={() => handleZoomBtn(zoomOut, "out")}
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