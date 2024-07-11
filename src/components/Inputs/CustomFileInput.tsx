import React, { RefObject, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import styled from "styled-components";
import { IoImagesOutline } from "react-icons/io5";
import { FlexCenteredContainer, StyledButton } from "../../styles/GeneralStyles";

interface CustomFileInputProps {
    inputRef: RefObject<HTMLInputElement>;
    isFileSet: boolean;
    handleChange: () => void;
    handleClearInput: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    label: LabelProps;
    required?: boolean;
}

interface LabelProps {
    htmlFor:  string;
    label: string;
}

const CustomFileInput = ({
    inputRef,
    isFileSet,
    handleChange,
    handleClearInput,
    label,
    required
}: CustomFileInputProps) => {
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = () => {
        if (inputRef.current && inputRef.current.files) {
            setFileName(inputRef.current.files[0].name);
            handleChange();
        }
    };

    const handleClickInput = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        inputRef.current?.click();
    }

    return (
        <FileInputContainer>
            <label htmlFor={label.htmlFor}>{label.label}:</label>

            <ButtonsContainer>
                <HiddenFileInput 
                    name={label.htmlFor}
                    ref={inputRef} 
                    type="file" 
                    onChange={handleFileChange}
                    required={required}
                />

                <Button onClick={(e) => handleClickInput(e)} $filled={isFileSet}>
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

const Button = styled(StyledButton)<{ $filled?: boolean }>`
    margin-top: unset;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    background-color: ${props => props.$filled ? 'var(--success)' : 'var(--secondary)'};
    border-radius: 0.25rem;
    width: 100%;
    position: relative;

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