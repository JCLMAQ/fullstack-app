import { Injectable, computed, effect, signal } from '@angular/core';

export interface lightDarkTheme {
  name:  'light' | 'dark' | 'system';
  icon: string;
}

export interface ColorTheme {
  id: string;
  primary: string;
  displayName: string;
}


@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private lightDarkTheme = signal<'light' | 'dark' | 'system'>('system');

  private themesApp: lightDarkTheme[] = [
    { name: 'light', icon: 'light_mode' },
    { name: 'dark', icon: 'dark_mode' },
    { name: 'system', icon: 'desktop_windows' },
  ];

  selectedLightDarkTheme = computed(() =>
    this.themesApp.find((t) => t.name === this.lightDarkTheme())
  );

  getLightDarkThemes() {
    return this.themesApp;
  }

  setLightDarkTheme(themesApp: 'light' | 'dark' | 'system') {
    this.lightDarkTheme.set(themesApp);
  }

  constructor() {
    effect(() => {
      const lightDarkTheme = this.lightDarkTheme();
      const colorScheme = lightDarkTheme === 'system' ? 'light dark' : lightDarkTheme;
      document.body.style.setProperty('color-scheme', colorScheme);
    });
  }

// Custom theme code
    private readonly themesColor: ColorTheme[] = [
    {
      id: 'blue',
      primary: '#1976D2',
      displayName: 'Blue',
    },
    { id: 'green', primary: '#00796B', displayName: 'Green' },
    { id: 'orange', primary: '#E65100', displayName: 'Orange' },
    { id: 'purple', primary: '#6200EE', displayName: 'Purple' },
    { id: 'red', primary: '#C2185B', displayName: 'Red' },
  ];

  currentColorTheme = signal<ColorTheme>(this.themesColor[0]);

  getColorThemes(): ColorTheme[] {
    return this.themesColor;
  }

  setColorTheme(themeId: string): void {
    const theme = this.themesColor.find((t) => t.id === themeId);
    if (theme) {
      this.currentColorTheme.set(theme);
    }
  }

  updateThemeClass = effect(() => {
    const theme = this.currentColorTheme();
    document.body.classList.remove(...this.themesColor.map((t) => `${t.id}-theme`));
    document.body.classList.add(`${theme.id}-theme`);
  });

}
