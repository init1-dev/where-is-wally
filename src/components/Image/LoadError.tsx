import styled from "styled-components";
import { VscDebugRestart } from "react-icons/vsc";
import { StyledButton } from "../../styles/GeneralStyles";
import { LoadErrorProps } from "../../interfaces/interfaces";

const LoadError = ({
    reloadImg
}: LoadErrorProps) => {
    return (
        <ErrorMessage>
            <h2>Error al cargar la imagen.</h2>

            <StyledButton onClick={reloadImg}>
                <VscDebugRestart />
                Reintentar
            </StyledButton>
        </ErrorMessage>
    );
}

const ErrorMessage = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default LoadError;