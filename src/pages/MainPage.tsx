import { Link } from "react-router-dom";
import styled from "styled-components";
import header from "../assets/wally_header.jpg";

const MainPage = () => {


    return (
        <MainPageContainer>
            <h2>¿Dónde está Wally?</h2>

            <img src={header} alt="header-wally" style={{borderRadius:'0.5rem'}} />

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

            <StyledButton as={Link} to={"/test"}>
                Ir al nivel de prueba
            </StyledButton>
        </MainPageContainer>
    );
};

const MainPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledButton = styled.button`
    margin-top: 1rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background-color: grey;
    color: white;
    text-decoration: unset;
`;

const TextContainer = styled.div`
    margin-top: 1rem;
    max-width: 80%;
`;

const Paragraph = styled.p`
    
`;

export default MainPage;
