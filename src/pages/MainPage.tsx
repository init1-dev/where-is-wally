import { Link } from "react-router-dom";
import styled from "styled-components";

const MainPage = () => {


    return (
        <MainPageContainer>
            <h2>¿Dónde está Wally? / test</h2>

            <p>Esto es una maqueta inicial de la aplicación que estoy desarrollando, basada en los libros de "¿Dónde está Wally? que tanto marcaron mi infancia.</p>

            <p>Actualmente sólo existe un nivel en pruebas que está siendo desarrollado. </p>

            <p>Cuando todo esté listo, funcionando correctamente y tenga una buena base sobre la que construir, mi idea es seguir desarrollando y añadiendo todos los escenarios presentes en los libros homónimos.</p>

            <StyledButton as={Link} to={"/where-is-wally/test"}>
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

export default MainPage;
