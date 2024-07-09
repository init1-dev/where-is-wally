import styled from "styled-components";
import { StyledButton } from "../../pages/BookView";
import { VscDebugRestart } from "react-icons/vsc";

interface LoadErrorProps {
    reloadImg: () => void;
}

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