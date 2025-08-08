import { darkThemeClass, lightThemeClass } from './theme.css';

type Color = 'light' | 'dark';
type Theme = { color: Color };

export function getTheme(): Theme {
  const selectedTheme: Theme = { color: 'light' };
  const storedColorTheme = localStorage.getItem('colorTheme');
  if (storedColorTheme === 'light' || storedColorTheme === 'dark') {
    selectedTheme.color = storedColorTheme;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    selectedTheme.color = 'dark';
  }
  return selectedTheme;
}

export function setTheme(theme: Theme): void {
  document.documentElement.classList.remove(lightThemeClass, darkThemeClass);
  if (theme.color === 'light') {
    document.documentElement.classList.add(lightThemeClass);
  } else if (theme.color === 'dark') {
    document.documentElement.classList.add(darkThemeClass);
  }
  localStorage.setItem('colorTheme', theme.color);
}

/** Use with a theme toggle button */
export function toggleTheme(prop: 'color'): void {
  const currentTheme = getTheme();
  if (prop === 'color') {
    currentTheme.color = currentTheme.color === 'light' ? 'dark' : 'light';
  }
  setTheme(currentTheme);
}

/** Use in main app component */
export function initTheme(): void {
  setTheme(getTheme());
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem('colorTheme')) {
      setTheme({ color: e.matches ? 'dark' : 'light' });
    }
  };
  mediaQuery.addEventListener('change', handleChange);
}

export function pxToRem(px: string): string {
  return `${(Number(px.replace('px', '')) / 16).toFixed(2)}rem`;
}
