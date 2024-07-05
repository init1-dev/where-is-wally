import styled from "styled-components";
import InteractiveImage from "../components/Image/InteractiveImage";
import { image } from "../utils/Image";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { StyledCircleButton } from "../styled/Button";

const LevelComponent = () => {
    const [ imageAreas, setImageAreas ] = useState(image.areas);

    return (
        <MainPageContainer>
            <TextContainer>
                <StyledCircleButton as={Link} to={'/main'}>
                    <IoMdArrowBack style={{fontSize:'20px'}} />
                </StyledCircleButton>
            </TextContainer>
        
            <InteractiveImage 
                image={image.image} 
                imageAreas={imageAreas} 
                setImageAreas={setImageAreas} 
            />
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
    position: relative;
`;

const TextContainer = styled.div`
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
    user-select: unset;
    border-radius: 0.5rem;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
`;

export default LevelComponent;
