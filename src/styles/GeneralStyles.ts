import styled from "styled-components";

export const FlexContainer = styled.div`
    display: flex;
`;

export const FlexCenteredContainer = styled(FlexContainer)`
    justify-content: center;
    align-items: center;
`;

export const StyledButton = styled.button<{ disabled?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background-color: ${ props => props.disabled ? '#dc3545' : 'grey'};
    color: white;
    text-decoration: none;
    border: 1px solid rgb(0 0 0 / 0.2);
    cursor: pointer;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
    text-shadow: 1px 1px 1px rgb(0 0 0 / 0.5);

    svg {
        font-size: 22px;
    }
`;

export const StyledInteractiveButton = styled(StyledButton)`
    margin-top: 0;
    background-color: white;
    color: black;
    transition: box-shadow 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 2px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -2px 0px inset;

    svg { font-size: unset; }

    &:focus, &:focus-visible {
        box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
`;

export const StyledRoundedButton = styled(StyledInteractiveButton)`
    border-radius: 25%;
`;

export const StyledCircleButton = styled(StyledInteractiveButton)`
    border-radius: 50%;
`;

export const Input = styled.input`
    border: 1px solid grey;
    padding: 0.5rem;
    border-radius: 0.5rem;
`;