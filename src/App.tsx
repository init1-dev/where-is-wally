import { useState } from 'react';
import './App.css';
import { loadTheme, toggleTheme } from './utils/theme/themeUtils';
import styled, { ThemeContext, ThemeProvider } from 'styled-components';
import { GlobalStyles, darkTheme, lightTheme } from './utils/theme/themeConfig';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';

function App() {
  const [theme, setTheme] = useState(loadTheme);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme(theme);
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, handleToggleTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <Wrapper>
          <GlobalStyles />
          <RouterProvider router={router} />
        </Wrapper>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

const Wrapper = styled.div`
  overflow: hidden;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

export default App;