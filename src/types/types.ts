export type NavProps = {
    handleSearch?: (value: string) => void;
};

export type DarkModeProps = {
    darkMode?: boolean; 
    toggleDarkmode?: () => void;
}

export type NavBarProps = NavProps & DarkModeProps
