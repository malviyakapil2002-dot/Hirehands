/**
 * Role-based color theme configuration – Light Mode (Black & White + Accent)
 */
const themes = {
    ADMIN: {
        '--theme-primary': '#7c3aed',
        '--theme-primary-rgb': '124, 58, 237',
        '--theme-accent': '#8b5cf6',
        '--theme-accent-soft': 'rgba(124, 58, 237, 0.08)',
        '--theme-accent-border': 'rgba(124, 58, 237, 0.2)',
        '--theme-gradient': 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    },
    CONTRACTOR: {
        '--theme-primary': '#2563eb',
        '--theme-primary-rgb': '37, 99, 235',
        '--theme-accent': '#3b82f6',
        '--theme-accent-soft': 'rgba(37, 99, 235, 0.08)',
        '--theme-accent-border': 'rgba(37, 99, 235, 0.2)',
        '--theme-gradient': 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
    },
    LABOUR: {
        '--theme-primary': '#ea580c',
        '--theme-primary-rgb': '234, 88, 12',
        '--theme-accent': '#f97316',
        '--theme-accent-soft': 'rgba(234, 88, 12, 0.08)',
        '--theme-accent-border': 'rgba(234, 88, 12, 0.2)',
        '--theme-gradient': 'linear-gradient(135deg, #ea580c 0%, #fb923c 100%)',
    },
    HELP_CENTER: {
        '--theme-primary': '#0d9488',
        '--theme-primary-rgb': '13, 148, 136',
        '--theme-accent': '#14b8a6',
        '--theme-accent-soft': 'rgba(13, 148, 136, 0.08)',
        '--theme-accent-border': 'rgba(13, 148, 136, 0.2)',
        '--theme-gradient': 'linear-gradient(135deg, #0d9488 0%, #5eead4 100%)',
    },
};

const defaultTheme = themes.ADMIN;

export const getTheme = (role) => themes[role] || defaultTheme;

export const applyTheme = (role) => {
    const theme = getTheme(role);
    const root = document.documentElement;
    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(key, value);
    });
};

export default themes;
