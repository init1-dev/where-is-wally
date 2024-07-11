import styled from "styled-components";
import InteractiveImage from "../components/Image/InteractiveImage";
import { books } from "../utils/Image";
import { useEffect, useMemo, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { StyledCircleButton } from "../styles/GeneralStyles";
import { click } from "../assets/sounds";
import { Area } from "../interfaces/interfaces";
import { PlaySound } from "../utils/playSound";
import NotFoundComponent from "./NotFound";

const LevelComponent = () => {
    const { bookId, levelId } = useParams<{bookId: string, levelId: string}>();
    const [ imageAreas, setImageAreas ] = useState<Area[]>([]);
    
    const navigate = useNavigate();

    const { book, currentScenario, initialImageAreas } = useMemo(() => {
        if (bookId && levelId) {
            const bookNumber = parseInt(bookId, 10);
            const scenarioNumber = parseInt(levelId, 10);

            if (!isNaN(bookNumber) && !isNaN(scenarioNumber)) {
                const foundBook = books.find((book) => book.number === bookNumber);
                if (foundBook) {
                    const foundScenario = foundBook.scenarios.find((scenario) => scenario.id === scenarioNumber);
                    return {
                        book: foundBook,
                        currentScenario: foundScenario || null,
                        initialImageAreas: foundScenario?.areas || [],
                    };
                }
            }
        }
        return { book: undefined, currentScenario: null, initialImageAreas: [] };
    }, [bookId, levelId, navigate]);

    useEffect(() => {
        setImageAreas(initialImageAreas);
    }, [initialImageAreas]);

    const handleReturn = () => {
        PlaySound(click, 0.25);
        navigate(`/book/${bookId}`, {replace:true});
    }

    if (!book || !currentScenario) {
        return <NotFoundComponent />;
    }

    return (
        currentScenario.image && imageAreas.length > 0
            ?   <MainPageContainer>
                    <TextContainer>
                        <StyledCircleButton onClick={handleReturn}>
                            <IoMdArrowBack style={{fontSize:'20px'}} />
                        </StyledCircleButton>
                    </TextContainer>
                
                    {
                        imageAreas && (
                            <InteractiveImage 
                                image={currentScenario.image}
                                imageAreas={imageAreas} 
                                setImageAreas={setImageAreas}
                                levelName={currentScenario.name}
                            />
                        )
                    }
                </MainPageContainer>
            : 'loading'
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
    border-radius: 0.5rem;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
`;

export default LevelComponent;
