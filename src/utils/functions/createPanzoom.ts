import Panzoom, { PanzoomObject } from "@panzoom/panzoom";
import { Dispatch, RefObject, SetStateAction } from "react";

export const createPanzoom = (
    imgRef: RefObject<HTMLImageElement>,
    maxScale: number, 
    minScale: number,
    setPanzoomElement: Dispatch<SetStateAction<PanzoomObject | null>>,
    setScale: Dispatch<SetStateAction<number>>
) => {
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
};

export default createPanzoom;