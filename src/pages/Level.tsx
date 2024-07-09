import styled from "styled-components";
import InteractiveImage from "../components/Image/InteractiveImage";
import { books } from "../utils/Image";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { StyledCircleButton } from "../styled/Button";
import { click } from "../assets/sounds";
import { Book, Scenario } from "../interfaces/interfaces";
import { PlaySound } from "../utils/playSound";

const LevelComponent = () => {
    const { bookId, scenarioId } = useParams<{bookId: string, scenarioId: string}>();
    const book: Book | undefined = bookId ? books[Number(bookId)] : undefined;
    const scenario: Scenario | undefined = scenarioId ? book?.scenarios.find(scenario => scenario.id === Number(scenario.id)) : undefined;
    const [ currentScenario, setCurrentScenario ] = useState<Scenario | null>(scenario || null );
    const [ imageAreas, setImageAreas ] = useState(scenario?.areas || []);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (scenario) {
            setCurrentScenario(scenario);
            setImageAreas(scenario.areas);
        }
    }, [scenario]);

    const handleReturn = () => {
        PlaySound(click, 0.25);
        navigate(`/book/${bookId}`, {replace:true});
    }

    return (
        <MainPageContainer>
            <TextContainer>
                <StyledCircleButton onClick={handleReturn}>
                    <IoMdArrowBack style={{fontSize:'20px'}} />
                </StyledCircleButton>
            </TextContainer>
        
            {
                imageAreas && (
                    <InteractiveImage 
                        image={currentScenario?.image!}
                        imageAreas={imageAreas} 
                        setImageAreas={setImageAreas}
                    />
                )
            }
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
