import { useState } from 'react';
import { data, IItem } from './data';
import { ThemeProvider, useTheme } from './context';
import './styles.css';

type Theme = 'light' | 'dark';

export function App() {
    const [currentTheme, setCurrentTheme] = useState<Theme>('light');

    function changeTheme() {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    const className = `app app_${currentTheme}`;

    return (
        // 1. Оборачиваем всё приложение в ThemeProvider и передаем ему текущую тему
        <ThemeProvider theme={currentTheme}>
            <div className={className}>
                <button onClick={changeTheme}>Toggle theme</button>
                {/* 2. Убираем передачу пропса theme в List */}
                <List data={data} />
            </div>
        </ThemeProvider>
    );
}

// 3. В List больше не нужен пропс theme
function List(props: { data: IItem[] }) {
    return (
        <div>
            {props.data.map((item) => (
                <ListItem
                    // 4. Убираем передачу theme в ListItem
                    caption={item.name}
                    key={item.id}
                />
            ))}
        </div>
    );
}

// 5. В ListItem тоже больше не нужен пропс theme
function ListItem(props: { caption: string }) {
    // 6. Достаем тему напрямую из контекста с помощью нашего хука!
    const theme = useTheme();

    const className = `listItem listItem_${theme}`;
    return <div className={className}>{props.caption}</div>;
}
