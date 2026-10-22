import { createContext, useContext, ReactElement } from 'react';

type Theme = 'light' | 'dark';

// Создаем контекст
const ThemeContext = createContext<Theme | undefined>(undefined);

// Компонент ThemeProvider
export function ThemeProvider(props: { theme: Theme; children: ReactElement }) {
    // ⚠️ ВОТ ЭТОТ RETURN БЫЛ ПРОПУЩЕН ИЛИ СЛОМАН
    return (
        <ThemeContext.Provider value={props.theme}>
            {props.children}
        </ThemeContext.Provider>
    );
}

// Хук для получения темы
export function useTheme(): Theme {
    const theme = useContext(ThemeContext);

    if (theme === undefined) {
        throw new Error('useTheme должен использоваться внутри ThemeProvider');
    }

    return theme;
}
