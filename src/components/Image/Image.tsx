import { ImageProps } from '../../interfaces/interfaces';
import styled from 'styled-components';
import Areas from './Areas';

const Image = ({
    image,
    imageAreas, 
    setImageAreas,
    imgRef,
    setFound
}: ImageProps) => {
    
    return (
        <>
            <StyledImage
                ref={imgRef}
                src={image}
                alt="wally-test"
                useMap='#image-map'
            />

            <Areas
                imageAreas={imageAreas}
                setImageAreas={setImageAreas!}
                setFound={setFound}
            />
        </>
    );
};

const StyledImage = styled.img`
    cursor: pointer !important;
    pointer-events: auto !important;
`;

export default Image;