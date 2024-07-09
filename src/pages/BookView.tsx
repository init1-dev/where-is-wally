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

const BookView = () => {
    const { id } = useParams<{ id: string }>();
    const [ book, setBook ] = useState<Book | undefined>(undefined);
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
        handleBookLoading(id);
    }, [id, navigate]);
    
    if (!book) {
        return <NotFoundComponent />
    }

    return (
        <MainPageContainer>
            <h1>{`Libro ${book?.number}: ${book?.name}`}</h1>

            <TextContainer>
                <ButtonsContainer>
                    <StyledButton as={Link} to={"/"} onClick={ () => PlaySound(click, 0.25) }>
                        <MdArrowBack />
                        Volver a libros
                    </StyledButton>

                    <StyledButton as={Link} to={""} onClick={ () => PlaySound(click, 0.25) }>
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
                    ?   <GridContainer>
                            {
                                book.scenarios.map((scenario, i) =>
                                    <ImageContainer 
                                        key={i} 
                                        disabled={ !scenario.playable }
                                        onClick={ 
                                            scenario.playable
                                                ? () => navigate(`/level/${book.number}/${scenario.id}`)
                                                : undefined
                                        }
                                    >
                                        <ScenarioTitle>{scenario.name }</ScenarioTitle>
            
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
                                    </ImageContainer>
                                )
                            }
                        </GridContainer>
                    :   <FutureBook />
            }
            
            
        </MainPageContainer>
    );
}

const MainPageContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    flex-direction: column;
    align-items: center;

    h1 {
        margin: 2rem 1rem 0 1rem;
    }
`;

const GridContainer = styled.div`
    width: 90%;
    padding: 1rem 2rem 2rem 2rem;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(1, 1fr);

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

const ImageContainer = styled.div<{ disabled?: boolean }>`
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset;
    background-color: #31394f;
    border-radius: 0.5rem;
    padding: 1rem;
    cursor: ${ props => props.disabled ? 'not-allowed' : 'pointer' };

    @media(min-width: 1000px)  {
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.03);
        }
    }
`;

const ScenarioTitle = styled.p`
    margin: 0 0 1rem 0;
    font-size: 1.2rem;
    font-weight: bold;
`;

const ItemImage = styled.img`
    aspect-ratio: 9/16;
    max-height: 25rem;
    object-fit: cover;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

export const StyledButton = styled.button<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background-color: ${ props => props.disabled ? '#dc3545' : 'grey'};
    color: white;
    text-decoration: none;
    border: 1px solid rgb(0 0 0 / 0.2);
    cursor: pointer;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
    text-shadow: 1px 1px 1px rgb(0 0 0 / 0.5);

    svg {
        font-size: 22px;
    }
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 90%;
    gap: 2rem;

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

export default BookView;