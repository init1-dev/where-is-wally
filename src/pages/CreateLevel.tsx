import { Link, useLocation, useNavigate } from "react-router-dom";
import { click } from "../assets/sounds";
import { PlaySound } from "../utils/playSound";
import styled from "styled-components";
import { Book } from "../interfaces/interfaces";
import NotFoundComponent from "./NotFound";
import { FlexCenteredContainer, Input, StyledButton } from "../styles/GeneralStyles";


const CreateLevelComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { book } = location.state as { book: Book } || { book: null }

    const handleReturn = () => {
        PlaySound(click, 0.25);
        navigate(-1);
    }

    if (!book) {
        return <NotFoundComponent />
    }

    return (
        <ComponentContainer>
            <Title>
                Creador de escenarios
            </Title>

            <TextContainer>
                <h3>Libro:</h3>

                <h2>{book.name}</h2>
            </TextContainer>

            <h3>Creación de un nuevo nivel:</h3>

            <StyledForm action="">
                <label htmlFor="loadimage">Imagen del nivel:</label>
                <Input type="file" name="loadimage" src="" alt="load image" />

                <label htmlFor="loadportrait">Imagen de portada:</label>
                <Input type="file" name="loadportrait" src="" alt="load image" />
            </StyledForm>

            <ButtonsContainer>
                <NextButton
                    as={Link} 
                    to={''}
                    onClick={() => PlaySound(click, 0.25)}
                >
                    Siguiente
                </NextButton>

                <CancelButton
                    as={Link} 
                    to={'/main'}
                    onClick={handleReturn}
                >
                    Cancelar
                </CancelButton>
            </ButtonsContainer>
        </ComponentContainer>
    );
};

const ComponentContainer = styled(FlexCenteredContainer)`
    margin: 2rem 1rem;
    flex-direction: column;
`;

const ButtonsContainer = styled(FlexCenteredContainer)`
    margin-top: 1.5rem;
    gap: 1rem;
`;

const Title = styled.h3`
    font-weight: lighter;
    margin: 0;
`;

const TextContainer = styled(FlexCenteredContainer)`
    align-items: baseline;
    gap: 0.5rem;
`;

const StyledForm = styled.form`
    display: flex;
    gap: 1rem;
    flex-direction: column;
`;

const NextButton = styled(StyledButton)`
    background-color: var(--primary);
`;

const CancelButton = styled(StyledButton)`
    background-color: var(--danger);
`;

export default CreateLevelComponent;
