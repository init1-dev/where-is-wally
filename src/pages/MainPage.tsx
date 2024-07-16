import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";
import { books } from "../utils/Image";
import { PlaySound } from "../utils/playSound";
import { click } from "../assets/sounds";
import { FlexCenteredContainer, FlexContainer, GridContainer, ImageContainer, ItemImage, Paragraph, StyledButton } from "../styles/GeneralStyles";

const MainPage = () => {
    const navigate = useNavigate();

    const handleNavigateToBook = (number: number) => {
        PlaySound(click, 0.25);
        navigate(`/book/${number}`);
    }

    return (
        <MainPageContainer>
            <h1>¿Dónde está Wally?</h1>

            <TextContainer>
                <Paragraph>
                    Esta aplicación es una maqueta inicial, aún en estado de desarrollo, basada en los libros <strong>"¿Dónde está Wally?</strong> de <strong>Martin Handford</strong> que tanto marcaron mi infancia.
                </Paragraph>

                <Paragraph>
                    Actualmente sólo dispone de un nivel jugable del primer libro, llamado <strong>"Aeropuerto"</strong>. Cuando todo esté listo, funcionando correctamente y tenga una buena base sobre la que construir, la idea es continuar su desarrollo, añadiendo todos los escenarios presentes en los libros homónimos, así como nuevas funcionalidades.
                </Paragraph>

                <FlexParagraph>
                    <FaGithub />

                    <span>
                        Repo:&nbsp;
                        
                        <a 
                            href="https://github.com/init1-dev/where-is-wally"
                            target="_black"
                            rel="noopener noreferrer"
                        >
                            github
                        </a>
                    </span>
                </FlexParagraph>
            </TextContainer>

            <StyledGridContainer>
                {
                    books.map((book, i) =>
                        <StyledImageContainer 
                            key={i} 
                            onClick={ 
                                book.playable 
                                    ? () => handleNavigateToBook(book.number)
                                    : undefined
                            }
                            disabled={!book.playable}
                        >
                            <ItemImage 
                                src={book.portrait}
                                alt="header-wally" 
                                style={{borderRadius:'0.5rem'}} 
                            />

                            <StyledButton disabled={!book.playable}>
                                {
                                    book.playable
                                        ? book.name
                                        : 'En el futuro'
                                }
                            </StyledButton>
                        </StyledImageContainer>
                    )
                }
            </StyledGridContainer>
            
        </MainPageContainer>
    );
};

const MainPageContainer = styled(FlexCenteredContainer)`
    gap: 1.5rem;
    flex-direction: column;

    h1 {
        margin-top: 2rem;
    }
`;

const StyledGridContainer = styled(GridContainer)`
    margin-bottom: 2rem;

    @media(min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        width: unset;
    }

    @media(min-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        width: unset;
    }
`;

const StyledImageContainer = styled(ImageContainer)<{ disabled?: boolean }>`
    pointer-events: ${props => props.disabled ? 'hover' : ''};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const TextContainer = styled(FlexContainer)`
    flex-direction: column;
    max-width: 90%;
    gap: 1rem;

    @media(min-width: 750px)  {
        max-width: 80%;
    }
`;

const FlexParagraph = styled(Paragraph)`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @media(min-width: 750px)  {
        justify-content: center;
    }
`;

export default MainPage;
