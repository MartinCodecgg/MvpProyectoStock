import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

export const theme = writable<Theme>('light');

export function toggleTheme() {
  theme.update(current => current === 'light' ? 'dark' : 'light');
}
