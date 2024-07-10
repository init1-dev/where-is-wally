import { useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import styled from "styled-components";
import { books } from "../utils/Image";
import { PlaySound } from "../utils/playSound";
import { click } from "../assets/sounds";
import { StyledButton } from "../styles/GeneralStyles";

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

            <GridContainer>
                {
                    books.map((book, i) =>
                        <ImageContainer 
                            key={i} 
                            onClick={ 
                                book.playable 
                                    ? () => handleNavigateToBook(book.number)
                                    : undefined
                            }
                            $disabled={!book.playable}
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
                        </ImageContainer>
                    )
                }
            </GridContainer>
            
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;

    h1 {
        margin-top: 2rem;
    }
`;

const GridContainer = styled.div`
    width: 90%;
    padding: 1rem 2rem 2rem 2rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, 1fr);

    @media(min-width: 750px)  {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
        width: unset;
    }

    @media(min-width: 1000px)  {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        width: unset;
    }
`;

const ImageContainer = styled.div<{ $disabled: boolean }>`
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset;
    background-color: #31394f;
    border-radius: 0.5rem;
    padding: 1rem;
    pointer-events: ${props => props.$disabled ? 'hover' : ''};
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};

    @media(min-width: 1000px)  {
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.05);
        }
    }
`;

const ItemImage = styled.img`
    aspect-ratio: 9/16;
    max-height: 25rem;
    object-fit: cover;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 90%;
    gap: 1rem;

    @media(min-width: 750px)  {
        max-width: 80%;
    }
`;

const Paragraph = styled.p`
    margin: 0;
    text-align: justify;

    @media(min-width: 750px)  {
        text-align: unset;
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
