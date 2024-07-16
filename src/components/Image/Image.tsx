import { ImageProps } from '../../interfaces/interfaces';
import Areas from './Areas';
import styled from 'styled-components';

const Image = ({
    image,
    imageAreas, 
    setImageAreas,
    imgRef,
    setFound
}: ImageProps) => {
    
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            <StyledImage
                ref={imgRef}
                src={image}
                alt="wally-test"
                useMap='#image-map'
            />

            <Areas
                imageAreas={imageAreas}
                setImageAreas={setImageAreas}
                setFound={setFound}
            />
        </div>
    );
};

const StyledImage = styled.img`
    cursor: pointer !important;
`;

export default Image;