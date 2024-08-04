
/**
 * The theme of the site
 */
export enum Theme {
    Light = 'light',
    Dark = 'dark',
}

/**
 * Get the theme that is currently stored in local storage.
 * If no theme is stored, return undefined.
 */
export function getStoredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === Theme.Light || stored === Theme.Dark) {
        return stored;
    }
    return undefined;
}

/**
 * Apply the given theme to the site.
 * If shouldStore is true, store the theme in local storage.
 */
export function applyTheme(theme: Theme, shouldStore: boolean) {
    const inverseTheme = theme === Theme.Light ? Theme.Dark : Theme.Light;
    document.documentElement.classList.remove(inverseTheme);
    document.documentElement.classList.add(theme);
    document.documentElement.dispatchEvent(new CustomEvent('theme-changed', { detail: theme }));
    if (shouldStore) {
        localStorage.setItem('theme', theme);
    }
}

/**
 * Get the preferred theme based on the user's system preferences.
 */
export function getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light;
}

/**
 * Get the theme that should be used on the site.
 * This is the current theme if it is stored, or the preferred theme otherwise.
 */
export function getCurrentTheme() {
    const stored = getStoredTheme();
    if (!stored) {
        return getPreferredTheme();
    }
    return stored;
}

/**
 * Add a listener that will be called whenever the theme changes.
 * This listens for a custom event dispatched on the document element.
 */
export function addThemeListener(listener: (theme: Theme) => void) {
    document.documentElement.addEventListener('theme-changed', ((event: CustomEvent<Theme>) => {
        listener(event.detail);
    }) as EventListener);
}