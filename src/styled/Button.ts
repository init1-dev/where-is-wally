import styled from "styled-components";

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    background-color: white;
    color: black;
    padding: 0.5rem;
    border: 1px solid rgb(0 0 0 / 0.2);
    transition: box-shadow 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset;
    cursor: pointer;

    &:focus, &:focus-visible {
        box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
`;

export const StyledRoundedButton = styled(StyledButton)`
    border-radius: 25%;
`;

export const StyledCircleButton = styled(StyledButton)`
    border-radius: 50%;
`;