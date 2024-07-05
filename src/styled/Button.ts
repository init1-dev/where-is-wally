import styled from "styled-components";

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    background-color: white;
    color: black;
    padding: 0.5rem;
    border: 1px solid rgb(0 0 0 / 0.2);
    cursor: pointer;
    filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));

    &:hover {
        filter: drop-shadow(1px 1px 5px rgb(0 0 0 / 0.2));
    }
`;

export const StyledRoundedButton = styled(StyledButton)`
    border-radius: 25%;
`;

export const StyledCircleButton = styled(StyledButton)`
    border-radius: 50%;
`;