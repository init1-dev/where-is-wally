import styled from "styled-components";
import header from '../assets/wally_header.jpg';
import { Link, useNavigate } from "react-router-dom";
import { PlaySound } from "../utils/playSound";
import { click } from "../assets/sounds";
import { StyledButton } from "../styles/GeneralStyles";

const NotFoundComponent = () => {
    const navigate = useNavigate();

    const handleReturn = () => {
        PlaySound(click, 0.25);
        navigate(-1);
    }

    return (
        <NotFound>
            <StyledImage src={header} alt="wally-header" />

            <StyledText>El recurso seleccionado no existe</StyledText>

            <StyledButton as={Link} to="#" onClick={handleReturn} >
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
`;

const StyledImage = styled.img`
    max-height: 25em;
`;

const StyledText = styled.h3`
    margin: 0;
    padding: 0;
`;

export default NotFoundComponent;