import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import header from "../assets/wally_header.jpg";
import wally2 from "../assets/wally2.jpg";
import wally3 from "../assets/wally3.jpg";

const MainPage = () => {
    const navigate = useNavigate();

    interface Images {
        image: string;
        text: string;
        disabled: boolean;
        url: string;
    }

    const images: Images[] = [
        {
            image: header,
            text: 'Ir al nivel de prueba',
            disabled: false,
            url: '/test'
        },
        {
            image: wally2,
            text: 'Work in progress',
            disabled: true,
            url: ''
        },
        {
            image: wally3,
            text: 'Work in progress',
            disabled: true,
            url: ''
        }
    ];

    return (
        <MainPageContainer>
            <h2>¿Dónde está Wally?</h2>

            <TextContainer>
                <Paragraph>
                    Esto es una maqueta inicial de la aplicación que estoy desarrollando, basada en los libros "¿Dónde está Wally? de Martin Handford que tanto marcaron mi infancia.
                </Paragraph>

                <Paragraph>
                    Actualmente sólo existe un nivel en pruebas que está siendo desarrollado.
                </Paragraph>

                <Paragraph>
                    Cuando todo esté listo, funcionando correctamente y tenga una buena base sobre la que construir, mi idea es seguir desarrollando y añadiendo todos los escenarios presentes en los libros homónimos, así como nuevas funcionalidades.
                </Paragraph>

                <Paragraph>
                    Repo:&nbsp;
                    <a 
                        href="https://github.com/init1-dev/where-is-wally"
                        target="_black"
                        rel="noopener noreferrer"
                    >
                        github
                    </a>
                </Paragraph>
            </TextContainer>

            <GridContainer>
                {
                    images.map((image, i) =>
                        <ImageContainer 
                            key={i} 
                            onClick={ 
                                image.disabled 
                                    ? undefined 
                                    : () => navigate(image.url)
                            }
                            $disabled={image.disabled}
                        >
                            <ItemImage 
                                src={image.image}
                                alt="header-wally" 
                                style={{borderRadius:'0.5rem'}} 
                            />

                            <StyledButton $disabled={image.disabled}>
                                {image.text}
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
`;

const GridContainer = styled.div`
    width: 90%;
    padding: 1rem 2rem 2rem 2rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(1, 1fr);

    @media(min-width: 750px)  {
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
    transition: transform 0.3s ease;
    pointer-events: ${props => props.$disabled ? 'hover' : ''};
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};

    &:hover {
        transform: scale(1.05);
    }
`;

const ItemImage = styled.img`
    aspect-ratio: 9/16;
    max-height: 25rem;
    object-fit: cover;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
`;

export const StyledButton = styled.button<{ $disabled: boolean }>`
    margin-top: 1rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background-color: ${ props => props.$disabled ? '#dc3545' : 'grey' };
    color: white;
    text-decoration: none;
    border: 1px solid rgb(0 0 0 / 0.2);
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
    text-shadow: 1px 1px 1px rgb(0 0 0 / 0.5);
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 80%;
    gap: 1rem;
`;

const Paragraph = styled.p`
    margin: 0;
`;

export default MainPage;
