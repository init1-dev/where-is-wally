import { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react';
import { Area } from '../../interfaces/interfaces';
import Areas from './Areas';
import styled from 'styled-components';
import Loader from './Loader';
import LoadError from './LoadError';

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
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    useEffect(() => {
        const checkImageAvailability = async () => {
            try {
                const response = await fetch(image);
                
                if (response.ok) {
                    setLoading(false);
                } else {
                    setLoadError(true);
                }
            } catch (error) {
                setLoadError(true);
            }
        };

        checkImageAvailability();
    }, [image]);

    const handleImageLoad = () => {
        setLoading(false);
    };

    const handleImageError = () => {
        setLoadError(true);
        setLoading(false);
    };

    const reloadImage = () => {[
        {
            "AllowedHeaders": [
                "*"
            ],
            "AllowedMethods": [
                "GET"
            ],
            "AllowedOrigins": [
                "*"
            ],
            "ExposeHeaders": [],
            "MaxAgeSeconds": 3000
        }
    ]
        setLoading(true);
        setLoadError(false);
        imgRef.current!.src = image;
    };
    
    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
            {loading && <Loader />}

            {!loading && !loadError && (
                <StyledImage
                    ref={imgRef}
                    src={image}
                    alt="wally-test"
                    useMap='#image-map'
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: loadError ? 'none' : 'block' }}
                />
            )}

            {loadError && <LoadError reloadImg={reloadImage} />}

            {!loading && !loadError && (
                <Areas
                    imageAreas={imageAreas}
                    setImageAreas={setImageAreas}
                />
            )}
        </div>
    );
};

const StyledImage = styled.img`
    cursor: pointer !important;
`;

export default Image;