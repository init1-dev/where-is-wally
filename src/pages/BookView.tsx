import styled from "styled-components";
import { books } from "../utils/Image";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Book } from "../interfaces/interfaces";
import { PlaySound } from "../utils/playSound";
import { click } from "../assets/sounds";
import header from "../assets/wally_header.jpg";
import { useEffect, useState } from "react";
import NotFoundComponent from "./NotFound";
import FutureBook from "./FutureBook";
import { MdArrowBack } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { FlexCenteredContainer, FlexContainer, GridContainer, ImageContainer, ItemImage, Paragraph, StyledButton } from "../styles/GeneralStyles";
import { BiSolidArrowToTop } from "react-icons/bi";
import { toTop } from "../utils/functionsModule";

const BookView = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const [ book, setBook ] = useState<Book | undefined>(undefined);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const navigate = useNavigate();

    const handleBookLoading = (id: string | undefined) => {
        if(id){
            const idNumber = parseInt(id, 10);
            if(!isNaN(idNumber)){
                const foundBook = books.find(book => book.number === idNumber);
                setBook(foundBook);
            } else {
                navigate('/main');
            }
        }
    };

    useEffect(() => {
        const MIN_SCROLL = 250;

        const handleScroll = () => {
            if (window.scrollY > MIN_SCROLL) {
                setShowScrollButton(true);
            } else {
                setShowScrollButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    useEffect(() => {
        handleBookLoading(bookId);
    }, [bookId, navigate]);

    const handleOpenScenario = (bookId: any, scenarioId: any) => {
        navigate(`/book/${bookId}/${scenarioId}`);
        document.documentElement.requestFullscreen();
    }
    
    if (!book) {
        return <NotFoundComponent />
    }

    return (
        <MainPageContainer>
            <h1>{`Libro ${book.number}: ${book.name}`}</h1>

            <TextContainer>
                <ButtonsContainer>
                    <StyledButton 
                        as={Link} 
                        to={"/main"} 
                        onClick={ () => PlaySound(click, 0.25) }
                    >
                        <MdArrowBack />
                        Volver a libros
                    </StyledButton>

                    <StyledButton 
                        as={Link} 
                        to={`/book/${bookId}/create`}
                        onClick={ () => PlaySound(click, 0.25) }
                        state={{ book }}
                    >
                        Crear escenario
                        <FiPlus />
                    </StyledButton>

                </ButtonsContainer>

                <Paragraph>
                    {book?.description}
                </Paragraph>
            </TextContainer>

            {
                book.scenarios.length > 0
                    ?   <StyledGridContainer>
                            {
                                book.scenarios.map((scenario, i) =>
                                    <StyledImageContainer 
                                        key={i} 
                                        disabled={ !scenario.playable }
                                        onClick={ 
                                            scenario.playable
                                                ? () => handleOpenScenario(bookId, scenario.id)
                                                : undefined
                                        }
                                        scale={1.03}
                                    >
                                        <ScenarioTitle>
                                            {scenario.name}

                                            <small>
                                                {` (${scenario.id}/${book.scenarios.length})`}
                                            </small>
                                        </ScenarioTitle>
            
                                        <ItemImage 
                                            src={scenario.portrait || header}
                                            alt="header-wally" 
                                            style={{borderRadius:'0.5rem'}} 
                                        />
            
                                        <StyledButton disabled={!scenario.playable}>
                                            {
                                                scenario.playable 
                                                    ? 'Acceder'
                                                    : 'En el futuro'
                                            }
                                        </StyledButton>
                                    </StyledImageContainer>
                                )
                            }
                            <StyledToTop 
                                $show={showScrollButton} 
                                onClick={() => toTop("smooth")}
                            >
                                <BiSolidArrowToTop />
                            </StyledToTop>
                        </StyledGridContainer>
                    :   <FutureBook />
            }
            
            
        </MainPageContainer>
    );
}

const MainPageContainer = styled(FlexContainer)`
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;

    h1 {
        margin: 2rem 1rem 0 1rem;
    }
`;

const StyledGridContainer = styled(GridContainer)`
    gap: 1.5rem;
    margin-bottom: 2rem;

    @media(min-width: 750px)  {
        grid-template-columns: repeat(2, 1fr);
    }

    @media(min-width: 1400px)  {
        grid-template-columns: repeat(3, 1fr);
    }

    @media(min-width: 1920px)  {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const StyledImageContainer = styled(ImageContainer)<{ disabled?: boolean }>`
    cursor: ${ props => props.disabled ? 'not-allowed' : 'pointer' };
`;

const ScenarioTitle = styled.p`
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    font-weight: bold;
`;

const ButtonsContainer = styled(FlexCenteredContainer)`
    gap: 1rem;
`;

const StyledToTop = styled(StyledButton)<{$show: boolean}>`
    transition: opacity 0.3s ease, transform 0.3s ease, height 0.3s ease;
    opacity: ${ props => props.$show ? '1' : '0'};
    pointer-events: ${ props => props.$show ? 'all' : 'none'};
    position: fixed;
    bottom: 0rem;
    left: calc(50% - 2.5rem);
    transform: translateX(calc(-50% - 2.5rem));
    transform: translateY(2.5rem);
    padding: 0.5rem 1rem;
    display: flex;
    align-items: start;
    gap: 0.5rem;
    width: 5rem;
    height: 5rem;
    border-radius: 25% 25% 0 0;

    svg {
        transition: font-size 0.2s ease;
        font-size: 25px;
    }

    @media(min-width: 750px)  {
        &:hover {
            transform: translateY(2rem);

            svg {
                font-size: 30px;
            }
        }
    }
`;

const TextContainer = styled(FlexContainer)`
    flex-direction: column;
    max-width: 90%;
    gap: 2rem;

    @media(min-width: 750px)  {
        max-width: 80%;
    }
`;

export default BookView;