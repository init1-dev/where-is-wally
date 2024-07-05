import styled from "styled-components";
import InteractiveImage from "../components/Image/InteractiveImage";
import { image } from "../utils/Image";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { StyledCircleButton } from "../styled/Button";
import { click } from "../assets/sounds";

const LevelComponent = () => {
    const [ imageAreas, setImageAreas ] = useState(image.areas);
    const navigate = useNavigate();

    const PlaySound = (sound: string, volume?: number) => {
        const audio = new Audio(sound);
        audio.volume = volume ? volume : 0.75;
        audio.play();
    }

    const handleReturn = () => {
        PlaySound(click, 0.25);
        navigate("/main");
    }

    return (
        <MainPageContainer>
            <TextContainer>
                <StyledCircleButton onClick={handleReturn}>
                    <IoMdArrowBack style={{fontSize:'20px'}} />
                </StyledCircleButton>
            </TextContainer>
        
            <InteractiveImage 
                image={image.image} 
                imageAreas={imageAreas} 
                setImageAreas={setImageAreas} 
                PlaySound={PlaySound}
            />
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
    position: relative;
`;

const TextContainer = styled.div`
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 1;
    user-select: unset;
    border-radius: 0.5rem;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
`;

export default LevelComponent;
