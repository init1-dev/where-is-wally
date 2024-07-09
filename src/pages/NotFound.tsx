import styled from "styled-components";
import header from '../assets/wally_header.jpg';
import { StyledButton } from "./BookView";
import { Link } from "react-router-dom";
import { PlaySound } from "../utils/playSound";
import { click } from "../assets/sounds";

const NotFoundComponent = () => {
    return (
        <NotFound>
            <img src={header} alt="wally-header" />

            <h2>El recurso seleccionado no existe</h2>

            <StyledButton as={Link} to={"/main"} onClick={() => PlaySound(click, 0.25) } >
                Volver atrás
            </StyledButton>
        </NotFound>
    );
}

const NotFound = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem;
    overflow: hidden;
    gap: 1rem;

    h1 {
        margin: 0;
        padding: 0;
    }
`;

export default NotFoundComponent;