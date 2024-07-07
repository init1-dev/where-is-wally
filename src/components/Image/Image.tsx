import { Dispatch, RefObject, SetStateAction, useState } from 'react';
import { Area } from '../../interfaces/interfaces';
import Areas from './Areas';
import styled from 'styled-components';

interface ImageProps {
    image: string;
    imageAreas: Area[];
    setImageAreas: Dispatch<SetStateAction<Area[]>>;
    imgRef: RefObject<HTMLImageElement>;
}

const Image = ({
    image,
    imageAreas, 
    setImageAreas,
    imgRef
}: ImageProps) => {
    const [dragging, setDragging] = useState(false);

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            <StyledImage
                ref={imgRef}
                src={image}
                alt="wally-test"
                useMap='#image-map'
                $isDragging={dragging}
                onMouseDown={ () => setDragging(true) }
                onMouseUp={ () => setDragging(false) }
            />

            <Areas
                imageAreas={imageAreas}
                setImageAreas={setImageAreas}
            />
        </div>
    );
};

const StyledImage = styled.img<{ $isDragging: boolean}>`
    user-select: none;
    cursor: pointer !important;
`;

export default Image;