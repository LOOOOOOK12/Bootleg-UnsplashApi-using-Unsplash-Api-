export type NavFunctionProps = {
    handleSearch?: (value: string) => void;
};

export type DarkModeProps = {
    darkMode?: boolean; 
    toggleDarkmode?: () => void;
}

export type NavBarProps = NavFunctionProps & DarkModeProps

export type PicturePageProps = {
    image: string;
    imageDescription: string;
    place: string;
};
