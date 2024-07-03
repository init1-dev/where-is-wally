import { createGlobalStyle } from "styled-components";

export interface Theme {
    bg: string;
    contentBg: string;
    headerBg: string;
    text: string;
    menuActive: string;
    iconsColor: string;
    footerText: string;
    spanBg: string;
    spanText: string;
    stackBg: string;
    strongText: string;
}

export const lightTheme: Theme = {
    bg: '#f3f3f3',
    contentBg: 'white',
    headerBg: '#f7f7f7',
    text: '#3b3b3b',
    menuActive: '#eab308',
    iconsColor: '',
    footerText: '#8c8c8c',
    spanBg: '#bec0c5',
    spanText: 'black',
    stackBg: '#e9e9e9',
    strongText: 'rgb(213 162 3)'
};

export const darkTheme: Theme = {
    bg: '#212737',
    contentBg: '#202020',
    headerBg: '#293044',
    text: '#e9e9e9',
    menuActive: '#eab308',
    iconsColor: '',
    footerText: '#878788',
    spanBg: '#1f2534',
    spanText: 'white',
    stackBg: '#2b3247',
    strongText: 'rgb(254 240 138 / 1)'
};

export const GlobalStyles = createGlobalStyle<{ theme?: Theme }>`
    :root {
        user-select: none;
        background-color: ${({ theme }) => theme.bg};
        font-family: Onest, system-ui, Avenir, Helvetica, Arial, sans-serif;

        --shadow-color: 0deg 0% 2%;
        --shadow-elevation-low:
            0.6px 0.6px 1px hsl(var(--shadow-color) / 0.11),
            1px 1px 1.6px -1.2px hsl(var(--shadow-color) / 0.11),
            2.4px 2.3px 3.7px -2.5px hsl(var(--shadow-color) / 0.11);
        --shadow-elevation-medium:
            0.6px 0.6px 1px hsl(var(--shadow-color) / 0.09),
            1.5px 1.5px 2.4px -0.6px hsl(var(--shadow-color) / 0.09),
            3px 3px 4.8px -1.2px hsl(var(--shadow-color) / 0.09),
            6.1px 6.1px 9.7px -1.9px hsl(var(--shadow-color) / 0.09),
            11.8px 11.7px 18.7px -2.5px hsl(var(--shadow-color) / 0.09);
        --shadow-elevation-high:
            0.6px 0.6px 1px hsl(var(--shadow-color) / 0.08),
            2.9px 2.9px 4.6px -0.3px hsl(var(--shadow-color) / 0.08),
            5.1px 5.1px 8.1px -0.6px hsl(var(--shadow-color) / 0.08),
            7.8px 7.7px 12.3px -0.8px hsl(var(--shadow-color) / 0.08),
            11.4px 11.3px 18.1px -1.1px hsl(var(--shadow-color) / 0.08),
            16.4px 16.3px 26px -1.4px hsl(var(--shadow-color) / 0.08),
            23.4px 23.1px 37px -1.7px hsl(var(--shadow-color) / 0.08),
            32.7px 32.4px 51.8px -1.9px hsl(var(--shadow-color) / 0.08),
            45px 44.5px 71.2px -2.2px hsl(var(--shadow-color) / 0.08),
            60.6px 60px 95.9px -2.5px hsl(var(--shadow-color) / 0.08);
    }

    .loader {
        aspect-ratio: 1;
        border-radius: 50%;
        border: 8px solid ${({ theme }) => theme.text};
        animation:
            l20-1 0.8s infinite linear alternate,
            l20-2 1.6s infinite linear;
    }

    @keyframes l20-1{
        0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
        12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
        25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
        50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
        62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
        75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
        100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
    }

    @keyframes l20-2{ 
        0%    {transform:scaleY(1)  rotate(0deg)}
        49.99%{transform:scaleY(1)  rotate(135deg)}
        50%   {transform:scaleY(-1) rotate(0deg)}
        100%  {transform:scaleY(-1) rotate(-135deg)}
    }
`;