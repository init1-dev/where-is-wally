import { useLocation, useNavigate } from "react-router-dom";
import { click } from "../assets/sounds";
import { PlaySound } from "../utils/playSound";
import styled from "styled-components";
import { Book, InputStateProps } from "../interfaces/interfaces";
import NotFoundComponent from "./NotFound";
import { FlexCenteredContainer, Input, StyledButton } from "../styles/GeneralStyles";
import { Dispatch, FormEvent, RefObject, SetStateAction, useRef, useState } from "react";
import CustomFileInput from "../components/Inputs/CustomFileInput";

const CreateLevelComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const formRef = useRef<HTMLFormElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);
    const portraitRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<InputStateProps>({ref: nameRef, touched: false, value: ''});
    const [image, setImage] = useState({ref: imageRef, touched: false, value: ''});
    const [portrait, setPortrait] = useState({ref: portraitRef, touched: false, value: ''});
    
    const { book } = location.state as { book: Book } || { book: null }

    const handleReturn = () => {
        PlaySound(click, 0.25);
        navigate(-1);
    }

    const handleInputChange = (e: FormEvent<HTMLInputElement>, setStateFunction: Dispatch<SetStateAction<InputStateProps>>) => {
        const { value } = e.currentTarget;
        setStateFunction(prev => ({...prev, value, touched: true }));
    }

    const handleImageChange = (e: FormEvent<HTMLInputElement>, setImageFunction: Dispatch<SetStateAction<InputStateProps>>) => {
        const { value } = e.currentTarget;
        setImageFunction(prev => ({...prev, value, touched: true}));
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
        ref: RefObject<HTMLInputElement>,
        setInputState: Dispatch<SetStateAction<InputStateProps>>
    ) => {
        e.preventDefault();

        if(ref.current){
            ref.current.value = '';
        }

        setInputState(prev => ({...prev, value: '', touched: true}));
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
                        ref={name.ref}
                        type="text"
                        name="nombre"
                        onChange={(e) => handleInputChange(e, setName)}
                        $touched={name.touched}
                        $value={name.value}
                        required
                    />
                </InputContainer>

                <InputContainer>
                    <CustomFileInput
                        inputState={image}
                        isFileSet={image.value !== ''}
                        handleChange={(e) => handleImageChange(e, setImage)}
                        handleClearInput={(e) => handleClearInput(e, image.ref, setImage)}
                        label={{htmlFor: 'image', label: 'Imagen del nivel'}}
                        required
                    />
                </InputContainer>

                <InputContainer>
                    <CustomFileInput
                        inputState={portrait}
                        isFileSet={portrait.value !== ''}
                        handleChange={(e) => handleImageChange(e, setPortrait)}
                        handleClearInput={(e) => handleClearInput(e, portrait.ref, setPortrait)}
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
    gap: 0.5rem;
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
