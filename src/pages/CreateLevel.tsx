import { useLocation, useNavigate } from "react-router-dom";
import { click } from "../assets/sounds";
import { PlaySound } from "../utils/playSound";
import styled from "styled-components";
import { Book } from "../interfaces/interfaces";
import NotFoundComponent from "./NotFound";
import { FlexCenteredContainer, Input, StyledButton } from "../styles/GeneralStyles";
import { Dispatch, FormEvent, RefObject, SetStateAction, useRef, useState } from "react";
import CustomFileInput from "../components/Inputs/CustomFileInput";

const CreateLevelComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isNameSet, setIsNameSet] = useState(false);
    const [isImageSet, setIsImageSet] = useState(false);
    const [isPortraitSet, setIsPortraitSet] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const portraitRef = useRef<HTMLInputElement>(null);
    const { book } = location.state as { book: Book } || { book: null }

    const handleReturn = () => {
        PlaySound(click, 0.25);
        navigate(-1);
    }

    const handleInputChange = (inputRef: RefObject<HTMLInputElement>, setInputFunction: Dispatch<SetStateAction<boolean>>) => {
        if(inputRef.current?.value !== ''){
            setInputFunction(true);
        } else {
            setInputFunction(false);
        }
    }

    const handleImageChange = (inputRef: RefObject<HTMLInputElement>, setImageFunction: Dispatch<SetStateAction<boolean>>) => {
        if (inputRef.current) {
            setImageFunction(inputRef.current.value !== '');
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        PlaySound(click, 0.25);

        if (formRef.current && !formRef.current.checkValidity()) {
            console.log('incorrecto');
            formRef.current.reportValidity();
            return;
        }

        if(nameRef.current && imageRef.current && portraitRef.current){
            const isNameSet = nameRef.current.value !== '';
            const isImageSet = imageRef.current.value !== '';
            const isPortraitSet = portraitRef.current.value !== '';

            if(isNameSet && isImageSet && isPortraitSet){
                console.log('correcto');
            }
        }
    }

    const handleClearInput = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
        inputRef: RefObject<HTMLInputElement>,
        setFilled: Dispatch<SetStateAction<boolean>>
    ) => {
        e.preventDefault();

        if(inputRef.current && inputRef.current.value !== ''){
            inputRef.current.value = '';
            setFilled(false);
        }
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

            <small>Comenzaremos rellenando los siguientes campos para la creación del nuevo nivel. Cuando termines pulsa en el botón "Siguiente".</small>

            <StyledForm action="" ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <InputContainer>
                    <label htmlFor="nombre">Nombre del nivel:</label>

                    <Input
                        ref={nameRef}
                        type="text"
                        name="nombre"
                        onChange={() => handleInputChange(nameRef, setIsNameSet)}
                        $filled={isNameSet}
                        required
                    />
                </InputContainer>

                <InputContainer>
                    <CustomFileInput
                        inputRef={imageRef}
                        isFileSet={isImageSet}
                        handleChange={() => handleImageChange(imageRef, setIsImageSet)}
                        handleClearInput={(e) => handleClearInput(e, imageRef, setIsImageSet)}
                        label={{htmlFor: 'image', label: 'Imagen del nivel'}}
                        required
                    />
                </InputContainer>

                <InputContainer>
                    <CustomFileInput
                        inputRef={portraitRef}
                        isFileSet={isPortraitSet}
                        handleChange={() => handleImageChange(portraitRef, setIsPortraitSet)}
                        handleClearInput={(e) => handleClearInput(e, portraitRef, setIsPortraitSet)}
                        label={{htmlFor: 'portrait', label: 'Imagen de portada'}}
                        required
                    />
                </InputContainer>

                <ButtonsContainer>
                    <NextButton
                        type="submit"
                    >
                        Siguiente
                    </NextButton>

                    <CancelButton
                        onClick={handleReturn}
                    >
                        Cancelar
                    </CancelButton>
            </ButtonsContainer>
            </StyledForm>
            
        </ComponentContainer>
    );
};

const ComponentContainer = styled(FlexCenteredContainer)`
    margin: 2rem 1rem;
    flex-direction: column;
    gap: 1rem;
`;

const ButtonsContainer = styled(FlexCenteredContainer)`
    gap: 1rem;
`;

const Title = styled.h3`
    font-weight: lighter;
    margin: 0;
`;

const TextContainer = styled(FlexCenteredContainer)`
    align-items: baseline;
    gap: 0.5rem;
    flex-wrap: wrap;

    h3 {
        margin: 0;
    }
`;

const StyledForm = styled.form`
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    padding: 1rem;
    background-color: var(--white-25);
    border-radius: 0.5rem;
    width: 80vw;

    @media(min-width: 750px)  {
        width: unset;
        min-width: 20rem;
        padding: 1.25rem 2rem;
    }
`;

const InputContainer = styled(FlexCenteredContainer)`
    flex-direction: column;
    gap: 0.35rem;
`;

const NextButton = styled(StyledButton)`
    padding: 0.75rem;
    background-color: var(--primary);
`;

const CancelButton = styled(StyledButton)`
    padding: 0.75rem;
    background-color: var(--danger);
`;

export default CreateLevelComponent;
