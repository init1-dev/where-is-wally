import React, { FormEvent, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import styled from "styled-components";
import { IoImagesOutline } from "react-icons/io5";
import { FlexCenteredContainer, StyledButton } from "../../styles/GeneralStyles";
import { CustomFileInputProps } from "../../interfaces/interfaces";

const CustomFileInput = ({
    inputState,
    isFileSet,
    handleChange,
    handleClearInput,
    label,
    required
}: CustomFileInputProps) => {
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
        if (inputState.ref.current && inputState.ref.current.files) {
            setFileName(inputState.ref.current.files[0].name);
            handleChange(e);
        }
    };

    const handleClickInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        inputState.ref.current?.click();
    }

    return (
        <FileInputContainer>
            <label htmlFor={label.htmlFor}>{label.label}:</label>

            <ButtonsContainer>
                <HiddenFileInput 
                    name={label.htmlFor}
                    ref={inputState.ref}
                    type="file" 
                    onChange={handleFileChange}
                    required={required}
                />

                <Button onClick={(e) => handleClickInput(e)} $filled={isFileSet} $touched={inputState.touched}>
                    <IoImagesOutline />
                    { isFileSet ? fileName : 'Seleccionar archivo'}
                </Button>

                {isFileSet && (
                    <ClearButton onClick={handleClearInput}>
                        <AiOutlineClear />
                    </ClearButton>
                )}
            </ButtonsContainer>
        </FileInputContainer>
    );
};

const FileInputContainer = styled(FlexCenteredContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 95%;
`;

const ButtonsContainer = styled(FlexCenteredContainer)`
    gap: 0.5rem;
    width: 100%;
`;

const HiddenFileInput = styled.input`
    position: absolute;
    clip: rect(0, 0, 0, 0);
`;

const Button = styled(StyledButton)<{ $filled?: boolean, $touched?: boolean }>`
    margin-top: unset;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    background-color: ${props => props.$filled ? 'var(--success)' : 'var(--secondary)'};
    border-radius: 0.25rem;
    width: 100%;
    position: relative;
    border: 1px solid ${props => !props.$touched ? 'grey' : props.$filled ? 'var(--success)' : 'var(--danger)'};

    svg {
        position: absolute;
        left: 0.75rem;
        font-size: 1.2rem;
    }
`;

const ClearButton = styled(StyledButton)`
    margin-top: unset;
    background-color: var(--secondary);
    border-radius: 0.25rem;
    
    svg {
        font-size: 1rem;
    }
`;

export default CustomFileInput;