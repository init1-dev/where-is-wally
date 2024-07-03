import styled from "styled-components";

interface ThemeButtonProps {
    theme: string;
    handleToggleTheme: () => void;
}

const ThemeButton = ({ theme, handleToggleTheme }: ThemeButtonProps) => {
    return (
        <ThemeButtonLayout $theme={theme === 'light' ? true : false} onClick={() => handleToggleTheme()}>
            {theme === 'light' ? '🌙' : '☀️'}
        </ThemeButtonLayout>
    );
}

const ButtonTopbar = styled.button.attrs<{ $theme?: boolean; }>(props => ({
    $theme: props.$theme
}))`
    background-color: unset;
    border: 1px;
    padding: 0;
    cursor: pointer;
    border-radius: 5px;
    transition: transform 0.2s ease;
    /* box-shadow: rgb(0 0 0 / 40%) 1px 1px 2px, rgb(0 0 0 / 30%) 0px 7px 13px -3px, rgb(0 0 0 / 20%) 0px -3px 0px inset; */

    &:focus, &:focus-visible {
        outline: none;
    }

    &:hover {
        transform: scale(1.1);
    }
`;

const ThemeButtonLayout = styled(ButtonTopbar)`
    margin: 0;
    z-index: 1;
    height: 100%;
`

export default ThemeButton;